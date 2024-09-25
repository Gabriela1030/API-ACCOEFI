<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';
include_once '../models/Producto.php';

$database = new Database();
$db = $database->getConnection();
$producto = new Producto($db);

$request_method = $_SERVER['REQUEST_METHOD'];

switch($request_method) {
    case 'GET':
        $stmt = $producto->read();
        $productos_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $producto_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "descripcion" => $descripcion,
                "precio" => $precio,
                "categoria_id" => $categoria_id,
                "proveedor_id" => $proveedor_id,
                "fecha_registro" => $fecha_registro
            );
            array_push($productos_arr, $producto_item);
        }
        echo json_encode($productos_arr);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $producto->nombre = $data->nombre;
        $producto->descripcion = $data->descripcion;
        $producto->precio = $data->precio;
        $producto->categoria_id = $data->categoria_id;
        $producto->proveedor_id = $data->proveedor_id;
        $producto->fecha_registro = date('Y-m-d H:i:s');

        if($producto->create()) {
            echo json_encode(array("message" => "Producto creado."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el producto."));
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $producto->id = $data->id;
        $producto->nombre = $data->nombre;
        $producto->descripcion = $data->descripcion;
        $producto->precio = $data->precio;
        $producto->categoria_id = $data->categoria_id;
        $producto->proveedor_id = $data->proveedor_id;

        if($producto->update()) {
            echo json_encode(array("message" => "Producto actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el producto."));
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $producto->id = $data->id;

        if($producto->delete()) {
            echo json_encode(array("message" => "Producto eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el producto."));
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>
