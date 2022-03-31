<?php
    include('include/config.php');

    $seo['title'] = "Sou cliente - Aviso - {$client['nomeFantasia']}";
    $seo['description'] = "Facilidade para inquilinos e proprietários, acesse seus extratos e boletos - {$client['nomeFantasia']}";
    $seo['keywords'] = "";
    $seo['robots'] = 'index, follow';
    $seo['image'] = "{$global['base']}img/site.jpg";
    $seo['url'] = $global['url'];

    if (!$global['ajax']) {
        include('include/header.php');
    }

    $data = array_merge(['user' => $_SESSION['user']], $siteData);
    
    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, 'php') . 'html', $data);
    
    $buffer->end($siteData, $seo);

    if (!$global['ajax']) {
        include('include/footer.php');
    }
?>