<?php
// Exemple utilisation : http://localhost/api/questionnaires/getAllQuestionsByIdQuestionnaire/?id=2
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

        // On récupère l'evenement
        $stmt = $questionnaire->getAllQuestionsByIdQuestionnaire();

        // On vérifie si on a au moins 1 produit
        if($stmt->rowCount() > 0){
            // On initialise un tableau associatif
            $tableauQuestions = [];
            $tableauQuestions['Questions'] = [];

            // On parcourt les produits
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $prod = [
                    "IdQuestion" => $IdQuestion,
                    "IdQuestionnaire" => $IdQuestionnaire,
                    "Question" => $Question
                ];

                $tableauQuestions['Questions'][] = $prod;
            }

            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($tableauQuestions);
        }
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}