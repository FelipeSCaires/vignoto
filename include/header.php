<?php
    echo '<!doctype html><html lang="pt-br">';
    include('include/head.php');
    echo '<body>';

    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, '.php') . '.html', $siteData);
?>