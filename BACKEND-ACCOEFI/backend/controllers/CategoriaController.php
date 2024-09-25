<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Categoria.php';

$database = new Database();
$db = $database->getConnection();
$categoria = new Categoria($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $categoria->read();
        $categorias_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $categoria_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "descripcion" => $descripcion
            );
            array_push($categorias_arr, $categoria_item);
        }
        echo json_encode($categorias_arr);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $categoria->nombre = $data->nombre;
        $categoria->descripcion = $data->descripcion;

        if($categoria->create()) {
            echo json_encode(array("message" => "Categoría creada."));
        } else {
            echo json_encode(array("message" => "No se pudo crear la categoría."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $categoria->id = $data->id;
        $categoria->nombre = $data->nombre;
        $categoria->descripcion = $data->descripcion;

        if($categoria->update()) {
            echo json_encode(array("message" => "Categoría actualizada."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar la categoría."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $categoria->id = $data->id;

        if($categoria->delete()) {
            echo json_encode(array("message" => "Categoría eliminada."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar la categoría."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
