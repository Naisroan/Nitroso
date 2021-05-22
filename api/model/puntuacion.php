<?php

    class puntuacion
    {
        public int $id_puntuacion;

        public int $id_usuario;

        public string $nick;

        public float $score;

        public int $dificultad;

        public string $fecha_alta;

        public string $fecha_mod;

        public static function parseArrayToList($array) {

            $list = array();
    
            foreach ($array as $row) {
                array_push($list, puntuacion::parse($row));
            }

            return $list;
        }

        public static function parse($row) {

            $nodo = new puntuacion();

            $nodo->id_puntuacion = !is_null($row[0]) ? (int)$row[0] : 0;
            $nodo->id_usuario = !is_null($row[1]) ? (int)$row[1] : 0;
            $nodo->nick = !is_null($row[2]) ? (string)$row[2] : "";
            $nodo->score = !is_null($row[3]) ? (float)$row[3] : 0;
            $nodo->dificultad = !is_null($row[4]) ? (int)$row[4] : 0;
            $nodo->fecha_alta =!is_null($row[5]) ? (string)$row[5] : "";
            $nodo->fecha_mod = !is_null($row[6]) ? (string)$row[6] : "";

            return $nodo;
        }
    }

?>