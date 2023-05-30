<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
// --Pour fix les CORS 
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    http_response_code(200);
    exit(0);
}
// --

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    http_response_code(200);
    exit(0);
}


use Firebase\JWT\JWT;

require_once('../../../vendor/autoload.php');

$validCredentials = false;
$userId = -1;

$entityBody = file_get_contents('php://input');
$array = json_decode($entityBody, true);

include_once('../../utils/StringCorrection.php');

$email = verifyStringToDatabaseInsertion($array["email"]);
$mdp = verifyStringToDatabaseInsertion($array["password"]);

$errors = array();
$last_error = "";

include_once('../../utils/patchs/php8.php');

if(!(str_contains($email, "@"))){
    http_response_code(400);
    $array = array(
        "error"=>"Le format de l'email n'est pas valide !"
    );
    $json = json_encode($array);
    echo $json;    
} else {

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
            http_response_code(200);

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
            echo $json;
        } else {
            http_response_code(401);
            throw new Exception ("Email ou Mot de passe incorrect");
        }
    } catch (Exception $e) {
        http_response_code(400);
        $array = array(
            "error"=>$e->getMessage()
        );
        $json = json_encode($array);
        echo $json;
    }
}
?>