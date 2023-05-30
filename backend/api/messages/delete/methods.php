<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function deleteMessage($token, $IdMessage){
        $IdMessage = verifyStringToDatabaseInsertion($IdMessage);
        $role = getRoleFromJWT($token);
        $id = getUserIdFromJWT($token);

        $IdEquipe = -1;
        $conn = getConnection();
        $query = "SELECT * FROM Message WHERE IdMessage = " . $IdMessage . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            if($row = mysqli_fetch_array($result)){
                $IdEquipe = $row["IdEquipe"];
            }
        }

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
            throw new Exception ("Ce message ou l'équipe reliée a celui ci n'existe plus !");
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

            $typeOfPerm = "permission denied.";
        }

        if($hasPerm == false){
            throw new Exception ("Vous ne pouvez pas supprimer ce message (" . $typeOfPerm .")");
        }

        $query = "DELETE FROM Message WHERE IdMessage = ". $IdMessage . ";";
        mysqli_query($conn, $query);

        http_response_code(200);
        echo json_encode(array("sucess"=>true));

    }

?>