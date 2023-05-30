<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
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