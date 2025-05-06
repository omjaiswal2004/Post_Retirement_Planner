const adviceData = {
    teacher: {
      faqs: [
        "How should I manage my pension?",
        "Can I invest in mutual funds after retirement?"
      ],
      advice: [
        "Take full advantage of your pension schemes and gratuity benefits.",
        "Plan monthly expenses considering your teaching pension.",
        "Diversify retirement funds into low-risk instruments like PPF and Senior Citizen Savings Scheme."
      ],
      investments: [
        "Invest in PPF, mutual funds (balanced), and tax-saving FDs.",
        "Explore teaching consulting or online education to supplement income."
      ]
    },
    doctor: {
      faqs: [
        "How to maintain cash flow after retirement?",
        "What insurance plans should I consider?"
      ],
      advice: [
        "Consider opening your own clinic part-time post retirement.",
        "Invest in health insurance and long-term debt funds.",
        "Avoid overexposure to stocks nearing retirement."
      ],
      investments: [
        "Liquid mutual funds, REITs, and senior citizen deposits.",
        "Income from telemedicine or part-time consultancy."
      ]
    },
    govt: {
      faqs: [
        "How to plan gratuity and pension savings?",
        "What should I do with lump sum retirement benefits?"
      ],
      advice: [
        "Use NPS and LIC pension schemes for long-term planning.",
        "Avoid spending gratuity amount — invest it in safe avenues.",
        "Ensure spouse and dependents have proper health cover."
      ],
      investments: [
        "Senior Citizen Saving Scheme, KVP, NPS Tier II.",
        "Recurring deposits and annuity plans."
      ]
    },
    private: {
      faqs: [
        "What if I don't have a pension?",
        "How to handle EPF and gratuity wisely?"
      ],
      advice: [
        "Build retirement corpus early through SIPs and PPF.",
        "Use retirement calculators to set goals.",
        "Track your EPF, and roll over to safe investments post retirement."
      ],
      investments: [
        "Equity mutual funds (till 55), then shift to bonds and debt.",
        "Health and term insurance are must-haves."
      ]
    },
    farmer: {
      faqs: [
        "How to secure retirement with no formal pension?",
        "Should I keep farming land post-retirement?"
      ],
      advice: [
        "Lease land for regular passive income.",
        "Invest in gold bonds, PPF, and agri-mutual funds.",
        "Ensure emergency fund and weather insurance."
      ],
      investments: [
        "PM-KISAN schemes, land leasing, and livestock insurance.",
        "Invest surplus crop income in cooperative FDs or rural banks."
      ]
    }
  };
  
  const roleSelect = document.getElementById("role");
  const adviceSection = document.getElementById("advice-section");
  
  function displayAdvice(role) {
    const data = adviceData[role];
    if (!data) return;
  
    adviceSection.innerHTML = `
      <h2>📌 FAQs</h2>
      <ul>${data.faqs.map(faq => `<li>${faq}</li>`).join("")}</ul>
  
      <h2>💡 Financial Advice</h2>
      <ul>${data.advice.map(tip => `<li>${tip}</li>`).join("")}</ul>
  
      <h2>📈 Investment & Gratuity Info</h2>
      <ul>${data.investments.map(info => `<li>${info}</li>`).join("")}</ul>
    `;
  }
  
  // Default load
  displayAdvice(roleSelect.value);
  
  // On change
  roleSelect.addEventListener("change", (e) => {
    displayAdvice(e.target.value);
  });
  