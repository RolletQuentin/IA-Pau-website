<?php
    session_start();
    if (session_status() != 2) {
        unset($_SESSION['login']);
        $_SESSION['Statut-connection'] = false;
        $_SESSION['produits'] = array();
    }
    $erreur = false;
    @$date = $_GET['date'];
    @$name = $_GET['name'];
    @$firstname = $_GET['firstname'];
    @$email = $_GET['email'];
    @$job = $_GET['job'];
    @$sujet = $_GET['sujet'];
    @$content = $_GET['content'];
    if($date == ""){
        $erreur = true;
    } else if ($name == ""){
        $erreur = true;
    } else if ($firstname == ""){
        $erreur = true;
    } else if ($name == ""){
        $erreur = true;
    } else if ($email == ""){
        $erreur = true;
    } else if ($job == ""){
        $erreur = true;
    } else if ($sujet == ""){
        $erreur = true;
    } else if ($content == ""){
        $erreur = true;
    }
    $messageErreur = "";
    if($erreur == false){
        // Envoie du mail
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
        <h1 class="title">Contactez nous</h1>
        <p class="policestyle">en remplissant le formulaire suivant</p>
        <br>
        <div class="box">
            <br>
            <br>
            <form id="myform">
                <table class="center">
                    <tr>
                        <th align="right">
                            <label for="Date">Date :</label>
                        </th>
                        <th align="left">
                            <input id="Date" type="date" name="date" size="9" class="hauteurrectanges" >
                            <a id="alert-date" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right">
                            <label for="Nom">Nom :</label>
                        </th>
                        <th align="left">
                            <input id="Nom" type="text" name="name" size="15" class="hauteurrectanges" >
                            <a id="alert-nom" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right">
                            <label for="Prenom">Prénom :</label>
                        </th>
                        <th align="left">
                            <input id="Prenom" type="text" name="firstname" size="15" class="hauteurrectanges" >
                            <a id="alert-prenom" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right">
                            <label for="Mail">E-mail :</label>
                        </th>
                        <th align="left">
                            <input id="Mail" type="email" name="email" size="15" class="email" >
                            <a id="alert-mail" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right">
                            <label for="job">Métier :</label>
                        </th>
                        <th align="left">
                            <select name="job" id="job" class="menuderoulant" >
                                <option value="none">-- Séléctionnez une option --</option>
                                <option value="highschooler">Etudiant</option>
                                <option value="ingeneer">Ingénieur</option>
                                <option value="without">Sans profession</option>
                                <option value="restaurant-worker">Restaurateur</option>
                                <option value="tourism">Professionel du tourisme</option>
                                <option value="other">Autre</option>
                            </select>
                            <a id="alert-job" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right">
                            <label for="Sujet">Sujet :</label>
                        </th>
                        <th align="left">
                            <input id="Sujet" type="text" name="sujet" size="40" class="sujet" >
                            <a id="alert-subject" class="error-form"></a>
                        </th>
                    </tr>
                    <tr>
                        <th align="right" valign="top">
                            <label for="Contenu">Contenu :</label>
                        </th>
                        <th align="left">
                            <textarea id="Contenu" name="content" class="content-style" ></textarea>
                            <div id="alert-content" class="error-form"></div>
                        </th>
                    </tr>
                    </table>
                    <?php
                        echo "<div>" . session_status() . "</div>";
                        $erreur = false;
                        $champ = "";
                        @$date = $_GET['date'];
                        @$name = $_GET['name'];
                        @$firstname = $_GET['firstname'];
                        @$email = $_GET['email'];
                        @$job = $_GET['job'];
                        @$sujet = $_GET['sujet'];
                        @$content = $_GET['content'];
                        if($date == ""){
                            $erreur = true;
                            $champ = "date";
                        } else if ($name == ""){
                            $erreur = true;
                            $champ = "nom";
                        } else if ($firstname == ""){
                            $erreur = true;
                            $champ = "prénom";
                        } else if ($email == ""){
                            $erreur = true;
                            $champ = "email";
                        } else if ($job == ""){
                            $erreur = true;
                            $champ = "job";
                        } else if ($sujet == ""){
                            $erreur = true;
                            $champ = "sujet";
                        } else if ($content == ""){
                            $erreur = true;
                            $champ = "content";
                        }
                        $messageErreur = "";
                        if($erreur == true){
                            echo "<div>Il y a une erreur dans le formulaire (champ: " . $champ . ")</div>";
                        } 
                    ?>
                    <br>
                    <input type="submit" value="Envoyer le formulaire" class="buttonSend" onclick="verifDataForm(event)">
            </form>
        </div>
    </div>
    <br><br><br><br>
    <footer class="footer">
        <p>&copy; Arthur Rimaudiere & Nicolas Martiel - 2023</p>
        <p>CY-Tech ING1 Gr3 2022-2023 : Projet Site LaFleur</p>
    </footer>
 </body>
</html>