<?php
// Exemple utilisation : http://localhost/api/ressources/getRessource/?id=2
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET");
// --Pour fix les CORS 
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    http_response_code(200);
    exit(0);
}
// --

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Ressources.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les ressources
    $ressource = new Ressources($db);

    // On récupère l'Id passé en paramètre 
    $IdRessource = $_GET['id'];

    if(!empty($IdRessource)){
        $ressource->IdRessource = $IdRessource;

        // On récupère la ressource
        $ressource->getRessource();

        // On vérifie si la ressource existe
        if(($ressource->UrlRessource != null) && ($ressource->NomRessource != null)){

            $prod = [
                "IdRessource" => $ressource->IdRessource,
                "UrlRessource" => $ressource->UrlRessource,
                "NomRessource" => $ressource->NomRessource
            ];
            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($prod);
        }else{
            // 404 Not found
            http_response_code(404);
         
            echo json_encode(array("error" => "La ressource n'existe pas."));
        }
        
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}