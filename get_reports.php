<?php
session_start();
$conn = new mysqli("localhost", "root", "", "finance_planner");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$userId = $_SESSION['user_id'] ?? 0; // Ensure session is set

$response = ["income" => 0, "expenses" => 0];

$incomeQuery = "SELECT SUM(amount) as total_income FROM income WHERE user_id = ?";
$stmt = $conn->prepare($incomeQuery);
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($income);
$stmt->fetch();
$response["income"] = $income ?? 0;
$stmt->close();

$expenseQuery = "SELECT SUM(amount) as total_expense FROM expenses WHERE user_id = ?";
$stmt = $conn->prepare($expenseQuery);
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($expense);
$stmt->fetch();
$response["expenses"] = $expense ?? 0;
$stmt->close();

$conn->close();

echo json_encode($response);
?>
