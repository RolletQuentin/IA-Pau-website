<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function joinEquipe($token, $IdEquipe){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $IdUser = getUserIdFromJWT($token);

        $conn = getConnection();
        $query = "SELECT * FROM Preinscription WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            $query = "SELECT * From Appartenir WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                throw new Exception ("L'utilisateur appartient déjà à l'équipe");
            }
            $teamsOfUser = array();
            $query = "SELECT * FROM Appartenir WHERE Identifiant = " . $IdUser . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_array($result)){
                    array_push($teamsOfUser, $row["IdEquipe"]);
                }
            }
            $IdEvement = -1;
            $query = "SELECT * FROM Evenement as e INNER JOIN Projet AS p ON p.IdEvenement = e.IdEvenement INNER JOIN Equipe as eq ON eq.IdProjet = p.IdProjet WHERE IdEquipe = " . $IdEquipe . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0){
                if($row = mysqli_fetch_array($result)){
                    $IdEvement = $row["IdEvenement"];
                }
            }

            if($IdEvement == -1){
                throw new Exception ("Votre équipe n'est pas valide !");
            }

            $arrayOfTeamsInEvent = array();
            $query = "SELECT * FROM Evenement as e INNER JOIN Projet AS p ON p.IdEvenement = e.IdEvenement INNER JOIN Equipe as eq ON eq.IdProjet = p.IdProjet WHERE e.IdEvenement = " . $IdEvenement . ";";
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
            

            $query = "DELETE FROM Preinscription WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
            mysqli_query($conn, $query);
            $query = "INSERT INTO Appartenir (Identifiant, IdEquipe) VALUES (". $IdUser . "," . $IdEquipe . ");";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            http_response_code(200);
            echo json_encode(array("success" => true));
        } else {
            throw new Exception ("L'utilisateur n'a pas été invité dans cette équipe !");
        }

    }

?>