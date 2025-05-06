<?php
require_once 'includes/header.php';

// Prepare goal data for JavaScript
$savingsGoalsJson = json_encode($savingsGoals);
$spendingGoalsJson = json_encode($spendingGoals);
$futureGoalsJson = json_encode($futureGoals);
?>

<div class="goal-section">
  <h2 data-key="savingGoals">Saving Goals</h2>
  <ul id="savings-list">
    <?php foreach ($savingsGoals as $goal): ?>
      <li class="goal-item" 
          data-current="<?= $goal['current_amount'] ?>" 
          data-target="<?= $goal['target_amount'] ?>">
        <?= htmlspecialchars($goal['goal_name']) ?> - 
        ₹<?= number_format($goal['target_amount'], 2) ?>
      </li>
    <?php endforeach; ?>
  </ul>
  <canvas id="savingsChart" data-goals='<?= $savingsGoalsJson ?>'></canvas>
</div>

<div class="goal-section">
  <h2 data-key="spendingGoals">Spending Goals</h2>
  <ul id="spending-list">
    <?php foreach ($spendingGoals as $goal): ?>
      <li class="goal-item" 
          data-current="<?= $goal['current_amount'] ?>" 
          data-target="<?= $goal['target_amount'] ?>">
        <?= htmlspecialchars($goal['goal_name']) ?> - 
        ₹<?= number_format($goal['target_amount'], 2) ?>
      </li>
    <?php endforeach; ?>
  </ul>
  <canvas id="spendingChart" data-goals='<?= $spendingGoalsJson ?>'></canvas>
</div>

<div class="goal-section">
  <h2 data-key="futureGoals">Future Goals (Travel & Major Expenses)</h2>
  <ul id="future-list">
    <?php foreach ($futureGoals as $goal): ?>
      <li class="goal-item" 
          data-current="<?= $goal['current_amount'] ?>" 
          data-target="<?= $goal['target_amount'] ?>">
        <?= htmlspecialchars($goal['goal_name']) ?> - 
        ₹<?= number_format($goal['target_amount'], 2) ?>
      </li>
    <?php endforeach; ?>
  </ul>
  <canvas id="futureChart" data-goals='<?= $futureGoalsJson ?>'></canvas>
</div>

<?php require_once 'includes/footer.php'; ?>