<?php
include 'config.php';

$source = $_POST['source'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$frequency = $_POST['frequency'];

$stmt = $conn->prepare("INSERT INTO income (source, amount, date, frequency) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sdss", $source, $amount, $date, $frequency);

if ($stmt->execute()) {
  echo "success";
} else {
  echo "error";
}

$stmt->close();
$conn->close();
?>
