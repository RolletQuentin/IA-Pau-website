<?php
    session_start();
    unset($_SESSION['produits']);
    $_SESSION['produits'] = array();
    header('Location: panier.php');
?>