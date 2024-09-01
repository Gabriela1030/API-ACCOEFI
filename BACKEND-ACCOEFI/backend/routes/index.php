<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../controllers/CategoriaController.php';
include_once '../controllers/ClienteController.php';
include_once '../controllers/ProductoController.php';
include_once '../controllers/InventarioController.php';
include_once '../controllers/ProveedorController.php';
include_once '../controllers/UsuarioController.php';

// Parseamos la URI para determinar qué controlador usar
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Verificamos qué controlador utilizar basándonos en la primera parte del endpoint
if ($uri[1] === 'categoria') {
    include_once '../controllers/CategoriaController.php';
} elseif ($uri[1] === 'cliente') {
    include_once '../controllers/ClienteController.php';
} elseif ($uri[1] === 'producto') {
    include_once '../controllers/ProductoController.php';
} elseif ($uri[1] === 'inventario') {
    include_once '../controllers/InventarioController.php';
} elseif ($uri[1] === 'proveedor') {
    include_once '../controllers/ProveedorController.php';
} elseif ($uri[1] === 'usuario') {
    include_once '../controllers/UsuarioController.php';
} else {
    // Si no coincide con ninguna ruta conocida, devuelve un error 404
    http_response_code(404);
    echo json_encode(["message" => "Recurso no encontrado."]);
    exit();
}
?>
