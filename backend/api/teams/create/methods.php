<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function createEquipe($jwt, $teamData){
        $role = getRoleFromJWT($jwt);
        $id = getUserIdFromJWT($jwt);
        if($role != "Etudiant"){
            throw new Exception ("L'utilisateur n'est pas un étudiant.");
        }
        if(empty($teamData["Nom"])){
            throw new Exception ("Aucun nom n'a été choisi pour l'équipe.");
        }
        if(empty($teamData["IdEvenement"])){
            throw new Exception ("Vous avez oublié de saisir un Id d'événement !");
        }

        $nom = verifyStringToDatabaseInsertion($teamData["Nom"]);
        $IdEvenement = verifyStringToDatabaseInsertion($teamData["IdEvenement"]);
        $conn = getConnection();
        $query = "SELECT * From Equipe AS eq INNER JOIN Evenement AS e ON eq.IdEvenement = e.IdEvenement INNER JOIN Appartenir AS a ON a.IdEquipe = eq.IdEquipe WHERE a.Identifiant=". $id . " AND e.IdEvenement = " . $IdEvenement . ";";

        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            throw new Exception ("L'utilisateur fait déjà parti d'une équipe inscrite à cet événement.");
        }
        $IdLeader = $id;
        $query = "INSERT INTO Equipe (Nom, IdLeader, Score, IdEvenement) VALUES ('". $nom ."', ". $IdLeader .", 0, " . $IdEvenement . ");";
        mysqli_query($conn, $query);
        $query2 = "SELECT * FROM Equipe WHERE IdLeader = " . $IdLeader . " AND IdEvenement = " . $IdEvenement . ";";
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
        } else {
            $query3 = "DELETE FROM Equipe WHERE IdLeader = " . $IdLeader . " AND IdEvenement = " . $IdEvenement . ";";
            mysqli_query($conn, $query3);
            throw new Exception("Erreur lors de la création de l'équipe ! Problême lors de l'insertion d'une donnée.");
        }
    }

?>