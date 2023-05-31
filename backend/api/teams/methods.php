<?php
    if(file_exists('../utils/database.php')){
        include_once('../utils/database.php');
    } else if(file_exists('../../utils/database.php')){
        include_once('../../utils/database.php');
    } 
    
    include_once('../utils/StringCorrection.php');

    function getTeamInformationArray($idEquipe){
        $conn = getConnection();
        $query = "SELECT * From Equipe WHERE IdEquipe=". $idEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            if($row = mysqli_fetch_assoc($result)){
                $nom = $row["Nom"];
                $idLeader = $row["IdLeader"];
                $score = $row["Score"];
                $lienProjet = "";
                if(!(empty($row["LienProjet"]))){
                    $lienProjet = $row["LienProjet"];
                }
                $IdProjet = $row["IdProjet"];
                $arrayUsers = array();
                $query2 = "SELECT * From Appartenir WHERE IdEquipe=". $idEquipe . ";";
                $r2 = mysqli_query($conn, $query2);
                if(mysqli_num_rows($r2) > 0) {
                    while($row2 = mysqli_fetch_assoc($r2)){
                        array_push($arrayUsers, getUserArrayFromId($row2["Identifiant"]));
                    }
                }
                $IdEvenement = getIdEvenementFromProjet($IdProjet);
                $jsonArray = array(
                    "IdEquipe"=>$idEquipe,
                    "Nom"=>$nom,
                    "IdLeader"=>$idLeader,
                    "Score"=>$score,
                    "LienProjet"=>$lienProjet,
                    "IdProjet"=>$IdProjet,
                    "Users"=>$arrayUsers,
                    "IdEvenement"=>$IdEvenement
                );
                mysqli_close($conn);
                return $jsonArray;
            } else {
                throw new Exception ("L'équipe saisie n'est pas dans la base de donnée.");
            }
        } else {
            throw new Exception ("L'équipe saisie n'est pas dans la base de donnée.");
        }
    }

    function getTeamInformation($idEquipe){
        $array = getTeamInformationArray($idEquipe);
        echo json_encode($array);
        http_response_code(200);
    }

    function getIdEvenementFromProjet($IdProjet){
        $conn = getConnection();
        $query = "SELECT * From Projet WHERE IdProjet=". $IdProjet . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            if($row = mysqli_fetch_assoc($result)){
                $idEvenement = $row["IdEvenement"];
                mysqli_close($conn);
                return $idEvenement;
            } else {
                throw new Exception ("Projet inexistant !");
            }
        } else {
            throw new Exception ("Projet inexistant !");
        }
    }

    function getAllTeams(){
        $conn = getConnection();
        $array = array();
        $query = "SELECT * From Equipe;";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)){
                $IdEquipe = $row["IdEquipe"];
                array_push($array, getTeamInformationArray($IdEquipe));
            } 
        }
        echo json_encode($array);
        mysqli_close($conn);
        http_response_code(200);
    }

    function getAllTeamsOfEvent($IdEvent){
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);
        $conn = getConnection();
        $array = array();
        $query = "SELECT * From Equipe AS e INNER JOIN Projet AS p ON p.IdProjet = e.IdProjet INNER JOIN Evenement AS ev ON ev.IdEvenement = p.IdEvenement WHERE p.IdEvenement = " . $IdEvenement . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)){
                $IdEquipe = $row["IdEquipe"];
                array_push($array, getTeamInformationArray($IdEquipe));
            } 
            echo json_encode($array);
            mysqli_close($conn);
            http_response_code(200);
        } else {
            throw new Exception ("Cet événement n'existe pas !");
        }
    }

?>