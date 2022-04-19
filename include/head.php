<head>
    <!-- metatags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="author" content="Paper Plane Design Studio®">
    <meta name="theme-color" content="<?= $config['color'] ?>">
    <base href="<?= $global['base'] ?>">
    
    <!-- search engine -->
    <title><?= $seo['title'] ?></title>
    <meta name="description" content="<?= $seo['description'] ?>">
    <meta name="keywords" content="<?= $seo['keywords'] ?>">
    <meta name="robots" content="<?= $global['published'] ? $seo['robots'] : 'noindex, nofollow' ?>">

    <!-- schema.org for google -->
    <meta itemprop="name" content="<?= $client['nomeFantasia'] ?>">
    <meta itemprop="description" content="<?= $seo['description'] ?>">
    <meta itemprop="image" content="<?= $seo['image'] ?>">

    <!-- twitter -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="">
    <meta name="twitter:creator" content="">
    <meta name="twitter:url" content="<?= $seo['url'] ?>">
    <meta name="twitter:title" content="<?= $seo['title'] ?>">
    <meta name="twitter:description" content="<?= $seo['description'] ?>">
    <meta name="twitter:image" content="<?= $seo['image'] ?>">

    <!-- open graph general (facebook & pinterest) -->
    <meta name="og:type" content="website">
    <meta name="og:url" content="<?= $seo['url'] ?>">
    <meta name="og:title" content="<?= $seo['title'] ?>">
    <meta name="og:image" content="<?= $seo['image'] ?>">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="og:description" content="<?= $seo['description'] ?>">
    <meta name="og:siteName" content="<?= $client['nomeFantasia'] ?>">
    <meta name="og:locale" content="pt_BR">

    <!-- favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="mask-icon" href="svg/safari-pinned-tab.svg" color="#da2128">
    <link rel="shortcut icon" href="img/favicon.ico">

    <!-- windows tiles -->
    <meta name="application-name" content="<?= $client['nomeFantasia'] ?>">
    <meta name="msapplication-TileColor" content="<?= $config['color'] ?>">
    <meta name="msapplication-config" content="xml/browserconfig.xml">

    <!-- preconnect -->
    <!-- <link rel="preload" href="font/OpenSans-Regular.woff2" as="font" crossorigin>
    <link rel="preload" href="font/OpenSans-Bold.woff2" as="font" crossorigin> -->

    <!-- css -->
    <link rel="stylesheet" href="css/bundle.min.css">

    <!-- canonical -->
    <link rel="canonical" href="<?= $seo['url'] ?>">

    <!-- app manifest -->
    <link rel="manifest" href="json/manifest.json">

    <!-- schema.org -->
    <script type="application/ld+json">
        {"@context":"https://schema.org","@type":"RealEstateAgent","logo":"img/logo-print.png","image":"<?= $global['base'] ?>img/site.png","url":"<?= $global['base'] ?>","@id":"<?= $global['base'] ?>","name":"<?= $client['nomeFantasia'] ?>","telephone":"(<?= $client['ddd'] ?>) <?= $client['telefone'] ?>","email":"<?= $client['email'] ?>","description":"<?= $seo['description'] ?>","address":{"@type":"PostalAddress","streetAddress":"<?= $client['endereco'] ?>","addressLocality":"<?= $client['cidade'] ?>","addressRegion":"<?= $client['estado'] ?>","postalCode":"<?= $client['cep'] ?>","addressCountry":"Brasil"}}
    </script>
</head>