document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const toggleBtn = document.getElementById('themeToggle');
    const icon = toggleBtn.querySelector('i');
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  
    // Language Toggle
    const translations = {
      en: {
        title: "My Financial Goals",
        savingGoals: "Saving Goals",
        spendingGoals: "Spending Goals",
        futureGoals: "Future Goals (Travel & Major Expenses)",
        addGoal: "Add New Goal",
        goalType: "Goal Type:",
        saving: "Saving",
        spending: "Spending",
        future: "Future",
        goalName: "Goal Name:",
        targetAmount: "Target Amount (₹):",
        currentAmount: "Current Amount (₹):",
        addGoalBtn: "Add Goal"
      },
      hi: {
        title: "मेरे वित्तीय लक्ष्य",
        savingGoals: "बचत लक्ष्य",
        spendingGoals: "खर्च लक्ष्य",
        futureGoals: "भविष्य के लक्ष्य (यात्रा और बड़े खर्च)",
        addGoal: "नया लक्ष्य जोड़ें",
        goalType: "लक्ष्य प्रकार:",
        saving: "बचत",
        spending: "खर्च",
        future: "भविष्य",
        goalName: "लक्ष्य नाम:",
        targetAmount: "लक्ष्य राशि (₹):",
        currentAmount: "वर्तमान राशि (₹):",
        addGoalBtn: "लक्ष्य जोड़ें"
      }
    };
  
    let currentLang = localStorage.getItem('language') || 'en';
    const languageToggle = document.getElementById('languageToggle');
  
    // Set initial language
    updateLanguage();
    languageToggle.textContent = currentLang === 'en' ? '🌐 हिन्दी' : '🌐 English';
  
    languageToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      updateLanguage();
      languageToggle.textContent = currentLang === 'en' ? '🌐 हिन्दी' : '🌐 English';
      localStorage.setItem('language', currentLang);
    });
  
    function updateLanguage() {
      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
          if (el.tagName === 'INPUT' && el.type !== 'submit') {
            el.placeholder = translations[currentLang][key];
          } else if (el.tagName === 'OPTION') {
            el.textContent = translations[currentLang][key];
          } else {
            el.textContent = translations[currentLang][key];
          }
        }
      });
    }
  
    // Initialize charts with data from PHP
    initializeCharts();
  });
  
  function initializeCharts() {
    // Savings Chart
    const savingsCtx = document.getElementById('savingsChart');
    if (savingsCtx) {
      const savingsData = JSON.parse(savingsCtx.getAttribute('data-goals'));
      new Chart(savingsCtx, {
        type: 'bar',
        data: {
          labels: savingsData.map(g => g.goal_name),
          datasets: [{
            label: 'Savings Goals (in ₹)',
            data: savingsData.map(g => g.target_amount),
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: document.querySelector('[data-key="savingGoals"]').textContent }
          }
        }
      });
    }
  
    // Spending Chart
    const spendingCtx = document.getElementById('spendingChart');
    if (spendingCtx) {
      const spendingData = JSON.parse(spendingCtx.getAttribute('data-goals'));
      new Chart(spendingCtx, {
        type: 'doughnut',
        data: {
          labels: spendingData.map(g => g.goal_name),
          datasets: [{
            label: 'Spending Plan (Monthly ₹)',
            data: spendingData.map(g => g.target_amount),
            backgroundColor: ['#e67e22', '#f1c40f', '#e74c3c', '#16a085']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: document.querySelector('[data-key="spendingGoals"]').textContent }
          }
        }
      });
    }
  
    // Future Goals Chart
    const futureCtx = document.getElementById('futureChart');
    if (futureCtx) {
      const futureData = JSON.parse(futureCtx.getAttribute('data-goals'));
      new Chart(futureCtx, {
        type: 'pie',
        data: {
          labels: futureData.map(g => g.goal_name),
          datasets: [{
            label: 'Future Goals (₹)',
            data: futureData.map(g => g.target_amount),
            backgroundColor: ['#16a085', '#2ecc71', '#34495e', '#9b59b6']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: document.querySelector('[data-key="futureGoals"]').textContent }
          }
        }
      });
    }
  }
  
  // Create progress bars for goals
  function createProgressBars() {
    document.querySelectorAll('.goal-item').forEach(item => {
      const current = parseFloat(item.getAttribute('data-current'));
      const target = parseFloat(item.getAttribute('data-target'));
      const percent = Math.min((current / target) * 100, 100);
      
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      
      const progressFill = document.createElement('div');
      progressFill.className = 'progress-fill';
      progressFill.style.width = `${percent}%`;
      progressFill.textContent = `${Math.round(percent)}%`;
      
      progressBar.appendChild(progressFill);
      item.appendChild(progressBar);
    });
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', createProgressBars);