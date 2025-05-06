<?php
require_once 'includes/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $goal_type = $_POST['goalType'];
    $goal_name = $_POST['goalName'];
    $target_amount = $_POST['targetAmount'];
    $current_amount = $_POST['currentAmount'] ?? 0;

    try {
        $stmt = $pdo->prepare("INSERT INTO goals (user_id, goal_type, goal_name, target_amount, current_amount) 
                              VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$user_id, $goal_type, $goal_name, $target_amount, $current_amount]);
        
        header('Location: 5_goals.php');
        exit;
    } catch (PDOException $e) {
        die("Error adding goal: " . $e->getMessage());
    }
} else {
    header('Location: 5_goals.php');
    exit;
}
?>