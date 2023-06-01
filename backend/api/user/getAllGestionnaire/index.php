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

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once('../../utils/StringCorrection.php');

$entityBody = file_get_contents('php://input');

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}
try {

    if($_SERVER['REQUEST_METHOD'] != "GET"){
        throw new Exception ("Ce type de méthode n'est pas autorisé sur cet URL.");
    }

    $IdGestionnaire = -1;


    include_once '../../utils/database.php';
    $conn = getConnection();

    include_once('../../utils/permissionManager.php');
    $role = getRoleFromJwt($token);

    if($role != "Administrateur"){
        throw new Exception (" Vous n'avez pas la permission d'éxécuter cette requete !");
    }

    include_once('../methods.php');

    $arrayOfGestionnaire = array();
    $query = "SELECT * FROM Gestionnaire;";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){

        while($row = mysqli_fetch_array($result)){
            $Id = $row["Identifiant"];
            $IdGestionnaire = $row["IdGestionnaire"];

            $arrayOfEvenements = array();
            $query2 = "SELECT * FROM Gerer WHERE IdGestionnaire = " . $IdGestionnaire . ";";
            $result2 = mysqli_query($conn, $query2);

            if(mysqli_num_rows($result2) > 0){
                while($row2 = mysqli_fetch_array($result2)){
                    array_push($arrayOfEvenements, $row2["IdEvenement"]);
                }
            }

            $userArray = getUserArrayFromId($Id);
            array_push($userArray, $arrayOfEvenements);
            array_push($arrayOfGestionnaire, $userArray);
        }

    } 

    echo json_encode($arrayOfGestionnaire);
    http_response_code(200);

} catch (Exception $e){
    $array = array(
        "error"=>$e->getMessage()
    );
    $json = json_encode($array);
    echo $json;
    http_response_code(400);
}
?>