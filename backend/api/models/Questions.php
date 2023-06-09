<?php
class Questions {
    //connexion
    private $connexion;
    private $table = "Question";


    //object properties
    public $IdQuestion;
    public $Question;
    public $IdQuestionnaire;


    /**
     * Constructeur avec $db pour la connexion à la base de données
     *
     * @param $db
     */
    public function __construct($db){
        $this->connexion = $db;
    }


    /**
     * Lecture des Questions
     *
     * @return void
     */
    public function getAllQuestions(){
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
     * Lire une question
     *
     * @return void
     */
    public function getQuestion(){
        // On écrit la requête
        $sql = "SELECT * FROM " . $this->table . " WHERE IdQuestion = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On attache l'id
        $query->bindParam(1, $this->IdQuestion);

        // On exécute la requête
        $query->execute();

        // on récupère la ligne
        $row = $query->fetch(PDO::FETCH_ASSOC);

        // On hydrate l'objet
        $this->IdQuestion = $row['IdQuestion'];
        $this->Question = $row['Question'];
        $this->IdQuestionnaire = $row['IdQuestionnaire'];
    }

    /**
     * Créer une question
     *
     * @return void
     */
    public function createQuestion(){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO " . $this->table . " SET IdQuestionnaire=:IdQuestionnaire,
        Question=:Question";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdQuestionnaire=htmlspecialchars(strip_tags($this->IdQuestionnaire));
        $this->Question=htmlspecialchars(strip_tags($this->Question));

        // Ajout des données protégées
        $query->bindParam(":IdQuestionnaire", $this->IdQuestionnaire);
        $query->bindParam(":Question", $this->Question);


        // Exécution de la requête
        if($query->execute()){
            $this->IdQuestion = $this->connexion->lastInsertId();
            return true;
        }
        return false;
    }

    /**
     * Créer une réponse
     *
     * @return void
     */
    public function createReponseByIdQuestion($IdEquipe,$Reponse){

        // Ecriture de la requête SQL en y insérant le nom de la table
        $sql = "INSERT INTO ReponseQuestion SET IdQuestion=:IdQuestion,
        IdEquipe=:IdEquipe, Reponse=:Reponse";

        // Préparation de la requête
        $query = $this->connexion->prepare($sql);

        // Protection contre les injections
        $this->IdQuestion=htmlspecialchars(strip_tags($this->IdQuestion));
        $IdEquipe=htmlspecialchars(strip_tags($IdEquipe));
        $Reponse=htmlspecialchars(strip_tags($Reponse));

        // Ajout des données protégées
        $query->bindParam(":IdQuestion", $this->IdQuestion);
        $query->bindParam(":IdEquipe", $IdEquipe);
        $query->bindParam(":Reponse", $Reponse);

        // Exécution de la requête
        if($query->execute()){
            return true;
        }
        return false;
    }

    /**
     * Supprimer une question
     *
     * @return void
     */
    public function deleteQuestion(){
        // On écrit la requête
        $sql = "DELETE FROM " . $this->table . " WHERE IdQuestion = ?";

        // On prépare la requête
        $query = $this->connexion->prepare( $sql );

        // On sécurise les données
        $this->IdQuestion=htmlspecialchars(strip_tags($this->IdQuestion));
        $this->Question=htmlspecialchars(strip_tags($this->Question));
        $this->IdQuestionnaire=htmlspecialchars(strip_tags($this->IdQuestionnaire));

        // On attache l'id
        $query->bindParam(1, $this->IdQuestion);

        // On exécute la requête
        if($query->execute()){
            return true;
        }
        
        return false;
    }

    /**
     * Mettre à jour d'une question
     *
     * @return void
     */
    public function editQuestion(){
        // On écrit la requête
        $sql = "UPDATE " . $this->table . " SET Question=:Question,
        IdQuestionnaire=:IdQuestionnaire WHERE IdQuestion=:IdQuestion";
        
        // On prépare la requête
        $query = $this->connexion->prepare($sql);
        
        // On sécurise les données
        $this->IdQuestion=htmlspecialchars(strip_tags($this->IdQuestion));
        $this->Question=htmlspecialchars(strip_tags($this->Question));
        $this->IdQuestionnaire=htmlspecialchars(strip_tags($this->IdQuestionnaire));
        
        // On attache les variables
        $query->bindParam(":IdQuestion", $this->IdQuestion);
        $query->bindParam(":Question", $this->Question);
        $query->bindParam(":IdQuestionnaire", $this->IdQuestionnaire);
        
        // On exécute
        if($query->execute()){
            return true;
        }
        
        return false;
    }
}
?>