<?php

    # index.php

?>

<!DOCTYPE html>
<html lang="es-mx">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nitroso ©</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/res/css/loader.css">
    <link rel="stylesheet" href="/mods/game/game.css">
</head>
<body>

    <!-- loader -->
    <div class="loader">
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <img src="/res/logos/n.png" alt="">
    </div>

    <!-- pausa -->
    <div class="pause text-white">
        <div class="blur"></div>
        <div class="content">
            <h2 class="mb-5">PAUSA</h2>
            <div class="options">
                <div class="row g-3">
                    <div class="col-12">
                        <a href="/index.php" class="btn btn-secondary btn-lg">
                            Salir
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- content -->
    <div id="wrapper" class="wrapper">
        <div class="container">
        </div>
    </div>

    <!-- scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js"></script>
    <script src="/res/js/csts.js"></script>
    <script src="/res/js/fun.js"></script>
    <script src="/mods/game/game.js"></script>

</body>
</html>