<?php
    require_once('../../vendor/autoload.php');
    include_once('../utils/permissionManager.php');
    include_once('../utils/StringCorrection.php');

    include_once('../utils/database.php');
    
    function getUsersInEvenement($IdEvent){
        $IdEvenement = verifyStringToDatabaseInsertion($IdEvent);
        $conn = getConnection();
        $query = "SELECT IdEquipe FROM Evenement AS e INNER JOIN Projet AS p ON e.IdEvenement = p.IdEvenement INNER JOIN Equipe AS eq ON eq.IdProjet = p.IdProjet WHERE e.IdEvenement = " . $IdEvenement .";";
        $result = mysqli_query($conn, $query);
        $array = array();
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_array($result)){
                $query2 = "SELECT * FROM Appartenir WHERE IdEquipe = " . $row["IdEquipe"] . ";";
                $result2 = mysqli_query($conn, $query2);
                if(mysqli_num_rows($result2) > 0){
                    while($row2 = mysqli_fetch_array($result2)){
                        if(!(in_array(array("id"=>$row2["Identifiant"]), $array))){
                            array_push($array, array("id"=>$row2["Identifiant"]));
                        }
                    }
                }
            }
        }
        http_response_code(200);
        echo json_encode($array);
    }

?>