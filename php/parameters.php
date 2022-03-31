<?php
    class Parameters {

        /**
         * create a parameters
         */
        function __construct($siteData) {
            $this->parameters = ["filtro.{$siteData['config']['tipoCliente']}id" => $siteData['config']['id']];
            $this->url = ' ' . strtr($siteData['global']['url'], ['/' => ' ', '-' => ' ', '?' => ' ? ']) . ' ';
            
            parse_str(parse_url($this->url, PHP_URL_QUERY), $siteData['query']);
            $this->init($siteData['config'], $siteData['query']);
        }

        /**
         * set imovelpara parameter
         */
        private function setImovelPara() {
            if (strpos($this->url, ' comprar ') !== false && strpos($this->url, ' alugar ') !== false) {
                $this->imovelpara = 'a';
                $this->imovelParaName = 'comprar alugar';
            } else if (strpos($this->url, ' comprar ') !== false) {
                $this->imovelpara = 'v';
                $this->imovelParaName = 'comprar';
            } else if (strpos($this->url, ' alugar ') !== false) {
                $this->imovelpara = 'l';
                $this->imovelParaName = 'alugar';
            } else if (strpos($this->url, ' temporada ') !== false) {
                $this->imovelpara = 't';
                $this->imovelParaName = 'temporada';
            } else {
                $this->imovelpara = '';
                $this->imovelParaName = '';
            }
        }
        
        /**
         * get filters
         */
        private function getAllFilters($config, $imovelpara) {
            $filtersUrl = '&estados=true&cidades=true&bairros=true';

            $filters = [
                'searchEstados',
                'searchCidades',
                'searchBairros'
            ];

            if ($config['tipoCliente'] === 'cliente') {
                array_push($filters, 'searchTipoImoveis');
                $filtersUrl .= '&tipoimovel=true';
            } else {
                array_push($filters, 'searchTipoImoveisPadrao');
                $filtersUrl .= '&tipoimovelpadrao=true';
            }

            function searchTipoImoveisSortByLength($a, $b) {
                return strlen($b['tipoImovelDescricao']) - strlen($a['tipoImovelDescricao']);
            }

            function searchTipoImoveisPadraoSortByLength($a, $b) {
                return strlen($b['tipoPadraoDescricao']) - strlen($a['tipoPadraoDescricao']);
            }

            function searchEstadosSortByLength($a, $b) {
                return strlen($b['estadoSigla']) - strlen($a['estadoSigla']);
            }

            function searchCidadesSortByLength($a, $b) {
                return strlen($b['cidadeNome']) - strlen($a['cidadeNome']);
            }

            function searchBairrosSortByLength($a, $b) {
                return strlen($b['bairroNome']) - strlen($a['bairroNome']);
            }

            if (!isset($_SESSION["searchEstados{$imovelpara}{$config['id']}"])) {
                $data = [$imovelpara => ['url' => "{$config['filterBaseUrl']}?filtro.tipodivulgacao={$imovelpara}&filtro.{$config['tipoCliente']}id={$config['id']}{$filtersUrl}&maximo=999999&pagina=1", 'decode' => true]];

                $loader = new JetLoader;
                $loader = $loader->load($data);

                foreach ($filters as $filter) {
                    $$filter = $loader[$imovelpara]['data'][$filter]['resultado'];
                    
                    usort($$filter, "{$filter}SortByLength");
                    $_SESSION["{$filter}{$imovelpara}{$config['id']}"] = $$filter;
                }
            }
        }

        /**
         * set tipo divulgação parameter
         */
        private function setTipoDivulgacao($config, $imovelpara, $imovelParaName) {
            $this->parameters['filtro.tipodivulgacao'] = null;
                
                if (isset($imovelParaName)) {
                    if (strpos($this->url, " {$imovelParaName} ") !== false) {
                        $this->url = str_replace($imovelParaName, '', $this->url);
                        $this->parameters['filtro.tipodivulgacao'] = $imovelpara;
                    }
                }
        }

        /**
         * set finalidade parameter
         */
        private function setFinalidade() {
            $this->parameters['filtro.finalidade'] = null;

            if (strpos($this->url, " residenciais ") !== false) {
                $this->parameters['filtro.finalidade'] = 'r';
            } elseif (strpos($this->url, " comerciais ") !== false) {
                $this->parameters['filtro.finalidade'] = 'c';
            } elseif (strpos($this->url, " ambos ") !== false) {
                $this->parameters['filtro.finalidade'] = 'a';
            }
        }

        /**
         * set tipo imóvel parameter
         */
        private function setTipoImovel($config, $imovelpara) {
            $this->parameters['filtro.tiposimoveis'] = null;
            $this->parameters['filtro.tipoimovelpadraoid'] = null;

            if (isset($_SESSION["searchTipoImoveis{$imovelpara}{$config['id']}"]) || isset($_SESSION["searchTipoImoveisPadrao{$imovelpara}{$config['id']}"])) {
                $types = [];

                if ($config['tipoCliente'] === 'parceria') {
                    $sessionName = 'searchTipoImoveisPadrao';
                    $ids = [];
                } else {
                    $sessionName = 'searchTipoImoveis';
                }

                foreach ($_SESSION["{$sessionName}{$imovelpara}{$config['id']}"] as $index => $value) {        
                    if ($config['tipoCliente'] === 'parceria') {
                        $type = $this->cleanUrl($value['tipoPadraoDescricao']);
                        $id = $value['tipoPadraoId'];
                    } else {
                        $type = $this->cleanUrl($value['tipoImovelDescricao']);
                    }

                    if ($type && strpos($this->url, " {$type} ") !== false) {
                        $this->url = strtr($this->url, [$type => '']);

                        if ($config['tipoCliente'] === 'parceria') {
                            array_push($types, mb_strtolower($value['tipoPadraoDescricao']));
                        } else {
                            array_push($types, mb_strtolower($value['tipoImovelDescricao']));
                        }

                        if ($config['tipoCliente'] === 'parceria') {
                            array_push($ids, $id);
                        }
                    }
                }
                
                if (!empty($types)) {
                    $types = implode(',', $types);
                    $this->parameters['filtro.tiposimoveis'] = $types;

                    if ($config['tipoCliente'] === 'parceria') {
                        $ids = implode(',', $ids);
                        $this->parameters['filtro.tipoimovelpadraoid'] = $ids;
                    }
                }
            }
        }

        /**
         * set estado parameter
         */
        private function setEstado($config, $imovelpara) {
            $this->parameters['filtro.estado'] = null;

            if (isset($_SESSION["searchEstados{$imovelpara}{$config['id']}"])) {
                $values = [];

                foreach ($_SESSION["searchEstados{$imovelpara}{$config['id']}"] as $value) {
                    $value = $value['estadoSigla'];
                    
                    if ($value && strpos($this->url, " {$value} ") !== false) {
                        $this->url = strtr($this->url, [$value => '']);
                        array_push($values, $value);
                    }
                }

                if (!empty($values)) {
                    $values = implode(',', $values);

                    $this->parameters['filtro.estado'] = $values;
                }
            }
        }

        /**
         * set cidade parameter
         */
        private function setCidade($config, $imovelpara) {
            $this->parameters['filtro.cidade'] = null;

            if (isset($_SESSION["searchCidades{$imovelpara}{$config['id']}"])) {
                $values = [];

                foreach ($_SESSION["searchCidades{$imovelpara}{$config['id']}"] as $value) {
                    $cleanValue = $this->cleanUrl($value['cidadeNome']);

                    if ($cleanValue && strpos($this->url, " {$cleanValue} ") !== false) {
                        $this->url = strtr($this->url, [$cleanValue => '']);
                        array_push($values, mb_strtolower($value['cidadeNome']));
                    }
                }
                if (!empty($values)) {
                    $values = implode(',', $values);

                    $this->parameters['filtro.cidade'] = $values;
                }
            }
        }

        /**
         * set bairro parameter
         */
        private function setBairro($config, $imovelpara) {
            $this->parameters['filtro.bairro'] = null;

            if (isset($_SESSION["searchBairros{$imovelpara}{$config['id']}"])) {
                $values = [];
                
                foreach ($_SESSION["searchBairros{$imovelpara}{$config['id']}"] as $value) {
                    $cleanValue = $this->cleanUrl($value['bairroNome']);
                    
                    if ($cleanValue && strpos($this->url, " {$cleanValue} ") !== false) {
                        $this->url = strtr($this->url, [$cleanValue => '']);
                        array_push($values, mb_strtolower($value['bairroNome']));
                    }
                }

                if (!empty($values)) {
                    $values = implode(',', $values);
                    
                    $this->parameters['filtro.bairro'] = $values;
                }
            }
        }

        /**
         * set quarto parameter
         */
        private function setQuarto() {
            $this->parameters['filtro.quarto'] = null;

            if (strpos($this->url, ' quartos ') !== false && strpos($this->url, ' ou mais quartos ') === false) {
                $value = explode(' quartos', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.quarto'] = $value;
            }
        }

        /**
         * set quarto ini parameter
         */
        private function setQuartoIni() {
            $this->parameters['filtro.quartoini'] = null;

            if (strpos($this->url, ' ou mais quartos ') !== false) {
                $value = explode(' ou mais quartos', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.quartoini'] = $value;
            }
        }

        /**
         * set vaga parameter
         */
        private function setVaga() {
            $this->parameters['filtro.vagagaragem'] = null;

            if (strpos($this->url, ' vagas ') !== false && strpos($this->url, ' ou mais vagas ') === false) {
                $value = explode(' vagas', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.vagagaragem'] = $value + 2;
            }
        }

        /**
         * set vaga ini parameter
         */
        private function setVagaIni() {
            $this->parameters['filtro.vagaini'] = null;
            
            if (strpos($this->url, ' ou mais vagas ') !== false) {
                $value = explode(' ou mais vagas', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.vagaini'] = $value + 2;
            }
        }

        /**
         * set valor mínimo parameter
         */
        private function setValorMinimo() {
            $this->parameters['filtro.valorminimo'] = null;

            if (strpos($this->url, ' de ') !== false) {
                $values = explode('de ', $this->url);

                foreach ($values as $value) {
                    $value = explode(' ', $value)[0];

                    if (!strpos($value, ' m2 ') !== false && is_numeric($value)) {
                        $this->parameters['filtro.valorminimo'] = $value;
                    }
                }
            }
        }

        /**
         * set valor máximo parameter
         */
        private function setValorMaximo() {
            $this->parameters['filtro.valormaximo'] = null;

            if (strpos($this->url, ' ate ') !== false) {
                $values = explode('ate ', $this->url);

                foreach ($values as $value) {
                    $value = explode(' ', $value)[0];

                    if (!strpos($value, ' m2 ') !== false && is_numeric($value)) {
                        $this->parameters['filtro.valormaximo'] = $value;
                    }
                }
            }
        }

        /**
         * set valor mínimo parameter
         */
        private function setAreaMinima() {
            $this->parameters['filtro.areatotalminima'] = null;
            $this->parameters['filtro.areautilminima'] = null;

            if (strpos($this->url, ' de ') !== false) {
                $values = explode('de ', $this->url);

                foreach ($values as $value) {
                    $value = explode(' ', $value)[0];

                    if (strpos($value, 'm2') !== false) {
                        $value = strtr($value, ['m2' => '']);

                        if (strpos($this->url, 'm2 total') !== false) {
                            $this->parameters['filtro.areatotalminima'] = $value;
                        } else {
                            $this->parameters['filtro.areautilminima'] = $value;
                        }
                    }
                }
            }
        }

        /**
         * set valor mínimo parameter
         */
        private function setAreaMaxima() {
            $this->parameters['filtro.areatotalmaxima'] = null;
            $this->parameters['filtro.areautilmaxima'] = null;

            if (strpos($this->url, ' ate ') !== false) {
                $values = explode('ate ', $this->url);

                foreach ($values as $value) {
                    $value = explode(' ', $value)[0];

                    if (strpos($value, 'm2') !== false) {
                        $value = strtr($value, ['m2' => '']);

                        if (strpos($this->url, 'm2 total') !== false) {
                            $this->parameters['filtro.areatotalmaxima'] = $value;
                        } else {
                            $this->parameters['filtro.areautilmaxima'] = $value;
                        }
                    }
                }
            }
        }

        /**
         * set banheiro parameter
         */
        private function setBanheiro() {
            $this->parameters['filtro.banheiro'] = null;
            
            if (strpos($this->url, ' banheiros ') !== false && strpos($this->url, ' ou mais banheiros ') === false) {
                $value = explode(' banheiros', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.banheiro'] = $value;
            }
        }

        /**
         * set banheiro ini parameter
         */
        private function setBanheiroIni() {
            $this->parameters['filtro.banheiroini'] = null;

            if (strpos($this->url, ' ou mais banheiros ') !== false) {
                $value = explode(' ou mais banheiros', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.banheiroini'] = $value;
            }
        }

        /**
         * set suite parameter
         */
        private function setSuite() {
            $this->parameters['filtro.suite'] = null;

            if (strpos($this->url, ' suites ') !== false && strpos($this->url, ' ou mais suites ') === false) {
                $value = explode(' suites', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.suite'] = $value;
            }
        }

        /**
         * set suite parameter
         */
        private function setSuiteIni() {
            $this->parameters['filtro.suiteini'] = null;

            if (strpos($this->url, ' ou mais suites ') !== false) {
                $value = explode(' ou mais suites', $this->url)[0];
                $value = explode(' ', $value);
                $value = end($value);

                $this->parameters['filtro.suiteini'] = $value;
            }
        }

        /**
         * set cobertura parameter
         */
        private function setCobertura() {
            $this->parameters['filtro.cobertura'] = null;

            if (strpos($this->url, ' cobertura ') !== false) {
                $this->parameters['filtro.cobertura'] = 1;
            }
        }

        /**
         * set mobiliado parameter
         */
        private function setMobiliado() {
            $this->parameters['filtro.mobiliado'] = null;

            if (strpos($this->url, ' mobiliado ') !== false) {
                $this->parameters['filtro.mobiliado'] = 1;
            }
        }

        /**
         * set condomínio parameter
         */
        private function setCondominio() {
            $this->parameters['filtro.condominio'] = null;

            if (strpos($this->url, ' em condominio ') !== false) {
                $this->parameters['filtro.condominio'] = 1;
            }
        }

        /**
         * set referência parameter
         */
        private function setReferencia($config) {
            $this->parameters['filtro.referencia'] = null;
            
            if (strpos($this->url, ' referencia ') !== false) {
                $value = strtok($this->url, '?');
                $value = explode('referencia ', $value)[1];
                $value = explode(' pagina', $value)[0];
                $value = strtr(trim($value), ' ', '-');
                
                $this->parameters['filtro.parceriaid'] = $config['idParceria'];
                $this->parameters['filtro.referencia'] = trim($value);
            }
        }

        /**
         * set endereço parameter
         */
        private function setEndereco($config) {
            $this->parameters['filtro.endereco'] = null;

            if (strpos($this->url, ' endereco ') !== false) {
                $value = strtok($this->url, '?');
                $value = explode('endereco ', $value)[1];
                $value = explode(' pagina', $value)[0];

                $this->parameters['filtro.parceriaid'] = $config['idParceria'];
                $this->parameters['filtro.endereco'] = trim($value);
            }
        }

        /**
         * set edifício parameter
         */
        private function setEdificio($config) {
            $this->parameters['filtro.edificio'] = null;

            if (strpos($this->url, ' edificio ') !== false) {
                $value = strtok($this->url, '?');
                $value = explode('edificio ', $value)[1];
                $value = explode(' pagina', $value)[0];
                
                $this->parameters['filtro.parceriaid'] = $config['idParceria'];
                $this->parameters['filtro.edificio'] = trim($value);
            }
        }

        /**
         * set ordenação parameter
         */
        private function setOrdenacao($config, $query) {
            $this->parameters['ordenacao'] = null;
            $this->parameters['ascdesc'] = null;

            if (isset($query['ord'])) {
                $this->parameters['ordenacao'] = trim($query['ord']);
                $this->parameters['ascdesc'] = trim($query['ascdesc']);
            }
        }

        /**
         * set imóvel com foto parameter
         */
        private function setFoto($query) {
            $this->parameters['filtro.comfoto'] = null;

            if (isset($query['foto'])) {
                $this->parameters['filtro.comfoto'] = trim($query['foto']);
            }
        }

        /**
         * set região parameter
         */
        private function setRegiao($query) {
            $this->parameters['filtro.regiaocidade'] = null;

            if (isset($query['regiao'])) {
                $this->parameters['filtro.regiaocidade'] = trim($query['regiao']);
            }
        }

        /**
         * set categoria parameter
         */
        private function setCategoria($query) {
            $this->parameters['filtro.categoriaid'] = null;

            if (isset($query['cat'])) {
                $this->parameters['filtro.categoriaid'] = trim($query['cat']);
            }
        }

        /**
         * set página parameter
         */
        private function setPagina() {
            $this->parameters['pagina'] = null;

            if (strpos($this->url, ' pagina ') !== false) {
                $value = explode('pagina ', $this->url)[1];
                
                if (strpos($value, '?') !== false) {
                    $value = explode('?', $value)[0];
                }
                
                if ($value > 1) {
                    $this->parameters['pagina'] = $value;
                }
            }
        }

        /**
         * clean url parameters
         * @return string
         */
        private function cleanUrl($path) {
            $path = utf8_decode(mb_strtolower($path));
            $from = utf8_decode('_/àáâãäåèéêëìíîïòóôõöùúûüç');
            $to = '  aaaaaaeeeeiiiiooooouuuuc';
            $path = strtr($path, $from, $to);
            $path = preg_replace('/\s\s+/', ' ', $path);
            
            return $path;
        }


        /**
         * clean url parameters
         * @return array
         */
        public function get() {
            return $this->parameters;
        }

        /**
         * initialize instance
         */
        private function init($config, $query) {
            $this->setImovelPara();
            $this->getAllFilters($config, $this->imovelpara);
            $this->setTipoDivulgacao($config, $this->imovelpara, $this->imovelParaName);
            $this->setFinalidade();
            $this->setTipoImovel($config, $this->imovelpara);
            $this->setEstado($config, $this->imovelpara);
            $this->setCidade($config, $this->imovelpara);
            $this->setBairro($config, $this->imovelpara);
            $this->setQuarto();
            $this->setQuartoIni();
            $this->setVaga();
            $this->setVagaIni();
            $this->setValorMinimo();
            $this->setValorMaximo();
            $this->setAreaMinima();
            $this->setAreaMaxima();
            $this->setBanheiro();
            $this->setBanheiroIni();
            $this->setSuite();
            $this->setSuiteIni();
            $this->setCobertura();
            $this->setMobiliado();
            $this->setCondominio();
            $this->setReferencia($config);
            $this->setEndereco($config);
            $this->setEdificio($config);
            $this->setOrdenacao($config, $query);

            if (!empty($query)) {
                $this->setFoto($query);
                $this->setRegiao($query);
                $this->setCategoria($query);
            }

            $this->setPagina();
        }

    }
?>