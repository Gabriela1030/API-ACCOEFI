<?php
class Producto {
    // Conexión a la base de datos y tabla productos
    private $conn;
    private $table_name = "productos";

    // Propiedades del producto
    public $id;
    public $nombre;
    public $descripcion;
    public $precio;
    public $cantidad;
    public $proveedor_id;
    public $fecha_registro;

    // Constructor con conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para leer todos los productos
    public function read() {
        // Consulta para seleccionar todos los productos
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Método para crear un nuevo producto
    public function create() {
        // Consulta para insertar un nuevo producto
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    nombre = :nombre,
                    descripcion = :descripcion,
                    precio = :precio,
                    cantidad = :cantidad,
                    proveedor_id = :proveedor_id,
                    fecha_registro = :fecha_registro";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Limpiar los datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->precio = htmlspecialchars(strip_tags($this->precio));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));
        $this->proveedor_id = htmlspecialchars(strip_tags($this->proveedor_id));
        $this->fecha_registro = htmlspecialchars(strip_tags($this->fecha_registro));

        // Enlazar los valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":precio", $this->precio);
        $stmt->bindParam(":cantidad", $this->cantidad);
        $stmt->bindParam(":proveedor_id", $this->proveedor_id);
        $stmt->bindParam(":fecha_registro", $this->fecha_registro);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Método para actualizar un producto existente
    public function update() {
        // Consulta para actualizar un producto
        $query = "UPDATE " . $this->table_name . "
                SET
                    nombre = :nombre,
                    descripcion = :descripcion,
                    precio = :precio,
                    cantidad = :cantidad
                WHERE
                    id = :id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Limpiar los datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->precio = htmlspecialchars(strip_tags($this->precio));
        $this->cantidad = htmlspecialchars(strip_tags($this->cantidad));

        // Enlazar los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":precio", $this->precio);
        $stmt->bindParam(":cantidad", $this->cantidad);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Método para eliminar un producto
    public function delete() {
        // Consulta para eliminar un producto
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Limpiar el id del producto
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Enlazar el id
        $stmt->bindParam(":id", $this->id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
