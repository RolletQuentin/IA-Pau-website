<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../../user/methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function addGestionnaireInEvent($token, $body, $IdEvent){
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);
        $IdCible = verifyStringToDatabaseInsertion($body["Id"]);
        $role = getRoleFromJWT($token);

        if($role != "Administrateur"){
            throw new Exception ("Vous n'avez pas la permission de gérer les gestionnaires !");
        }

        $arrayOfGestionnaire = getArrayOfGestionnaireOfEvent($IdEvenement);

        if(in_array($IdCible, $arrayOfGestionnaire)){
            throw new Exception ("Cet utilisateur est déjà gestionnaire de cet evenement !");
        }

        $conn = getConnection();

        $query = "SELECT * FROM User AS u INNER JOIN Gestionnaire AS g ON g.Identifiant = u.Identifiant WHERE Identifiant = ". $IdCible . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            if($row = mysqli_fetch_array($result)){
                $IdGestionnaire = $row["IdGestionnaire"];
                $query = "INSERT INTO Gerer (IdGestionnaire, IdEvenement) VALUES (" . $IdGestionnaire . ", " . $IdEvenement . ");";
                mysqli_query($conn, $query);
                echo json_encode(array("sucess"=> true));
                http_response_code(200);
            } else {
                throw new Exception ("Aucun utilisateur avec cette id !");
            }
        } else {
            throw new Exception ("Aucun utilisateur avec cette id !");
        }


    }

?>