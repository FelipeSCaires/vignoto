<?php
    ob_start();
    $file = $_SERVER['QUERY_STRING'];

    header("Content-disposition: attachment; filename={$file}");
    header('Content-type: application/pdf', false);
    readfile("{$file}.pdf");

    ob_flush();
    unlink("{$file}.pdf");
?>