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

$values = json_decode($entityBody, true);


$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}
try {

    if($_SERVER['REQUEST_METHOD'] != "DELETE"){
        throw new Exception ("Ce type de méthode n'est pas autorisé sur cet URL.");
    }

    if(empty($values["IdEvent"]) || empty($values["IdUser"])){
        throw new Exception ("Merci de saisir un IdEvent un IdUser");
    }
    
    $IdEvenement = verifyStringToDatabaseInsertion($values["IdEvent"]);
    $IdUser = verifyStringToDatabaseInsertion($values["IdUser"]);

    $IdGestionnaire = -1;


    include_once '../../utils/database.php';
    $conn = getConnection();
    $query = "SELECT * FROM Gestionnaire WHERE Identifiant = " . $IdUser . ";";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){
        if($row = mysqli_fetch_array($result)){
            $IdGestionnaire = $row["IdGestionnaire"];
        }
    }

    if($IdGestionnaire == -1){
        throw new Exception ("Cet utilisateur n'est pas un gestionnaire");
    }

    include_once('../../utils/permissionManager.php');
    $role = getRoleFromJwt($token);

    if($role != "Administrateur"){
        throw new Exception (" Vous n'avez pas la permission d'éxécuter cette requete !");
    }

    $query = "SELECT * FROM Evenement WHERE IdEvenement = " . $IdEvenement . ";";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){

        $query2 = "SELECT * FROM Gerer WHERE IdGestionnaire=" . $IdGestionnaire . " AND IdEvenement=" . $IdEvenement . ";";
        $result2 = mysqli_query($conn, $query2);

        if(mysqli_num_rows($result2) == 0){
            throw new Exception ("L'utilisateur ne gere pas cet evenement !");
        }

        $query3 = "DELETE FROM Gerer WHERE IdGestionnaire=" . $IdGestionnaire . " AND IdEvenement=" . $IdEvenement . ";";
        mysqli_query($conn, $query3);

        json_encode(array("sucess" => true));
        http_response_code(200);

    } else {
        throw new Exception ("Le data challenge n'existe pas !");
    }

} catch (Exception $e){
    $array = array(
        "error"=>$e->getMessage()
    );
    $json = json_encode($array);
    echo $json;
    http_response_code(400);
}
?>