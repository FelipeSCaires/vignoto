<?php
    class Buffer {

        /**
         * start buffer
         * @return buffer
         */
        public function start($global) {
            if ($global['ajax']) {
                return ob_start();
            }
        }

        /**
         * end buffer
         */
        public function end($siteData, $seo, $parameter = '') {
            if ($siteData['global']['ajax']) {
                echo json_encode([
                    'global' => $siteData['global'],
                    'config' => $siteData['config'],
                    'seo' => $seo,
                    'parameters' => $parameter,
                    'content' => ob_get_clean()
                ]);
            }
        }

    }
?>