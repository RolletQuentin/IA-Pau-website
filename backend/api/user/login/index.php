<?php

error_reporting(E_ALL & ~E_DEPRECATED);
ini_set("display_errors", 1);

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
$query = "SELECT * From User WHERE Email='" . $email . "' AND Mdp='" . $mdp . "';";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    if($row = mysqli_fetch_assoc($result)){
        $validCredentials = true;
        $userId = $row["Identifiant"];
    }
}
try {
    if($validCredentials){

        $secretKey  = '2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12';
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
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
    echo "Erreur: ". $e->getMessage();
}
?>