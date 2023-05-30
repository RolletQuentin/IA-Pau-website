<?php
class Evenements {
    //connexion
    private $connexion;
    private $table = "Evenement";


    //object properties
    public $IdEvenement;
    public $TypeEvenement;
    public $Libele;
    public $Description;
    public $Recompenses;
    public $Debut;
    public $Fin;


    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        $this->connexion = $db;
    }


    /**
     * Lecture des evenements
     *
     * @return void
     */
    public function getAllEvenements(){
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
     * Lecture des evenements de type DataChallenge
     *
     * @return void
     */
    public function getAllEvenementsDataChallenge(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE TypeEvenement = 'DataChallenge'";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Lecture des evenements de type DataBattle
     *
     * @return void
     */
    public function getAllEvenementsDataBattle(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE TypeEvenement = 'DataBattle'";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Lire un evenement
     *
     * @return void
     */
    public function getEvenement(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE IdEvenement = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->IdEvenement);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->IdEvenement = $row['IdEvenement'];
        $this->TypeEvenement = $row['TypeEvenement'];
        $this->Libele = $row['Libele'];
        $this->Description = $row['Description'];
        $this->Recompenses = $row['Recompenses'];
        $this->Debut = $row['Debut'];
        $this->Fin = $row['Fin'];
    }

    /**
     * Lecture de tous les projets d'un evenement
     *
     * @return void
     */
    public function getAllProjetByEvent(){
        // On écrit la requête
        $sql = "SELECT * FROM Projet WHERE IdEvenement = ?";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On attache l'id
        $query->bindParam(1, $this->IdEvenement);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }
    
    /**
     * Lecture de tous les projets d'un evenement
     *
     * @return void
     */
    public function getAllRessourcesByEvent(){
        // On écrit la requête
        $sql = "SELECT * FROM PossederRessource NATURAL JOIN Ressources NATURAL JOIN Projet WHERE IdEvenement = ?";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On attache l'id
        $query->bindParam(1, $this->IdEvenement);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Créer un evenement
     *
     * @return void
     */
    public function createEvenement(){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET TypeEvenement=:TypeEvenement,
        Libele=:Libele,
        Description=:Description,
        Recompenses=:Recompenses,
        Debut=:Debut,
        Fin=:Fin";


        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->TypeEvenement = htmlspecialchars(strip_tags($this->TypeEvenement));
        $this->Libele = htmlspecialchars(strip_tags($this->Libele));
        $this->Description = htmlspecialchars(strip_tags($this->Description));
        $this->Recompenses = htmlspecialchars(strip_tags($this->Recompenses));
        $this->Debut = htmlspecialchars(strip_tags($this->Debut));
        $this->Fin = htmlspecialchars(strip_tags($this->Fin));

        // Ajout des données protégées
        $query->bindParam(":TypeEvenement", $this->TypeEvenement);
        $query->bindParam(":Libele", $this->Libele);
        $query->bindParam(":Description", $this->Description);
        $query->bindParam(":Recompenses", $this->Recompenses);
        $query->bindParam(":Debut", $this->Debut);
        $query->bindParam(":Fin", $this->Fin);

        // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer un evenement
     *
     * @return void
     */
    public function deleteEvenement(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE IdEvenement = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->IdEvenement=htmlspecialchars(strip_tags($this->IdEvenement));

        // On attache l'id
        $query->bindParam(1, $this->IdEvenement);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }

    /**
     * Mettre à jour un evenement
     *
     * @return void
     */
    public function editEvenement(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET TypeEvenement=:TypeEvenement,
        Libele=:Libele,
        Description=:Description,
        Recompenses=:Recompenses,
        Debut=:Debut,
        Fin=:Fin WHERE IdEvenement = :IdEvenement";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
        
        // On sécurise les données
        $this->IdEvenement = htmlspecialchars(strip_tags($this->IdEvenement));
        $this->TypeEvenement = htmlspecialchars(strip_tags($this->TypeEvenement));
        $this->Libele = htmlspecialchars(strip_tags($this->Libele));
        $this->Description = htmlspecialchars(strip_tags($this->Description));
        $this->Recompenses = htmlspecialchars(strip_tags($this->Recompenses));
        $this->Debut = htmlspecialchars(strip_tags($this->Debut));
        $this->Fin = htmlspecialchars(strip_tags($this->Fin));
        
        // On attache les variables
        $query->bindParam(":IdEvenement", $this->IdEvenement);
        $query->bindParam(":TypeEvenement", $this->TypeEvenement);
        $query->bindParam(":Libele", $this->Libele);
        $query->bindParam(":Description", $this->Description);
        $query->bindParam(":Recompenses", $this->Recompenses);
        $query->bindParam(":Debut", $this->Debut);
        $query->bindParam(":Fin", $this->Fin);

        // On exécute
        if($query->execute()){
            return true;
        }
        
        return false;
    }
}
?>