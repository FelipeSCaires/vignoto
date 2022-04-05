<?php
    /**
     * variables
     */
    $global['ajax'] = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) === 'XMLHTTPREQUEST';
    $global['protocol'] = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
    $global['host'] = $_SERVER['HTTP_HOST'];
    $global['domain'] = "{$global['protocol']}{$global['host']}";
    $global['path'] = $global['ajax'] ? rawurldecode($_POST['url']) : rawurldecode($_SERVER['REQUEST_URI']);
    $global['url'] = "{$global['domain']}{$global['path']}";
    $global['dir'] = basename(getcwd());
    $global['published'] = strpos($global['host'], 'localhost') === false && strpos($global['host'], 'hangar') === false;
    $global['agent'] = $_SERVER['HTTP_USER_AGENT'];
    $global['root'] = $global['published'] ? '' : "/{$global['dir']}";
    $global['base'] = "{$global['domain']}{$global['root']}/";
    $global['mobile'] = preg_match('/(android|mobi)/i', $global['agent']);

    /**
     * options
     */
    $config['creci'] = '0000-0';
    $config['color'] = '#5700C9';
    $config['tipoCliente'] = 'cliente';
    $config['idCliente'] = 360;
    $config['idParceria'] = 706;
    $config['id'] = $config['tipoCliente'] === 'cliente' ? $config['idCliente'] : $config['idParceria'];
    $config['weekdayHours'] = 'Segunda à Sexta das 08h30 às 18h00';
    $config['weekendHours'] = 'Sábado das 09h00 às 13h00';

    /**
     * search
     */
    $config['imovelpara'] = 'v';
    $config['imoveisPagina'] = 12;
    $config['ordenacao'] = 'imovelvalor';
    $config['ascdesc'] = 'desc';
    $config['salvarPesquisa'] = $global['published'] ? 'true' : 'false';
    $config['gravarAcesso'] = $global['published'] ? 'true' : 'false';

    /**
     * api
     */
    $config['apiBaseUrl'] = 'https://apiimoveisv3.casasoftsig.com/api/v3/';
    $config['imoveisBaseUrl'] = $config['apiBaseUrl'] . 'imoveis/pesquisa';
    $config['compararBaseUrl'] = $config['apiBaseUrl'] . 'imoveis/comparar';
    $config['favoritosBaseUrl'] = $config['apiBaseUrl'] . 'imoveisfavoritos/pesquisar';
    $config['imovelBaseUrl'] = $config['apiBaseUrl'] . 'imoveis/ficha';
    $config['lancamentosBaseUrl'] = $config['apiBaseUrl'] . 'imoveis/empreendimento';
    $config['lancamentoBaseUrl'] = $config['lancamentosBaseUrl'] . '/ficha';
    $config['unidadesBaseUrl'] = $config['lancamentosBaseUrl'] . '/unidades';
    $config['filterBaseUrl'] = $config['apiBaseUrl'] . 'imoveis/filtros';
    $config['clienteBaseUrl'] = $config['filterBaseUrl'] . '/imobiliarias';
    $config['pcoBaseUrl'] = 'https://pco.casasoftsig.com/v102/';

    /**
     * pages
     */
    $config['pageHome'] = $global['published'] ? '/' : "{$global['root']}/";
    $config['pages'] = [
        ['imoveis', 'List'],
        ['imovel', 'Card'],
        ['lancamentos', 'Release'],
        ['lancamento', 'Card'],
        ['favoritos'],
        ['comparar'],
        ['anuncie-imovel'],
        ['como-alugar'],
        ['sobre'],
        ['contato'],
        ['trabalhe-conosco'],
        ['sou-cliente', 'Client'],
        ['alterar-senha', 'Client'],
        ['aviso', 'Client'],
        ['proprietario', 'Client'],
        ['proprietario/extrato', 'Client'],
        ['proprietario/ir', 'Client'],
        ['proprietario/ir/demonstrativo', 'Client'],
        ['inquilino', 'Client'],
        ['inquilino/ir', 'Client'],
        ['inquilino/ir/demonstrativo', 'Client']
    ];

    /**
     * filters
     */
    $config['filters'] = [
        ['tipoimovel'],
        ['cidades'],
        ['bairros', ['cidade']],
        ['regiaocidade']
    ];

    /**
     * main
     */
    include('include/main.php');
?>