<?php
// Exemple utilisation : http://localhost/api/projets/editProjet/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods: PUT");

// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Projets.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les projets
    $projet = new Projets($db);

    // On récupère les informations envoyées 
    $donnees = json_decode(file_get_contents("php://input"));
    
    if(!empty($donnees->IdProjet) && !empty($donnees->IdEvenement) && !empty($donnees->Libele) && !empty($donnees->Description) && !empty($donnees->Image) && !empty($donnees->Entreprise)) {
        // Ici on a reçu les données
        // On hydrate notre objet

        $projet->IdProjet = $donnees->IdProjet;
        $projet->IdEvenement = $donnees->IdEvenement;
        $projet->Libele = $donnees->Libele;
        $projet->Description = $donnees->Description;
        $projet->Image = $donnees->Image;
        $projet->Entreprise = $donnees->Entreprise;

        if($projet->editProjet()) {

            // Ici la modicifation à fonctionné
            // On envoi un code 200 (modification)
            http_response_code(200);
            echo json_encode(["message" => "La modification a été effectué"]);
        } else{
            // La modification n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["error" => "La modification n'a pas été effectué"]);
        }
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}