let incomeLabels = [];
let incomeData = [];
let growthLabels = [];
let growthData = [];

const incomeCtx = document.getElementById('incomeChart').getContext('2d');
const growthCtx = document.getElementById('growthChart').getContext('2d');

const incomeChart = new Chart(incomeCtx, {
  type: 'bar',
  data: {
    labels: incomeLabels,
    datasets: [{
      label: 'Income Amount',
      data: incomeData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

const growthChart = new Chart(growthCtx, {
  type: 'line',
  data: {
    labels: growthLabels,
    datasets: [{
      label: 'Monthly Growth',
      data: growthData,
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.3,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('income_data.php')
    .then(res => res.json())
    .then(data => {
      data.forEach(entry => {
        const idx = incomeLabels.indexOf(entry.source);
        if (idx !== -1) {
          incomeData[idx] += parseFloat(entry.amount);
        } else {
          incomeLabels.push(entry.source);
          incomeData.push(parseFloat(entry.amount));
        }

        const monthIdx = growthLabels.indexOf(entry.month);
        if (monthIdx !== -1) {
          growthData[monthIdx] += parseFloat(entry.amount);
        } else {
          growthLabels.push(entry.month);
          growthData.push(parseFloat(entry.amount));
        }
      });

      incomeChart.update();
      growthChart.update();
    });
});

function logIncome() {
  const source = document.getElementById('source').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const frequency = document.getElementById('frequency').value;

  if (source && amount && date) {
    const formData = new FormData();
    formData.append('source', source);
    formData.append('amount', amount);
    formData.append('date', date);
    formData.append('frequency', frequency);

    fetch('income.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(response => {
      if (response.trim() === 'success') {
        alert('Income logged successfully');
        location.reload();
      } else {
        alert('Failed to log income');
      }
    });
  } else {
    alert('Please fill out all fields!');
  }
}
