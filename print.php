<?php
    include('include/config.php');

    $loader = new JetLoader;
    $request = ['card' => ['url' => "{$config['imovelBaseUrl']}?clienteid={$query['id']}&imovelreferencia={$query['ref']}&outrosValores=true&cpsValores=true", 'decode' => true]];
    $loader = $loader->load($request);
    $sanitize = new Sanitize($loader);
    $sanitize->cpsValores();
    $loader = $sanitize->getData();

    $data = array_merge($loader, $siteData);

    echo "<title>Ficha de impressão - {$client['nomeFantasia']}</title>";
    echo "<link href='{$global['base']}css/print.css' rel='stylesheet'>";

    $template = new JetTemplate;
    $template->render('template/' . basename(__FILE__, 'php') . 'html', $data);

    echo '<script>window.onload = () => {setTimeout(() => {window.print(); window.close();}, 150)}</script>';
?>