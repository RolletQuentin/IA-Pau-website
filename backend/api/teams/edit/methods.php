<?php
    if(file_exists('../utils/database.php')){
        include_once('../utils/database.php');
    } else if(file_exists('../../utils/database.php')){
        include_once('../../utils/database.php');
    }  
    include_once('../../utils/permissionManager.php');
    include_once('../../utils/StringCorrection.php');
    include_once('../methods.php');

    function editTeamInformations($token, $IdEquipe, $body){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);

        $role = getRoleFromJwt($token);
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
                $typeOfPerm = "Not leader of this team";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas la permission de modifier cette équipe. (" . $typeOfPerm .")");
        }
        $conn = getConnection();
        if(!(empty($body["IdLeader"]))){
            $newIdLeader = verifyStringToDatabaseInsertion($body["IdLeader"]);
            $arrayOfUsers = array();
            $query = "SELECT * FROM Appartenir AS a INNER Join Equipe AS e ON e.IdEquipe = a.IdEquipe WHERE e.IdEquipe=" . $IdEquipe . " AND a.Identifiant = " . $newIdLeader . "; ";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) < 1) {
                mysqli_close($conn);
                throw new Exception ("Le nouveau leader est un utilisateur qui n'est pas dans l'équipe !");
            }
            $query = "UPDATE Equipe SET IdLeader = " . $newIdLeader . " WHERE IdEquipe=" . $IdEquipe . ";";
            mysqli_query($conn, $query);
        }
        if(!(empty($body["Nom"]))){
            $newNom = verifyStringToDatabaseInsertion($body["Nom"]);
            $query = "UPDATE Equipe SET Nom = '" . $newNom . "' WHERE IdEquipe=" . $IdEquipe . ";";
            mysqli_query($conn, $query);
        }
        if(!(empty($body["IdProjet"]))){

            $IdProjet = verifyStringToDatabaseInsertion($body["IdProjet"]);

            $ProjetValide = false;
            $query = "SELECT * FROM Projet WHERE IdProjet = ". $IdProjet . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_array($result)){
                    if($row["IdEvenement"] == $IdEvenement){
                        $ProjetValide = true;
                    }
                }
            }

            if($ProjetValide == false){
                throw new Exception ("Le projet ne fais pas parti du bon événement ");
            }

            $newNom = verifyStringToDatabaseInsertion($body["Nom"]);
            $query = "UPDATE Equipe SET IdProjet = " . $IdProjet . " WHERE IdEquipe=" . $IdEquipe . ";";
            mysqli_query($conn, $query);
        }
        if(!(empty($body["LienProjet"]))){
            $newLienProjet = verifyStringToDatabaseInsertion($body["LienProjet"]);
            $query = "UPDATE Equipe SET LienProjet = '" . $newLienProjet . "' WHERE IdEquipe=" . $IdEquipe . ";";
            mysqli_query($conn, $query);
        }
        mysqli_close($conn);
        getTeamInformation($IdEquipe);
        http_response_code(200);
    }

?>