<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods : GET, POST, OPTIONS, PUT, DELETE, PATCH");
header('HTTP/1.1 200 OK');

include_once '../utils/database.php';
include_once 'methods.php';
include_once '../utils/permissionManager.php';
include_once '../utils/StringCorrection.php';

require_once('../../vendor/autoload.php');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}

try {
    if($_SERVER['REQUEST_METHOD'] == "GET"){
        if(!(empty($_GET["IdEvent"]))){
            getAllTeamsOfEvent($_GET["IdEvent"]);
        } else {
            if(empty($_GET["IdEquipe"])){
                getAllTeams();
            } else {
                getTeamInformation($_GET["IdEquipe"]);
            }
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