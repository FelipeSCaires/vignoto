<?php
    include('include/config.php');
    
    $parameters = new Parameters($siteData);
    $parameters = $parameters->get();
    $urlApi = http_build_query($parameters);

    function recursiveRender($global, $config, $buffer, $urlApi, $siteData, $parameters, $client, $result = true) {
        $loader = new JetLoader;
        $request = ['list' => ['url' => "{$config['imoveisBaseUrl']}?{$urlApi}&ordenacao={$config['ordenacao']}&ascdesc={$config['ascdesc']}&maximo={$config['imoveisPagina']}&filtro.salvarpesquisa={$config['salvarPesquisa']}", 'decode' => true]];
        $loader = $loader->load($request);
        $list = $loader['list']['data'];

        if ($list['total'] > 0) {
            $data = array_merge($list, ['parameters' => $parameters], ['client' => $client]);

            $seoTemplate = new JetTemplate;
            $seo['title'] = $seoTemplate->render('{if}$parameters["filtro.tiposimoveis"]{/if}{{ucfirst(str_replace(",",", ",$parameters["filtro.tiposimoveis"]))}}{else}{if}$total > 1{/if}Imóveis{else}Imóvel{/endif}{/endif}{if}$parameters["filtro.mobiliado"]{/if} {{$parameters["filtro.mobiliado"]}}{/endif}{if}$parameters["filtro.tipodivulgacao"]{/if}{if}$parameters["filtro.tipodivulgacao"] === "v"{/if} à venda{else} para locação{/endif}{/endif}{if}$parameters["filtro.bairro"]{/if} no {{str_replace(",",", ",$parameters["filtro.bairro"])}}{/endif}{if}$parameters["filtro.cidade"]{/if} em {{str_replace(",",", ",$parameters["filtro.cidade"])}}{/endif}{if}$parameters["filtro.estado"]{/if} / {{strtoupper(str_replace(",",", ",$parameters["filtro.estado"]))}}{/endif}{if}$parameters["filtro.quarto"]{/if} com {{$parameters["filtro.quarto"]}} {if}$parameters["filtro.quarto"] === 1{/if}quarto{else}quartos{/endif}{/endif}{if}$parameters["filtro.quartoini"]{/if} com {{$parameters["filtro.quartoini"]}} ou mais quartos{/endif}{if}$parameters["filtro.suite"]{/if} com {{$parameters["filtro.suite"]}} {if}$parameters["filtro.suite"] === 1{/if}suíte{else}suítes{/endif}{/endif}{if}$parameters["filtro.suiteini"]{/if} com {{$parameters["filtro.suiteini"]}} ou mais suítes{/endif}{if}$parameters["filtro.banheiro"]{/if} com {{$parameters["filtro.banheiro"]}} {if}$parameters["filtro.banheiro"] === 1{/if}banheiro{else}banheiros{/endif}{/endif}{if}$parameters["filtro.banheiroini"]{/if} com {{$parameters["filtro.banheiroini"]}} ou mais banheiros{/endif}{if}$parameters["filtro.vagagaragem"]{/if} com {{$parameters["filtro.vagagaragem"] - 2}} {if}($parameters["filtro.vagagaragem"] - 2) === 1{/if} com garagem{else} vagas de garagem{/endif}{/endif}{if}$parameters["filtro.vagaini"]{/if} com {{$parameters["filtro.vagaini"] - 2}} ou mais vagas de garagem{/endif}{if}$parameters["filtro.valorminimo"]{/if} de R$ {n2}$parameters["filtro.valorminimo"]{/n2}{/endif}{if}$parameters["filtro.valormaximo"]{/if} até R$ {n2}$parameters["filtro.valormaximo"]{/n2}{/endif}{if}$parameters["filtro.areatotalminima"]{/if} de {n}$parameters["filtro.areatotalminima"]{/n}m²{/endif}{if}$parameters["filtro.areatotalmaxima"]{/if} até {n}$parameters["filtro.areatotalmaxima"]{/n}m²{/endif} - {{$client["nomeFantasia"]}}', $data);
            $seo['description'] = $seoTemplate->render('Na {{$client["nomeFantasia"]}} temos {n}$total{/n} {if}$parameters["filtro.tiposimoveis"]{/if}{{ucfirst(str_replace(",",", ",$parameters["filtro.tiposimoveis"]))}}{else}{if}$total > 1{/if}Imóveis{else}Imóvel{/endif}{/endif}{if}$parameters["filtro.mobiliado"]{/if} {{$parameters["filtro.mobiliado"]}}{/endif}{if}$parameters["filtro.tipodivulgacao"]{/if}{if}$parameters["filtro.tipodivulgacao"] === "v"{/if} à venda{else} para locação{/endif}{/endif}{if}$parameters["filtro.bairro"]{/if} no {{str_replace(",",", ",$parameters["filtro.bairro"])}}{/endif}{if}$parameters["filtro.cidade"]{/if} em {{str_replace(",",", ",$parameters["filtro.cidade"])}}{/endif}{if}$parameters["filtro.estado"]{/if} / {{strtoupper(str_replace(",",", ",$parameters["filtro.estado"]))}}{/endif}{if}$parameters["filtro.quarto"]{/if} com {{$parameters["filtro.quarto"]}} {if}$parameters["filtro.quarto"] === 1{/if}quarto{else}quartos{/endif}{/endif}{if}$parameters["filtro.quartoini"]{/if} com {{$parameters["filtro.quartoini"]}} ou mais quartos{/endif}{if}$parameters["filtro.suite"]{/if} com {{$parameters["filtro.suite"]}} {if}$parameters["filtro.suite"] === 1{/if}suíte{else}suítes{/endif}{/endif}{if}$parameters["filtro.suiteini"]{/if} com {{$parameters["filtro.suiteini"]}} ou mais suítes{/endif}{if}$parameters["filtro.banheiro"]{/if} com {{$parameters["filtro.banheiro"]}} {if}$parameters["filtro.banheiro"] === 1{/if}banheiro{else}banheiros{/endif}{/endif}{if}$parameters["filtro.banheiroini"]{/if} com {{$parameters["filtro.banheiroini"]}} ou mais banheiros{/endif}{if}$parameters["filtro.vagagaragem"]{/if} com {{$parameters["filtro.vagagaragem"] - 2}} {if}($parameters["filtro.vagagaragem"] - 2) === 1{/if} com garagem{else} vagas de garagem{/endif}{/endif}{if}$parameters["filtro.vagaini"]{/if} com {{$parameters["filtro.vagaini"] - 2}} ou mais vagas de garagem{/endif}{if}$parameters["filtro.valorminimo"]{/if} de R$ {n2}$parameters["filtro.valorminimo"]{/n2}{/endif}{if}$parameters["filtro.valormaximo"]{/if} até R$ {n2}$parameters["filtro.valormaximo"]{/n2}{/endif}{if}$parameters["filtro.areatotalminima"]{/if} de {n}$parameters["filtro.areatotalminima"]{/n}m²{/endif}{if}$parameters["filtro.areatotalmaxima"]{/if} até {n}$parameters["filtro.areatotalmaxima"]{/n}m²{/endif}. Utilize nossos filtros de pesquisa e encontre o seu imóvel!', $data);
            $seo['keywords'] = $seoTemplate->render('Imóveis{if}$parameters["filtro.tipodivulgacao"]{/if}{if}$parameters["filtro.tipodivulgacao"] === "v"{/if}, Imóveis à venda{else}, Imóveis para locação{/endif}{/endif}{if}$parameters["filtro.tiposimoveis"]{/if}, {{ucfirst(str_replace(","," ",$parameters["filtro.tiposimoveis"]))}}{/endif}{if}$parameters["filtro.tiposimoveis"] && $parameters["filtro.bairro"]{/if}, {{ucfirst(str_replace(","," ",$parameters["filtro.tiposimoveis"]))}} no {{str_replace(","," ",$parameters["filtro.bairro"])}}{/endif}{if}$parameters["filtro.tiposimoveis"] && $parameters["filtro.cidade"]{/if}, {{ucfirst(str_replace(","," ",$parameters["filtro.tiposimoveis"]))}} em {{str_replace(","," ",$parameters["filtro.cidade"])}}{/endif}', $data);
            $seo['robots'] = 'index, follow';
            $seo['image'] = "{$global['base']}img/site.jpg";
            $seo['url'] = $global['url'];
        
            if (!$global['ajax']) {
                include('include/header.php');
            }
        
            $search = str_replace(" - {$client['nomeFantasia']}", '', $seo['title']);
            $data = array_merge($loader, $siteData, ['imovelPara' => $parameters['filtro.tipodivulgacao']], ['search' => $search], ['result' => $result]);
        
            $template = new JetTemplate;
            $template->render('template/' . basename(__FILE__, 'php') . 'html', $data);
            
            $buffer->end($siteData, $seo, $parameters);
        
            if (!$global['ajax']) {
                include('include/footer.php');
            }
            
            return;
        }

        $urlApi = implode('&', explode('&', $urlApi, -1));

        recursiveRender($global, $config, $buffer, $urlApi, $siteData, $parameters, $client, false);
    }

    recursiveRender($global, $config, $buffer, $urlApi, $siteData, $parameters, $client);
?>