<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function getMyInvitations($token){
        $IdUser = getUserIdFromJWT($token);

        $conn = getConnection();
        $query = "SELECT * FROM Preinscription WHERE Identifiant = " . $IdUser . ";";
        $result = mysqli_query($conn, $query);
        $teamsArray = array();
        if(mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_array($result)){
                array_push($teamsArray, getTeamInformationArray($row["IdEquipe"]));
            }
        }
        echo json_encode($teamsArray);
        http_response_code(200);
        mysqli_close($conn);

    }

?>