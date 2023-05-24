<?php
class Database{
    // Connexion à la base de données
    // Je récupère les informations de connexion dans le fichier BDDCredentials.php
    private $host;
    private $db_name ;
    private $username;
    private $password;
    public $connexion;

    //Modif pour utiliser le fichier config d'Arthur
    public function __construct() {
        include_once('../../utils/BDDCredentials.php');
        $this->host = $servername;
        $this->db_name = $dbname;
        $this->username = $username;
        $this->password = $password;
    }


    // getter pour la connexion
    public function getConnection(){

        $this->connexion = null;

        try{
            $this->connexion = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->connexion->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Erreur de connexion : " . $exception->getMessage();
        }

        return $this->connexion;
    }   
}