<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Cliente.php';

$database = new Database();
$db = $database->getConnection();
$cliente = new Cliente($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $cliente->read();
        $clientes_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $cliente_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "email" => $email,
                "telefono" => $telefono,
                "direccion" => $direccion,
                "fecha_registro" => $fecha_registro
            );
            array_push($clientes_arr, $cliente_item);
        }
        echo json_encode($clientes_arr);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $cliente->nombre = $data->nombre;
        $cliente->email = $data->email;
        $cliente->telefono = $data->telefono;
        $cliente->direccion = $data->direccion;
        $cliente->fecha_registro = date('Y-m-d H:i:s');

        if($cliente->create()) {
            echo json_encode(array("message" => "Cliente creado."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el cliente."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $cliente->id = $data->id;
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
