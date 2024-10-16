<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluir archivos de configuración y modelo
include_once '../config/Database.php';
include_once '../models/Cliente.php';

// Crear una instancia de la base de datos y obtener la conexión
$database = new Database();
$db = $database->getConnection();
$cliente = new Cliente($db); // Crear un nuevo objeto Cliente

// Obtener el método de solicitud HTTP
$request_method = $_SERVER['REQUEST_METHOD'];

// Manejar la solicitud según el método
switch($request_method) {
    case 'GET':
        // Leer todos los clientes
        $stmt = $cliente->read(); // Obtener todos los clientes
        $clientes_arr = array(); // Array para almacenar clientes
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $cliente_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "email" => $email,
                "telefono" => $telefono,
                "direccion" => $direccion,
                "fecha_creacion" => $fecha_creacion
            );
            array_push($clientes_arr, $cliente_item); // Añadir cliente al array
        }
        // Devolver la lista de clientes en formato JSON
        echo json_encode($clientes_arr);
        break;
    
    case 'POST':
        // Crear un nuevo cliente
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->nombre) || !isset($data->email) || !isset($data->telefono) || !isset($data->direccion)) {
            echo json_encode(array("error" => "Faltan datos obligatorios."));
            return;
        }

        // Asignar los datos al objeto cliente
        $cliente->nombre = $data->nombre;
        $cliente->email = $data->email;
        $cliente->telefono = $data->telefono;
        $cliente->direccion = $data->direccion;

        // Crear el cliente
        if($cliente->create()) {
            echo json_encode(array("message" => "Cliente creado exitosamente."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el cliente."));
        }
        break;

    case 'PUT':
        // Actualizar un cliente
        $data = json_decode(file_get_contents("php://input"));
        $cliente->id = $data->id; // Asignar ID
        $cliente->nombre = $data->nombre;
        $cliente->email = $data->email;
        $cliente->telefono = $data->telefono;
        $cliente->direccion = $data->direccion;

        if($cliente->update()) {
            echo json_encode(array("message" => "Cliente actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el cliente."));
        }
        break;

    case 'DELETE':
        // Eliminar un cliente
        $data = json_decode(file_get_contents("php://input"));
        $cliente->id = $data->id;

        if($cliente->delete()) {
            echo json_encode(array("message" => "Cliente eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el cliente."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
