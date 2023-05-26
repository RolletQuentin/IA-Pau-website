<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('HTTP/1.1 200 OK');

include_once('../../utils/StringCorrection.php');

$entityBody = file_get_contents('php://input');
$values = json_decode($entityBody, true);

$nom = verifyStringToDatabaseInsertion($values["lastname"]);
$firstname = verifyStringToDatabaseInsertion($values["firstname"]);
$email = verifyStringToDatabaseInsertion($values["email"]);
$mdp = verifyStringToDatabaseInsertion($values["password"]);
$phone = verifyStringToDatabaseInsertion($values["phone"]);

$Entreprise = verifyStringToDatabaseInsertion($values["company"]);
$ville = verifyStringToDatabaseInsertion($values["city"]);
$debut = verifyStringToDatabaseInsertion($values["debut"]);
$fin = verifyStringToDatabaseInsertion($values["fin"]);

$header = apache_request_headers();
$token = "";
if(!(empty($header["Authorization"]))){
    $token = str_replace("Bearer ", "", $header["Authorization"]);
}
try {

    include_once('../../utils/permissionManager.php');
    $role = getRoleFromJwt($token);
    if($role != "Administrateur"){
        throw new Exception (" Vous n'avez pas la permission d'éxécuter cette requete !");
    }

    if(hasExpired($token)){
        throw new Exception (" Votre token a expiré !");
    }

    if(! isset($nom)){
        http_response_code(400);
        throw new Exception ("Nom de famille non saisit !");
    } 
    if(! isset($firstname)){
        http_response_code(400);
        throw new Exception ("Prénom non saisit !");
    }
    if(!isset($email)){
        http_response_code(400);
        throw new Exception ("Email non saisit !");
    }
    require_once('../../utils/patchs/php8.php');
    if(!(str_contains($email, "@"))){
        http_response_code(400);
        throw new Exception ("Format Email invalide !");
    }
    
    if(! isset($mdp)){
        http_response_code(400);
        throw new Exception ("Mot de passe non saisit");
    }
    if(! isset($phone)){
        http_response_code(400);
        throw new Exception ("Telephone non saisit !");
    }
    if(! isset($ville)){
        http_response_code(400);
        throw new Exception ("ville non saisit !");
    } 
    if(! isset($Entreprise)){
        throw new Exception ("Entreprise non saisit !");
        http_response_code(400);
    } 
    if(! isset($debut)){
        throw new Exception ("Date de saisie non saisie !");
        http_response_code(400);
    }
    if(! isset($fin)){
        http_response_code(400);
        throw new Exception ("Date de fin non saisie !");
    }

    include '../../utils/database.php';

    $existeDeja = false;

    $conn = getConnection();
    $query = "SELECT * From User WHERE Email='" . $email . "';";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){
        if($row = mysqli_fetch_assoc($result)){
            $existeDeja = true;
        }
    }
    mysqli_close($conn);
    if($existeDeja){
        http_response_code(400);
        throw new Exception ("Le mail est déjà utilisé dans la bdd");
    } else {

        $conn = getConnection();

        $encoded_password = password_hash($mdp, PASSWORD_DEFAULT);

        $query = "INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('". $email ."', '". $nom ."', '". $firstname ."', ". $phone ." , '". $encoded_password ."');";
        
        $result = mysqli_query($conn, $query);
        $query = "SELECT * From User WHERE Email='" . $email . "';";
        $result = mysqli_query($conn, $query);
        $id = -1;
        if(mysqli_num_rows($result) > 0){
            if($row = mysqli_fetch_assoc($result)){
                $id = $row["Identifiant"];
            }
        }
        $query = "INSERT INTO Gestionnaire (Entreprise, Ville, Debut, Fin, Identifiant) VALUES ('". $Entreprise ."', '". $ville ."', '". $debut ."', '". $fin ."' , ". $id .");";
        $result = mysqli_query($conn, $query);
        
        $array = array(
            "success"=>true
        );
        $json = json_encode($array);
        echo $json;
        mysqli_close($conn);
        http_response_code(200);
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