<?php
    include('include/config.php');

    $seo['title'] = "A imobiliária - {$client['nomeFantasia']}";
    $seo['description'] = "A imobiliária - Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
    $seo['keywords'] = "";
    $seo['robots'] = 'index, follow';
    $seo['image'] = "{$global['base']}img/site.png";
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