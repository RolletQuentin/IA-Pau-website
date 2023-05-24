
DROP DATABASE IF EXISTS IA_Pau_database;

CREATE DATABASE IF NOT EXISTS IA_Pau_database;

USE IA_Pau_database;

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Questionnaire(
    IdQuestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Titre VARCHAR(64),
    Sujet VARCHAR(2048),
    Debut DATE,
    Fin DATE
);

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Question(
    IdQuestion INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Question VARCHAR(512),
    Reponse VARCHAR(256),
    IdQuestionnaire INTEGER(16),
    FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire)
);

-- EVENEMENT (DataChallenge ou DataBattle)
CREATE TABLE IF NOT EXISTS Evenement (
    IdEvenement INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Image VARCHAR(256),
    Debut DATE,
    Fin DATE,
    Recompense VARCHAR(128),
    TypeEvenement VARCHAR(32),
    Entreprise VARCHAR(64)
);

-- USER ?
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

-- USER
CREATE TABLE IF NOT EXISTS User(
    Identifiant INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(128),
    Nom VARCHAR(32),
    Img VARCHAR(256),
    Prenom VARCHAR(32),
    NumTel INTEGER(10),
    Mdp VARCHAR(128)
);

-- USER
CREATE TABLE IF NOT EXISTS Etudiant(
    NumeroEtudiant INTEGER(16) PRIMARY KEY,
    NiveauEtude VARCHAR(4),
    Ecole VARCHAR(32),
    Ville VARCHAR(32),
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

-- USER
CREATE TABLE IF NOT EXISTS Gestionnaire(
    IdGestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Entreprise VARCHAR(64),
    Ville VARCHAR(32),
    Debut DATE,
    Fin DATE,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

-- USER
CREATE TABLE IF NOT EXISTS Administrateur(
    IdAdmin INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant)
);

-- EVENEMENT (Bizarre, un message peut être envoyé à un dataChallenge, à un projet, à une éuipe, à un user)
-- IMPLEMENTE GESTION MESSAGE PRIVE ET BOUCLER POUR LES AUTRES ? REDONDANCE DONNEES ? REVOIR MODELISATION MESSAGE !!!!!!!!!
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

-- ------------------------- MODIF PATRICE --------------------------------
-- EVENEMENT (Projet) MODIFICATION POUR LIER A EVENEMENT
CREATE TABLE IF NOT EXISTS Projet(
    IdProjet INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdEvenement INTEGER(16),
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Consigne VARCHAR(8192),
    Conseil VARCHAR(2048),
    FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)

);

-- RESSOURCES Doit pouvoir etre lié a plusieurs projets il nous manque le lien posseder
CREATE TABLE IF NOT EXISTS Ressources(
    IdRessource INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    UrlRessource VARCHAR(512)
);
-- RESSOURCE A ECRIRE
CREATE TABLE IF NOT EXISTS PossederRessource(
    IdRessource INTEGER(16) AUTO_INCREMENT,
    IdProjet INTEGER(16),
    CONSTRAINT pPR PRIMARY KEY (IdRessource, IdProjet),
    CONSTRAINT fkPR1 FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet),
    CONSTRAINT fkPR2 FOREIGN KEY (IdRessource) REFERENCES Ressources (IdRessource)
);
-- ------------------------------------------------

-- EVENEMENT (Notes Questionnaire)
CREATE TABLE IF NOT EXISTS RepondreQuestionnaire(
    IdQuestionnaire INTEGER(16),
    IdEquipe INTEGER(16),
    Score INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdQuestionnaire, IdEquipe),
    CONSTRAINT fk3 FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire),
    CONSTRAINT fk4 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe)
);

-- USER
CREATE TABLE IF NOT EXISTS Inscrire(
    Identifiant INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEvenement),
    CONSTRAINT fk5 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant),
    CONSTRAINT fk6 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)
);

-- USER (User appartenir à Equipe)
CREATE TABLE IF NOT EXISTS Appartenir(
    Identifiant INTEGER(16),
    IdEquipe INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEquipe),
    CONSTRAINT fk7 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant),
    CONSTRAINT fk8 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe)
);

-- USER & EVENEMENT
CREATE TABLE IF NOT EXISTS Gerer(
    IdGestionnaire INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdEvenement, IdGestionnaire),
    CONSTRAINT fk9 FOREIGN KEY (IdGestionnaire) REFERENCES Gestionnaire (IdGestionnaire),
    CONSTRAINT fk10 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement)
);


-- ON CHARGE DONNEES TEST -----------------

INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('arthur.rimaudiere@free.fr', 'Rimaudiere', 'Arthur', 769030682, 'trivialMDP');
INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('soulier.patrice@orangeCMieuxQueFree.fr', 'SOULIER', 'Patrice', 985469236, 'trivialMDP');

INSERT INTO Etudiant VALUES (115618941, "L3", "CyTech", "Pau", 1);
INSERT INTO Etudiant VALUES (225618948, "L3", "CyTech", "Pau", 2);

INSERT INTO Evenement VALUES (1, "image", '2023-01-01', '2023-01-02', "Recompense", "DataChallenge", "Entreprise");
INSERT INTO Evenement VALUES (2, "image", '2023-01-01', '2023-01-02', "Recompense", "DataChallenge", "Entreprise");

INSERT INTO Projet VALUES (1, 1, "Projet 1", "Description", "Consigne", "Conseil");
INSERT INTO Projet VALUES (2, 1, "Projet 2", "Description", "Consigne", "Conseil");

INSERT INTO Ressources VALUES (1,"test.com");
INSERT INTO Ressources VALUES (2,"test.com");
INSERT INTO Ressources VALUES (3,"test.com");
INSERT INTO Ressources VALUES (4,"test.com");

INSERT INTO PossederRessource VALUES (1,1);
INSERT INTO PossederRessource VALUES (2,2);
INSERT INTO PossederRessource VALUES (3,1);
INSERT INTO PossederRessource VALUES (4,1);

