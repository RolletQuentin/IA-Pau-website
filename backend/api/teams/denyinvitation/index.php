<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('HTTP/1.1 200 OK');

require_once('../../../vendor/autoload.php');

include_once('methods.php');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}

try {

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        if(empty($_GET["IdEquipe"])){
            throw new Exception ("Merci de choisir une équipe");
        } else {
            denyTeam($token, $_GET["IdEquipe"]);
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