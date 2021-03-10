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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
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
                            <div class="col-12 text-center">
                                <div class="row">
                                    <label for="" class="h3 col-12">
                                        ¡Bienvenido!
                                    </label>
                                    <div class="col-12">
                                        <input type="text" placeholder="Ingresa tu nickname" class="form-control nick text-center" value="XxAssasinsxX">
                                    </div>
                                </div>
                                <!-- <label for="" class="h3 me-2">¡Bienvenido!</label> -->
                            </div>
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
                                <a href="#!" data-bs-toggle="modal" data-bs-target="#mdlScore">
                                    <img src="/res/examples/btn_score.png" alt="" srcset="" class="w-100">
                                </a>
                            </div>
                            <div class="col-12">
                                <hr>
                            </div>
                            <div class="col-12 text-center">
                                ¿Ya tienes una cuenta?
                                <strong>
                                    <a href="#!" class="text-nitroso-secondary" data-bs-toggle="modal" data-bs-target="#mdlLogin">
                                        Haz click aqui para iniciar sesión
                                    </a>
                                </strong>
                            </div>
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
                    <div class="title text-center bg-black d-flex align-items-center justify-content-center py-3">
                        <h1 class="ms-auto">Selecciona el nivel a jugar</h1>
                        <button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="row options mx-0 h-100">
                        <div class="scene col-12 col-lg-4 px-0">
                            <h2 class="text-white">Bosque</h2>
                        </div>
                        <div class="scene col-12 col-lg-4 px-0">
                            <h2 class="text-white">Nieve</h2>
                        </div>
                        <div class="scene col-12 col-lg-4 px-0">
                            <h2 class="text-white">Playa</h2>
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
                    <!-- dificultad -->
                    <div class="mb-3 row">
                        <label for="" class="col-12 col-lg-4 col-xl-4 col-form-label">
                            Dificultad
                        </label>
                        <div class="col-12 col-lg-8 col-xl-8">
                            <select name="" id="" class="form-select">
                                <option value="0">Fácil</option>
                                <option value="1">Normal</option>
                                <option value="2">Nitrosa</option>
                            </select>
                        </div>
                    </div>
                    <!-- particulas -->
                    <div class="mb-3 row">
                        <label for="" class="col-12 col-lg-4 col-xl-4 col-form-label">
                            Nicknames
                        </label>
                        <div class="col-12 col-lg-8 col-xl-8">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" value="" id="chkMostrarNicks" checked>
                                <label class="form-check-label" for="chkMostrarNicks">
                                    Mostrarlos
                                </label>
                            </div>
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
                                    <th scope="col">#</th>
                                    <th scope="col">Nick</th>
                                    <th scope="col">Lugar</th>
                                    <th scope="col">Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>1</td>
                                    <td>3:58s</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>Tommy</td>
                                    <td>3</td>
                                    <td>2:15s</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>Firulais</td>
                                    <td>2</td>
                                    <td>1:24s</td>
                                    </tr>
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
                                <div class="col-12 text-center">
                                    ¿No tienes una cuenta? 
                                    <strong>
                                        <a class="btnVerRegistro" href="#!">
                                            Haz click aqui para registrarte
                                        </a>
                                    </strong>
                                </div>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js"></script>
    <script src="/res/js/csts.js"></script>
    <script src="/res/js/fun.js"></script>
    <script src="/index.js"></script>

</body>
</html>