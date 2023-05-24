<?php

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    require_once('../../vendor/autoload.php');
    include_once('../user/methods.php');

    function hasPermUser($jwt, $id){
        $secretKey = "2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12";
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "api.iapau.cytech";
        // Le serveur qui a généré la clef n'est pas le notre
        if($token->iss !== $serverName){
            $array = array(
                "error"=>"Session expired"
            );
            $json = json_encode($array);
            echo $json;
            http_response_code(401);
            return false;
        }
        // la date de création de la clef est "dans le futur" (invalide)
        if($token->nbf > $now->getTimestamp()){
            $array = array(
                "error"=>"Session expired"
            );
            $json = json_encode($array);
            echo $json;
            http_response_code(401);
            return false;
        }
        // La date d'expiration de la clef est passée.
        if($token->exp < $now->getTimestamp()){
            $array = array(
                "error"=>"Session expired"
            );
            $json = json_encode($array);
            echo $json;
            http_response_code(401);
            return false;
        }
        $userId = $token->userId;

        if($userId == $id){
            return true;
        } else {
            $role = getTypeOfUser($userId);
            if($role == "Administrateur"){
                return true;
            } else {
                return false;
            }
        }
    }

?>