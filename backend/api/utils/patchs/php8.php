<?php

if (!function_exists('str_contains')) {
    function str_contains($haystack, $needle)
    {
        return (strpos($haystack, $needle) !== false);
    }
}

?>