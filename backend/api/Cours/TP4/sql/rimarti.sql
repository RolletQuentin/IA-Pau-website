CREATE DATABASE IF NOT EXISTS rimarti;

USE rimarti;

CREATE TABLE IF NOT EXISTS users(
    Identifiant VARCHAR(50),
    Email VARCHAR(50),
    MotDePasse VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS produits(
    Nom VARCHAR(50),
    Prix INTEGER(10),
    Description VARCHAR(200),
    AvailableQuantity INTEGER(10),
    Image VARCHAR(100),
    Categorie VARCHAR(50)
);