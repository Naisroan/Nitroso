<?php

    // conexion sql
    require_once ('StoredProcedure.php');
    require_once ('model/puntuacion.php');

    try {

        // validacion de accion e información
        if (isset($_POST["action"])) {
    
            $action = isset($_POST['action']) ? $_POST['action'] : null;
            $data = isset($_POST['nodo']) ? $_POST['nodo'] : null;

            if ($data != null && is_string($data) && isJson($data)) {
                $data = json_decode($data);
            }
    
        } else {
    
            header('HTTP/1.0 500 Internal Server Error');
            die("Funcionalidad no controlada");
        }

    } catch (Exception $e) {

        header('HTTP/1.0 500 Internal Server Error');
        die($e->getMessage());
    }

    switch ($action) {

        default: {

            header('HTTP/1.0 500 Internal Server Error');
            die("Funcionalidad no controlada");
        }

        // ----------------------------------------
        // usuario
        // ----------------------------------------
        case "usuario_create": {
            echo usuario_create($data);
            break;
        }

        case "usuario_exists": {
            echo usuario_exists($data);
            break;
        }

        case "usuario_exists_by_nick": {
            echo usuario_exists_by_nick($data);
            break;
        }

        // ----------------------------------------
        // puntuacion
        // ----------------------------------------
        case "puntuacion_create": {
            echo puntuacion_create($data);
            break;
        }

        case "puntuacion_selectall": {
            echo puntuacion_selectall();
            break;
        }
    }

    exit();

    // ----------------------------------------
    // usuario
    // ----------------------------------------

    function usuario_create($nodo) {

        $sp = new SP("sp_usuario_create");
        $result = $sp->insertOrUpdate($nodo->nick, $nodo->password);

        if(!$sp->isSuccess()) {
            
            header('HTTP/1.0 500 Internal Server Error');
            die($sp->errorMessage);
        }

        return $result;
    }

    function usuario_exists($nodo) {

        $sp = new SP("sp_usuario_exists");
        $result = $sp->select($nodo->nick, $nodo->password);

        if(!$sp->isSuccess()) {
            
            header('HTTP/1.0 500 Internal Server Error');
            die($sp->errorMessage);
        }

        return (int)$result[0][0];
    }

    function usuario_exists_by_nick($nodo) {

        $sp = new SP("sp_usuario_exists_by_nick");
        $result = $sp->select($nodo->nick);

        if(!$sp->isSuccess()) {
            
            header('HTTP/1.0 500 Internal Server Error');
            die($sp->errorMessage);
        }

        return (int)$result[0][0];
    }

    // ----------------------------------------
    // puntuacion
    // ----------------------------------------

    function puntuacion_create($nodo) {

        $sp = new SP("sp_puntuacion_create");
        $result = $sp->insertOrUpdate($nodo->id_usuario, $nodo->score, $nodo->dificultad);

        if(!$sp->isSuccess()) {
            
            header('HTTP/1.0 500 Internal Server Error');
            die($sp->errorMessage);
        }

        return $result;
    }

    function puntuacion_selectall() {

        $sp = new SP("sp_puntuacion_selectall");
        $result = $sp->select();

        if(!$sp->isSuccess()) {
            
            header('HTTP/1.0 500 Internal Server Error');
            die($sp->errorMessage);
        }

        if (count($result) <= 0) {
            return null;
        }

        $list = array();

        foreach ($result as &$key) {

            $nodo = puntuacion::parse($key);
            $list[] = $nodo;
        }

        $json = json_encode($list);

        return $json;
    }

    // ----------------------------------------
    // metodos generales
    // ----------------------------------------

    function isJson($string) {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
     }
?>