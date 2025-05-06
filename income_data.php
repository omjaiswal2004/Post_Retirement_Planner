<?php
include 'config.php';

$result = $conn->query("SELECT source, amount, MONTHNAME(date) as month FROM income");
$data = [];

while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
