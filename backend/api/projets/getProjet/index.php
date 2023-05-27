<?php
// Exemple utilisation : http://localhost/api/projets/getProjet/?id=2
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
    include_once '../../models/Projets.php';

    // On instancie la base de données
    $database = new Database();
    $db = $database->getConnection();

    // On instancie les evenements
    $projet = new Projets($db);

    // On récupère l'Id passé en paramètre 
    $IdProjet = $_GET['id'];

    if(!empty($IdProjet)){
        $projet->IdProjet = $IdProjet;

        // On récupère le projet
        $projet->getProjet();

        // On vérifie si l'evenement existe
        if(($projet->IdEvenement != null) && ($projet->Libele != null) && ($projet->Description != null) && ($projet->Image != null) && ($projet->Entreprise != null)){

            $prod = [
                "IdProjet" => $projet->IdProjet,
                "IdEvenement" => $projet->IdEvenement,
                "Libele" => $projet->Libele,
                "Description" => $projet->Description,
                "Image" => $projet->Image,
                "Entreprise" => $projet->Entreprise
            ];
            // On envoie le code réponse 200 OK
            http_response_code(200);

            // On encode en json et on envoie
            echo json_encode($prod);
        }else{
            // 404 Not found
            http_response_code(404);
         
            echo json_encode(array("message" => "Le projet n'existe pas."));
        }
        
    }
}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}