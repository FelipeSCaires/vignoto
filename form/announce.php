<?php
    require('../php/jetmail.php');

    $jetmail = new JetMail();

    $jetmail->SetPostData($_POST);
    $jetmail->AddAttachments($_FILES);
    $jetmail->SetSubject($_POST['eOrigem'] . ' - ' . $_POST['nome-fantasia']);
    $jetmail->SetTo('naoresponda@paperplane.com.br');
    $jetmail->SetFrom($_POST['email']);
    $jetmail->SetTemplate($_POST['base-url'] . 'form/' . basename(__FILE__, '.php') . '.txt');
    $jetmail->SetCc("");
    $jetmail->SetCc('');
    $jetmail->SetBcc('');

    $jetmail->Send();
?>