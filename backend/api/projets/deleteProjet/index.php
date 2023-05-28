<?php
// Exemple utilisation : http://localhost/api/projets/deleteProjet/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, PATCH");
header('HTTP/1.1 200 OK');

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Projets.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie le projet
    $projet = new Projets($db);

    // On récupère l'id du projet à supprimer
    $donnees = json_decode(file_get_contents("php://input"));

    if(!empty($donnees->IdProjet)) {
        // Ici on a reçu les données
        // On hydrate notre objet
        $projet->IdProjet = $donnees->IdProjet;

        if($projet->deleteProjet()) {
            // Ici la suppression à fonctionné
            // On envoi un code 200
            http_response_code(200);
            echo json_encode(["message" => "La suppression a été effectué"]);
        } else{
            // La suppression n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["message" => "La suppression n'a pas été effectué"]);
        }
    }

}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}