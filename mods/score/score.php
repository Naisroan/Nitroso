<?php

    # settings.php

?>

<!DOCTYPE html>
<html lang="es-mx">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puntuaciones - Nitroso ©</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />

    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/res/fonts/fontawesome/css/all.min.css">

    <!-- styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="/site.css">
    <link rel="stylesheet" href="/mods/score/score.css">

</head>
<body>

    <!-- content -->
    <div id="wrapper" class="wrapper">
        <div class="container mb-5">
            <div class="row g-3">
                <div class="col-12">
                    <h1 class="h2 m-0 text-center my-5">
                        PUNTUACIONES MAS ALTAS
                    </h1>
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
                <div class="col-12 text-end">
                    <button class="btn btn-secondary">
                        Volver
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <script src="/mods/score/score.js"></script>

</body>
</html>