let currentType = "";

function getStoredData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

async function calculateReports() {
const res = await fetch('fetch_reports.php');
const data = await res.json();

const totalIncome = parseFloat(data.income);
const totalExpense = parseFloat(data.expenses);
const savings = totalIncome - totalExpense;
const spendingPlan = (totalIncome * 0.5).toFixed(2);

document.getElementById("totalIncome").innerText = `$${totalIncome}`;
document.getElementById("totalExpense").innerText = `$${totalExpense}`;
document.getElementById("savings").innerText = `$${savings}`;
document.getElementById("spendingPlan").innerText = `$${spendingPlan}`;

loadReportChart(totalIncome, totalExpense);
}


let chartInstance = null;
function loadReportChart(income, expense) {
  const ctx = document.getElementById("reportChart").getContext("2d");
  if (chartInstance) chartInstance.destroy(); // Clean previous chart
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [{
        label: "Amount ($)",
        data: [income, expense],
        backgroundColor: ["#4caf50", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      animation: false,
      scales: { y: { beginAtZero: true } }
    }
  });
}

function openModal(type) {
  currentType = type;
  document.getElementById("modalTitle").innerText = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  document.getElementById("descInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("modal").style.display = "flex";
}

async function saveData() {
const desc = document.getElementById("descInput").value;
const amount = document.getElementById("amountInput").value;

if (!desc || !amount) return alert("Please enter valid data.");

const endpoint = currentType === 'income' ? 'add_income.php' : 'add_expense.php';
const payload = currentType === 'income' 
? { source: desc, amount: parseFloat(amount) }
: { category: desc, amount: parseFloat(amount) };

const res = await fetch(endpoint, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});

const result = await res.json();
if (result.success) {
document.getElementById("modal").style.display = "none";
calculateReports();
} else {
alert("Error saving data.");
}
}


window.onclick = e => {
  if (e.target === document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
}

function downloadPDF() {
  const reportSection = document.getElementById("reportSection");
  const canvasElements = reportSection.querySelectorAll("canvas");

  const canvasImages = [];

  canvasElements.forEach((canvas, index) => {
    const imgData = canvas.toDataURL("image/png");
    const img = document.createElement("img");
    img.src = imgData;
    img.style.maxWidth = "100%";
    img.style.marginTop = "1rem";
    canvasImages.push({ canvas, img });

    // Insert image after canvas
    canvas.parentNode.insertBefore(img, canvas.nextSibling);
    // Hide canvas
    canvas.style.display = "none";
  });

  setTimeout(() => {
    html2pdf().set({
      margin: 0.5,
      filename: 'Finance_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(reportSection).save().then(() => {
      // Restore original DOM
      canvasImages.forEach(({ canvas, img }) => {
        img.remove();
        canvas.style.display = "block";
      });
    });
  }, 500);
}


const { totalIncome, totalExpense } = calculateReports();
loadReportChart(totalIncome, totalExpense);
