<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function sendMessage($token, $body, $IdEquipe){
        if(empty($body["content"])){
            throw new Exception ("Merci de choisir un contenu pour le message !");
        }
        $Content = verifyStringToDatabaseInsertion($body["content"]);
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $role = getRoleFromJWT($token);
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
            throw new Exception ("Vous n'avez pas la d'envoyer des messages a cette équipe. (" . $typeOfPerm .")");
        }

        $query = "INSERT INTO Message (IdEvenement, DateMessage, IdSender, Contenu, IdEquipe) VALUES ( " . $IdEvenement . ", NOW(), ". $id .", '". $Content ."', ". $IdEquipe .");";
        mysqli_query($conn, $query);

        http_response_code(200);
        echo json_encode(array("sucess"=>true));

    }

    function sendGlobalMessage($token, $body, $IdEvent){
        if(empty($body["content"])){
            throw new Exception ("Merci de choisir un contenu pour le message !");
        }
        $Content = verifyStringToDatabaseInsertion($body["content"]);
        $role = getRoleFromJWT($token);
        $id = getUserIdFromJWT($token);
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);

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
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la d'envoyer des messages dans cet événement. (" . $typeOfPerm .")");
        }

        $conn = getConnection();
        $query = "SELECT * FROM Evenement WHERE IdEvenement=" . $IdEvenement . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) < 1){
            throw new Exception ("Cet événement n'existe pas !");
        }

        $array = array();
        $query = "SELECT * From Equipe AS e INNER JOIN Projet AS p ON p.IdProjet = e.IdProjet INNER JOIN Evenement AS ev ON ev.IdEvenement = p.IdEvenement WHERE p.IdEvenement = " . $IdEvenement . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)){
                $IdEquipe = $row["IdEquipe"];
                array_push($array, $IdEquipe);
            } 
        } else {
            throw new Exception ("Vous ne pouvez pas envoyer de messages tant qu'il n'y a pas d'équipe dans l'événement !");
        }
        $conn = getConnection();
        foreach($array as $IdEquipe){
            $query = "INSERT INTO Message (IdEvenement, DateMessage, IdSender, Contenu, IdEquipe) VALUES ( " . $IdEvenement . ", NOW(), ". $id .", '". $Content ."', ". $IdEquipe .");";
            mysqli_query($conn, $query);
        }
        http_response_code(200);
        mysqli_close($conn);
        echo json_encode(array('success' =>true));
    }

?>