<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/Database.php';
require_once '../models/Activity.php';

// Crear una instancia de la base de datos
$database = new Database();
$db = $database->getConnection();

// Crear una instancia del modelo Activity
$activity = new Activity($db);

// Verificar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Obtener todas las actividades recientes
    $result = $activity->getRecentActivities();

    if (!empty($result)) {
        echo json_encode($result);
    } else {
        echo json_encode(["message" => "No hay actividades recientes."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Método no permitido."]);
}
?>
