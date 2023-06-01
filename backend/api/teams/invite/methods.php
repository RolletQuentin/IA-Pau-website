<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function inviteUserInEvent($token, $body, $IdEquipe){
        if(empty($body["email"])){
            throw new Exception("Merci de choisir un email a ajouter");
        }
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $email = verifyStringToDatabaseInsertion($body["email"]);
        $conn = getConnection();
        $query = "SELECT * From User AS u INNER JOIN Etudiant AS e ON e.Identifiant = u.Identifiant WHERE Email='" . $email . "';";
        $result = mysqli_query($conn, $query);
        $id = -1;
        if(mysqli_num_rows($result) > 0) {
            if($row = mysqli_fetch_assoc($result)){
                $id = $row["Identifiant"];
            }
        }
        
        if($id == -1){
            throw new Exception ("Aucun étudiant utilisant ce mail n'a été trouvé !");
        }

        $IdUser = getUserIdFromJWT($token);
        $query = "SELECT * FROM Equipe WHERE IdEquipe = " . $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        $IdProjet = -1;
        if(mysqli_num_rows($result) > 0) {
            if($row = mysqli_fetch_assoc($result)){
                $IdProjet = $row["IdProjet"];
            }
        }

        if($IdProjet == -1){
            throw new Exception ("Aucune Projet n'a pu être trouvé !");
        }

        $role = getRoleFromJWT($token);
        $IdLeader = getIdOfLeader($IdEquipe);

        $IdEvenement = getIdEvenementFromProjet($IdProjet);

        $hasPerm = false;
        $typeOfPerm = "";
        if($role == "Administrateur"){
            $hasPerm = true;
        } else if ($role == "Gestionnaire"){
            $arrayGestionnaire = getArrayOfGestionnaireOfEvent($IdEvenement);
            if(in_array($IdUser, $arrayGestionnaire) && AccountIsActive($IdUser)){
                $hasPerm = true;
            } else {
                $typeOfPerm = "Not manager of this event";
            }
        } else if ($role == "Etudiant"){

            if($IdLeader == $IdUser){
                $hasPerm = true;
            } else {
                $typeOfPerm = "not captain of this team.";
            }
        }

        if($hasPerm == false){
            throw new Exception ("Vous n'avez pas récupéré les messages de cette équipe. (" . $typeOfPerm .")");
        }

        if($IdLeader != $IdUser){
            throw new Exception ("Il faut être le leader de l'équipe pour pré inscrire un utilisateur.");
        }

        $query = "SELECT * From Appartenir WHERE IdEquipe = ". $IdEquipe .";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)){
                if($row["Identifiant"] == $id){
                    throw new Exception ("Cet étudiant est déjà dans l'équipe");
                }
            }
        }
        $query = "SELECT * From Preinscription WHERE IdEquipe = ". $IdEquipe ." AND Identifiant = " . $id . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            throw new Exception ("Une invitation a déjà été envoyé a cette personne !");
        }
        $query = "INSERT INTO Preinscription (Identifiant, IdEquipe) VALUES (" . $id . ", " . $IdEquipe . ");";
        mysqli_query($conn, $query);

        echo json_encode(array("success" => true));
        http_response_code(200);
        mysqli_close($conn);

    }

?>