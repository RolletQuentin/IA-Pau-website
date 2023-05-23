
DROP DATABASE IF EXISTS IA_Pau_database;

CREATE DATABASE IF NOT EXISTS IA_Pau_database;

USE IA_Pau_database;

CREATE TABLE IF NOT EXISTS Questionnaire(
    IdQuestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(64),
    Sujet VARCHAR(2048),
    Debut DATE,
    Fin DATE
);

CREATE TABLE IF NOT EXISTS Question(
    IdQuestion INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Question VARCHAR(512),
    Reponse VARCHAR(256),
    IdQuestionnaire INTEGER(16),
    FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire)
);

CREATE TABLE IF NOT EXISTS Evenement (
    IdEvenement INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Image VARCHAR(256),
    Debut DATE,
    Fin DATE,
    Recompense VARCHAR(128),
    TypeEvenement VARCHAR(32),
    Entreprise VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS Equipe (
    IdEquipe INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(128),
    IdLeader INTEGER(16),
    CodeEquipe VARCHAR(16),
    Score INTEGER(16),
    LienProjet VARCHAR(512),
    IdEvenement INTEGER(16),
    FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)
);

CREATE TABLE IF NOT EXISTS User(
    Identifiant INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(128),
    Nom VARCHAR(32),
    Img VARCHAR(256),
    Prenom VARCHAR(32),
    NumTel INTEGER(10),
    Mdp VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS Etudiant(
    NumeroEtudiant INTEGER(16) PRIMARY KEY,
    NiveauEtude VARCHAR(4),
    Ecole VARCHAR(32),
    Ville VARCHAR(32),
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

CREATE TABLE IF NOT EXISTS Gestionnaire(
    IdGestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Entreprise VARCHAR(64),
    Ville VARCHAR(32),
    Debut DATE,
    Fin DATE,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

CREATE TABLE IF NOT EXISTS Administrateur(
    IdAdmin INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

CREATE TABLE IF NOT EXISTS Message(
    IdMessage INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdEvenement INTEGER(16),
    DateMessage DATE,
    IdSender INTEGER(16),
    Contenu VARCHAR(4096),
    IdEquipe INTEGER(16),
    CONSTRAINT fk1 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement),
    CONSTRAINT fk2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe)
);

CREATE TABLE IF NOT EXISTS Sujet(
    IdSujet INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Consigne VARCHAR(8192),
    Conseil VARCHAR(2048)
);

CREATE TABLE IF NOT EXISTS Donnee(
    IdData INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    UrlDonnee VARCHAR(512),
    IdSujet INTEGER(16),
    FOREIGN KEY (IdSujet) REFERENCES Sujet (IdSujet)
);

CREATE TABLE IF NOT EXISTS RepondreQuestionnaire(
    IdQuestionnaire INTEGER(16),
    IdEquipe INTEGER(16),
    Score INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdQuestionnaire, IdEquipe),
    CONSTRAINT fk3 FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire),
    CONSTRAINT fk4 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe)
);

CREATE TABLE IF NOT EXISTS Inscrire(
    Identifiant INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEvenement),
    CONSTRAINT fk5 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant),
    CONSTRAINT fk6 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)
);

CREATE TABLE IF NOT EXISTS Appartenir(
    Identifiant INTEGER(16),
    IdEquipe INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEquipe),
    CONSTRAINT fk7 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant),
    CONSTRAINT fk8 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe)
);

CREATE TABLE IF NOT EXISTS Gerer(
    IdQuestionnaire INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdEvenement, IdQuestionnaire),
    CONSTRAINT fk9 FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire),
    CONSTRAINT fk10 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)
);


INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('arthur.rimaudiere@free.fr', 'Rimaudiere', 'Arthur', 769030682, 'trivialMDP');
INSERT INTO Etudiant VALUES (1156189481, "L3", "CyTech", "Pau", 1);
/*
INSERT INTO Gestionnaire VALUES (151, "IAPAU", "Pau", NOW(), NOW(), 1);
INSERT INTO Administrateur VALUES (1, 1);
*/