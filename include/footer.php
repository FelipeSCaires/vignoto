<?php
    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, '.php') . '.html', $siteData);

    include('include/body.php');
    echo '</body></html>';
?>