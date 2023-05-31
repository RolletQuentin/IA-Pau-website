<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function kickUserFromTeam($token, $IdCible, $IdEquipe){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $IdCible = verifyStringToDatabaseInsertion($IdCible);
        $IdUser = getUserIdFromJWT($token);
        $IdLeader = getIdOfLeader($IdEquipe);
        $role = getRoleFromJWT($token);

        if($IdCible == $IdLeader){
            throw new Exception ("Le leader ne peut pas etre kick d'une équipe !");
        }

        $hasPerm = false;
        $typeOfPerm = "";
        if($role == "Administrateur"){
            $hasPerm = true;
        } else if ($role == "Gestionnaire"){
            $arrayGestionnaire = getArrayOfGestionnaireOfEvent($IdEvenement);
            if(in_array($IdUser, $arrayGestionnaire) && AccountIsActive($IdUser)){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not manager of this event";
            }
        } else if ($role == "Etudiant"){

            if($IdLeader == $IdUser){
                $hasPerm = true;
            } else {
                $typeOfPerm = "not captain of this team.";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas récupéré les messages de cette équipe. (" . $typeOfPerm .")");
        }

        $conn = getConnection();
        $query = "SELECT * From Appartenir WHERE Identifiant = " . $IdCible . " AND IdEquipe = " . $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {

            $query = "DELETE FROM Appartenir WHERE Identifiant = " . $IdCible . " AND IdEquipe = " . $IdEquipe . ";";
            mysqli_query($conn, $query);

            echo json_encode(array("success" => true));
            http_response_code(200);
            mysqli_close($conn);

        } else {
            throw new Exception ("L'utilisateur ne fait pas parti de cette équipe");
        }

    }

?>