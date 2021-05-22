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
    <link rel="stylesheet" href="/res/fonts/fontawesome/css/all.min.css">

    <!-- styles -->
    <link rel="stylesheet" href="/res/lib/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/res/css/loader.css">
    <link rel="stylesheet" href="/mods/game/game.css">
</head>
<body>

    <!-- loader -->
    <div class="instrucciones">
        <img src="/res/images/menu-controles.png" width="800">
    </div>

    <!-- start -->
    <div id="start" class="start" onclick="start();">
        <div class="start-content text-white d-flex align-items-center justify-content-center w-100 h-100">
            <h2 id="start-text">HAZ CLICK O PRESIONA START PARA INICIAR</h2>
        </div>
        <div class="fondo"></div>
    </div>

    <!-- gameover -->
    <div id="gameover" class="gameover popo" onclick="">
        <div class="gameover-content text-white d-flex flex-column align-items-center justify-content-center w-100 h-100">
            <h2 class="mb-5">¡GAME OVER!</h2>
            <h4 class="mb-3">PUNTUACIONES FINALES</h4>
            <hr>
            <div id="pjugador1" class="text-center mb-5">
                <h5 id="jugador-uno">JUGADOR 1</h5>
                <strong id="jugador-uno-score">0</strong>
            </div>
            <div id="pjugador2" class="text-center mb-5 d-none">
                <h5 id="jugador-dos">JUGADOR 2</h5>
                <strong id="jugador-dos-score">0</strong>
            </div>
            <button class="btn btn-primary d-block mb-5" onclick="shareScore();">
                    <i class="fab fa-facebook-f me-2"></i>
                    Compartir en facebook
            </button>
            <a href="/mods/game/game.php" class="btn btn-nitroso btn-lg mt-5 mb-3">
                JUGAR DE NUEVO
            </a>
            <a href="/" class="btn btn-secondary btn-lg mb-3">
                REGRESAR AL MENÚ PRINCIPAL
            </a>
        </div>
    </div>

    <!-- sonidos -->
    <audio id="auAmbient">
        <source src="/res/music/game_music.mp3" type="audio/mpeg">
    </audio>

    <audio id="auChoque">
        <source src="/res/music/game_car_crash_sound.mp3" type="audio/mpeg">
    </audio>

    <audio id="auBuff">
        <source src="/res/music/game_car_buff.mp3" type="audio/mpeg">
    </audio>

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
        <!-- message -->
        <div class="message text-warning p-3">
            <span id="texto"></span>
        </div>
        <!-- ventana de juego -->
        <div class="game m-0 p-0">
        </div>
    </div>

    <!-- scripts -->
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v10.0&appId=1458428857833266&autoLogAppEvents=1" nonce="AfglOnxd"></script>
    <script src="/res/lib/jquery.min.js"></script>
    <script src="/res/lib/bootstrap.min.js"></script>
    <script src="/res/lib/threejs/three.js"></script>
    <script src="/res/lib/threejs/inflate.min.js"></script>
    <script src="/res/lib/threejs/SkeletonUtils.js"></script>
    <script src="/res/lib/threejs/FBXLoader.js"></script>
    <script src="/code/model.js"></script>
    <script src="/code/csts.js"></script>
    <script src="/code/fun.js"></script>
    <script src="/code/ajax.js"></script>
    <script src="/code/game.js"></script>

</body>
</html>