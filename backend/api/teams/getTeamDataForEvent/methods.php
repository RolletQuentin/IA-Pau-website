<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function getTeamDataOfUserForEvent($token, $IdUser, $IdEvent){
        $IdUser = verifyStringToDatabaseInsertion($IdUser);
        $IdEvevenement = verifyStringToDatabaseInsertion($IdEvent);
        $role = getRoleFromJWT($token);
        $id = getUserIdFromJWT($token);

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
            if($id == $IdUser){
                $hasPerm = true;
            } else {
                $typeOfPerm = "you're not the specified user";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la de récupérer les informations de cette équipe. (" . $typeOfPerm .")");
        }

        

    }

    function createEquipe($jwt, $teamData){
        $role = getRoleFromJWT($jwt);
        $id = getUserIdFromJWT($jwt);
        if($role != "Etudiant"){
            throw new Exception ("L'utilisateur n'est pas un étudiant.");
        }
        if(empty($teamData["Nom"])){
            throw new Exception ("Aucun nom n'a été choisi pour l'équipe.");
        }
        if(empty($teamData["IdProjet"])){
            throw new Exception ("Vous avez oublié de saisir un Id de projet !");
        }

        $nom = verifyStringToDatabaseInsertion($teamData["Nom"]);
        $IdProjet = verifyStringToDatabaseInsertion($teamData["IdProjet"]);
        $conn = getConnection();

        $idEvenement = getIdEvenementFromProjet($IdProjet);

        $teamsOfUser = array();
        $query = "SELECT * FROM Appartenir WHERE Identifiant = " . $id . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_array($result)){
                array_push($teamsOfUser, $row["IdEquipe"]);
            }
        }

        $arrayOfTeamsInEvent = array();
        $query = "SELECT * FROM Evenement as e INNER JOIN Projet AS p ON p.IdEvenement = e.IdEvenement INNER JOIN Equipe as eq ON eq.IdProjet = p.IdProjet WHERE e.IdEvenement = " . $idEvenement . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                array_push($arrayOfTeamsInEvent, $row["IdEquipe"]);
            }
        }

        foreach($teamsOfUser as $teamID){
            if(in_array($teamID, $arrayOfTeamsInEvent)){
                throw new Exception ("Vous êtes déjà dans une équipe inscrite a cet événement !");
            }
        }

    
        $IdLeader = $id;
        $query = "INSERT INTO Equipe (Nom, IdLeader, Score, IdProjet) VALUES ('". $nom ."', ". $IdLeader .", 0, " . $IdProjet . ");";
        mysqli_query($conn, $query);
        $query2 = "SELECT * FROM Equipe WHERE IdLeader = " . $IdLeader . " AND IdProjet = " . $IdProjet . ";";
        $result2 = mysqli_query($conn, $query2);
        $idEquipe = -1;
        if(mysqli_num_rows($result2) > 0) {
            if($row = mysqli_fetch_assoc($result2)){
                $idEquipe = $row["IdEquipe"];
            }
        }
        if($idEquipe > -1){
            $query3 = "INSERT INTO Appartenir (Identifiant, IdEquipe) VALUES ( " . $id . ", " . $idEquipe . ");";
            mysqli_query($conn, $query3);
            getTeamInformation($idEquipe);
            http_response_code(200);
        } else {
            $query3 = "DELETE FROM Equipe WHERE IdLeader = " . $IdLeader . " AND IdProjet = " . $IdProjet . ";";
            mysqli_query($conn, $query3);
            throw new Exception("Erreur lors de la création de l'équipe ! Problême lors de l'insertion d'une donnée.");
        }
    }

?>