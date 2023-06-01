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
    $query = "SELECT * FROM Gestionnaire AS g INNER JOIN User AS u ON u.Identifiant = g.Identifiant;";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){

        while($row = mysqli_fetch_array($result)){
            $Id = $row["Identifiant"];
            $userArray = getUserArrayFromId($Id);
            array_push($arrayOfGestionnaire, $userArray);
        }

    } else {
        throw new Exception ("Le data challenge n'existe pas !");
    }

    json_encode($arrayOfGestionnaire);
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