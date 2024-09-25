<?php
class Inventario {
    private $conn;
    private $table_name = "inventario";

    public $id;
    public $producto_id;
    public $cantidad;
    public $fecha_actualizacion;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET producto_id=:producto_id, cantidad=:cantidad, fecha_actualizacion=:fecha_actualizacion";
        $stmt = $this->conn->prepare($query);

        $this->producto_id = htmlspecialchars(strip_tags($this->producto_id));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->fecha_actualizacion = htmlspecialchars(strip_tags($this->fecha_actualizacion));

        $stmt->bindParam(":producto_id", $this->producto_id);
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":fecha_actualizacion", $this->fecha_actualizacion);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET producto_id = :producto_id, cantidad = :cantidad, fecha_actualizacion = :fecha_actualizacion WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->producto_id = htmlspecialchars(strip_tags($this->producto_id));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->fecha_actualizacion = htmlspecialchars(strip_tags($this->fecha_actualizacion));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':producto_id', $this->producto_id);
        $stmt->bindParam(':cantidad', $this->cantidad);
        $stmt->bindParam(':fecha_actualizacion', $this->fecha_actualizacion);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

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
