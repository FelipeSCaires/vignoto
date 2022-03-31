<?php
    include('include/config.php');

    $loader = new JetLoader;
    $data = ['launch' => ['url' => "{$config['lancamentoBaseUrl']}?clienteid={$config['id']}&empid={$query['cod']}&fotos=true&videos=true&links=true&cpsvalores=true", 'decode' => true]];
    $loaderLaunch = $loader->load($data);

    if ($loaderLaunch['launch']['success']) {
        $sanitize = new Sanitize($loaderLaunch, 'launch');
        $sanitize->cpsValores();
        $loaderLaunch = $sanitize->getData();
        $launch = $loaderLaunch['launch']['data'];

        if ($global['mobile']) {
            $maximo = 3;
        } else {
            $maximo = 9;
        }

        $loader = new JetLoader;
        $request = ['unity' => ['url' => "{$config['unidadesBaseUrl']}?filtro.{$config['tipoCliente']}id={$config['id']}&filtro.empid={$query['cod']}&maximo={$maximo}&pagina=1", 'decode' => true]];
        $loaderUnity = $loader->load($request);

        $seoTemplate = new JetTemplate;
        $data = array_merge($launch, $siteData);

        $seo['title'] = $seoTemplate->render('Lançamento - {{$empEdificio}}', $data);
        $seo['description'] = $seoTemplate->render('{{mb_strimwidth(str_replace("#13", " ", $empPontosFortes), 0, 160, "")}}', $data);
        $seo['keywords'] = '';
        $seo['robots'] = 'index, follow';
        $seo['image'] = $launch['urlFotoPrincipalMedia'];
        $seo['url'] = $global['url'];

        $data = array_merge($loaderLaunch, $loaderUnity, $siteData);
    } else {
        header('HTTP/1.0 404 Not Found', true, 404);
        
        $seo['title'] = "Imóvel não encontrado - {$client['nomeFantasia']}";
        $seo['description'] = "Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
        $seo['keywords'] = "";
        $seo['robots'] = 'noindex, nofollow';
        $seo['image'] = "{$global['base']}img/site.jpg";
        $seo['url'] = $global['url'];

        $data = array_merge($loaderLaunch, $siteData);
    }

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