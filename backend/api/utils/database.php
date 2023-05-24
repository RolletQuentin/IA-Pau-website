<?php 

    include 'BDDCredentials.php';

    function getConnection(){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        return $conn;
    }
    
?>