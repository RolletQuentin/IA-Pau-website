<?php
// Exemple utilisation : http://localhost/api/evenements/getEvenement/?id=2
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header('HTTP/1.1 200 OK');
// On vérifie que la méthode utilisée est correcte
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    // On inclut les fichiers de configuration et d'accès aux données
    include_once '../../config/Database.php';
    include_once '../../models/Evenements.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les evenements
    $evenement = new Evenements($db);

    // On récupère l'Id passé en paramètre 
    $IdEvenement = $_GET['id'];

    if(!empty($IdEvenement)){
        $evenement->IdEvenement = $IdEvenement;

        // On récupère l'evenement
        $evenement->getEvenement();

        // On vérifie si l'evenement existe
        if(($evenement->TypeEvenement != null) && ($evenement->Libele != null) && ($evenement->Description != null) && ($evenement->Recompenses != null) && ($evenement->Debut != null) && ($evenement->Fin != null)){

            $prod = [
                "IdEvenement" => $evenement->IdEvenement,
                "TypeEvenement" => $evenement->TypeEvenement,
                "Libele" => $evenement->Libele,
                "Description" => $evenement->Description,
                "Recompenses" => $evenement->Recompenses,
                "Debut" => $evenement->Debut,
                "Fin" => $evenement->Fin
            ];
            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($prod);
        }else{
            // 404 Not found
            http_response_code(404);
         
            echo json_encode(array("message" => "L'evenement n'existe pas."));
        }
        
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}