<?php
    $file = $_SERVER['QUERY_STRING'];
    $data = file_get_contents('php://input');
    $filename = "{$file}.pdf";
    $fp = fopen($filename, 'wb');

    fwrite($fp, $data);
    fclose($fp);
?>