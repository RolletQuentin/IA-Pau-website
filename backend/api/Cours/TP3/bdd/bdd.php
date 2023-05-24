<?php
    $servername = "localhost";
    $username = "Arthur";
    $password = "password";
    $dbname = "rimarti";

    function Connect($identifiant, $motdepasse){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return false;
        } else {
            $query = "SELECT * From users";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                while($row = mysqli_fetch_assoc($res)) {
                    if($row['Identifiant'] == $identifiant && $row['MotDePasse'] == $motdepasse) {
                        mysqli_close($conn);
                        return true;
                    }
                }
                mysqli_close($conn);
                return false;
            mysqli_close($conn);
            return false;
            }
        }
    }

    function printProduct(){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return NULL;
        } else {
            $query = "SELECT * From users";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                return $res;
            mysqli_close($conn);
            return NULL;
            }
        }
    }
?>