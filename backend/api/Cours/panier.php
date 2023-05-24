<?php
    session_start();
    if (session_status() != 2) {
        unset($_SESSION['login']);
        $_SESSION['Statut-Connexion'] = false;
        $_SESSION['produits'] = array();
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
 <head>
  <!-- un commentaire -->
  <!-- max width -->
  <meta name="publisher" content="Nico & Arthur">
  <meta name="copyright" content="Nico&Arthur">
  <meta name="date-creation-yyyymmdd" content="20230210">
  <meta name="reply-to" content="rimaudiere@cy-tech.fr">
  <meta name="description" content="Site de vente de chocolat">
  <meta name="keywords" content="Chocolat, chocolate">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="robots" content="index">
  <title>Vente Chocolat en ligne</title>
  <link rel="stylesheet" type="text/css" href="assets/sources.css">
  <link rel="stylesheet" type="text/css" href="assets/product.css">
  <link rel="icon" type="image/png" href="assets/Images/logo.png"/>
  <script type="text/javascript" src="js/products.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
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
        <h1 class="title">Votre panier:</h1>
        <div class="product_area">
            <?php
                $array = $_SESSION['produits'];
                if(count($array) == 0){
                    echo "<div> Votre panier est vide ! </div>";
                    echo "<br>";
                    echo "<img src=\"assets/Images/empty.gif\">";
                } else {
                    $total = 0;
                    $poidsTotal = 0;
                    $prixTotal = 0;
                    echo "<div class='policestyle'><strong>---------------------------------------------------------------------------------</strong></div>";
                    echo "<br>";
                    include 'bdd/bdd.php';
                    for ($i = 0; $i <= count($array); $i++) {
                        if($_SESSION['produits'][$i][1] > 0){
                            
                            $prix = getPrice($_SESSION['produits'][$i][0], 0.01, $_SESSION['produits'][$i][1]);
                            $poids = 10 * $_SESSION['produits'][$i][1];
                            $poidsTotal += $poids;
                            $prixTotal += $prix;
                            echo "<div class='policestyle'>x" . $_SESSION['produits'][$i][1] . " ". $_SESSION['produits'][$i][0] . " - ". $prix . "€ - ". $poids . "g </div>";
                            $total = $total + $_SESSION['produits'][$i][1];
                        }
                    }
                    echo "<br>";
                    echo "<div class='policestyle'><strong>Soit un total de " . $total . " article(s).</strong></div>";
                    echo "<div class='policestyle'><strong>Total financier: " . $prixTotal . "€  | Poids total: ". $poidsTotal ."g</strong></div>";
                    echo "<br>";
                    echo "<div class='policestyle'><strong>---------------------------------------------------------------------------------</strong></div>";
                    echo "<br>";
                    echo "<br>";
                    echo "<a href=\"emptyWallet.php\">Cliquez ici pour vider le panier</a>";
                    echo "<br>";
                }
            ?>
        </div> 
        <br>
    </div>
    <footer class="footer">
        <p>&copy; Arthur Rimaudiere & Nicolas Martiel - 2023</p>
        <p>CY-Tech ING1 Gr3 2022-2023 : Projet Site LaFleur</p>
    </footer>
 </body>
</html>