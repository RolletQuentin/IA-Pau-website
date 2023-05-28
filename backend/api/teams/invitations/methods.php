<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');
    include_once('../../users/methods.php');

    include_once('../../utils/database.php');
    
    function deleteTeamInvitation($token, $body, $IdEquipe){
        if(empty($body["email"])){
            throw new Exception ("merci de saisir une adresse mail");
        }
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $Email = verifyStringToDatabaseInsertion($body["email"]);
        $IdUser = getUserIdFromJWT($token);
        $role = getRoleFromJWT($token);

        $hasPerm = false;
        $typeOfPerm = "";
        if($role == "Administrateur"){
            $hasPerm = true;
        } else if ($role == "Gestionnaire"){
            $arrayGestionnaire = getArrayOfGestionnaireOfEvent($IdEquipe);
            if(in_array($id, $arrayGestionnaire) && AccountIsActive($id)){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not manager of this event";
            }
        } else if ($role == "Etudiant"){
            $idLeader = getIdOfLeader($IdEquipe);
            if($idLeader == $IdUser){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not leader of this team";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la permission de regarder les invitations de cette équipe. (" . $typeOfPerm .")");
        }

        $idCible = -1;
        $conn = getConnection();
        $query = "SELECT * FROM User WHERE Email = '". $Email . "';";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                $idCible = $row["Identifiant"];
            }
        }

        $query = "DELETE FROM Preinscription WHERE Identifiant = ". $idCible . ";";
        mysqli_query($conn, $query);

        http_response_code(200);
        echo json_encode(array("success" =>true));
        mysqli_close($conn);

    }

    function getTeamInvitations($token, $IdEquipe){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $IdUser = getUserIdFromJWT($token);
        $role = getRoleFromJWT($token);

        $hasPerm = false;
        $typeOfPerm = "";
        if($role == "Administrateur"){
            $hasPerm = true;
        } else if ($role == "Gestionnaire"){
            $arrayGestionnaire = getArrayOfGestionnaireOfEvent($IdEquipe);
            if(in_array($id, $arrayGestionnaire) && AccountIsActive($id)){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not manager of this event";
            }
        } else if ($role == "Etudiant"){
            $idLeader = getIdOfLeader($IdEquipe);
            if($idLeader == $IdUser){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not leader of this team";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la permission de regarder les invitations de cette équipe. (" . $typeOfPerm .")");
        }

        $array = array();
        $conn = getConnection();
        $query = "SELECT * FROM Preinscription WHERE IdEquipe = ". $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                if(!(in_array($row["Identifiant"], $array))){
                    array_push($array, $row["Identifiant"]);
                }
            }
        }
        $arrayResult = array();
        foreach($array as $IdUser){
            $userArray = getUserArrayFromId($IdUser);
            array_push($arrayResult, array("email"=>$userArray["email"]));
        }
        mysqli_close($result);
        http_response_code(200);
        echo json_encode($arrayResult);
    }

    function getMyTeamForEvent($token, $IdEvent){
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);
        $IdUser = getUserIdFromJWT($token);

        $arrayOfTeams = getArrayOfMyTeams($token);

        $conn = getConnection();
        $query = "SELECT IdEquipe FROM Evenement AS e INNER JOIN Projet AS p ON e.IdEvenement = p.IdEvenement INNER JOIN Equipe AS eq ON eq.IdProjet = p.IdProjet WHERE e.IdEvenement = " . $IdEvenement .";";
        $result = mysqli_query($conn, $query);
        $IdEquipe = -1;
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_array($result)){
                $id = $row["IdEquipe"];
                if(in_array($id, $arrayOfTeams)){
                    $IdEquipe = $id;
                }
            }
        }
        if($IdEquipe == -1){
            throw new Exception ("Pas d'équipe pour cet événement !");
        } else {
            $teamData = getTeamInformationArray($IdEquipe);
            http_response_code(200);
            echo json_encode($teamData);
            mysqli_close($conn);
        }
    }

    function getArrayOfMyTeams($token){
        $IdUser = getUserIdFromJWT($token);
        $array = array();
        $conn = getConnection();
        $query = "SELECT * From Appartenir WHERE Identifiant = " . $IdUser . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_array($result)){
                $IdEquipe = $row["IdEquipe"];
                if(!(in_array($IdEquipe, $array))){
                    array_push($array, $IdEquipe);
                }
            }
        }
        mysqli_close($conn);
        return $array;
    }

    function getMyTeams($token){
        $arrayOfTeams = getArrayOfMyTeams($token);
        $arrayResult = array();
        foreach($arrayOfTeams as $IdEquipe){
            $data = getTeamInformationArray($IdEquipe);
            array_push($arrayResult, $data);
        }
        http_response_code(200);
        echo json_encode($arrayResult);
    }

?>