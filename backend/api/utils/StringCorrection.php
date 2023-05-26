<?php
    function verifyStringToDatabaseInsertion($entry){
        $exit1 = str_replace("'", "\'", $entry);
        $exit = str_replace('"', '\"', $exit1);
        return $exit;
    }
?>