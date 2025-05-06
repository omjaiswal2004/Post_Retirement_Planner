<?php
session_start(); // Required to manage sessions
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$password = $data->password;

$stmt = $conn->prepare("SELECT id, full_name, password FROM user_credentials WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $name, $hashed);

if ($stmt->num_rows === 1) {
  $stmt->fetch();
  if (password_verify($password, $hashed)) {
    // Store user id in session
    $_SESSION['user_id'] = $id;
    $_SESSION['user_name'] = $name;

    echo json_encode(["status" => "success", "name" => $name, "id" => $id]);
  } else {
    echo json_encode(["status" => "error", "message" => "Invalid password."]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "User not found."]);
}
?>
