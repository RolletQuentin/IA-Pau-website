<?php
    if(file_exists('../utils/database.php')){
        include_once('../utils/database.php');
    } else if(file_exists('../../utils/database.php')){
        include_once('../../utils/database.php');
    }  

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
                $idEvenement = $row["IdEvenement"];
                $arrayUsers = array();
                $query2 = "SELECT * From Appartenir WHERE IdEquipe=". $idEquipe . ";";
                $r2 = mysqli_query($conn, $query2);
                if(mysqli_num_rows($r2) > 0) {
                    while($row2 = mysqli_fetch_assoc($r2)){
                        array_push($arrayUsers, array("id"=>$row2["Identifiant"]));
                    }
                }
                $jsonArray = array(
                    "IdEquipe"=>$idEquipe,
                    "Nom"=>$nom,
                    "IdLeader"=>$idLeader,
                    "Score"=>$score,
                    "LienProjet"=>$lienProjet,
                    "IdEvenement"=>$idEvenement,
                    "Users"=>$arrayUsers
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

?>