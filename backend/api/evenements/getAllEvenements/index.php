<?php
// Exemple utilisation : http://localhost/api/evenements/getAllEvenement/
// Headers requis
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, method");
header("Access-Control-Allow-Methods : GET, POST, OPTIONS, PUT, DELETE, PATCH");
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

    // On récupère les données
    $stmt = $evenement->getAllEvenements();

    // On vérifie si on a au moins 1 produit
    if($stmt->rowCount() > 0){
        // On initialise un tableau associatif
        $tableauEvenements = [];
        $tableauEvenements['Evenements'] = [];

        // On parcourt les produits
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $prod = [
                "IdEvenement" => $IdEvenement,
                "TypeEvenement" => $TypeEvenement,
                "Libele" => $Libele,
                "Description" => $Description,
                "Recompenses" => $Recompenses,
                "Debut" => $Debut,
                "Fin" => $Fin
            ];

            $tableauEvenements['Evenements'][] = $prod;
        }

        // On envoie le code réponse 200 OK
        http_response_code(200);

        // On encode en json et on envoie
        echo json_encode($tableauEvenements);
    }

}else{
    // On gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "La méthode n'est pas autorisée"]);
}