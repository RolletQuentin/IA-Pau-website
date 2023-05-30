<?php
// Exemple utilisation : http://localhost/api/evenements/deleteEvenement/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: DELETE");
// --Pour fix les CORS 
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    http_response_code(200);
    exit(0);
}
// --

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Evenements.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les evenements
    $evenement = new Evenements($db);

    // On récupère l'id de l'evenement à supprimer
    $IdEvenement = $_GET['id'];

    if(!empty($IdEvenement)) {
        // Ici on a reçu les données
        // On hydrate notre objet
        $evenement->IdEvenement = $IdEvenement;

        if($evenement->deleteEvenement()) {
            // Ici la suppression à fonctionné
            // On envoi un code 200
            http_response_code(200);
            echo json_encode(["message" => "La suppression a été effectué"]);
        } else{
            // La suppression n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["error" => "La suppression n'a pas été effectué"]);
        }
    }

}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}