<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");


use Firebase\JWT\JWT;
require_once('../../../vendor/autoload.php');
include_once('../../utils/StringCorrection.php');

$entityBody = file_get_contents('php://input');
$values = json_decode($entityBody, true);

$errors = array();
$last_error = "";

$nom = verifyStringToDatabaseInsertion($values["lastname"]);
$firstname = verifyStringToDatabaseInsertion($values["firstname"]);
$email = verifyStringToDatabaseInsertion($values["email"]);
$mdp = verifyStringToDatabaseInsertion($values["password"]);
$phone = verifyStringToDatabaseInsertion($values["phone"]);
$level = verifyStringToDatabaseInsertion($values["level"]);
$ecole = verifyStringToDatabaseInsertion($values["school"]);
$ville = verifyStringToDatabaseInsertion($values["city"]);
$numEtudiant = verifyStringToDatabaseInsertion($values["numEtudiant"]);

try {
    if(empty($nom)){
        array_push($errors, "lastname");
        if($last_error == ""){
            $last_error = "Nom de famille non saisi";
        }
    } 
    if(empty($firstname)){
        array_push($errors, "firstname");
        if($last_error == ""){
            $last_error = "Prénom non saisi";
        }
    }
    if(empty($email)){
        array_push($errors, "email");
        if($last_error == ""){
            $last_error = "Email non saisi";
        }
    } else {
        require_once('../../utils/patchs/php8.php');
        if(!(str_contains($email, "@"))){
            if(!(in_array("email", $errors))){
                array_push($errors, "email");
            }
            if($last_error == ""){
                $last_error = "Il manque un @ a votre email";
            }
            
        } else {
            $exploded_mail = explode("@", $email);
            if(empty($exploded_mail[1])){
                if(!(in_array("email", $errors))){
                    array_push($errors, "email");
                }
                if($last_error == ""){
                    $last_error = "Il n'y a rien après votre @";
                }
            } else {
                if(!(str_contains($exploded_mail[1], "."))){
                    if(!(in_array("email", $errors))){
                        array_push($errors, "email");
                    }
                    if($last_error == ""){
                        $last_error = "Merci de saisir le domaine a la fin du mail.";
                    }
                }
            }
        }
        if(str_contains($email, " ")){
            if(!(str_contains($exploded_mail[1], "."))){
                if(!(in_array("email", $errors))){
                    array_push($errors, "email");
                }
                if($last_error == ""){
                    $last_error = "Pas d'espaces dans un email.";
                }
            }
        }
    }
    if(empty($mdp)){
        array_push($errors, "password");
        if($last_error == ""){
            $last_error = "Mot de passe non saisi";
        }
    }
    if(empty($phone)){
        array_push($errors, "phone");
        if($last_error == ""){
            $last_error = "Numéro de téléphone non saisi";
        }
    }
    if(empty($level)){
        array_push($errors, "level");
        if($last_error == ""){
            $last_error = "Niveau d'études non saisi";
        }
    }
    if(empty($ville)){
        array_push($errors, "city");
        if($last_error == ""){
            $last_error = "Ville non saisie";
        }
    } 
    if(empty($ecole)){
        array_push($errors, "school");
        if($last_error == ""){
            $last_error = "Ecole non saisie";
        }
    } 
    if(empty($numEtudiant)){
        array_push($errors, "numEtudiant");
        if($last_error == ""){
            $last_error = "Numéro étudiant non saisi";
        }
    }

    include_once('../../utils/database.php');

    $numEtudiantDejaPresent = false;
    $conn = getConnection();
    $query = "SELECT * From Etudiant WHERE NumeroEtudiant='" . $numEtudiant . "';";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0){
        if($row = mysqli_fetch_assoc($result)){
            $numEtudiantDejaPresent = true;
        }
    }

    if($numEtudiantDejaPresent){
        if(!(in_array(array("numEtudiant", $errors)))){
            array_push($errors, "numEtudiant");
        }
        if($last_error == ""){
            $last_error = "Numéro étudiant déjà dans la base de donnée. ";
        }
    }

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
        if(!(in_array("email", $errors))){
            array_push($errors, "email");
        }
        if($last_error == ""){
            $last_error = "Email déjà présent dans la base de donnée.";
        }
    }
    if($last_error != ""){
        $retour = array(
            "error" => $last_error,
            "errors" => $errors
        );
        $json = json_encode($retour);
        echo $json;
        http_response_code(400);
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
        $query = "INSERT INTO Etudiant (NumeroEtudiant, NiveauEtude, Ecole, Ville, Identifiant) VALUES (". $numEtudiant .", '". $level ."', '". $ecole ."', '". $ville ."' , ". $id .");";
        $result = mysqli_query($conn, $query);
        
        $secretKey  = '2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12';
        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+60 minutes')->getTimestamp();      // Add 60 seconds
        $serverName = "api.iapau.cytech";

        $data = [
            'iat'  => $issuedAt->getTimestamp(),         // time when the token was generated
            'iss'  => $serverName,                       // Issuer
            'nbf'  => $issuedAt->getTimestamp(),         // Not before
            'exp'  => $expire,                           // Expire
            'userId' => $id,                         // User ID
        ];
        $jwt = JWT::encode(
            $data,
            $secretKey,
            'HS512');
        $array = array(
            "userId"=>$id,
            "role"=>"Etudiant",
            "jwt"=>$jwt
        );
        $json = json_encode($array);
        http_response_code(200);
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