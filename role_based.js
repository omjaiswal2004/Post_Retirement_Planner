const data = {
    teacher: {
      schemes: [
        "National Pension System (NPS)",
        "Gratuity under CCS Rules",
        "General Provident Fund (GPF)"
      ],
      taxation: [
        "Eligible for standard deduction of ₹50,000",
        "Tax benefits under Section 80C, 80D for LIC, PPF, tuition",
        "Leave encashment up to ₹3,00,000 is tax-free"
      ],
      keywords: [
        "Gratuity: Lump sum given on retirement.",
        "GPF: Savings scheme for govt employees.",
        "NPS: Voluntary pension system for retirement."
      ]
    },
    doctor: {
      schemes: [
        "NPS for Private Practitioners",
        "Health Insurance Deduction under 80D",
        "Post Office Savings for low-risk"
      ],
      taxation: [
        "Consulting income taxed under ITR-3",
        "Deduct business expenses for tax relief",
        "Section 80D: ₹25,000 - ₹50,000 deduction for health"
      ],
      keywords: [
        "Health Insurance: Must-have for post-retirement.",
        "Term Insurance: Covers family if income stops.",
        "Senior Citizen FD: Safe investment option."
      ]
    },
    govt: {
      schemes: [
        "Defined Benefit Pension (Old Pension Scheme)",
        "General Provident Fund (GPF)",
        "Leave Encashment Benefits"
      ],
      taxation: [
        "Pension is taxable under 'Salaries'",
        "Gratuity up to ₹20L is tax-free (Govt)",
        "Standard deduction and 80C apply"
      ],
      keywords: [
        "GPF: Compulsory savings account for govt.",
        "Gratuity: Fully exempt for govt service.",
        "Leave Encashment: Paid leaves converted to cash."
      ]
    },
    private: {
      schemes: [
        "Employee Provident Fund (EPF)",
        "NPS for Retirement",
        "Voluntary Provident Fund (VPF)"
      ],
      taxation: [
        "EPF interest tax-free up to ₹2.5L/year",
        "80C deduction up to ₹1.5L for investments",
        "Capital gains apply on mutual fund withdrawals"
      ],
      keywords: [
        "EPF: Retirement saving deducted from salary.",
        "NPS: Low-cost market linked pension plan.",
        "VPF: Voluntary top-up to EPF for better corpus."
      ]
    },
    farmer: {
      schemes: [
        "PM-KISAN (₹6,000/year)",
        "PMFBY (Crop Insurance)",
        "Agri Infrastructure Fund"
      ],
      taxation: [
        "Income from farming is tax-exempt",
        "Other business income is taxable",
        "Subsidies & loans may have GST exemptions"
      ],
      keywords: [
        "PM-KISAN: ₹6,000/year direct benefit.",
        "Crop Insurance: Protects against losses.",
        "Kisan Credit Card: Instant credit for farming."
      ]
    }
  };
  
  const roleDropdown = document.getElementById("role");
  const contentContainer = document.getElementById("role-content");
  
  function renderRoleInfo(role) {
    const info = data[role];
    if (!info) return;
  
    contentContainer.innerHTML = `
      <div class="card">
        <h2>🏛 Government Schemes</h2>
        <ul>${info.schemes.map(s => `<li>${s}</li>`).join("")}</ul>
      </div>
      <div class="card">
        <h2>💰 Taxation Information</h2>
        <ul>${info.taxation.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>
      <div class="card">
        <h2>📌 Important Financial Keywords</h2>
        <ul>${info.keywords.map(k => `<li>${k}</li>`).join("")}</ul>
      </div>
    `;
  }
  
  // Initial load
  renderRoleInfo(roleDropdown.value);
  
  // Change event
  roleDropdown.addEventListener("change", (e) => {
    renderRoleInfo(e.target.value);
  });
  