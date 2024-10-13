<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Incluir archivos de configuración y modelo
include_once '../config/Database.php'; // Conexión a la base de datos
include_once '../models/Usuario.php'; // Modelo de usuario

// Crear una instancia de la base de datos y obtener la conexión
$database = new Database();
$db = $database->getConnection();
$usuario = new Usuario($db); // Crear un nuevo objeto Usuario

// Obtener el método de solicitud HTTP
$request_method = $_SERVER['REQUEST_METHOD'];

// Manejar la solicitud según el método
switch($request_method) {
    case 'GET':
        // Leer todos los usuarios
        $stmt = $usuario->read(); // Obtener todos los usuarios
        $usuarios_arr = array(); // Array para almacenar usuarios
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row); // Extraer los datos de cada fila
            $usuario_item = array(
                "id" => $id,
                "nombre" => $nombre,
                "email" => $email,
                "fecha_creacion" => $fecha_creacion
            );
            array_push($usuarios_arr, $usuario_item); // Añadir usuario al array
        }
        // Devolver la lista de usuarios en formato JSON
        echo json_encode($usuarios_arr);
        break;
    
    case 'POST':
        // Crear un nuevo usuario
        $data = json_decode(file_get_contents("php://input")); // Obtener datos de la solicitud

        // Comprobar que se han proporcionado todos los campos obligatorios
        if ( !isset($data->email) || !isset($data->password)) {
            echo json_encode(array("error" => "Faltan datos obligatorios.")); // Error si faltan datos
            return; // Salir del script si faltan datos
        }

        // Asignar los datos al objeto usuario
        $tipo = $data->action;
        $usuario->email = $data->email;
        $usuario->password = $data->password;
       
        if($tipo == "LOGIN"){
            
            echo json_encode(array("success" =>true)); 
        }
        // Verificar si el correo ya está registrado
        if ($usuario->checkEmailExists($usuario->email)) {
            // Mensaje de error
            return; // Salir del script si el email ya existe
        }

        // Crear el usuario
        if($usuario->create()) {
            echo json_encode(array("message" => "Usuario creado.")); // Mensaje de éxito
        } else {
            echo json_encode(array("message" => "No se pudo crear el usuario.")); // Mensaje de error
        }
        break;

    case 'VALIDATE':
        // Validar las credenciales de un usuario
        $data = json_decode(file_get_contents("php://input")); // Obtener datos de la solicitud

        // Comprobar que se han proporcionado todos los campos obligatorios
        if (!isset($data->email) || !isset($data->password)) {
            echo json_encode(array("error" => "Faltan datos obligatorios.")); // Error si faltan datos
            return;
        }

        // Asignar los datos al objeto usuario
        $usuario->email = $data->email;
        $usuario->password = $data->password;

        // Verificar si el correo existe
        if ($usuario->checkEmailExists($usuario->email)) {
            // Obtener el usuario por correo electrónico
            $stmt = $usuario->getUserByEmail($usuario->email);
            $row = $stmt->fetch(PDO::FETCH_ASSOC); // Obtener datos del usuario
            
            // Verificar la contraseña
            if (password_verify($usuario->password, $row['password'])) {
                echo json_encode(array("message" => "Usuario validado.")); // Mensaje de éxito
            } else {
                echo json_encode(array("error" => "Contraseña incorrecta.")); // Mensaje de error
            }
        } else {
            echo json_encode(array("error" => "El correo no está registrado.")); // Mensaje de error
        }
        break;

    case 'PUT':
        // Actualizar información de un usuario
        $data = json_decode(file_get_contents("php://input")); // Obtener datos de la solicitud
        $usuario->id = $data->id; // Asignar ID
        $usuario->nombre = $data->nombre; // Asignar nombre
        $usuario->email = $data->email; // Asignar email

        // Intentar actualizar el usuario
        if($usuario->update()) {
            echo json_encode(array("message" => "Usuario actualizado.")); // Mensaje de éxito
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el usuario.")); // Mensaje de error
        }
        break;

    case 'DELETE':
        // Eliminar un usuario
        $data = json_decode(file_get_contents("php://input")); // Obtener datos de la solicitud
        $usuario->id = $data->id; // Asignar ID

        // Intentar eliminar el usuario
        if($usuario->delete()) {
            echo json_encode(array("message" => "Usuario eliminado.")); // Mensaje de éxito
        } else {
            echo json_encode(array("message" => "No se pudo eliminar el usuario.")); // Mensaje de error
        }
        break;

    default:
        echo json_encode(array("message" => "Método no permitido.")); // Mensaje de error para métodos no soportados
        break;
}
?>
