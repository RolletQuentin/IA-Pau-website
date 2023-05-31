
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
    Reponse VARCHAR(2048),
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
-- Ceux de l'équipe 1 (Sur DataBattle)
INSERT INTO User VALUES (4,"test@test.fr", "Dupont", "Jean", "imageProfil", 0600000000, "mdp"); -- (Notre Leader equipe 1)
INSERT INTO Etudiant VALUES (00000004, "L3", "NomEcole", "NomVille", 4);
INSERT INTO User VALUES (5,"test@test.fr", "Dupont", "Paul", "imageProfil", 0600000000, "mdp"); -- (Nos membres equipe 1)
INSERT INTO Etudiant VALUES (00000005, "M1", "NomEcole", "NomVille", 5);
INSERT INTO User VALUES (6,"test@test.fr", "Dupont", "Bob", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000006, "L3", "NomEcole", "NomVille", 6);
INSERT INTO User VALUES (7,"test@test.fr", "Dupont", "Quentin", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000007, "M2", "NomEcole", "NomVille", 7);
-- Ceux de l'équipe 2 (Sur DataBattle)
INSERT INTO User VALUES (8, "test@test.fr", "Martin", "Sophie", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000008, "L3", "NomEcole", "NomVille", 8);
INSERT INTO User VALUES (9, "test@test.fr", "Lefebvre", "Alexandre", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000009, "M1", "NomEcole", "NomVille", 9);
INSERT INTO User VALUES (10, "test@test.fr", "Dubois", "Emma", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000010, "L3", "NomEcole", "NomVille", 10);
INSERT INTO User VALUES (11, "test@test.fr", "Roux", "Lucas", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000011, "M2", "NomEcole", "NomVille", 11);
-- Ceux de l'équipe 3 (Sur DataChallenge1 Projet 1)
INSERT INTO User VALUES (12, "test@test.fr", "Leclerc", "Camille", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000012, "L3", "NomEcole", "NomVille", 12);
INSERT INTO User VALUES (13, "test@test.fr", "Girard", "Inès", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000013, "M1", "NomEcole", "NomVille", 13);
INSERT INTO User VALUES (14, "test@test.fr", "Fournier", "Arthur", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000014, "L3", "NomEcole", "NomVille", 14);
INSERT INTO User VALUES (15, "test@test.fr", "Moreau", "Léa", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000015, "M2", "NomEcole", "NomVille", 15);
-- Ceux de l'équipe 4 (Sur DataChallenge1 Projet 2)
INSERT INTO User VALUES (16, "test@test.fr", "Dupuis", "Maxime", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000016, "L3", "NomEcole", "NomVille", 16);
INSERT INTO User VALUES (17, "test@test.fr", "Marchand", "Laura", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000017, "M1", "NomEcole", "NomVille", 17);
INSERT INTO User VALUES (18, "test@test.fr", "Noel", "Antoine", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000018, "L3", "NomEcole", "NomVille", 18);
INSERT INTO User VALUES (19, "test@test.fr", "Lemoine", "Julie", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000019, "M2", "NomEcole", "NomVille", 19);
-- Ceux de l'équipe 5 (Sur DataChallenge2 Projet 1)
INSERT INTO User VALUES (20, "test@test.fr", "Roy", "Nicolas", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000020, "L3", "NomEcole", "NomVille", 20);
INSERT INTO User VALUES (21, "test@test.fr", "Morin", "Catherine", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000021, "M1", "NomEcole", "NomVille", 21);
INSERT INTO User VALUES (22, "test@test.fr", "Gagnon", "Thomas", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000022, "L3", "NomEcole", "NomVille", 22);
INSERT INTO User VALUES (23, "test@test.fr", "Bouchard", "Mathilde", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000023, "M2", "NomEcole", "NomVille", 23);
-- Ceux de l'équipe 6 (Sur DataChallenge2 Projet 2)
INSERT INTO User VALUES (24, "test@test.fr", "Fortin", "Alexis", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000024, "L3", "NomEcole", "NomVille", 24);
INSERT INTO User VALUES (25, "test@test.fr", "Laplante", "Emma", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000025, "M1", "NomEcole", "NomVille", 25);
INSERT INTO User VALUES (26, "test@test.fr", "Dejardin", "Maxime", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000026, "L3", "NomEcole", "NomVille", 26);
INSERT INTO User VALUES (27, "test@test.fr", "Lamoureux", "Sophie", "imageProfil", 0600000000, "mdp");
INSERT INTO Etudiant VALUES (00000027, "M2", "NomEcole", "NomVille", 27);

-- User Gestionnaire (Si interne date > 2100)
INSERT INTO User VALUES (28, "test@test.fr", "Rimaudiere", "Arthur", "imageProfil", 0600000000, "mdp");
INSERT INTO Gestionnaire VALUES (1, "NomEntreprise", "Ville", "2023-06-01", "2023-06-17", 28);
INSERT INTO User VALUES (29, "test@test.fr", "Quentin", "Rollet", "imageProfil", 0600000000, "mdp");
INSERT INTO Gestionnaire VALUES (2, "IaPau", "Ville", "2023-01-01", "2100-12-31", 29);
INSERT INTO User VALUES (30, "test@test.fr", "Valentin", "Noailles", "imageProfil", 0600000000, "mdp");
INSERT INTO Gestionnaire VALUES (3, "IaPau", "Ville", "2023-01-01", "2100-12-31", 30);

-- Evenements --
INSERT INTO Evenement VALUES (1, "DataChallenge", "DataChallenge1", "Description", "1er 2000€, 2eme 1000€, 3eme 500€","2023-06-10", "2023-06-11");
INSERT INTO Evenement VALUES (2, "DataBattle", "DataBattle1", "Description", "1er 5000€, 2eme 3000€, 3eme 1000€", "2023-07-01", "2023-07-31");
INSERT INTO Evenement VALUES (3, "DataChallenge", "DataChallenge2", "Description", "1er 3500€, 2eme 2000€, 3eme 1000€","2023-06-17", "2023-06-18");

-- Projets --
INSERT INTO Projet VALUES (1, 2, "Nom du projet du DataBattle", "Description", "Image", "Entreprise"); -- Projet du DataBattle
INSERT INTO Projet VALUES (2, 1, "Projet 1", "Description", "Image", "Entreprise"); -- Projets dataChallenge 1
INSERT INTO Projet VALUES (3, 1, "Projet 2", "Description", "Image", "Entreprise");
INSERT INTO Projet VALUES (4, 1, "Projet 3", "Description", "Image", "Entreprise");
INSERT INTO Projet VALUES (5, 1, "Projet 1", "Description", "Image", "Entreprise"); -- Projets dataChallenge 2
INSERT INTO Projet VALUES (6, 1, "Projet 2", "Description", "Image", "Entreprise");

-- Gestionnaire par projet
INSERT INTO Gerer VALUES (1,1);
INSERT INTO Gerer VALUES (2,1);
INSERT INTO Gerer VALUES (3,2);

-- Equipe 1 --
INSERT INTO Equipe VALUES (1, "Equipe 1", 4, 10, "lien Github", 1);
INSERT INTO Appartenir VALUES (4, 1);
INSERT INTO Appartenir VALUES (5, 1);
INSERT INTO Appartenir VALUES (6, 1);
INSERT INTO Appartenir VALUES (7, 1);
-- Equipe 2 --
INSERT INTO Equipe VALUES (2, "Equipe 2", 8, 14, "lien Github", 1);
INSERT INTO Appartenir VALUES (8, 2);
INSERT INTO Appartenir VALUES (9, 2);
INSERT INTO Appartenir VALUES (10, 2);
INSERT INTO Appartenir VALUES (11, 2);
-- Equipe 3 --
INSERT INTO Equipe VALUES (3, "Equipe 3", 12, 18, "lien Github", 2);
INSERT INTO Appartenir VALUES (12, 3);
INSERT INTO Appartenir VALUES (13, 3);
INSERT INTO Appartenir VALUES (14, 3);
INSERT INTO Appartenir VALUES (15, 3);
-- Equipe 4 --
INSERT INTO Equipe VALUES (4, "Equipe 4", 16, 6, "lien Github", 3);
INSERT INTO Appartenir VALUES (16, 4);
INSERT INTO Appartenir VALUES (17, 4);
INSERT INTO Appartenir VALUES (18, 4);
INSERT INTO Appartenir VALUES (19, 4);
-- Equipe 5 --
INSERT INTO Equipe VALUES (5, "Equipe 5", 20, 12, "lien Github", 5);
INSERT INTO Appartenir VALUES (20, 5);
INSERT INTO Appartenir VALUES (21, 5);
INSERT INTO Appartenir VALUES (22, 5);
INSERT INTO Appartenir VALUES (23, 5);
-- Equipe 6 --
INSERT INTO Equipe VALUES (6, "Equipe 6", 24, 19, "lien Github", 6);
INSERT INTO Appartenir VALUES (24, 6);
INSERT INTO Appartenir VALUES (25, 6);
INSERT INTO Appartenir VALUES (26, 6);
INSERT INTO Appartenir VALUES (27, 6);

-- Ressources --
-- Ressources Projet 1
INSERT INTO Ressources VALUES (1,"test.consignes.fr", "Cosigne");
INSERT INTO Ressources VALUES (2,"test.conseils.fr", "Conseils");
INSERT INTO Ressources VALUES (3,"test.videoPrensentation.fr", "Vidéo présentation");
INSERT INTO Ressources VALUES (4,"test.fichier1.fr", "fichier1");
INSERT INTO PossederRessource VALUES (1,1);
INSERT INTO PossederRessource VALUES (2,1);
INSERT INTO PossederRessource VALUES (3,1);
INSERT INTO PossederRessource VALUES (4,1);
-- Ressources Projet 2
INSERT INTO Ressources VALUES (5,"test.consignes2.fr", "Cosigne Projet 2");
INSERT INTO Ressources VALUES (6,"test.conseils2.fr", "Conseils Projet 2");
INSERT INTO Ressources VALUES (7,"test.videoPrensentation2.fr", "Vidéo présentation Projet 2");
INSERT INTO Ressources VALUES (8,"test.fichier2.fr", "fichier2 Projet 2");
INSERT INTO PossederRessource VALUES (5,2);
INSERT INTO PossederRessource VALUES (6,2);
INSERT INTO PossederRessource VALUES (7,2);
INSERT INTO PossederRessource VALUES (8,2);
-- Ressources Projet 3
INSERT INTO Ressources VALUES (9,"test.consignes3.fr", "Cosigne Projet 3");
INSERT INTO Ressources VALUES (10,"test.conseils3.fr", "Conseils Projet 3");
INSERT INTO Ressources VALUES (11,"test.videoPrensentation3.fr", "Vidéo présentation Projet 3");
INSERT INTO Ressources VALUES (12,"test.fichier3.fr", "fichier3 Projet 3");
INSERT INTO PossederRessource VALUES (9,3);
INSERT INTO PossederRessource VALUES (10,3);
INSERT INTO PossederRessource VALUES (11,3);
INSERT INTO PossederRessource VALUES (12,3);
-- Ressources Projet 4
INSERT INTO Ressources VALUES (13,"test.consignes4.fr", "Cosigne Projet 4");
INSERT INTO Ressources VALUES (14,"test.conseils4.fr", "Conseils Projet 4");
INSERT INTO Ressources VALUES (15,"test.videoPrensentation4.fr", "Vidéo présentation Projet 4");
INSERT INTO Ressources VALUES (16,"test.fichier4.fr", "fichier4 Projet 4");
INSERT INTO PossederRessource VALUES (13,4);
INSERT INTO PossederRessource VALUES (14,4);
INSERT INTO PossederRessource VALUES (15,4);
INSERT INTO PossederRessource VALUES (16,4);
-- Ressources Projet 5
INSERT INTO Ressources VALUES (17,"test.consignes5.fr", "Cosigne Projet 5");
INSERT INTO Ressources VALUES (18,"test.conseils5.fr", "Conseils Projet 5");
INSERT INTO Ressources VALUES (19,"test.videoPrensentation5.fr", "Vidéo présentation Projet 5");
INSERT INTO Ressources VALUES (20,"test.fichier5.fr", "fichier5 Projet 5");
INSERT INTO PossederRessource VALUES (17,5);
INSERT INTO PossederRessource VALUES (18,5);
INSERT INTO PossederRessource VALUES (19,5);
INSERT INTO PossederRessource VALUES (20,5);
-- Ressources Projet 6
INSERT INTO Ressources VALUES (21,"test.consignes6.fr", "Cosigne Projet 6");
INSERT INTO Ressources VALUES (22,"test.conseils6.fr", "Conseils Projet 6");
INSERT INTO Ressources VALUES (23,"test.videoPrensentation6.fr", "Vidéo présentation Projet 6");
INSERT INTO Ressources VALUES (24,"test.fichier6.fr", "fichier6 Projet 6");
INSERT INTO PossederRessource VALUES (21,6);
INSERT INTO PossederRessource VALUES (22,6);
INSERT INTO PossederRessource VALUES (23,6);
INSERT INTO PossederRessource VALUES (24,6);

-- Questionnaires pour DataBattle1 --
INSERT INTO Questionnaire VALUES (1, 1, "Titre questionnaire1", "Sujet questionnaire", "2023-07-01", "2023-07-08");
INSERT INTO Questionnaire VALUES (2, 1, "Titre questionnaire2", "Sujet questionnaire", "2023-07-08", "2023-07-15");
INSERT INTO Questionnaire VALUES (3, 1, "Titre questionnaire3", "Sujet questionnaire", "2023-07-15", "2023-07-22");
INSERT INTO Questionnaire VALUES (4, 1, "Titre questionnaire4", "Sujet questionnaire", "2023-07-22", "2023-07-29");
-- Questions --
-- pour questionnaire 1
INSERT INTO Question VALUES (1, 1,"Question 1");
INSERT INTO Question VALUES (2, 1,"Question 2");
INSERT INTO Question VALUES (3, 1,"Question 3");
INSERT INTO Question VALUES (4, 1,"Question 4");
-- pour questionnaire 2
INSERT INTO Question VALUES (5, 2, "Question 1");
INSERT INTO Question VALUES (6, 2, "Question 2");
INSERT INTO Question VALUES (7, 2, "Question 3");
INSERT INTO Question VALUES (8, 2, "Question 4");
-- pour questionnaire 3
INSERT INTO Question VALUES (9, 3, "Question 1");
INSERT INTO Question VALUES (10, 3, "Question 2");
INSERT INTO Question VALUES (11, 3, "Question 3");
INSERT INTO Question VALUES (12, 3, "Question 4");
-- pour questionnaire 4
INSERT INTO Question VALUES (13, 4, "Question 1");
INSERT INTO Question VALUES (14, 4, "Question 2");
INSERT INTO Question VALUES (15, 4, "Question 3");
INSERT INTO Question VALUES (16, 4, "Question 4");
-- Réponse questionaire par équipe 1 -- A IMPLEMENTER