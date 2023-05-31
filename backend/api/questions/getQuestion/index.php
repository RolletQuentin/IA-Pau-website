<?php
// Exemple utilisation : http://localhost/api/questions/getQuestion/?id=2
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
    include_once '../../models/Questions.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les question
    $question = new Questions($db);

    // On récupère l'Id passé en paramètre 
    $IdQuestion = $_GET['id'];

    if(!empty($IdQuestion)){
        $question->IdQuestion = $IdQuestion;

        // On récupère la question
        $question->getQuestion();

        // On vérifie si la question existe
        if(($question->IdQuestion != null) && ($question->IdQuestionnaire != null) && ($question->Question != null)){

            $prod = [
                "IdQuestion" => $question->IdQuestion,
                "IdQuestionnaire" => $question->IdQuestionnaire,
                "Question" => $question->Question
            ];
            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($prod);
        }else{
            // 404 Not found
            http_response_code(404);
         
            echo json_encode(array("error" => "La question n'existe pas."));
        }
        
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "La méthode n'est pas autorisée"]);
}