<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Usuario.php';

$database = new Database();
$db = $database->getConnection();
$usuario = new Usuario($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $usuario->read();
        $usuarios_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $usuario_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "email" => $email,
                "fecha_creacion" => $fecha_creacion
            );
            array_push($usuarios_arr, $usuario_item);
        }
        echo json_encode($usuarios_arr);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $usuario->nombre = $data->nombre;
        $usuario->email = $data->email;
        $usuario->password = $data->password;
        $usuario->fecha_creacion = date('Y-m-d H:i:s');

        if($usuario->create()) {
            echo json_encode(array("message" => "Usuario creado."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el usuario."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $usuario->id = $data->id;
        $usuario->nombre = $data->nombre;
        $usuario->email = $data->email;

        if($usuario->update()) {
            echo json_encode(array("message" => "Usuario actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el usuario."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $usuario->id = $data->id;

        if($usuario->delete()) {
            echo json_encode(array("message" => "Usuario eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el usuario."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
