<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

use Firebase\JWT\JWT;

require_once('../../../vendor/autoload.php');

$validCredentials = false;
$userId = -1;

$entityBody = file_get_contents('php://input');
$array = json_decode($entityBody, true);

$email = $array["email"];
$mdp = $array["password"];

include '../../utils/database.php';
include '../methods.php';

$conn = getConnection();
$query = "SELECT * From User WHERE Email='" . $email . "';";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        
        if(password_verify($mdp, $row["Mdp"])){
            $validCredentials = true;
            $userId = $row["Identifiant"];
        }
    }
}
mysqli_close($conn);

try {
    if($validCredentials){

        $secretKey  = '2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12';
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+60 minutes')->getTimestamp();      // Add 60 seconds
        $serverName = "api.iapau.cytech";

        $data = [
            'iat'  => $issuedAt->getTimestamp(),         // time when the token was generated
            'iss'  => $serverName,                       // Issuer
            'nbf'  => $issuedAt->getTimestamp(),         // Not before
            'exp'  => $expire,                           // Expire
            'userId' => $userId,                         // User ID
        ];
        $jwt = JWT::encode(
            $data,
            $secretKey,
            'HS512');
        $role = getTypeOfUser($userId);
        $array = array(
            "userId"=>$userId,
            "role"=>$role,
            "jwt"=>$jwt
        );
        $json = json_encode($array);
        http_response_code(200);
        echo $json;
    } else {
        http_response_code(401);
        throw new Exception ("Email ou Mot de passe incorrect");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo "Erreur: ". $e->getMessage();
}
?>