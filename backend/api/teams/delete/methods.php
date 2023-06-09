<?php
    include_once('../../utils/permissionManager.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function deleteTeam($token, $IdEquipe){

        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);

        $role = getRoleFromJwt($token);
        $id = getUserIdFromJWT($token);
        
        $IdEvenement = -1;
        $conn = getConnection();
        $query = "SELECT * FROM Equipe AS eq INNER JOIN Projet AS p ON p.IdProjet = eq.IdProjet INNER JOIN Evenement AS e ON e.IdEvenement = p.IdEvenement WHERE eq.IdEquipe = ". $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            if($row = mysqli_fetch_array($result)){
                $IdEvenement = $row["IdEvenement"];
            }
        }
        
        if($IdEvenement == -1){
            throw new Exception ("Cette équipe est invalide car non reliée à un événement");
        }

        $hasPerm = false;
        $typeOfPerm = "";
        if($role == "Administrateur"){
            $hasPerm = true;
        } else if ($role == "Gestionnaire"){
            $arrayGestionnaire = getArrayOfGestionnaireOfEvent($IdEvenement);
            if(in_array($id, $arrayGestionnaire) && AccountIsActive($id)){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not manager of this event";
            }
        } else if ($role == "Etudiant"){
            $idLeader = getIdOfLeader($IdEquipe);
            if($idLeader == $id){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not leader of this event";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la permission de supprimer cette équipe. (" . $typeOfPerm .")");
        }

        $conn = getConnection();
        $query = "DELETE FROM Appartenir WHERE IdEquipe=". $IdEquipe .";";
        mysqli_query($conn, $query);
        $query = "DELETE FROM Message WHERE IdEquipe=". $IdEquipe .";";
        mysqli_query($conn, $query);
        $query = "DELETE FROM Equipe WHERE IdEquipe=". $IdEquipe .";";
        mysqli_query($conn, $query);

        $array = array("sucess"=>true);
        $json = json_encode($array);
        mysqli_close($conn);
        echo $json;
        http_response_code(200);

    }

?>