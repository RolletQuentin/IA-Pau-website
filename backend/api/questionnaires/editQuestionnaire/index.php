<?php
// Exemple utilisation : http://localhost/api/questionnaires/editQuestionnaire/
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
    include_once '../../models/Questionnaires.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les questionnaires
    $questionnaire = new Questionnaires($db);

    // On récupère les informations envoyées 
    $donnees = json_decode(file_get_contents("php://input"));
    
    if(!empty($donnees->IdQuestionnaire) && !empty($donnees->IdProjet) && !empty($donnees->Titre) && !empty($donnees->Sujet) && !empty($donnees->Debut) && !empty($donnees->Fin)) {
        // Ici on a reçu les données
        // On hydrate notre objet
        $questionnaire->IdQuestionnaire = $donnees->IdQuestionnaire;
        $questionnaire->IdProjet = $donnees->IdProjet;
        $questionnaire->Titre = $donnees->Titre;
        $questionnaire->Sujet = $donnees->Sujet;
        $questionnaire->Debut = $donnees->Debut;
        $questionnaire->Fin = $donnees->Fin;

        if($questionnaire->editQuestionnaire()) {

            // Ici la création à fonctionné
            // On envoi un code 200 (modification)
            http_response_code(200);
            echo json_encode(["message" => "La modification a été effectué"]);
        } else{
            // La création n'a pas fonctionné
            http_response_code(503);
            echo json_encode(["error" => "La modification n'a pas été effectué"]);
        }
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}