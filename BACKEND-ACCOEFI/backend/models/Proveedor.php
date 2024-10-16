<?php
class Proveedor {
    private $conn;
    private $table_name = "proveedores";

    public $id;
    public $nombre;
    public $email;
    public $telefono;
    public $direccion;
    public $fecha_registro;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear un nuevo proveedor
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (nombre, email, telefono, direccion, fecha_registro) 
                  VALUES (:nombre, :email, :telefono, :direccion, :fecha_registro)";
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->fecha_registro = date('Y-m-d H:i:s');

        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':telefono', $this->telefono);
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':fecha_registro', $this->fecha_registro);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Leer todos los proveedores
    public function read() {
        $query = "SELECT id, nombre, email, telefono, direccion, fecha_registro FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Actualizar un proveedor
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, email = :email, telefono = :telefono, direccion = :direccion 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':telefono', $this->telefono);
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Eliminar un proveedor
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
