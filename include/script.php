<script>
    <?= 'let global = ' . json_encode($global) . ';' ?>
    <?= 'let config = ' . json_encode($config) . ';' ?>
    <?= 'let parameters = ' . (isset($parameters) ? json_encode($parameters) : '""') . ';' ?>
</script>