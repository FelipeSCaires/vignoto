<?php
    include('include/config.php');

    $loader = new JetLoader;
    $data = ['card' => ['url' => "{$config['imovelBaseUrl']}?clienteid={$query['id']}&imovelreferencia={$query['ref']}&contabilizar={$config['gravarAcesso']}&buscaimovelid={$query['search']}&fotos=true&videos=true&links=true&cpsvalores=true&outrosvalores=true", 'decode' => true]];
    $loaderCard = $loader->load($data);

    if ($loaderCard['card']['success']) {
        $sanitize = new Sanitize($loaderCard);
        $sanitize->cpsValores();
        $loaderCard = $sanitize->getData();
        $card = $loaderCard['card']['data'];

        if ($global['mobile']) {
            $maximo = 3;
        } else {
            $maximo = 9;
        }

        $loader = new JetLoader;
        $request = ['similar' => ['url' => "{$config['imoveisBaseUrl']}?filtro.{$config['tipoCliente']}id={$config['id']}&filtro.tipodivulgacao={$card['imovelTipoDivulgacao']}&filtro.tipoimovelpadraoid={$card['tipoImovelPadraoId']}&filtro.bairro={$card['imovelEnderecoBairro']}&maximo={$maximo}&pagina=1", 'decode' => true]];
        $loaderSimilar = $loader->load($request);

        $seoTemplate = new JetTemplate;
        $data = array_merge($card, $siteData);

        $seo['title'] = $seoTemplate->render('{{$tipoImovelDescricao}}{if}$imovelQuartos > 0{/if} com {{$imovelQuartos}} {if}$imovelQuartos === 1{/if}quarto{else}quartos{/endif}{/endif}{if}$imovelEnderecoBairro{/if} no {{$imovelEnderecoBairro}}{/endif}{if}$imovelEnderecoCidade{/if} em {{$imovelEnderecoCidade}}{/endif}{if}$imovelEnderecoEstado{/if} / {{$imovelEnderecoEstado}}{/endif}{if}$imovelVagas > 0{/if} com {if}$imovelVagas === 1{/if}garagem{elseif}$imovelVagas > 2{/elseif}{{$imovelVagas - 2}} vagas de garagem{/endif}{/endif}{if}$imovelAreaUtil{/if}, {n}$imovelAreaUtil{/n}m²{/endif} para {{$imovelPara}} por R${if}$imovelVenda{/if} {n2}$imovelValorVenda{/n2}{/endif}{if}$imovelVenda && $imovelLocacao{/if} (venda) / R$ {/endif}{if}$imovelLocacao{/if}{if}$imovelMultaDesconto === "D"{/if} {n2}$imovelValorAluguel - $imovelValorMultaDesconto{/n2}{else} {n2}$imovelValorAluguel{/n2}{/endif}{/endif}{if}$imovelVenda && $imovelLocacao{/if} (locação){/endif}', $data);
        $seo['description'] = $seoTemplate->render('{{mb_strimwidth(str_replace("#13", " ", $imovelPontosFortes), 0, 160, "")}}', $data);
        $seo['keywords'] = '';
        $seo['robots'] = 'index, follow';
        $seo['image'] = $card['urlFotoPrincipalMedia'];
        $seo['url'] = $global['url'];

        $data = array_merge($loaderCard, $loaderSimilar, $siteData);
    } else {
        header('HTTP/1.0 404 Not Found', true, 404);

        $seo['title'] = "Imóvel não encontrado - {$client['nomeFantasia']}";
        $seo['description'] = "Comprar, vender ou alugar imóveis? As melhores opções você encontra na {$client['nomeFantasia']}";
        $seo['keywords'] = "";
        $seo['robots'] = 'noindex, nofollow';
        $seo['image'] = "{$global['base']}img/site.jpg";
        $seo['url'] = $global['url'];

        $data = array_merge($loaderCard, $siteData);
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