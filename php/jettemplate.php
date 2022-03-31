<?php
    /**
     * @name * JetTemplate
     * @file * jettemplate.php
     * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
     * @description * a php templating system
     * @license * Todos os direitos reservados - Paper Plane Design Studio®
     * @version * 1.0
     */
    
    

    class JetTemplate {
        
        protected $file;
        protected $vars;
        
        protected $tokens = [       
            // php
            '{php}' => '<?php ',
            '{/php}' => ' ?>',

            // foreach
            '{foreach}' => '<?php foreach(',
            '{/foreach}' => '): ?>',
            '{/endforeach}' => '<?php endforeach; ?>',

            // while
            '{while}' => '<?php while(',
            '{/while}' => '): ?>',
            '{/endwhile}' => '<?php endwhile; ?>',

            // for
            '{for}' => '<?php for(',
            '{/for}' => '): ?>',
            '{/endfor}' => '<?php endfor; ?>',

            // print / echo
            '{{' => '<?= ',
            '}}' => '; ?>',

            // print url
            '{url}' => '<?= $this->formatUrl(',
            '{/url}' => '); ?>',

            // print number format without decimals
            '{n}' => '<?= $this->formatNumber(',
            '{/n}' => '); ?>',

            // print number format with 2 decimals
            '{n2}' => '<?= number_format(',
            '{/n2}' => ', 2, ",", "."); ?>',

            // if, elseif, else
            '{if}' => '<?php if (',
            '{/if}' => '): ?>',
            '{elseif}' => '<?php elseif (',
            '{/elseif}' => '): ?>',
            '{else}' => '<?php else: ?>',
            '{/else}' => ' ',
            '{/endif}' => '<?php endif; ?>'
        ];

        /**
         * add your own replacements
         * @param array $data
         * @return void
         */
        public function add(array $data) {
            $this->tokens = array_merge($this->tokens, $data);
        }

        /**
         * render a file or string
         * @param string $file
         * @param array $vars
         * @return boolean
         */
        public function render($file, $vars) {
            if (is_string($vars)) {
                $vars = json_decode($vars, true);
            };
            
            extract($vars, EXTR_SKIP);
            $this->file = $file;

            if (is_file($file)) {
                eval('?>' . $this->compile());

                return true;
            } else {
                ob_start();

                eval('?>' . str_ireplace(
                    array_keys($this->tokens),
                    array_values($this->tokens),
                    $file
                ));

                return $this->clean(ob_get_clean());
            }
        }

        /**
         * compile a file
         * @return string
         */
        protected function compile() {
            $d = file_get_contents($this->file);

            $d = str_ireplace(
                array_keys($this->tokens),
                array_values($this->tokens),
                $d
            );

            return $this->clean($d);
        }

        /**
         * clean content
         * @return string
         */
        private function clean($value) {
            $pattern = array('/<!--(.*)-->/Uis',"/[[:blank:]]+/");
            $value = str_replace(array("\n","\r","\t"), '', $value);
            $value = preg_replace($pattern, array('',' '), $value);

            return $value;
        }

        /**
         * url format
         * @return string
         */
        protected function formatUrl($string) {
            $string = utf8_decode(mb_strtolower($string));
            $from = utf8_decode(" /àáâãäåèéêëìíîïòóôõöùúûüç");
            $to = "--aaaaaaeeeeiiiiooooouuuuc";
            $string = strtr($string, $from, $to);

            return $string;
        }

        /**
         * number format
         * @return number
         */
        function formatNumber($value) {
            if (strstr($value, '.')) {
                $split = explode('.', $value);
                $integer = number_format($split[0], 0, '', '.');
                $decimal = ',' . $split[1];
                $value = $integer . $decimal;
            } else {
                $value = number_format($value, 0, '', '.');
            }

            return $value;
        }

    }
?>