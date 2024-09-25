<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Inventario.php';

$database = new Database();
$db = $database->getConnection();
$inventario = new Inventario($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $inventario->read();
        $inventarios_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $inventario_item = array(
                "id" => $id,
                "producto_id" => $producto_id,
                "cantidad" => $cantidad,
                "fecha_actualizacion" => $fecha_actualizacion
            );
            array_push($inventarios_arr, $inventario_item);
        }
        echo json_encode($inventarios_arr);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $inventario->producto_id = $data->producto_id;
        $inventario->cantidad = $data->cantidad;
        $inventario->fecha_actualizacion = date('Y-m-d H:i:s');

        if($inventario->create()) {
            echo json_encode(array("message" => "Inventario creado."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el inventario."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $inventario->id = $data->id;
        $inventario->producto_id = $data->producto_id;
        $inventario->cantidad = $data->cantidad;

        if($inventario->update()) {
            echo json_encode(array("message" => "Inventario actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el inventario."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $inventario->id = $data->id;

        if($inventario->delete()) {
            echo json_encode(array("message" => "Inventario eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el inventario."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
