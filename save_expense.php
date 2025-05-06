<?php
// Database connection
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "finance_planner"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

// Get the POST data
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$frequency = $_POST['frequency'];

// Prepare the SQL statement
$sql = "INSERT INTO expenses (category, amount, date, frequency) VALUES ('$category', '$amount', '$date', '$frequency')";

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to insert expense']);
}

$conn->close();
?>
