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
    <link href="/res/lib/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/res/css/loader.css">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/index.css">
</head>
<body>

    <audio id="auMenu">
        <source src="/res/music/mainmenu.mp3" type="audio/mpeg">
    </audio>

    <audio id="auBtnHover">
        <source src="/res/music/btn_hover.mp3" type="audio/mpeg">
    </audio>

    <audio id="auBtnClick">
        <source src="/res/music/btn_click.mp3" type="audio/mpeg">
    </audio>

    <div class="loader">
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <img src="/res/logos/n.png" alt="">
    </div>

    <!-- <div id="fb-root"></div> -->

    <!-- content -->
    <div id="wrapper" class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6 menu mx-auto my-5">
                    <div class="row g-3">
                        <div class="col-12 text-center text-white mb-5">
                            <img src="/res/logos/logo.png" alt="" class="logo-img w-100">
                        </div>
                        <div class="row g-3 botones text-white">
                            <!-- <div class="col-12 text-center">
                                <div class="row">
                                    <label for="" class="h3 col-12">
                                        ¡Bienvenido!
                                    </label>
                                    <div class="col-12">
                                        <input type="text" placeholder="Ingresa tu nickname" class="form-control nick text-center" value="NOMBRE_USUARIO">
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-12">
                                <a href="#!" data-bs-toggle="modal" data-bs-target="#mdlOptions">
                                    <img src="/res/examples/btn_play.png" alt="" srcset="" class="w-100">
                                </a>
                            </div>
                            <div class="col-12">
                                <a href="#!" data-bs-toggle="modal" data-bs-target="#mdlSettings">
                                    <img src="/res/examples/btn_settings.png" alt="" srcset="" class="w-100">
                                </a>
                            </div>
                            <div class="col-12">
                                <a href="#!" data-bs-toggle="modal" data-bs-target="#mdlScore" onclick="onBtnScoreClick();">
                                    <img src="/res/examples/btn_score.png" alt="" srcset="" class="w-100">
                                </a>
                            </div>
                            <!-- <div class="col-12">
                                <hr>
                            </div>
                            <div clas="col-12">
                                <div class="fb-login-button" 
                                    data-use-continue-as="true" 
                                    data-width="" 
                                    data-size="large" 
                                    data-button-type="login_with" 
                                    data-layout="rounded" 
                                    data-auto-logout-link="true" 
                                    data-onlogin="checkLoginState();"
                                    scope="public_profile, email">
                                </div>
                            </div> -->
                            <!-- <div class="col-12 text-center">
                                ¿Ya tienes una cuenta?
                                <strong>
                                    <a href="#!" class="text-nitroso-secondary" data-bs-toggle="modal" data-bs-target="#mdlLogin">
                                        Haz click aqui para iniciar sesión
                                    </a>
                                </strong>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- opciones modal -->
    <div class="modal fade options" id="mdlOptions" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdlOptionsLbl" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="mdlOptionsLbl">Modal title</h5>
                </div> -->
                <div class="modal-body">
                    <div id="multijugador" class="multijugador container-fluid">
                        <div class="row">
                            <div class="col-12 col-lg-4 col-xl-3 mx-auto">
                                <div class="row">
                                    <div class="mb-3">
                                        <h3 class="h2 mt-5" style="color: orange;">Modo de juego</h1>
                                        <small class="text-white">Si no existe el usuario se creará automaticamente</small>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Modo de juego</label>
                                        <select id="slCantJugadores" class="form-select form-select-lg" onchange="onCantJugadoresChange();">
                                            <option value="1">Un jugador</option>
                                            <option value="2">Dos jugadores</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Datos del 1er jugador</label>
                                        <div class="col-12 mb-3">
                                            <input id="txtNickJugador1" type="text" placeholder="Nick del 1er jugador" class="form-control form-control-lg nick" value="">
                                        </div>
                                        <div class="col-12">
                                            <input id="txtPassJugador1" type="password" placeholder="Contraseña del 1er jugador" class="form-control form-control-lg nick" value="">
                                        </div>
                                    </div>
                                    <div id="jugador-dos" class="mb-3 d-none">
                                        <label class="form-label">Datos del 2do jugador</label>
                                        <div class="col-12 mb-3">
                                            <input id="txtNickJugador2" type="text" placeholder="Nick del 2do jugador" class="form-control form-control-lg nick" value="">
                                        </div>
                                        <div class="col-12">
                                            <input id="txtPassJugador2" type="password" placeholder="Contraseña del 2do jugador" class="form-control form-control-lg nick" value="">
                                        </div>
                                    </div>
                                    <!-- dificultad -->
                                    <div class="mb-3">
                                        <label for="" class="form-label">Dificultad</label>
                                        <select id="slDificultad" class="form-select form-select-lg">
                                            <option value="1">Fácil (velocidad x1)</option>
                                            <option value="2">Normal (velocidad x3)</option>
                                            <option value="3">Nitrosa (velocidad x5)</option>
                                        </select>
                                    </div>
                                    <div class="mb-3 text-center">
                                        <label id="alert" class="" style="color: yellow;"></label>
                                    </div>
                                    <div class="mb-3 text-end">
                                        <button class="btn btn-secondary" onclick="onBtnVolverClick();" data-bs-dismiss="modal">
                                            Volver
                                        </button>
                                        <button class="btn btn-secondary btn-nitroso" onclick="onBtnContinuarClick();">
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="niveles" class="niveles h-100 d-none">
                        <div class="title text-center bg-black d-flex align-items-center justify-content-center py-3">
                            <h1 class="ms-auto">Selecciona el nivel a jugar</h1>
                            <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="row options mx-0 h-100">
                            <div class="scene col-12 col-lg-4 px-0" onclick="setScene(0);">
                                <h2 class="text-white">Bosque</h2>
                            </div>
                            <div class="scene col-12 col-lg-4 px-0" onclick="setScene(2);">
                                <h2 class="text-white">Nieve</h2>
                            </div>
                            <div class="scene col-12 col-lg-4 px-0" onclick="setScene(1);">
                                <h2 class="text-white">Desierto</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                </div> -->
            </div>
        </div>
    </div>

    <!-- configuraciones modal -->
    <div class="modal fade settings" id="mdlSettings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdlSettingsLbl" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="mdlSettingsLbl">Modal title</h5>
                </div> -->
                <div class="modal-body">
                    <!-- title -->
                    <div class="mb-5 row title">
                        <div class="col-12 col-lg-8">
                            <h1 class="h2 m-0">Opciones</h1>
                        </div>
                        <div class="col-12 col-lg-4">
                            <img src="/res/images/settings.png" class="w-100" alt="">
                        </div>
                    </div>
                    <!-- sonido -->
                    <div class="mb-3 row">
                        <label for="" class="col-12 col-lg-4 col-xl-4 col-form-label">
                            Volumen
                        </label>
                        <div class="col-12 col-lg-8 col-xl-8">
                            <label id="lblVolumen" for="rgVolumen" class="form-label">
                                <span id="spVolumen">100</span>
                                %
                            </label>
                            <input type="range" class="form-range" min="0" max="100" id="rgVolumen" value="100">
                        </div>
                    </div>
                    <!-- action -->
                    <div class="mt-5 text-end">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">
                            Volver
                        </button>
                        <!-- <button class="btn btn-nitroso" data-bs-dismiss="modal">
                            <i class="fas fa-save me-1"></i>
                            Guardar
                        </button> -->
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                </div> -->
            </div>
        </div>
    </div>

    <!-- score modal -->
    <div class="modal fade score" id="mdlScore" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdlScoreLbl" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="mdlSettingsLbl">Modal title</h5>
                </div> -->
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="title text-center bg-black d-flex align-items-center justify-content-center py-3">
                                <h1 class="ms-auto">PUNTUACIONES MAS ALTAS</h1>
                                <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="col-12">
                            <table class="table table-dark table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">NICK</th>
                                    <th scope="col">DIFICULTAD</th>
                                    <th scope="col">SCORE</th>
                                    <th scope="col">FECHA</th>
                                    </tr>
                                </thead>
                                <tbody id="scores">
                                    <!-- <tr>
                                        <td>Mark</td>
                                        <td>NORMAL</td>
                                        <td>0</td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                </div> -->
            </div>
        </div>
    </div>

    <!-- inicio sesion / registro -->
    <div class="modal fade login" id="mdlLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdlLoginLbl" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 class="modal-title" id="mdlLoginLbl">Modal title</h5>
                </div> -->
                <div class="modal-body">
                    <div class="row">
                        <div id="form-login" class="col-12">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="title text-center bg-black d-flex align-items-center justify-content-center py-3">
                                        <h3 class="ms-auto">Iniciar sesión</h3>
                                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Usuario
                                    </label>
                                    <input id="txtLoginUsuario" type="text" class="form-control form-control-lg" placeholder="Ingrese su usuario">
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Contraseña
                                    </label>
                                    <input id="txtLoginPassword" type="password" class="form-control form-control-lg" placeholder="Ingrese su contraseña">
                                </div>
                                <div class="col-12">
                                    <a href="#!" class="btn btn-nitroso btn-lg w-100">
                                        <i class="fas fa-sign-in-alt me-2"></i>Entrar
                                    </a>
                                </div>
                                <div class="col-12 text-white">
                                    <hr>
                                </div>
                                <!-- <div class="col-12 text-center">
                                    ¿No tienes una cuenta? 
                                    <strong>
                                        <a class="btnVerRegistro" href="#!">
                                            Haz click aqui para registrarte
                                        </a>
                                    </strong>
                                </div> -->
                                <div class="col-12 text-white">
                                    <hr>
                                </div>
                                <div class="col-12 text-center">
                                    <label for="" class="form-label">
                                        Inicia sesión con alguna red social
                                    </label>
                                </div>
                                <div class="col-12 text-center buttons-redes">

                                    <a href="#!" class="btn btn-secondary btn-lg fb">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>

                                    <a href="#!" class="btn btn-secondary btn-lg tw">
                                        <i class="fab fa-twitter"></i>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div id="form-registro" class="col-12 d-none">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="title text-center bg-black d-flex align-items-center justify-content-center py-3">
                                        <h3 class="ms-auto">Registrarse</h3>
                                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Usuario
                                    </label>
                                    <input id="txtRegistroUsuario" type="text" class="form-control form-control-lg" placeholder="Ingrese su usuario">
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Correo
                                    </label>
                                    <input id="txtRegistroCorreo" type="email" class="form-control form-control-lg" placeholder="Ingrese su correo">
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Contraseña
                                    </label>
                                    <input id="txtRegistroPassword" type="password" class="form-control form-control-lg" placeholder="Ingrese su contraseña">
                                </div>
                                <div class="col-12">
                                    <label for="" class="label-form">
                                        Confirmar contraseña
                                    </label>
                                    <input id="txtRegistroConfirmPassword" type="password" class="form-control form-control-lg" placeholder="Confirme su contraseña">
                                </div>
                                <div class="col-12">
                                    <a href="#!" class="btn btn-nitroso btn-lg w-100">
                                        Registrarse
                                    </a>
                                </div>
                                <div class="col-12 text-white">
                                    <hr>
                                </div>
                                <div class="col-12 text-center">
                                    ¿Ya tiene una cuenta? 
                                    <strong>
                                        <a class="btnVerRegistro" href="#!">
                                            Haz click aqui para iniciar sesión
                                        </a>
                                    </strong>
                                </div>
                                <div class="col-12 text-white">
                                    <hr>
                                </div>
                                <div class="col-12 text-center">
                                    <label for="" class="form-label">
                                        Registrese con alguna red social
                                    </label>
                                </div>
                                <div class="col-12 text-center buttons-redes">
                                    <a href="#!" class="btn btn-secondary btn-lg fb">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#!" class="btn btn-secondary btn-lg tw">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                </div> -->
            </div>
        </div>
    </div> 

    <!-- scripts -->
    <script src="/res/lib/jquery.min.js"></script>
    <script src="/res/lib/bootstrap.min.js"></script>
    <script src="/code/csts.js"></script>
    <script src="/code/fun.js"></script>
    <script src="/code/ajax.js"></script>
    <script src="/index.js"></script>

    <!-- <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v10.0&appId=1458428857833266&autoLogAppEvents=1" nonce="AfglOnxd"></script> -->
    
</body>
</html>