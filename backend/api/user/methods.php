<?php

    function getTypeOfUser($id){
        $conn = getConnection();
        $query = "SELECT * From Etudiant WHERE Identifiant=". $id . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            mysqli_close($conn);
            return "Etudiant";
        } else {
            $query = "SELECT * From Gestionnaire WHERE Identifiant=". $id . ";";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                mysqli_close($conn);
                return "Gestionnaire";
            } else {
                $query = "SELECT * From Administrateur WHERE Identifiant=". $id . ";";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) > 0) {
                    mysqli_close($conn);
                    return "Administrateur";
                } else {
                    mysqli_close($conn);
                    throw new Exception ("Utilisateur non trouvé dans les bases de données associées ! ");
                }
            }
        }

    }

    /*
     * Parametres: $id identifiant utilisateur
     * Retour: Affiche un json contenant les données de l'utilisateur,
     *         ou lève une exception pour dire que l'utilisateur n'existe pas.
    */
    function getUserArrayFromId($id){

        $role = getTypeOfUser($id);
        $conn = getConnection();

        if($role == "Etudiant"){
            $query = "SELECT * From User AS u JOIN Etudiant AS e ON u.Identifiant = e.Identifiant WHERE u.Identifiant='". $id . "';";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                if($row = mysqli_fetch_assoc($result)){
                    $array = array(
                        "id"=>$id,
                        "email"=>$row["Email"],
                        "lastname" => $row["Nom"],
                        "firstname" => $row["Prenom"],
                        "phone" => $row["NumTel"],
                        "role" => "Etudiant",
                        "studentid" => $row["NumeroEtudiant"],
                        "level" => $row["NiveauEtude"],
                        "school" => $row["Ecole"],
                        "city" => $row["Ville"]);
                    mysqli_close($conn);
                    return $array;
                }
            } else {
                http_response_code(404);
                throw new Exception ('Utilisateur non trouvé !');
            }
        } else if($role == "Gestionnaire"){
            $query = "SELECT * From User AS u JOIN Gestionnaire AS g ON u.Identifiant = g.Identifiant WHERE u.Identifiant='". $id . "';";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                if($row = mysqli_fetch_assoc($result)){
                    $array = array(
                        "id"=>$id,
                        "email"=>$row["Email"],
                        "lastname" => $row["Nom"],
                        "firstname" => $row["Prenom"],
                        "phone" => $row["NumTel"],
                        "role" => "Gestionnaire",
                        "company" => $row["Entreprise"],
                        "start" => $row["Debut"],
                        "end" => $row["Fin"],
                        "city" => $row["Ville"]);
                    mysqli_close($conn);
                    return $array;
                }
            } else {
                http_response_code(404);
                throw new Exception ('Utilisateur non trouvé !');
            }
        } else {
            $query = "SELECT * From User AS u JOIN Administrateur AS a ON u.Identifiant = a.Identifiant WHERE u.Identifiant='". $id . "';";
            $result = mysqli_query($conn, $query);
            if(mysqli_num_rows($result) > 0) {
                if($row = mysqli_fetch_assoc($result)){
                    $array = array(
                        "id"=>$id,
                        "email"=>$row["Email"],
                        "lastname" => $row["Nom"],
                        "firstname" => $row["Prenom"],
                        "phone" => $row["NumTel"],
                        "role" => "Administrateur");
                    mysqli_close($conn);
                    return $array;
                }
            } else {
                http_response_code(404);
                throw new Exception ('Utilisateur non trouvé !');
            }
        }
    }
    /*
     * Parametres: $id identifiant utilisateur
     * Retour: Affiche un json contenant les données de l'utilisateur,
     *         ou lève une exception pour dire que l'utilisateur n'existe pas.
    */
    function getUserFromId($id){
        $array = getUserArrayFromId($id);
        $json = json_encode($array);
        http_response_code(200);
        echo $json;
    }

    /*
     * Parametres: Aucun
     * Retour: Affiche un json contenant tous les données des utilisateurs du site
    */
    function getAllUsers(){
        $conn = getConnection();
        $query = "SELECT * From User;";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            $array = array();
            while($row = mysqli_fetch_assoc($result)){
                $userData = getUserArrayFromId($row["Identifiant"]);
                array_push($array, $userData);
            }
            $json = json_encode($array);
            http_response_code(200);
            echo $json;
            mysqli_close($conn);
        } else {
            $array = array();
            $json = json_encode($array);
            http_response_code(200);
            echo $json;
        }
    }

    /*
     * Parametres: $conn un objet de type connexion
     *             $id identifiant de l'utilisateur
     *             $champ Nom du champ a modifier
     *             $table Pour définir la table
     *             $valeur Nouvelle valeur du champ
     * Retour: Rien
     * Permet de changer une valeur dans la base de donnée
    */
    function patchValueUser($conn, $id, $table, $champ, $valeur){
        $query = "UPDATE " . $table . " SET " . $champ . "=" . $valeur . " WHERE Identifiant =" . $id . ";";
        $result = mysqli_query($conn, $query);
    }

    function checkStringValidity($texte){
        $str = str_replace("'", "\'", $texte);
        $str_final = str_replace('"', '\"', $str);
        return $str_final;
    }

    /*
     * Parametres: Identifiant, Tableau de valeurs a modifier
     * Retour: affiche un json avec le statut de le succès de la requete: true || false
    */
    function EditUserFromId($id, $array){
        $conn = getConnection();
        if(!(empty($array["firstname"]))){
            patchValueUser($conn, $id, "User", "Nom", "'" . checkStringValidity($array["lastname"]) . "'");
        }
        if(!(empty($array["firstname"]))){
            patchValueUser($conn, $id, "User", "Prenom", "'" . checkStringValidity($array["firstname"]) . "'");
        }
        if(!(empty($array["phone"]))){
            patchValueUser($conn, $id, "User", "NumTel", $array["phone"]);
        }
        require_once('../../utils/patchs/php8.php');
        if(!(empty($array["email"])) && str_contains($array["email"], "@")){
            patchValueUser($conn, $id, "User", "Email", "'" . checkStringValidity($array["email"]) . "'");
        }
        if(!(empty($array["img"]))){
            patchValueUser($conn, $id, "User", "Img", "'" . checkStringValidity($array["img"]) . "'");
        }
        
        /*
         * Ici on modifie les données des utilisateurs de certains roles specifiques
        */
        
        $type_of_user = getTypeOfUser($id);

        if(!(empty($array["studentid"])) && $type_of_user == "Etudiant"){
            patchValueUser($conn, $id, "Etudiant", "NumeroEtudiant", $array["studentid"]);
        }
        if(!(empty($array["level"])) && $type_of_user == "Etudiant"){
            patchValueUser($conn, $id, "Etudiant", "NiveauEtude", "'" . checkStringValidity($array["level"]) . "'");
        }
        if(!(empty($array["school"])) && $type_of_user == "Etudiant"){
            patchValueUser($conn, $id, "Etudiant", "Ecole", "'" . checkStringValidity($array["school"]) . "'");
        }
        if(!(empty($array["city"])) && $type_of_user == "Etudiant"){
            patchValueUser($conn, $id, "Etudiant", "Ville", "'" . checkStringValidity($array["city"]) . "'");
        }

        if(!(empty($array["company"])) && $type_of_user == "Gestionnaire"){
            patchValueUser($conn, $id, "Gestionnaire", "Entreprise", "'" . checkStringValidity($array["company"]) . "'");
        }
        if(!(empty($array["city"])) && $type_of_user == "Gestionnaire"){
            patchValueUser($conn, $id, "Gestionnaire", "Ville", "'" . checkStringValidity($array["city"]) . "'");
        }
        if(!(empty($array["start"])) && $type_of_user == "Gestionnaire"){
            patchValueUser($conn, $id, "Gestionnaire", "Debut", "'" . checkStringValidity($array["start"]) . "'");
        }
        if(!(empty($array["end"])) && $type_of_user == "Gestionnaire"){
            patchValueUser($conn, $id, "Gestionnaire", "Fin", "'" . checkStringValidity($array["end"]) . "'");
        }
        $arrayRetour = array(
            "success"=>true
        );
        $json = json_encode($arrayRetour);
        http_response_code(200);
        echo $json;
        mysqli_close($conn);
    }


    /*
     * Parametres: Identifiant, 
     * Retour: affiche un json avec le statut de le succès de la requete: true || false
    */
    function deleteUser($id){
        $id = checkStringValidity($id);
        $conn = getConnection();
        $query = "DELETE FROM Preinscription WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);

        $query = "DELETE FROM Appartenir WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);

        $query = "SELECT * FROM Equipe WHERE IdLeader=" . $id . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                $IdEquipe = $row["IdEquipe"];
                $query2 = "SELECT * FROM Appartenir WHERE Identifiant !=" . $id . " AND IdEquipe = " . $IdEquipe . ";";
                $result2 = mysqli_query($conn, $query2);
                $newCapitaine = -1;
                if(mysqli_num_rows($result2) > 0){
                    if($row2 = mysqli_fetch_array($result2)){
                        $newCapitaine = $row2["Identifiant"];
                    }
                }
                if($newCapitaine = -1){
                    $query2 = "DELETE FROM Equipe WHERE IdEquipe = " . $IdEquipe . ";";
                    mysqli_query($conn, $query2);
                } else {
                    $query2 = "UPDATE Equipe SET IdLeader = " . $newCapitaine . " WHERE IdEquipe = " . $IdEquipe . ";";
                    mysqli_query($conn, $query2);
                }
            }
        }

        $query = "DELETE FROM Etudiant WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);
        $query = "DELETE FROM Gestionnaire WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);
        $query = "DELETE FROM Administrateur WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);
        $query = "DELETE FROM User WHERE Identifiant=" . $id . ";";
        $result = mysqli_query($conn, $query);
        $array = array(
            "success"=>true
        );
        $json = json_encode($array);
        http_response_code(200);
        echo $json;
        mysqli_close($conn);
    }

?>