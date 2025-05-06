<?php
session_start();
require_once 'db.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Get user goals from database
$user_id = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM goals WHERE user_id = ?");
$stmt->execute([$user_id]);
$goals = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Categorize goals
$savingsGoals = array_filter($goals, fn($g) => $g['goal_type'] === 'saving');
$spendingGoals = array_filter($goals, fn($g) => $g['goal_type'] === 'spending');
$futureGoals = array_filter($goals, fn($g) => $g['goal_type'] === 'future');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <title>Financial Goals</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="assets/css/goals.css">
</head>
<body>
  <nav>
    <a href="dashboard.php" data-en="Dashboard" data-hi="डैशबोर्ड">Dashboard</a>
    <a href="2_income.php" data-en="Income" data-hi="आय">Income</a>
    <a href="3_expence.php" data-en="Expenses" data-hi="व्यय">Expenses</a>
    <a href="5_goals.php" data-en="Goals" data-hi="लक्ष्य">Goals</a>
    <a href="9_reports.php" data-en="Reports" data-hi="रिपोर्ट">Reports</a>
    <a href="7_investments.php" data-en="Investment" data-hi="निवेश">Investment</a>
    <a href="6_insurance.php" data-en="Insurance" data-hi="बीमा">Insurance</a>
    <a href="8_finantial_advice.php" data-en="Financial Advice" data-hi="वित्तीय सलाह">Financial Advice</a>
    <a href="10_role_based.php" data-en="Role-Based Planning" data-hi="भूमिका-आधारित योजना">Role-Based Planning</a>
    <a href="4_income_tax.php" data-en="Income Tax Calculator" data-hi="आयकर कैलकुलेटर">Income Tax Calculator</a>
    <a href="11_Future_cal.php" data-en="Future Insights" data-hi="भविष्य के विचार">Future Insights</a>
    <a href="12_bill_payments.php" data-en="Bill Payments" data-hi="बिल भुगतान">Bill Payments</a>

    <button id="themeToggle" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;">
      <i class="fas fa-moon"></i>
    </button>
    <button id="languageToggle" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer; margin-left: 1rem;">
      🌐 हिन्दी
    </button>
  </nav>

  <div class="container">
    <h1 data-key="title">My Financial Goals</h1>