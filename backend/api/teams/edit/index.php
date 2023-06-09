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

include_once '../../utils/database.php';
include_once 'methods.php';
include_once '../../utils/permissionManager.php';

require_once('../../../vendor/autoload.php');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}

try {
    if($_SERVER['REQUEST_METHOD'] == "PATCH"){

        if(empty($_GET["IdEquipe"])){
            throw new Exception ("Merci de choisir un id d'équipe");
        } else {
            $entityBody = file_get_contents('php://input');
            $body = json_decode($entityBody, true);
            editTeamInformations($token, verifyStringToDatabaseInsertion($_GET["IdEquipe"]), $body);
        }
    }

} catch (Exception $e) {
    $array = array(
        "error"=>$e->getMessage()
    );
    $json = json_encode($array);
    echo $json;
    http_response_code(400);
}

?>