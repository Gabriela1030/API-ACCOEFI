<?php
class Usuario {
    private $conn;
    private $table_name = "usuarios";

    public $id;
    public $nombre = "";
    public $email;
    public $password;
    public $fecha_creacion;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Verificar si el correo ya existe
    public function checkEmailExists($email) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->rowCount() > 0; // Devuelve true si el correo ya existe
    }

    // Crear un nuevo usuario
    public function create() {
        // Verifica si el correo ya está registrado antes de crear
        if ($this->checkEmailExists($this->email)) {
            return array("error" => "El correo ya está registrado.");
        }

        $query = "INSERT INTO " . $this->table_name . " (nombre, email, password, fecha_creacion) VALUES (:nombre, :email, :password, :fecha_creacion)";
       
        $stmt = $this->conn->prepare($query);
        
        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->fecha_creacion = htmlspecialchars(strip_tags($this->fecha_creacion));
        
        // Hashear la contraseña
        $hashed_password = password_hash($this->password, PASSWORD_BCRYPT);
        
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':fecha_creacion', $this->fecha_creacion);
        
        try {
            if ($stmt->execute()) {
                return array("message" => "Usuario creado exitosamente.");
            }
        } catch (PDOException $e) {
            // Registrar el error en el log si es necesario
            return array("error" => "No se pudo crear el usuario: " . $e->getMessage());
        }

        return array("error" => "Error desconocido al crear el usuario.");
    }

    // Leer todos los usuarios
    public function read() {
        $query = "SELECT id, nombre, email, fecha_creacion FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener usuario por correo electrónico
    public function getUserByEmail($email) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt;
    }

    // Actualizar un usuario
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET nombre = :nombre, email = :email WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Eliminar un usuario
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

