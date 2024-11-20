<?php
class Activity
{
    private $conn;
    private $table_name = "activities";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener actividades recientes
    public function getRecentActivities()
    {
        $query = "SELECT description, created_at FROM " . $this->table_name . " ORDER BY created_at DESC LIMIT 10";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $activities = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $activities[] = $row;
        }

        return $activities;
    }
}
?>
