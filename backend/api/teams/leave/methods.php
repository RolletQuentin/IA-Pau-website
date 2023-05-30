<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function leaveEquipe($token, $IdEquipe){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $IdUser = getUserIdFromJWT($token);
        $IdLeader = getIdOfLeader($IdEquipe);

        $conn = getConnection();
        $query = "SELECT * From Appartenir WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
        
            if($IdUser == $IdLeader){
                throw new Exception ("Le leader de l'équipe doit soit promouvoir un membre soit disband l'équipe pour la quitter.");
            }

            $query = "DELETE FROM Appartenir WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
            mysqli_query($conn, $query);

            echo json_encode(array("success" => true));
            http_response_code(200);
            mysqli_close($conn);

        } else {
            throw new Exception ("L'utilisateur ne fait pas parti de cette équipe");
        }

    }

?>