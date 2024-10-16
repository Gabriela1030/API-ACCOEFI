<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Proveedor.php';

$database = new Database();
$db = $database->getConnection();
$proveedor = new Proveedor($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $proveedor->read();
        $proveedores_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $proveedor_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "email" => $email,
                "telefono" => $telefono,
                "direccion" => $direccion,
                "fecha_registro" => $fecha_registro
            );
            array_push($proveedores_arr, $proveedor_item);
        }
        echo json_encode($proveedores_arr);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $proveedor->nombre = $data->nombre;
        $proveedor->email = $data->email;
        $proveedor->telefono = $data->telefono;
        $proveedor->direccion = $data->direccion;
        $proveedor->fecha_registro = date('Y-m-d H:i:s');

        if($proveedor->create()) {
            echo json_encode(array("success" => true, "message" => "Proveedor creado."));
        } else {
            echo json_encode(array("success" => false, "message" => "No se pudo crear el proveedor."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $proveedor->id = $data->id;
        $proveedor->nombre = $data->nombre;
        $proveedor->email = $data->email;
        $proveedor->telefono = $data->telefono;
        $proveedor->direccion = $data->direccion;

        if($proveedor->update()) {
            echo json_encode(array("message" => "Proveedor actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el proveedor."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $proveedor->id = $data->id;

        if($proveedor->delete()) {
            echo json_encode(array("message" => "Proveedor eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el proveedor."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
