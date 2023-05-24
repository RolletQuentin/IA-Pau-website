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
            }
        }
    }
    
    function ChangeQuantityOfProduct($productName, $quantity){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return false;
        } else {
            $query = "";
            if($quantity < 0){
                $quantity = (-1) * $quantity;
                $query = "UPDATE produits SET AvailableQuantity = AvailableQuantity - " . $quantity . " WHERE Nom = '" . $productName . "'";
            } else {
                $query = "UPDATE produits SET AvailableQuantity = AvailableQuantity + " . $quantity . " WHERE Nom = '" . $productName . "'";
            }
            $res = mysqli_query($conn, $query);
            mysqli_close($conn);
            return true;
        }
    }

    function Register($identifiant, $motdepasse, $mail){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return false;
        } else {
        	$exist = false;

            $query = "SELECT * From users";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                while($row = mysqli_fetch_assoc($res)) {
                    if($row['Identifiant'] == $identifiant || $row['Email'] == $mail) {
                        $exist = true;
                    }
                }
            }
        		
        	if($exist == true){
        	    mysqli_close($conn);
        		return false;
        	}
        		
            $query = "INSERT INTO users VALUES ('". $identifiant ."', '". $mail ."', '". $motdepasse ."');";
            $res = mysqli_query($conn, $query);
            mysqli_close($conn);
            return true;
        }
    }

    function existeAccount($identifiant, $mail){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return false;
        } else {
        	$exist = false;

            $query = "SELECT * From users";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                while($row = mysqli_fetch_assoc($res)) {
                    if($row['Identifiant'] == $identifiant || $row['Email'] == $mail) {
                        $exist = true;
                    }
                }
            }
            mysqli_close($conn);
            return $exist;
        }
    }

    function existeCredentials($identifiant, $mdp){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return false;
        } else {
        	$exist = false;

            $query = "SELECT * From users";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                while($row = mysqli_fetch_assoc($res)) {
                    if($row['Identifiant'] == $identifiant && $row['MotDePasse'] == $mdp) {
                        $exist = true;
                    }
                }
            }
            mysqli_close($conn);
            return $exist;
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
            $query = "SELECT * From produits";
            $res = mysqli_query($conn, $query);
            if(mysqli_num_rows($res) > 0) {
                return $res;
            mysqli_close($conn);
            return NULL;
            }
        }
    }

    function getPrice($Product, $weight, $quantity){
        global $servername, $username, $password, $dbname;
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
            echo "<div> ERREUR DE CONNECTION SQL </div>";
            mysqli_close($conn);
            return 0;
        } else {
        	$prix = 0;

            $query = "SELECT * From produits";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                while($row = mysqli_fetch_assoc($res)) {
                    if($row['Nom'] == $Product) {
                        $prixAuKg = $row['Prix'];
                        $prix = $quantity * $prixAuKg * $weight;
                    }
                }
            }
            mysqli_close($conn);
            return $prix;
        }
    }

?>
