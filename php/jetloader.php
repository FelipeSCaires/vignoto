<?php
    /**
     * @name * JetLoader
     * @file * jetloader.php
     * @author * Paper Plane Design Studio® <http://www.paperplane.com.br>
     * @description * a php curl loader class
     * @license * Todos os direitos reservados - Paper Plane Design Studio®
     * @version * 1.0
     */

    

    class JetLoader {

        /**
         * load
         * @return array
         */
        public function load($data, $options = []) {
            $curlMulti = curl_multi_init();
            $running = false;
            $curl = [];
            $result = [];
           
            foreach ($data as $label => $value) {
                $url = $value;

                if (isset($value['url'])) {
                    $url = $value['url'];
                }
                
                $url = strtr($url, [' ' => '%20']);
                
                $curl[$label] = curl_init($url);
                curl_setopt($curl[$label], CURLOPT_FOLLOWLOCATION, 1);
                curl_setopt($curl[$label], CURLOPT_TIMEOUT, 5);
                curl_setopt($curl[$label], CURLOPT_CONNECTTIMEOUT, 5);
                curl_setopt($curl[$label], CURLOPT_SSL_VERIFYHOST, 0);
                curl_setopt($curl[$label], CURLOPT_SSL_VERIFYPEER, 0);
                curl_setopt($curl[$label], CURLOPT_HEADER, 0);
                curl_setopt($curl[$label], CURLOPT_RETURNTRANSFER, 1);
                
                if (isset($value['post'])) {
                    curl_setopt($curl[$label], CURLOPT_POST, 1);
                    curl_setopt($curl[$label], CURLOPT_POSTFIELDS, $value['post']);
                }
           
                if (!empty($options)) {
                    curl_setopt_array($curl[$label], $options);
                }

                curl_multi_add_handle($curlMulti, $curl[$label]);
            }

            do {
                curl_multi_exec($curlMulti, $running);
            } while ($running);
           
            foreach ($curl as $label => $value) {
                curl_multi_remove_handle($curlMulti, $value);

                $result[$label] = curl_multi_getcontent($value);
                
                curl_close($curl[$label]);

                if (isset($data[$label]['decode'])) {
                    $result[$label] = json_decode($result[$label], $data[$label]['decode']);
                }
            }
           
            curl_multi_close($curlMulti);

            return $result;
        }

    }
?>