<?php
    include('include/config.php');

    $query['user'] = isset($query['user']) ? $query['user'] : '';
    $page = strstr($global['url'], 'pagina') ? explode('?', explode('pagina-', $global['url'])[1])[0] : 1;

    $loader = new JetLoader;
    $request = ['favorite' => ['url' => "{$config['favoritosBaseUrl']}?filtro.{$config['tipoCliente']}id={$config['id']}&filtro.email={$query['user']}&ordenacao={$config['ordenacao']}&ascdesc={$config['ascdesc']}&maximo={$config['imoveisPagina']}&pagina={$page}", 'decode' => true]];
    $loader = $loader->load($request);

    $data = array_merge($loader, ['page' => $page], $siteData);

    $seo['title'] = "Favoritos - {$client['nomeFantasia']}";
    $seo['description'] = "Favoritos - Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
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