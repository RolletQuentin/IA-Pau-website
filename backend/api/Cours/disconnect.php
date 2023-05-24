<?php
    session_start();
    unset($_SESSION['login']);
    $_SESSION['Statut-Connexion'] = false;
    $_SESSION['produits'] = array();
    header('Location: index.php');
?>