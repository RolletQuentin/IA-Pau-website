<?php
class Projets {
    //connexion
    private $connexion;
    private $table = "Projet";


    //object properties
    public $IdProjet;
    public $IdEvenement;
    public $Libele;
    public $Description;
    public $Image;
    public $Entreprise;


    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        $this->connexion = $db;
    }

    /**
     * Lecture des Projets
     *
     * @return void
     */
    public function getAllProjets(){
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
     * Lire un projet
     *
     * @return void
     */
    public function getProjet(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE IdProjet = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->IdProjet);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->IdProjet = $row['IdProjet'];
        $this->IdEvenement = $row['IdEvenement'];
        $this->Libele = $row['Libele'];
        $this->Description = $row['Description'];
        $this->Image = $row['Image'];
        $this->Entreprise = $row['Entreprise'];
    }

    /**
     * Créer un Projet
     *
     * @return void
     */
    public function createProjet(){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET IdEvenement=:IdEvenement,
        Libele=:Libele,
        Description=:Description,
        Image=:Image,
        Entreprise=:Entreprise";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdEvenement=htmlspecialchars(strip_tags($this->IdEvenement));
        $this->Libele=htmlspecialchars(strip_tags($this->Libele));
        $this->Description=htmlspecialchars(strip_tags($this->Description));
        $this->Image=htmlspecialchars(strip_tags($this->Image));
        $this->Entreprise=htmlspecialchars(strip_tags($this->Entreprise));

        // Ajout des données protégées
        $query->bindParam(":IdEvenement", $this->IdEvenement);
        $query->bindParam(":Libele", $this->Libele);
        $query->bindParam(":Description", $this->Description);
        $query->bindParam(":Image", $this->Image);
        $query->bindParam(":Entreprise", $this->Entreprise);

        // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer un Projet
     *
     * @return void
     */
    public function deleteProjet(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE IdProjet = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->IdProjet=htmlspecialchars(strip_tags($this->IdProjet));

        // On attache l'id
        $query->bindParam(1, $this->IdProjet);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }

    /**
     * Mettre à jour un Projet
     *
     * @return void
     */
    public function editProjet(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET IdEvenement=:IdEvenement,
        Libele=:Libele,
        Description=:Description,
        Image=:Image,
        Entreprise=:Entreprise WHERE IdProjet = :IdProjet";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
        
        // On sécurise les données
        $this->IdProjet=htmlspecialchars(strip_tags($this->IdProjet));
        $this->IdEvenement=htmlspecialchars(strip_tags($this->IdEvenement));
        $this->Libele=htmlspecialchars(strip_tags($this->Libele));
        $this->Description=htmlspecialchars(strip_tags($this->Description));
        $this->Image=htmlspecialchars(strip_tags($this->Image));
        $this->Entreprise=htmlspecialchars(strip_tags($this->Entreprise));
        
        // On attache les variables
        $query->bindParam(":IdProjet", $this->IdProjet);
        $query->bindParam(":IdEvenement", $this->IdEvenement);
        $query->bindParam(":Libele", $this->Libele);
        $query->bindParam(":Description", $this->Description);
        $query->bindParam(":Image", $this->Image);
        $query->bindParam(":Entreprise", $this->Entreprise);
        
        // On exécute
        if($query->execute()){
            return true;
        }
        
        return false;
    }
}
?>