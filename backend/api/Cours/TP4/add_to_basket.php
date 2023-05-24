<?php
    session_start();
    @$qte = intval($_GET['qte']);
    @$id = $_GET['id'];
    if($qte != "" && $id != "" && $_SESSION['Statut-connection'] == true){
        $array = array($id, $qte);
        array_push($_SESSION['produits'], $array);
    }
    header('Location: panier.php');
?>