<div class="add-goal-form">
      <h3 data-key="addGoal">Add New Goal</h3>
      <form id="goalForm" method="POST" action="add_goal.php">
        <div class="form-group">
          <label for="goalType" data-key="goalType">Goal Type:</label>
          <select id="goalType" name="goalType" required>
            <option value="saving" data-key="saving">Saving</option>
            <option value="spending" data-key="spending">Spending</option>
            <option value="future" data-key="future">Future</option>
          </select>
        </div>
        <div class="form-group">
          <label for="goalName" data-key="goalName">Goal Name:</label>
          <input type="text" id="goalName" name="goalName" required>
        </div>
        <div class="form-group">
          <label for="targetAmount" data-key="targetAmount">Target Amount (₹):</label>
          <input type="number" id="targetAmount" name="targetAmount" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="currentAmount" data-key="currentAmount">Current Amount (₹):</label>
          <input type="number" id="currentAmount" name="currentAmount" step="0.01" value="0">
        </div>
        <button type="submit" data-key="addGoalBtn">Add Goal</button>
      </form>
    </div>
  </div>

  <script src="assets/js/goals.js"></script>
</body>
</html>