<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('HTTP/1.1 200 OK');

use Firebase\JWT\JWT;

require_once('../../../vendor/autoload.php');

$entityBody = file_get_contents('php://input');
$values = json_decode($entityBody, true);
    
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
    if(! isset($nom)){
        http_response_code(400);
        throw new Exception ("Nom de famille non saisit !");
    } 
    if(! isset($firstname)){
        http_response_code(400);
        throw new Exception ("Prénom non saisit !");
    }
    if(! isset($email)){
        http_response_code(400);
        throw new Exception ("Email non saisit !");
    }
    require_once('../../utils/patchs/php8.php');
    if(!(str_contains($email, "@"))){
        http_response_code(400);
        throw new Exception ("Format de l'email non valide !");
    }
    if(! isset($mdp)){
        http_response_code(400);
        throw new Exception ("Mot de passe non saisit");
    }
    if(! isset($phone)){
        http_response_code(400);
        throw new Exception ("Telephone non saisit !");
    }
    if(! isset($level)){
        http_response_code(400);
        throw new Exception ("Niveau d'étude non saisit !");
    }
    if(! isset($ville)){
        http_response_code(400);
        throw new Exception ("ville non saisit !");
    } 
    if(! isset($ecole)){
        throw new Exception ("Ecole non saisit !");
        http_response_code(400);
    } 
    if(! isset($numEtudiant)){
        throw new Exception ("Numéro etudiant non saisit !");
        http_response_code(400);
    }

    include '../../utils/database.php';

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
        throw new Exception ("Numéro etudiant déjà présent dans la BDD");
        http_response_code(400);
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
    http_response_code(400);
    echo "Erreur : " . $e->getMessage();
}

?>