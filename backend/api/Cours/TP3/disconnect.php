<?php
    session_start();
    unset($_SESSION['login']);
    $_SESSION['Statut-connection'] = false;
    $_SESSION['produits'] = array();
    header('Location: index.php');
?>