<?php
include 'db_connect.php';
$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$check = $conn->prepare("SELECT id FROM user_credentials WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already exists."]);
} else {
    $stmt = $conn->prepare("INSERT INTO user_credentials (full_name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);
    $stmt->execute();
    echo json_encode(["status" => "success", "message" => "Signup successful."]);
}
?>
