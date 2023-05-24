<?php
    session_start();
    @$qte = intval($_GET['qte']);
    @$id = $_GET['id'];
    if($qte != "" && $id != "" && $_SESSION['Statut-Connexion'] == true){
        $array = array($id, $qte);
        array_push($_SESSION['produits'], $array);
        include 'bdd/bdd.php';
        $quantity = (-1) * $qte;
        ChangeQuantityOfProduct($id, $quantity);
    }
    header('Location: panier.php');
?>