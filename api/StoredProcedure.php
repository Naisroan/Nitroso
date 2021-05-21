<?php

    require_once ('MySQLConnection.php');

    class SP {

        private $name = "";
        public $errorMessage = "";
        private $success = false;

        function __construct(string $name) {
            $this->name = $name;
        }

        function select(...$params) {

            // instanciamos una conexion
            $bd = new MySQLConnection();
        
            // verificamos si se conecto correctamente
            if (!$bd->isConnected($this->errorMessage)) {
                $this->result = false;
                return null;
            }

            // preparamos el query
            $stmt = $this->createStatement($bd, ...$params);

            // verificamos que ha salido bien la preparacion del query
            if ($stmt == null) {

                $bd->close();
                $this->success = false;
                return null;
            }

            // executamos
            if (!$stmt->execute()) {

                // si la funcion execute retorna false, hubo un error...
                $this->errorMessage = "ERR " . $stmt->errno . ": \n\n" . $stmt->error;
                $bd->close();
                $this->success = false;
                return null;
            }
            
            // si todo salio bien, retornamos el resultado
            $this->errorMessage = "";
            $result = $stmt->get_result();
            $arrayResult = mysqli_fetch_all($result);

            $stmt->close();
            $bd->close();
            $this->success = true;

            // return json_encode($arrayResult);
            return $arrayResult;
        }

        function insertOrUpdate(...$params) {

            // instanciamos una conexion
            $bd = new MySQLConnection();
        
            // verificamos si se conecto correctamente
            if (!$bd->isConnected($this->errorMessage)) {
                $this->success = false;
                return -1;
            }

            // preparamos el query
            $stmt = $this->createStatement($bd, ...$params);

            // verificamos que ha salido bien la preparacion del query
            if ($stmt == null) {

                $bd->close();
                $this->success = false;
                return -1;
            }

            // executamos
            if (!$stmt->execute()) {

                // si la funcion execute retorna false, hubo un error...
                $this->errorMessage = "ERR " . $stmt->errno . ": \n\n" . $stmt->error;
                $this->success = false;
                $bd->close();
                return -1;
            }
            
            // si todo salio bien, retornamos el resultado (el id ingresado)
            $this->errorMessage = "";
            $result = $stmt->get_result();
            $arrayResult = mysqli_fetch_all($result);

            $stmt->close();
            $bd->close();

            $this->success = true;

            return $arrayResult[0][0];
        }

        function isSuccess() {
            return $this->success;
        }

        function createStatement(&$bd, ...$params) {

            $types = "";
            $query = $this->createQuery($types, ...$params);
            $statement = $bd->Connection->prepare($query);

            if (!$statement) {

                echo $bd->Connection->error . "\n";
                $this->errorMessage = $bd->Connection->error;
                return null;
            }

            if ($params != null && count($params) > 0) {

                $bindResult = $statement->bind_param($types, ...$params);

                if (!$bindResult) {
    
                    $this->errorMessage = "Error al establecer los parametros de la consulta";
                    return null;
                }

            }

            return $statement;
        }

        function createQuery(&$types, ...$params) {

            $cantParams = $params == null ? 0 : count($params);
            $types = "";
            $query = "CALL " . $this->name;

            if ($params != null && count($params) > 0) {

                $query = $query . " (";

                for ($i = 0; $i < $cantParams; $i++) {
    
                    $query = $query . " ? ";
                    $types = $types . $this->getParamType($params[$i]);
    
                    if ($i < $cantParams - 1) {
                        $query = $query . ",";
                    }
                }
                
                $query = $query . " )";
            }

            return $query;
        }

        function getParamType($param) {

            $type = gettype($param);

            switch ($type) {
                case "boolean": {
                    return "i";
                }
                case "integer": {
                    return "i";
                }
                case "double": {
                    return "d";
                }
                case "string": {
                    return "s";
                }
                case "array": {
                    return "b";
                }
                case "object": {
                    return "b";
                }
                case "resource": {
                    return "b";
                }
                case "NULL": {
                    return "i";
                }
                case "unknown type": {
                    return "s";
                }
            }
            return "s";
        }
    }

?>