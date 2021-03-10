<?php

    # settings.php

?>

<!DOCTYPE html>
<html lang="es-mx">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración - Nitroso ©</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/res/fonts/fontawesome/css/all.min.css">

    <!-- styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/mods/settings/settings.css">

</head>
<body>

    <!-- content -->
    <div id="wrapper" class="wrapper">
        <div class="container">
            <div class="row">
                <div class="options-wrapper col-12 col-lg-6 col-xl-4 mx-auto">
                    <div class="options">
                        <!-- title -->
                        <div class="mb-5 row title">
                            <div class="col-12 col-lg-8">
                                <h1 class="h2 m-0">Configuraciones</h1>
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
                        <div class="my-5 text-end">
                            <button class="btn btn-secondary">
                                Volver
                            </button>
                            <button class="btn btn-nitroso">
                                <i class="fas fa-save me-1"></i>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="/mods/settings/settings.js"></script>

</body>
</html>