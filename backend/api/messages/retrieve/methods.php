<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function retrieveMessage($token, $IdEquipe){
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

            $query = "SELECT * FROM Appartenir WHERE IdEquipe = " . $IdEquipe . " AND Identifiant = ". $id . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0){
                $hasPerm = true;
            } else {
                $typeOfPerm = "not member of this team.";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas récupérer les messages de cette équipe. (" . $typeOfPerm .")");
        }

        $arrayOfMessages = array();
        $query = "SELECT * FROM `Message` as m INNER JOIN User AS u ON m.IdSender = u.Identifiant WHERE IdEquipe = ". $IdEquipe . " ORDER BY IdMessage ASC;";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                $nom = $row["Prenom"] . " " . $row["Nom"];
                array_push($arrayOfMessages, array(
                    "DateMessage"=>$row["DateMessage"],
                    "sender"=>$nom,
                    "IdSender"=>$row["Identifiant"],
                    "content"=>$row["Contenu"]
                ));
            }
        }

        http_response_code(200);
        echo json_encode($arrayOfMessages);

    }

?>