let currentLanguage = 'en'; // Default language is English
let darkMode = false; // Default theme is light

// Sample data for demonstration
let reminders = [
  {
    id: 1,
    category: "Utility",
    type: "Electricity",
    amount: 2500,
    dueDate: "2024-05-15",
    reminderDate: "2024-05-08",
    notes: "Account #12345, BSES Rajdhani",
    status: "active"
  },
  {
    id: 2,
    category: "Credit",
    type: "Credit Card",
    amount: 10000,
    dueDate: "2024-05-10",
    paidDate: "2024-05-05",
    notes: "HDFC Bank Card ending with 4567",
    status: "paid"
  }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  loadReminders();
  
  // Add form submit event listeners
  document.querySelectorAll('.bill-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      addReminder(this.id);
    });
  });
});

function toggleTheme() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add('dark-mode');
    document.getElementById('themeText').textContent = currentLanguage === 'en' ? 'Light Mode' : 'लाइट मोड';
    document.getElementById('themeIcon').src = 'https://cdn-icons-png.flaticon.com/512/581/581601.png';
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('themeText').textContent = currentLanguage === 'en' ? 'Dark Mode' : 'डार्क मोड';
    document.getElementById('themeIcon').src = 'https://cdn-icons-png.flaticon.com/512/3618/3618908.png';
  }
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
  updateLanguage();
}

function updateLanguage() {
  // Update all elements with data attributes
  document.querySelectorAll('[data-en], [data-hi]').forEach(element => {
    if (element.tagName === 'OPTION') {
      // For option elements, we need to update both value and display text
      if (element.hasAttribute('data-en') && element.hasAttribute('data-hi')) {
        element.textContent = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-hi');
      }
    } else if (element.hasAttribute('data-en') && element.hasAttribute('data-hi')) {
      element.textContent = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-hi');
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-en-placeholder], [data-hi-placeholder]').forEach(input => {
    if (currentLanguage === 'en') {
      input.placeholder = input.getAttribute('data-en-placeholder') || '';
    } else {
      input.placeholder = input.getAttribute('data-hi-placeholder') || '';
    }
  });
  
  // Update title attributes
  document.querySelectorAll('[data-en-title], [data-hi-title]').forEach(btn => {
    if (currentLanguage === 'en') {
      btn.title = btn.getAttribute('data-en-title') || '';
    } else {
      btn.title = btn.getAttribute('data-hi-title') || '';
    }
  });
  
  // Update language toggle text
  document.getElementById('languageText').textContent = currentLanguage === 'en' ? 'हिंदी' : 'English';
  
  // Update theme toggle text
  document.getElementById('themeText').textContent = currentLanguage === 'en' 
    ? (darkMode ? 'Light Mode' : 'Dark Mode') 
    : (darkMode ? 'लाइट मोड' : 'डार्क मोड');
}

function resetForm(formId) {
  document.getElementById(formId).reset();
}

function addReminder(formId) {
  const form = document.getElementById(formId);
  const category = formId.replace('Form', '');
  const type = form.querySelector('select').value;
  const amount = form.querySelector('input[type="number"]').value;
  const dueDate = form.querySelector('input[type="date"]').value;
  const reminderDays = form.querySelectorAll('select')[1].value;
  const notes = form.querySelector('textarea').value;
  
  // Calculate reminder date
  const dueDateObj = new Date(dueDate);
  dueDateObj.setDate(dueDateObj.getDate() - parseInt(reminderDays));
  const reminderDate = dueDateObj.toISOString().split('T')[0];
  
  // Create new reminder object
  const newReminder = {
    id: Date.now(),
    category: category,
    type: type,
    amount: amount,
    dueDate: dueDate,
    reminderDate: reminderDate,
    notes: notes,
    status: "active"
  };
  
  // Add to reminders array
  reminders.push(newReminder);
  
  // Reload reminders
  loadReminders();
  
  // Reset form
  form.reset();
  
  // Check if due date has passed
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
  const billDueDate = new Date(dueDate);
  
  if (billDueDate < today) {
    alert(currentLanguage === 'en' 
      ? `Warning: The due date (${formatDate(dueDate)}) for this bill has already passed!` 
      : `चेतावनी: इस बिल की नियत तारीख (${formatDate(dueDate, true)}) पहले ही बीत चुकी है!`);
  } else {
    // Show success message only if due date hasn't passed
    alert(currentLanguage === 'en' 
      ? 'Reminder added successfully!' 
      : 'अनुस्मारक सफलतापूर्वक जोड़ा गया!');
  }
}

function loadReminders() {
  const activeRemindersContainer = document.getElementById('activeReminders');
  const paymentHistoryContainer = document.getElementById('paymentHistory');
  
  // Clear existing reminders
  activeRemindersContainer.innerHTML = '';
  paymentHistoryContainer.innerHTML = '';
  
  // Filter and display active reminders
  const activeReminders = reminders.filter(r => r.status === 'active');
  if (activeReminders.length === 0) {
    activeRemindersContainer.innerHTML = `<p>${currentLanguage === 'en' ? 'No active reminders' : 'कोई सक्रिय अनुस्मारक नहीं'}</p>`;
  } else {
    activeReminders.forEach(reminder => {
      activeRemindersContainer.appendChild(createReminderCard(reminder));
    });
  }
  
  // Filter and display payment history
  const paidReminders = reminders.filter(r => r.status === 'paid');
  if (paidReminders.length === 0) {
    paymentHistoryContainer.innerHTML = `<p>${currentLanguage === 'en' ? 'No payment history' : 'कोई भुगतान इतिहास नहीं'}</p>`;
  } else {
    paidReminders.forEach(reminder => {
      paymentHistoryContainer.appendChild(createReminderCard(reminder));
    });
  }
}

function createReminderCard(reminder) {
  const card = document.createElement('div');
  card.className = 'reminder-card';
  
  const details = document.createElement('div');
  details.className = 'reminder-details';
  
  const title = document.createElement('h4');
  title.textContent = `${reminder.type} ${currentLanguage === 'en' ? 'Bill' : 'बिल'}`;
  
  const statusBadge = document.createElement('span');
  statusBadge.className = `status-badge status-${reminder.status === 'active' ? 'active' : 'inactive'}`;
  statusBadge.textContent = reminder.status === 'active' 
    ? (currentLanguage === 'en' ? 'Active' : 'सक्रिय') 
    : (currentLanguage === 'en' ? 'Paid' : 'भुगतान किया गया');
  title.appendChild(statusBadge);
  
  const dueInfo = document.createElement('p');
  if (reminder.status === 'active') {
    dueInfo.textContent = currentLanguage === 'en' 
      ? `Amount: ₹${reminder.amount} | Due: ${formatDate(reminder.dueDate)} | Reminder: ${formatDate(reminder.reminderDate)}`
      : `राशि: ₹${reminder.amount} | नियत तारीख: ${formatDate(reminder.dueDate, true)} | अनुस्मारक: ${formatDate(reminder.reminderDate, true)}`;
  } else {
    dueInfo.textContent = currentLanguage === 'en' 
      ? `Amount: ₹${reminder.amount} | Paid: ${formatDate(reminder.paidDate)} | Due: ${formatDate(reminder.dueDate)}`
      : `राशि: ₹${reminder.amount} | भुगतान किया गया: ${formatDate(reminder.paidDate, true)} | नियत तारीख: ${formatDate(reminder.dueDate, true)}`;
  }
  
  const notes = document.createElement('small');
  notes.textContent = `${currentLanguage === 'en' ? 'Notes:' : 'टिप्पणियाँ:'} ${reminder.notes}`;
  
  details.appendChild(title);
  details.appendChild(dueInfo);
  details.appendChild(notes);
  
  const actions = document.createElement('div');
  actions.className = 'reminder-actions';
  
  if (reminder.status === 'active') {
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn';
    editBtn.innerHTML = '✏️';
    editBtn.title = currentLanguage === 'en' ? 'Edit' : 'संपादित करें';
    editBtn.onclick = () => editReminder(reminder.id);
    
    const markPaidBtn = document.createElement('button');
    markPaidBtn.className = 'action-btn';
    markPaidBtn.innerHTML = '✅';
    markPaidBtn.title = currentLanguage === 'en' ? 'Mark Paid' : 'भुगतान किया हुआ चिह्नित करें';
    markPaidBtn.onclick = () => markAsPaid(reminder.id);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = currentLanguage === 'en' ? 'Delete' : 'हटाएं';
    deleteBtn.onclick = () => deleteReminder(reminder.id);
    
    actions.appendChild(editBtn);
    actions.appendChild(markPaidBtn);
    actions.appendChild(deleteBtn);
  } else {
    const repeatBtn = document.createElement('button');
    repeatBtn.className = 'action-btn';
    repeatBtn.innerHTML = '🔁';
    repeatBtn.title = currentLanguage === 'en' ? 'Repeat' : 'दोहराएं';
    repeatBtn.onclick = () => repeatReminder(reminder.id);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = currentLanguage === 'en' ? 'Delete' : 'हटाएं';
    deleteBtn.onclick = () => deleteReminder(reminder.id);
    
    actions.appendChild(repeatBtn);
    actions.appendChild(deleteBtn);
  }
  
  card.appendChild(details);
  card.appendChild(actions);
  
  return card;
}

function formatDate(dateString, hindi = false) {
  const date = new Date(dateString);
  if (hindi) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('hi-IN', options);
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}

function editReminder(id) {
  const reminder = reminders.find(r => r.id === id);
  if (reminder) {
    // In a real app, you would populate a form with this data
    alert(currentLanguage === 'en' 
      ? `Editing reminder for ${reminder.type} bill` 
      : `${reminder.type} बिल के लिए अनुस्मारक संपादित करें`);
  }
}

function markAsPaid(id) {
  const reminder = reminders.find(r => r.id === id);
  if (reminder) {
    reminder.status = 'paid';
    reminder.paidDate = new Date().toISOString().split('T')[0];
    loadReminders();
  }
}

function deleteReminder(id) {
  if (confirm(currentLanguage === 'en' 
      ? 'Are you sure you want to delete this reminder?' 
      : 'क्या आप वाकई इस अनुस्मारक को हटाना चाहते हैं?')) {
    reminders = reminders.filter(r => r.id !== id);
    loadReminders();
  }
}

function repeatReminder(id) {
  const original = reminders.find(r => r.id === id);
  if (original) {
    // Create a new reminder based on the original
    const newReminder = {
      ...original,
      id: Date.now(),
      status: 'active',
      paidDate: undefined
    };
    
    // Calculate new dates (one month later for demonstration)
    const dueDate = new Date(original.dueDate);
    dueDate.setMonth(dueDate.getMonth() + 1);
    newReminder.dueDate = dueDate.toISOString().split('T')[0];
    
    const reminderDate = new Date(original.reminderDate);
    reminderDate.setMonth(reminderDate.getMonth() + 1);
    newReminder.reminderDate = reminderDate.toISOString().split('T')[0];
    
    reminders.push(newReminder);
    loadReminders();
  }
