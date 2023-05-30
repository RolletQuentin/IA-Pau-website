<?php
    require_once('../../../vendor/autoload.php');
    include_once('../../utils/permissionManager.php');
    include_once('../methods.php');
    include_once('../../utils/StringCorrection.php');

    include_once('../../utils/database.php');
    
    function getGestionnaireFromIDEvent($token , $IdEvent){
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);
        $role = getRoleFromJwt($token);
        if($role != "Administrateur"){
            throw new Exception ("Vous n'avez pas les permissions nécessaires.");
        }

        $array = getArrayOfGestionnaireOfEvent($IdEvenement);
        $arrayRetour = array();
        foreach($array as $UserId){
            array_push($arrayRetour, getUserArrayFromId($UserId));
        }
        
        echo json_encode($arrayRetour);
        http_response_code(200);

    }

?>