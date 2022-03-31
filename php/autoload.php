<?php
    class Autoload {
        /**
         * create a autoload
         */
        public function __construct() {
            spl_autoload_extensions('.php');
            spl_autoload_register([$this, 'load']);
        }

        /**
         * load
         */
        private function load($className) {
            $extension = spl_autoload_extensions();
            require_once (__DIR__ . '/' . strtolower($className) . $extension);
        }
    }
?>