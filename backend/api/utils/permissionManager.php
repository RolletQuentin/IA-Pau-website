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

    function getRoleFromJwt($jwt){
        $secretKey = "2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12";
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "api.iapau.cytech";
        // Le serveur qui a généré la clef n'est pas le notre
        if($token->iss !== $serverName){
            throw new Exception ("Session expirée");
            return "ERROR";
        }
        // la date de création de la clef est "dans le futur" (invalide)
        if($token->nbf > $now->getTimestamp()){
            throw new Exception ("Session expirée");
            return "ERROR";
        }
        // La date d'expiration de la clef est passée.
        if($token->exp < $now->getTimestamp()){
            throw new Exception ("Session expirée");
            return "ERROR";
        }

        $userId = $token->userId;

        $role = getTypeOfUser($userId);
        return $role;
    }
    function getUserIdFromJWT($jwt){
        $secretKey = "2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12";
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "api.iapau.cytech";
        // Le serveur qui a généré la clef n'est pas le notre
        if($token->iss !== $serverName){
            throw new Exception ("Session expirée");
            return "ERROR";
        }
        // la date de création de la clef est "dans le futur" (invalide)
        if($token->nbf > $now->getTimestamp()){
            throw new Exception ("Session expirée");
            return "ERROR";
        }
        // La date d'expiration de la clef est passée.
        if($token->exp < $now->getTimestamp()){
            throw new Exception ("Session expirée");
            return "ERROR";
        }

        $userId = $token->userId;
        return $userId;
    }

    function hasExpired($jwt){
        $secretKey = "2z5ef(tv4tSJJLFS5v(15t15ADS1v(t4e5vazdza?../.PKr4d12";
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "api.iapau.cytech";
        if($token->iss !== $serverName){
            return true;
        }
        if($token->nbf > $now->getTimestamp()){
           return true;
        }
        if($token->exp < $now->getTimestamp()){
            return true;
        }
        return false;
    }

?>