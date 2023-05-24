<?php
    session_start();
    if (session_status() != 2) {
        unset($_SESSION['login']);
        $_SESSION['Statut-Connexion'] = false;
        
    } 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
 <head>
  <!-- un commentaire -->
  <!-- max width -->
  <meta name="publisher" content="Nico & Arthur">
  <meta name="copyright" content="Nico & Arthur">
  <meta name="date-creation-yyyymmdd" content="20230210">
  <meta name="reply-to" content="rimaudiere@cy-tech.fr">
  <meta name="description" content="Site de vente de chocolat">
  <meta name="keywords" content="Chocolat, chocolate">
  <meta name="robots" content="index">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Vente Chocolat en ligne</title>
  <link rel="icon" type="image/png" href="assets/Images/logo.png"/>
  <link rel="stylesheet" type="text/css" href="assets/sources.css">
  <link rel="stylesheet" type="text/css" href="assets/index.css">
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
        <img src="assets/Images/top-content.png">
        <h1 class="title">NOS CHOCOLATS</h1>
        <p class="policestyle">Vous pouvez dès maintenant voir notre catalogue</p>
        <p class="policestyle">de chocolats sur ce site, ou prendre contact avec</p>
        <p class="policestyle">avec nous dans la rubrique contact.</p>
        <ul class="menuImage">

            <li class="imageEnLigne">
                <a href="product.php?filtre=croquants"><img class="image" src="assets/Images/croquants.jpg"></a>
            </li>
            <li class="imageEnLigne">
                <a href="product.php?filtre=ganaches"><img class="image" src="assets/Images/ganaches.jpg"></a>
            </li>
            <li class="imageEnLigne">
                <a href="product.php?filtre=pralines"><img class="image" src="assets/Images/pralines.jpg"></a>
            </li>
        </ul>
    </div>
    <footer class="footer">
        <p>&copy; Arthur Rimaudiere & Nicolas Martiel - 2023</p>
        <p>CY-Tech ING1 Gr3 2022-2023 : Projet Site LaFleur</p>
    </footer>
 </body>
</html>