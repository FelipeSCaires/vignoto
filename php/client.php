<?php
    class Client {

        /**
         * load
         */
        private function load($global, $config) {
            if (!isset($_SESSION["client{$global['root']}"])) {
                $loader = new JetLoader;
                $data = ['client' => ['url' => "{$config['clienteBaseUrl']}?filtro.clienteid={$config['idCliente']}&maximo=1&pagina=1", 'decode' => true]];
                $loader = $loader->load($data);
                $client = $loader['client'];
                
                if ($client) {
                    $client = $client['data']['resultado'][0];
                    $_SESSION["client{$global['root']}"] = $client;
                }
            }
        }

        /**
         * create
         * @return array
         */
        public function create($global, $config) {
            $this->load($global, $config);

            return $_SESSION["client{$global['root']}"];
        }

    }
?>