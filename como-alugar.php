<?php
    include('include/config.php');

    $seo['title'] = "Como alugar - {$client['nomeFantasia']}";
    $seo['description'] = "Como alugar - Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
    $seo['keywords'] = "";
    $seo['robots'] = 'index, follow';
    $seo['image'] = "{$global['base']}img/site.jpg";
    $seo['url'] = $global['url'];

    if (!$global['ajax']) {
        include('include/header.php');
    }
    
    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, 'php') . 'html', $siteData);
    
    $buffer->end($siteData, $seo);

    if (!$global['ajax']) {
        include('include/footer.php');
    }
?>