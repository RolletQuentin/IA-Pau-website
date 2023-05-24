<?php
    session_start();

    include 'bdd/bdd.php';
    $array = $_SESSION['produits'];
    for ($i = 0; $i <= count($array); $i++) {
        if($_SESSION['produits'][$i][1] > 0){
            $quantity = $_SESSION['produits'][$i][1];
            $name = $_SESSION['produits'][$i][0];
            ChangeQuantityOfProduct($name, $quantity);
        }
    }

    unset($_SESSION['produits']);
    $_SESSION['produits'] = array();
    header('Location: panier.php');
?>