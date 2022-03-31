<?php
    include('php/autoload.php');
    session_start();
    
    if ($global['published']) {
        error_reporting(0);
    }

    $autoload = new Autoload;
    $buffer = new Buffer;
    $variables = new Variables;
    $client = new Client;
    
    $buffer->start($global);
    $config = $variables->create($global, $config);
    $client = $client->create($global, $config);
    parse_str(parse_url($global['url'], PHP_URL_QUERY), $query);
    $siteData = ['global' => $global, 'config' => $config, 'client' => $client, 'query' => $query];
?>