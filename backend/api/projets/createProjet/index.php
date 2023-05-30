<?php
// Exemple utilisation : http://localhost/api/projets/createProjet/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: POST");

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Projets.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie l'evenement
    $projet = new Projets($db);

    // On récupère les informations envoyées 
    $donnees = json_decode(file_get_contents("php://input"));
    
    if(!empty($donnees->IdEvenement) && !empty($donnees->Libele) && !empty($donnees->Description) && !empty($donnees->Image) && !empty($donnees->Entreprise)) {
        // Ici on a reçu les données
        // On hydrate notre objet
        $projet->IdEvenement = $donnees->IdEvenement;
        $projet->Libele = $donnees->Libele;
        $projet->Description = $donnees->Description;
        $projet->Image = $donnees->Image;
        $projet->Entreprise = $donnees->Entreprise;

        if($projet->createProjet()) {
            // Ici la création à fonctionné
            // On envoi un code 201 (ajout)
            http_response_code(201);
            echo json_encode(["message" => "L'ajout a été effectué"]);
        } else{
            // La création n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["error" => "L'ajout n'a pas été effectué"]);
        }
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}