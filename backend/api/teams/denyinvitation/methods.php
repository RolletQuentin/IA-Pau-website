<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function denyTeam($token, $IdEquipe){
        $IdEquipe = verifyStringToDatabaseInsertion($IdEquipe);
        $IdUser = getUserIdFromJWT($token);

        $conn = getConnection();
        $query = "SELECT * FROM Preinscription WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
        $result = mysqli_query($conn, $query);
        if(mysqli_num_rows($result) > 0) {
            $query = "DELETE FROM Preinscription WHERE Identifiant = " . $IdUser . " AND IdEquipe = " . $IdEquipe . ";";
            mysqli_query($conn, $query);
            mysqli_close($conn);
            http_response_code(200);
            echo json_encode(array("success" => true));
        } else {
            throw new Exception ("L'utilisateur n'a pas été invité dans cette équipe !");
        }

    }

?>