<?php
session_start();
$conn = new mysqli("localhost", "root", "", "finance_planner");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents("php://input"), true);
$category = $data['category'];
$amount = $data['amount'];
$frequency = "Monthly"; // Or dynamically assign
$date = date("Y-m-d");
$userId = $_SESSION['user_id'] ?? 0;

$sql = "INSERT INTO expenses (user_id, category, amount, date, frequency) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isdss", $userId, $category, $amount, $date, $frequency);
$success = $stmt->execute();

echo json_encode(["success" => $success]);

$conn->close();
?>
