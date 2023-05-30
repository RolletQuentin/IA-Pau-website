<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../../../vendor/autoload.php');

include_once('methods.php');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}

try {

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $entityBody = file_get_contents('php://input');
        $body = json_decode($entityBody, true);
        if(!(empty($_GET["IdEquipe"]))){
            sendMessage($token, $body, $_GET["IdEquipe"]);
        }
        if(!(empty($_GET["IdEvent"]))){
            sendGlobalMessage($token, $body, $_GET["IdEvent"]);
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