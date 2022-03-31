<?php
    include('include/config.php');
    
    if ($global['mobile']) {
        $maximo = 3;
    } else {
        $maximo = 9;
    }

    $request = [
        'offerBuy' => ['url' => "{$config['imoveisBaseUrl']}?filtro.{$config['tipoCliente']}id={$config['id']}&fotos=true&filtro.tipodivulgacao=v&maximo={$maximo}&pagina=1", 'decode' => true],
        'offerRent' => ['url' => "{$config['imoveisBaseUrl']}?filtro.{$config['tipoCliente']}id={$config['id']}&fotos=true&filtro.tipodivulgacao=l&maximo={$maximo}&pagina=1", 'decode' => true],
    ];

    $loader = new JetLoader;
    $loader = $loader->load($request);
    $data = array_merge($loader, $siteData);

    $seo['title'] = "Home - {$client['nomeFantasia']}";
    $seo['description'] = "Home - Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
    $seo['keywords'] = "";
    $seo['robots'] = 'index, follow';
    $seo['image'] = "{$global['base']}img/site.jpg";
    $seo['url'] = $global['url'];

    if (!$global['ajax']) {
        include('include/header.php');
    }

    
    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, 'php') . 'html', $data);
    
    $buffer->end($siteData, $seo);

    if (!$global['ajax']) {
        include('include/footer.php');
    }
?>