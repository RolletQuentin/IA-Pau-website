<?php
class Ressources {
    //connexion
    private $connexion;
    private $table = "Ressources";


    //object properties
    public $IdRessource;
    public $UrlRessource;


    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        $this->connexion = $db;
    }


    /**
     * Lecture des ressources
     *
     * @return void
     */
    public function getAllRessources(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table;

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Lire une ressource
     *
     * @return void
     */
    public function getRessource(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE IdRessource = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->IdRessource);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->IdRessource = $row['IdRessource'];
        $this->UrlRessource = $row['UrlRessource'];
    }

    /**
     * Créer une ressource
     *
     * @return void
     */
    public function createRessource(){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET IdRessource=:IdRessource, UrlRessource=:UrlRessource";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdRessource=htmlspecialchars(strip_tags($this->IdRessource));
        $this->UrlRessource=htmlspecialchars(strip_tags($this->UrlRessource));

        // Ajout des données protégées
        $query->bindParam(":IdRessource", $this->IdRessource);
        $query->bindParam(":UrlRessource", $this->UrlRessource);

        // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer une ressource
     *
     * @return void
     */
    public function deleteRessource(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE IdRessource = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->IdRessource=htmlspecialchars(strip_tags($this->IdRessource));

        // On attache l'id
        $query->bindParam(1, $this->IdRessource);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }

    /**
     * Mettre à jour une ressource
     *
     * @return void
     */
    public function editRessource(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET UrlRessource = :UrlRessource WHERE IdRessource = :IdRessource";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
        
        // On sécurise les données
        $this->IdRessource=htmlspecialchars(strip_tags($this->IdRessource));
        $this->UrlRessource=htmlspecialchars(strip_tags($this->UrlRessource));
        
        // On attache les variables
        $query->bindParam(':IdRessource', $this->IdRessource);
        $query->bindParam(':UrlRessource', $this->UrlRessource);
        
        // On exécute
        if($query->execute()){
            return true;
        }
        
        return false;
    }
}
?>