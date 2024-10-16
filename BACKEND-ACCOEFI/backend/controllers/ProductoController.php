<?php
// Cabeceras para permitir acceso y métodos HTTP desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluir los archivos de configuración y modelos
include_once '../config/Database.php';
include_once '../models/Producto.php';

// Instanciar la base de datos y el objeto Producto
$database = new Database();
$db = $database->getConnection();
$producto = new Producto($db);

// Obtener el método HTTP
$request_method = $_SERVER['REQUEST_METHOD'];

// Manejar las solicitudes basadas en el método
switch($request_method) {
    case 'GET':
        // Llamar al método para obtener los productos
        $stmt = $producto->read();
        $productos_arr = array();

        // Iterar sobre los resultados y crear un array de productos
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $producto_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "descripcion" => $descripcion,
                "precio" => $precio,
                "cantidad" => $cantidad,
                "proveedor_id" => $proveedor_id,
                "fecha_registro" => $fecha_registro
            );
            array_push($productos_arr, $producto_item);
        }

        // Devolver los productos como JSON
        echo json_encode($productos_arr);
        break;

    case 'POST':
        // Obtener los datos enviados por el cliente
        $data = json_decode(file_get_contents("php://input"));

        // Asignar los valores de los datos al objeto Producto
        $producto->nombre = $data->nombre ?? null;
        $producto->descripcion = $data->descripcion ?? null;
        $producto->precio = $data->precio ?? null;
        $producto->cantidad = $data->cantidad ?? null;
        $producto->proveedor_id = $data->proveedor_id ?? null;
        $producto->fecha_registro = date('Y-m-d H:i:s');

        // Intentar crear el producto
        if($producto->create()) {
            echo json_encode(array("message" => "Producto creado."));
        } else {
            echo json_encode(array("message" => "No se pudo crear el producto."));
        }
        break;

    case 'PUT':
        // Obtener los datos enviados por el cliente
        $data = json_decode(file_get_contents("php://input"));

        // Asignar los valores de los datos al objeto Producto
        $producto->id = $data->id ?? null;
        $producto->nombre = $data->nombre ?? null;
        $producto->descripcion = $data->descripcion ?? null;
        $producto->precio = $data->precio ?? null;
        $producto->cantidad = $data->cantidad ?? null;

        // Intentar actualizar el producto
        if($producto->update()) {
            echo json_encode(array("message" => "Producto actualizado."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el producto."));
        }
        break;

    case 'DELETE':
        // Obtener los datos enviados por el cliente
        $data = json_decode(file_get_contents("php://input"));

        // Asignar el id del producto a eliminar
        $producto->id = $data->id ?? null;

        // Intentar eliminar el producto
        if($producto->delete()) {
            echo json_encode(array("message" => "Producto eliminado."));
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el producto."));
        }
        break;

    default:
        // Si el método no está permitido, devolver mensaje de error
        echo json_encode(array("message" => "Método no permitido."));
        break;
}
?>

