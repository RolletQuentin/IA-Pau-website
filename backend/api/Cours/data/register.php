<?php
    session_start();
    if (session_status() == 0) {
        unset($_SESSION['login']);
        $_SESSION['Statut-Connexion'] = false;
        $_SESSION['produits'] = array();
    }
    @$id = $_GET['id'];
    @$pwd = $_GET['pwd'];
    @$mail = $_GET['mail'];
    if($_SESSION['Statut-Connexion'] == false && $id != "" && $pwd != "" && mail != ""){
        
        include 'bdd/bdd.php';
        
        $connect = Connect($id, $pwd);
        if($connect == false){
        		
        	$registerResult = Register($id, $pwd, $mail);
        		
        	if($registerResult == true){
        	
		        $_SESSION['login'] = $id;
		        $_SESSION['Statut-Connexion'] = true;
		        header('Location: index.php');
		         
		    }
        }
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
 <head>
  <meta name="publisher" content="Nico & Arthur">
  <meta name="copyright" content="Nico&Arthur">
  <meta name="date-creation-yyyymmdd" content="20230210">
  <meta name="reply-to" content="rimaudiere@cy-tech.fr">
  <meta name="description" content="Site de vente de chocolat">
  <meta name="keywords" content="Chocolat, chocolat">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="robots" content="index">
  <title>Vente Chocolat en ligne</title>
  <link rel="icon" type="image/png" href="assets/Images/logo.png"/>
  <link rel="stylesheet" type="text/css" href="assets/sources.css">
  <link rel="stylesheet" type="text/css" href="assets/contact.css">
  <script type="text/javascript" src="js/contact.js"></script>
 </head>
 <body class="font">
    <header class="headsite">
        <img class="logoSize" src="assets/Images/chocolat-fondu3.jpg">
        <div class="title1">Chocolaterie Rimarti</div>
        <ul class="ButtonCase">
            <a class="buttonItem" href="index.php">Accueil</a>
            <a class="buttonItem" href="product.php">Produits</a>
            <a class="buttonItem" href="contact.php">Contact</a>
            <?php
                if($_SESSION['Statut-Connexion'] == false){
                    echo "<a class=\"buttonItem\" href=\"Connexion.php\">Connexion</a>";
                } else {
                    echo "<a class=\"buttonItem\" href=\"panier.php\">Panier</a>";
                    echo "<a class=\"buttonItem\" href=\"disconnect.php\">Déconnexion</a>";
                }
            ?>
        </ul> 
    </header>
    <div class="line_down_header"></div>
    <div class="navbar-int">
        <p class="subtitlebar">Plan du site:</p>
        <nav>
            <ul class="navmenu">
                <li><a class="itemMenu" href="index.php">Acceuil</a></li>
                <li><a class="itemMenu" href="product.php">Produits</a></li>
                <li><a class="itemMenu" href="contact.php">Contact</a></li>
            </ul>
        </nav>
        <p class="subtitlebar">Adresse:</p>
        <p class="adresse">22 rue de la chocolaterie</p>
        <p class="adresse">XXXXX, Chocolatecity</p>
        <img class="imageloc" src="assets/Images/loc.png">
    </div>
    <div class="content">
        <br>
        <div class="boxx">
        <?php

                if($_SESSION['Statut-Connexion'] == true){
                    echo "<br>";
                    echo "<h1 class=\"title\">Vous êtes déjà connecté(e)</h1>";
                    echo "<div>Vous pouvez déjà accéder à votre panier.</div>";
                    echo "<br>";
                } else {
                    echo "<br>";
                    echo "<h1 class=\"title\">Enregistez vous:</h1>";
                    echo "<br>";
                    echo "<form id=\"Connexion\">";
                    echo "<table class=\"center\">";
                    
                    echo "<tr>";
                    echo "<th align=\"right\">";
                    echo "<label for=\"id\">Identifiant :</label>";
                    echo "</th>";
                    echo "<th align=\"left\">";
                    echo "<input id=\"id\" type=\"text\" name=\"id\" size=\"15\" class=\"hauteurrectanges\" >";
                    echo "</th>";
                    echo "</tr>";
                    
                    echo "<tr>";
                    echo "<th align=\"right\">";
                    echo "<label for=\"pwd\">mail :</label>";
                    echo "</th>";
                    echo "<th align=\"left\">";
                    echo "<input id=\"mail\" type=\"email\" name=\"mail\" size=\"25\" class=\"hauteurrectanges\" >";
                    echo "</th>";
                    echo "</tr>";
                    
                    echo "<tr>";
                    echo "<th align=\"right\">";
                    echo "<label for=\"pwd\">Mot de passe :</label>";
                    echo "</th>";
                    echo "<th align=\"left\">";
                    echo "<input id=\"pwd\" type=\"password\" name=\"pwd\" size=\"15\" class=\"hauteurrectanges\" >";
                    echo "</th>";
                    echo "</tr>";
                    
                    echo "</table>";
                    echo "<br>";
                    echo "<input type=\"submit\" value=\"Connexion\" class=\"buttonSend\">";
                    echo "</form>";
                    echo "<br>";
                }
                @$id = $_GET['id'];
                @$mail = $_GET['mail'];
                if($_SESSION['Statut-Connexion'] == false){
                    if($id != "" && $mail != ""){
                        $existeAccount = existeAccount($id, $mail);
                        if($existeAccount){
                            echo "<div class=\"erreur_login\">L'identifiant ou l'adresse mail est déjà utilisée.</div>";
                        }
                    }
                }
            ?>
            <a href="Connexion.php">Ou connectez vous ici</a>
        </div>
    </div>
    <br><br><br><br>
    <footer class="footer">
        <p>&copy; Arthur Rimaudiere & Nicolas Martiel - 2023</p>
        <p>CY-Tech ING1 Gr3 2022-2023 : Projet Site LaFleur</p>
    </footer>
 </body>
</html>