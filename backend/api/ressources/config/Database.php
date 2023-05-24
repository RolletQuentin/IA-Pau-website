<?php
class Database{
    // Connexion à la base de données
    // Je récupère les informations de connexion dans le fichier BDDCredentials.php
    private $host = "localhost";
    private $db_name = "IA_Pau_database";
    private $username = "user";
    private $password = "password";
    public $connexion;

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