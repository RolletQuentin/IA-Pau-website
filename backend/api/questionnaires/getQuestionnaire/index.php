<?php
// Exemple utilisation : http://localhost/api/questionnaires/getQuestionnaire/?id=2
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
    include_once '../../models/Questionnaires.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les questionnaires
    $questionnaire = new Questionnaires($db);

    // On récupère l'Id passé en paramètre 
    $IdQuestionnaire = $_GET['id'];

    if(!empty($IdQuestionnaire)){
        $questionnaire->IdQuestionnaire = $IdQuestionnaire;

        // On récupère l'questionnaire
        $questionnaire->getQuestionnaire();

        // On vérifie si le questionnaire existe
        if(($questionnaire->IdProjet != null) && ($questionnaire->Titre != null) && ($questionnaire->Sujet != null) && ($questionnaire->Debut != null) && ($questionnaire->Fin != null)){

            $prod = [
                "IdQuestionnaire" => $questionnaire->IdQuestionnaire,
                "IdProjet" => $questionnaire->IdProjet,
                "Titre" => $questionnaire->Titre,
                "Sujet" => $questionnaire->Sujet,
                "Debut" => $questionnaire->Debut,
                "Fin" => $questionnaire->Fin
            ];
            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($prod);
        }else{
            // 404 Not found
            http_response_code(404);
         
            echo json_encode(array("error" => "Le questionnaire n'existe pas."));
        }
        
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}