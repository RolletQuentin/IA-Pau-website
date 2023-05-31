
DROP DATABASE IF EXISTS IA_Pau_database;

CREATE DATABASE IF NOT EXISTS IA_Pau_database;

USE IA_Pau_database;

-- EVENEMENT (DataChallenge ou DataBattle)
CREATE TABLE IF NOT EXISTS Evenement (
    IdEvenement INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    TypeEvenement VARCHAR(32),
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Recompenses VARCHAR(2048),
    Debut DATE,
    Fin DATE
);

-- ------------------------- MODIF PATRICE --------------------------------
-- EVENEMENT (Projet) MODIFICATION POUR LIER A EVENEMENT
CREATE TABLE IF NOT EXISTS Projet(
    IdProjet INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdEvenement INTEGER(16),
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Image VARCHAR(2048),
    Entreprise VARCHAR(128),
    FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement) ON DELETE CASCADE
);

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Questionnaire(
    IdQuestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdProjet INTEGER(16),
    Titre VARCHAR(64),
    Sujet VARCHAR(2048),
    Debut DATE,
    Fin DATE,
    FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet) ON DELETE CASCADE
);

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Question(
    IdQuestion INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdQuestionnaire INTEGER(16),
    Question VARCHAR(512),
    FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire) ON DELETE CASCADE
);

-- USER ?
CREATE TABLE IF NOT EXISTS Equipe (
    IdEquipe INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(128),
    IdLeader INTEGER(16),
    Score INTEGER(16),
    LienProjet VARCHAR(512),
    IdProjet INTEGER(16),
    FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet)
);

-- USER
CREATE TABLE IF NOT EXISTS User(
    Identifiant INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(128),
    Nom VARCHAR(32),
    Prenom VARCHAR(32),
    Img VARCHAR(256),
    NumTel INTEGER(10),
    Mdp VARCHAR(255)
);

-- USER
CREATE TABLE IF NOT EXISTS Preinscription(
    Identifiant INTEGER(16),
    IdEquipe INTEGER(16),
    CONSTRAINT fkPréInsc1 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant),
    CONSTRAINT fkPréInsc2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe),
    CONSTRAINT pkPréInsc PRIMARY KEY (Identifiant, IdEquipe)
);

-- USER
CREATE TABLE IF NOT EXISTS Etudiant(
    NumeroEtudiant INTEGER(255) PRIMARY KEY,
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

-- RESSOURCES Doit pouvoir etre lié a plusieurs projets il nous manque le lien posseder
CREATE TABLE IF NOT EXISTS Ressources(
    IdRessource INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    UrlRessource VARCHAR(2048),
    NomRessource VARCHAR(512)
);
-- RESSOURCE A ECRIRE
CREATE TABLE IF NOT EXISTS PossederRessource(
    IdRessource INTEGER(16) AUTO_INCREMENT,
    IdProjet INTEGER(16),
    CONSTRAINT pPR PRIMARY KEY (IdRessource, IdProjet),
    CONSTRAINT fkPR1 FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet) ON DELETE CASCADE,
    CONSTRAINT fkPR2 FOREIGN KEY (IdRessource) REFERENCES Ressources (IdRessource) ON DELETE CASCADE
);
-- ------------------------------------------------

-- EVENEMENT (Notes Questionnaire)
CREATE TABLE IF NOT EXISTS NoteQuestionnaire(
    IdQuestionnaire INTEGER(16),
    IdEquipe INTEGER(16),
    Reponse VARCHAR(256),
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
-- Administrateur: --
INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('root@root.fr', 'Root', 'Root', 769030682, '$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O');
INSERT INTO Administrateur (Identifiant) VALUES (1);
-- Etudiant --
INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('etudiant@etudiant.fr', 'Etudiant', 'Etudiant', 769590682, '$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O');
INSERT INTO Etudiant VALUES (225618948, "L3", "CyTech", "Pau", 2);


-- User etudiant--
INSERT INTO User VALUES (4,"test@test.fr", "Dupont", "Jean1", "imageProfil", 0600000000, "mdp"); -- (Notre Leader equipe 1)
INSERT INTO Etudiant VALUES (00000004, "L3", "NomEcole", "NomVille", 4);
INSERT INTO User VALUES (5,"test@test.fr", "Dupont", "Jean2", "imageProfil", 0600000000, "mdp"); -- (Nos membres equipe 1)
INSERT INTO Etudiant VALUES (00000005, "M1", "NomEcole", "NomVille", 5);
INSERT INTO User VALUES (6,"test@test.fr", "Dupont", "Jean3", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000006, "L3", "NomEcole", "NomVille", 6);
INSERT INTO User VALUES (7,"test@test.fr", "Dupont", "Jean4", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000007, "M2", "NomEcole", "NomVille", 7);

-- Evenements --
INSERT INTO Evenement VALUES (1, "DataChallenge", "DataChallenge1", "Description", "1er 2000€, 2eme Switch, 3eme dictionnaire","2023-01-01", "2023-01-02");
INSERT INTO Evenement VALUES (2, "DataBattle", "DataBattle1", "Description", "1er 2000€, 2eme Switch, 3eme dictionnaire", "2023-01-03", "2023-01-04");

-- Projets --
INSERT INTO Projet VALUES (1, 1, "Projet 1", "Description", "Image", "Entreprise");
INSERT INTO Projet VALUES (2, 1, "Projet 2", "Description", "Image", "Entreprise");
INSERT INTO Projet VALUES (3, 2, "Projet 3", "Description", "Image", "Entreprise");

-- Equipe --
INSERT INTO Equipe VALUES (1, "Equipe 1", 4, 10, "lien Github", 1);
INSERT INTO Appartenir VALUES (4, 1);
INSERT INTO Appartenir VALUES (5, 1);
INSERT INTO Appartenir VALUES (6, 1);
INSERT INTO Appartenir VALUES (7, 1);

-- Ressources --
INSERT INTO Ressources VALUES (1,"test.com", "nom ressource 1");
INSERT INTO Ressources VALUES (2,"test.com", "nom ressource 2");
INSERT INTO Ressources VALUES (3,"test.com", "nom ressource 3");
INSERT INTO Ressources VALUES (4,"test.com", "nom ressource 4");

INSERT INTO PossederRessource VALUES (1,1);
INSERT INTO PossederRessource VALUES (2,2);
INSERT INTO PossederRessource VALUES (3,1);
INSERT INTO PossederRessource VALUES (4,1);

-- Questionnaires --
INSERT INTO Questionnaire VALUES (1, 1, "Titre questionnaire", "Sujet questionnaire", "2023-01-03", "2023-01-04");
INSERT INTO Questionnaire VALUES (2, 2, "Titre questionnaire", "Sujet questionnaire", "2023-01-03", "2023-01-04");
INSERT INTO Questionnaire VALUES (3, 3, "Titre questionnaire", "Sujet questionnaire", "2023-01-03", "2023-01-04");

-- Questions --
-- pour questionnaire 1
INSERT INTO Question VALUES (1, 1,"Question 1");
INSERT INTO Question VALUES (2, 1,"Question 2");
INSERT INTO Question VALUES (3, 1,"Question 3");
INSERT INTO Question VALUES (4, 1,"Question 4");