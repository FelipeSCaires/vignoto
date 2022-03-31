<?php
    /**
     * @name * JetMail
     * @file * jetmail.php
     * @author * Paper Plane Design Studio® <https://www.paperplane.com.br>
     * @description * a php mailer class
     * @license * Todos os direitos reservados - Paper Plane Design Studio®
     * @version * 1.0
     */


     
    class JetMail {

        private $attachments = [];
        private $subject = null;
        private $from = null;
        private $to = null;
        private $cc = null;
        private $bcc = null;
        private $template = null;
        private $message = null;
        private $apiMail = null;
        private $postFields = null;

        /**
         * create a jetmail
         */
        public function __construct() {
            $this->apiMail = 'https://services.casasoftsig.com/marketing/api/e-mails';
        }

        /**
         * add attachments
         */
        public function AddAttachments($postFiles) {
            $int = 0;

            foreach ($postFiles as $postFile) {
                if ($this->IsMultipleFiles($postFile)) {
                    for ($i = 0; $i < count($postFile['name']); $i++) {
                        $file = curl_file_create($postFile['tmp_name'][$i],$postFile['type'][$i],$postFile['name'][$i]);
                        $this->attachments = array_merge($this->attachments, ['arquivo-'.$int => $file]);                    
                        $int++;
                    }
                } else {       
                    $file = curl_file_create($postFile['tmp_name'][$i],$postFile['type'][$i],$postFile['name'][$i]);
                    $this->attachments = array_merge($this->attachments, ['arquivo-'.$int => $file]);
                    $int++;
                }
            }
        }

        /**
         * set post data
         */
        public function SetPostData($post) {
            $this->postFields = $post;
        }

        /**
         * set subject
         */
        public function SetSubject($subject) {
            $this->subject = $subject;
        }

        /**
         * set from
         */
        public function SetFrom($from) {
            $this->from = $from;
        }

        /**
         * set to
         */
        public function SetTo($to) {
            $this->to = $to;
        }

        /**
         * set bcc
         */
        public function SetBcc($bcc) {
            $this->bcc = $bcc;
        }

        /**
         * set cc
         */
        public function SetCc($cc) {
            $this->cc = $cc;
        }

        /**
         * set template
         */
        public function SetTemplate($template) {
            $this->template = $template;
        }

        /**
         * send
         */
        public function Send() {
            $curl = curl_init();
            $data = array_merge($this->postFields, $this->attachments);

            $data['template'] = $this->template;
            $data['eFrom'] = $this->from;
            $data['eTo'] = $this->to;
            $data['eCC'] = $this->cc;
            $data['eBCC'] = $this->bcc;
            $data['eSubject'] = $this->subject;
            
            curl_setopt($curl, CURLOPT_URL, $this->apiMail);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HEADER, 1);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: multipart/form-data']);

            $resp = curl_exec($curl);

            curl_close($curl);
        }

        /**
         * check multiple files
         * @return boolean
         */
        private function IsMultipleFiles($file) {
            return is_array($file['name']);
        }
        
    }
?>