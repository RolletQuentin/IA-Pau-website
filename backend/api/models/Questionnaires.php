<?php
class Questionnaires {
    //connexion
    private $connexion;
    private $table = "Questionnaire";


    //object properties
    public $IdQuestionnaire;
    public $IdProjet;
    public $Titre;
    public $Sujet;
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
     * Lecture des Questionnaires
     *
     * @return void
     */
    public function getAllQuestionnaires(){
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
     * Lecture des Questions d'un Questionnaire
     *
     * @return void
     */
    public function getAllQuestionsByIdQuestionnaire(){
        // On écrit la requête
        $sql = "SELECT * FROM Question WHERE IdQuestionnaire = ?";

        // On prépare la requête
        $query = $this->connexion->prepare($sql);

        // On attache l'id
        $query->bindParam(1, $this->IdQuestionnaire);

        // On exécute la requête
        $query->execute();

        // On retourne le résultat
        return $query;
    }

    /**
     * Lire un questionnaire
     *
     * @return void
     */
    public function getQuestionnaire(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE IdQuestionnaire = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->IdQuestionnaire);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->IdQuestionnaire = $row['IdQuestionnaire'];
        $this->IdProjet = $row['IdProjet'];
        $this->Titre = $row['Titre'];
        $this->Sujet = $row['Sujet'];
        $this->Debut = $row['Debut'];
        $this->Fin = $row['Fin'];
    }

    /**
     * Créer un questionnaire
     *
     * @return void
     */
    public function createQuestionnaire(){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET IdProjet=:IdProjet,
        Titre=:Titre,
        Sujet=:Sujet,
        Debut=:Debut,
        Fin=:Fin";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdProjet=htmlspecialchars(strip_tags($this->IdProjet));
        $this->Titre=htmlspecialchars(strip_tags($this->Titre));
        $this->Sujet=htmlspecialchars(strip_tags($this->Sujet));
        $this->Debut=htmlspecialchars(strip_tags($this->Debut));
        $this->Fin=htmlspecialchars(strip_tags($this->Fin));


        // Ajout des données protégées
        $query->bindParam(":IdProjet", $this->IdProjet);
        $query->bindParam(":Titre", $this->Titre);
        $query->bindParam(":Sujet", $this->Sujet);
        $query->bindParam(":Debut", $this->Debut);
        $query->bindParam(":Fin", $this->Fin);


        // Exécution de la requête
        if($query->execute()){
            $this->IdQuestionnaire = $this->connexion->lastInsertId();
            return true;
        }
        return false;
    }

    /**
     * Créer une réponse à un questionnaire
     *
     * @return void
     */
    public function createReponseQuestionnaireByIdEquipe($IdEquipe, $DateReponse){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO ReponseQuestionnaire SET IdQuestionnaire=:IdQuestionnaire,
        IdEquipe=:IdEquipe,
        DateReponse=:DateReponse";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdQuestionnaire=htmlspecialchars(strip_tags($this->IdQuestionnaire));
        $IdEquipe=htmlspecialchars(strip_tags($IdEquipe));
        $DateReponse=htmlspecialchars(strip_tags($DateReponse));

        // Ajout des données protégées
        $query->bindParam(":IdQuestionnaire", $this->IdQuestionnaire);
        $query->bindParam(":IdEquipe", $IdEquipe);
        $query->bindParam(":DateReponse", $DateReponse);

        // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer un questionnaire
     *
     * @return void
     */
    public function deleteQuestionnaire(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE IdQuestionnaire = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->IdProjet=htmlspecialchars(strip_tags($this->IdProjet));
        $this->Titre=htmlspecialchars(strip_tags($this->Titre));
        $this->Sujet=htmlspecialchars(strip_tags($this->Sujet));
        $this->Debut=htmlspecialchars(strip_tags($this->Debut));
        $this->Fin=htmlspecialchars(strip_tags($this->Fin));

        // On attache l'id
        $query->bindParam(1, $this->IdQuestionnaire);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }

    /**
     * Mettre à jour d'un questionnaire
     *
     * @return void
     */
    public function editQuestionnaire(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET IdProjet=:IdProjet,
        Titre=:Titre,
        Sujet=:Sujet,
        Debut=:Debut,
        Fin=:Fin WHERE IdQuestionnaire=:IdQuestionnaire";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
        
        // On sécurise les données
        $this->IdQuestionnaire=htmlspecialchars(strip_tags($this->IdQuestionnaire));
        $this->IdProjet=htmlspecialchars(strip_tags($this->IdProjet));
        $this->Titre=htmlspecialchars(strip_tags($this->Titre));
        $this->Sujet=htmlspecialchars(strip_tags($this->Sujet));
        $this->Debut=htmlspecialchars(strip_tags($this->Debut));
        $this->Fin=htmlspecialchars(strip_tags($this->Fin));
        
        // On attache les variables
        $query->bindParam(":IdQuestionnaire", $this->IdQuestionnaire);
        $query->bindParam(":IdProjet", $this->IdProjet);
        $query->bindParam(":Titre", $this->Titre);
        $query->bindParam(":Sujet", $this->Sujet);
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