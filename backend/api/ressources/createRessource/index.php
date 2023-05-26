<?php
// Exemple utilisation : http://localhost/api/ressources/createRessource/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header('HTTP/1.1 200 OK');

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../config/Database.php';
    include_once '../models/Ressources.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les ressources
    $ressource = new Ressources($db);

    // On récupère les informations envoyées 
    $donnees = json_decode(file_get_contents("php://input"));
    
    if(!empty($donnees->IdRessource) && !empty($donnees->UrlRessource)) {
        // Ici on a reçu les données
        // On hydrate notre objet
        $ressource->IdRessource = $donnees->IdRessource;
        $ressource->UrlRessource = $donnees->UrlRessource;

        if($ressource->createRessource()) {
            // Ici la création à fonctionné
            // On envoi un code 201 (ajout)
            http_response_code(201);
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else{
            // La création n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["message" => "L'ajout n'a pas été effectué"]);
        }
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}