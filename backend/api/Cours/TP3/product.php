<?php
    session_start();
    if (session_status() != 2) {
        unset($_SESSION['login']);
        $_SESSION['Statut-connection'] = false;
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
                if($_SESSION['Statut-connection'] == false){
                    echo "<a class=\"buttonItem\" href=\"connection.php\">Connection</a>";
                } else {
                    echo "<a class=\"buttonItem\" href=\"panier.php\">Panier</a>";
                    echo "<a class=\"buttonItem\" href=\"disconnect.php\">Déconnection</a>";
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
        <h1 class="title">Nos produits:</h1>

        <form>
            <label for="filtre">Filtre :</label>
            <select name="filtre" id="filtre" class="filtre_deroulant_cat" >
                <option value="aucun">Aucun</option>
                <option value="croquants">Croquants</option>
                <option value="pralines">Pralinés</option>
                <option value="ganaches">Ganaches</option>
            </select>
            <input type="submit" value="filtrer" class="filter">
        </form>
        <div class="product_area">
            <?php

                $filtre = "aucun";
                if ($_GET['filtre'] != ""){
                    $filtre = $_GET['filtre'];
                }
                
                $file = 'produits.json';
                $data = file_get_contents($file);
                $liste_produits = json_decode($data);
                $c = 0;
                $cAffiche = 0;
                $alreadyPrinted = array();
                foreach($liste_produits as $product){
                    $c = $c + 1;
                    $isAldReadyPrinted = false;
                    foreach($alreadyPrinted as $p){
                        if($p == $product->Nom){
                            $isAldReadyPrinted = true;
                        }
                    }

                    $needToPrint = true;
                    if ($filtre != "aucun"){
                        if($filtre != $product->Categorie){
                            $needToPrint = false;
                        }
                    }

                    if($isAldReadyPrinted == false && $needToPrint == true){
                        $cAffiche = $cAffiche + 1;
                        array_push($alreadyPrinted, $product->Nom);
                        echo "<p class='product'>\n";
                        echo "<br>\n";
                        echo "<a class='product-name' id='name-".$c."'>". $product->Nom ."</a>\n";
                        echo "<img class='product-picture' src='". $product->Image ."' onclick=\"openPicture('". $product->Image ."')\">\n";
                        echo "<a class='product-price'> Tarif: ". $product->Prix."€/kg</a>\n";
                        echo "<br>\n";
                        echo "<br>\n";
                        echo "<a class='product-description'>". $product->Description ."</a>\n";
                        echo "<br>\n";
                        echo "<br>\n";
                        echo "<a class='block-ajout'>\n";
                        echo "<button onclick=\"modifQuantity('quantity-".$c."', '', '-')\" class='buttonQuantity'>-</button>\n";
                        echo "<span> </span><span id='quantity-".$c."' class='Qty'>0</span><span>  </span>\n";
                        echo "<button onclick=\"modifQuantity('quantity-".$c."', '".$product->AvailableQuantity."', '+')\" class='buttonQuantity'>+</button>\n";
                        echo "</a>\n";
                        echo "<br><br>\n";
                        echo "<a><button class='add-to-panier' onclick=\"addToBasket('quantity-".$c."', 'name-". $c . "')\">Ajouter au pannier</button></a>\n";
                        echo "<br><br>\n";
                        echo "<span class='centered'><a class='quantite'>Quantité en stock: ". $product->AvailableQuantity ."</a><span>\n";
                        echo "<br class='quantite'><br class='quantite'>\n";
                        echo "</p>\n";
                        echo "\n";
                    }
                }
                if($cAffiche == 0){
                    echo "<br><br>";
                    echo "<img class='ImageError' src='/assets/Images/squirels.png'>";
                    echo "<p>Nos écureuils ne travaillent malheuresement pas assez vite pour vous proposer cette catégorie !</p>";
                }
            ?>
        </div> 
        <br>
        <button id="hiderbutton" class="hiderButton" onclick="setVisibility()">Cacher les stocks</button>
    </div>
    <footer class="footer">
        <p>&copy; Arthur Rimaudiere & Nicolas Martiel - 2023</p>
        <p>CY-Tech ING1 Gr3 2022-2023 : Projet Site LaFleur</p>
    </footer>
 </body>
</html>