<?php
session_start();
$conn = new mysqli("localhost", "root", "", "finance_planner");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$data = json_decode(file_get_contents("php://input"), true);
$source = $data['source'];
$amount = $data['amount'];
$frequency = "Monthly"; // Or dynamically assign
$userId = $_SESSION['user_id'] ?? 0;

$sql = "INSERT INTO income (user_id, source, amount, frequency) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isds", $userId, $source, $amount, $frequency);
$success = $stmt->execute();

echo json_encode(["success" => $success]);

$conn->close();
?>
