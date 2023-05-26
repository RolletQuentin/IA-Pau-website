<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

error_reporting(E_ALL & ~E_DEPRECATED);
ini_set("display_errors", 1);

include '../utils/database.php';
include 'methods.php';
include '../utils/permissionManager.php';

require_once('../../vendor/autoload.php');

try {
    if($_SERVER['REQUEST_METHOD'] == "GET"){
        if(!(empty($_GET["id"]))){
            getUserFromId($_GET["id"]);
        } else {
            getAllUsers();
        }
    } else if ($_SERVER['REQUEST_METHOD'] == "PATCH"){
        $entityBody = file_get_contents('php://input');
        $body = json_decode($entityBody, true);
        if(empty($_GET["id"])){
            http_response_code(400);
            throw new Exception ("Il faut préciser un id d'utilisateur pour la requete");
        } else {
            if(hasPermUser($body["token"], $_GET["id"])){
                EditUserFromId($_GET["id"], $body);
            } else {
                http_response_code(400);
            }
        }
        
    } else if ($_SERVER['REQUEST_METHOD'] == "DELETE"){
        $entityBody = file_get_contents('php://input');
        $array = json_decode($entityBody, true);
        if(hasPermUser($array["token"], $_GET["id"])){
            deleteUser($_GET["id"]);
        } else {
            throw new Exception ("Pas la permission de supprimer cette ressource !");
            http_response_code(400);
        }

    } 
    else {
        throw new Exception ("Methode de récupération de donnée non prise en charge.");
    }
} catch (Exception $e) {
    echo "Erreur: ". $e->getMessage();
}

?>