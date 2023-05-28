<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
header('HTTP/1.1 200 OK');

require_once('../../../vendor/autoload.php');

include_once('methods.php');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}

try {

    if($_SERVER['REQUEST_METHOD'] == "GET"){
        if(empty($_GET["IdEquipe"])){
            throw new Exception ("Merci de choisir une id d'équipe !");
        } else {
            getTeamInvitations($token, $_GET["IdEquipe"]);
        }
    }

    if($_SERVER['REQUEST_METHOD'] == "DELETE"){
        if(empty($_GET["IdEquipe"])){
            throw new Exception ("Merci de choisir une id d'équipe !");
        } else {
            $entityBody = file_get_contents('php://input');
            $body = json_decode($entityBody, true);
            deleteTeamInvitation($token, $body, $_GET["IdEquipe"]);
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