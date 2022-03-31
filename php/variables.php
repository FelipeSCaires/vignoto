<?php
    class Variables {

        /**
         * create array variables
         * @return array
         */
        private function arrayVariables($global, $config) {
            foreach ($config['pages'] as $page) {
                $name = 'page' . join(array_map('ucfirst', explode('-', strtr($page[0], ['/' => '-']))));
                $config[$name] = $global['root'] . '/' . $page[0];
            }
            
            return $config;
        }

        /**
         * create
         * @return array
         */
        public function create($global, $config) {
            $config = $this->arrayVariables($global, $config);

            return $config;
        }

    }
?>