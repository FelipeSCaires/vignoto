<?php
    include('include/config.php');

    if (!isset($_SESSION['token'])) {
        header("location: {$config['pageSouCliente']}");
    }

    $loader = new JetLoader;
    $request = ['owner' => ['url' => "{$config['pcoBaseUrl']}api/prestacao-contas/proprietarios/" . trim($_SESSION['user']['dados']['ClienteReferencia']) . "/extratos", 'decode' => true]];
    $header = ["Authorization: bearer {$_SESSION['token']}"];
    $options = [CURLOPT_HTTPHEADER => $header];
    $loader = $loader->load($request, $options);

    $data = array_merge($loader, ['user' => $_SESSION['user']], $siteData);

    $seo['title'] = "Sou cliente - Proprietário - {$client['nomeFantasia']}";
    $seo['description'] = "Facilidade para inquilinos e proprietários, acesse seus extratos e boletos - {$client['nomeFantasia']}";
    $seo['keywords'] = "";
    $seo['robots'] = 'noindex, nofollow';
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