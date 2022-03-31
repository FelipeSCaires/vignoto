<?php
    require('../php/jetloader.php');

    $loader = new JetLoader;
    $data = ['user' => ['url' => "https://pco.casasoftsig.com/v102/api/usuarios/info?usuario={$_POST['username']}&empresa={$_POST['idcliente']}", 'decode' => true]];
    $header = ["Authorization: bearer {$_POST['token']}"];
    $options = [CURLOPT_HTTPHEADER => $header];
    $loader = $loader->load($data, $options);
    $user = $loader['user'];

    if ($user['inquilino'] && $user['proprietario']) {
        if ($user['extratoProprietario'] > 0) {
            $activeBtn = 'pageProprietario';
        } else if ($user['boletosInquilino'] > 0) {
            $activeBtn = 'pageInquilino';
        } else if ($user['irProprietario'] > 0) {
            $activeBtn = 'pageProprietarioIr';
        } else if ($user['irInquilino'] > 0) {
            $activeBtn = 'pageInquilinoIr';
        }
    } else if ($user['inquilino'] && !$user['proprietario']) {
        if ($user['boletosInquilino'] > 0) {
            $activeBtn = 'pageInquilino';
        } else if ($user['irInquilino'] > 0) {
            $activeBtn = 'pageInquilinoIr';
        }
    } else if ($user['proprietario'] && !$user['inquilino']) {
        if ($user['extratoProprietario'] > 0) {
            $activeBtn = 'pageProprietario';
        } else if ($user['irProprietario'] > 0) {
            $activeBtn = 'pageProprietarioIr';
        }
    }

    session_start();
    $_SESSION['token'] = $_POST['token'];
    $_SESSION['user'] = $user;

    echo $activeBtn;
?>