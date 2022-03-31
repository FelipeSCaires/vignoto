<?php
    /**
     * @name * Sanitize
     * @file * sanitize.php
     * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
     * @description * handles unorganized data
     * @license * Todos os direitos reservados - Paper Plane Design Studio®
     * @version * 1.0
     */


    
    class Sanitize {

        private $data;

        public function __construct($data, $name = 'card') {
            $this->data = $data;
            $this->name = $name;
        }

        public function cpsValores() {
            $cpsValores = $this->data[$this->name]['data']['cpsValores'];
            $caracteristicas = array();
            $dependencias = array();

            foreach ($cpsValores as $value) {
                if ($value['valor'] != '' && $value['label'] != '') {
                    $item = [
                        'label' => $value['label'],
                        'valor' => $value['valor']
                    ];

                    switch ($value['local']) {
                        case 'D':
                            array_push($dependencias, $item);
                            break;

                        case 'C':
                            array_push($caracteristicas, $item);
                            break;
                    }
                }
            }

            unset($this->data[$this->name]['data']['cpsValores']);

            $this->data[$this->name]['data']['caracteristicas'] = $caracteristicas;
            $this->data[$this->name]['data']['dependencias'] = $dependencias;
        }

        public function getData() {
            return $this->data;
        }

    }
?>