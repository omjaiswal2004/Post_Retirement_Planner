document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = toggleBtn.querySelector('i');
  
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
  
    // Language Toggle
    const languageToggle = document.getElementById('languageToggle');
    const languageText = languageToggle.querySelector('span');
    let currentLanguage = 'en';
    
    languageToggle.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
      toggleLanguage(currentLanguage);
    });
  
    function toggleLanguage(lang) {
      // Update button text
      languageText.textContent = lang === 'en' ? 'EN' : 'HI';
      
      // Toggle body class for Hindi font
      if (lang === 'hi') {
        document.body.classList.add('hindi');
      } else {
        document.body.classList.remove('hindi');
      }
      
      // Update all elements with data attributes
      document.querySelectorAll('[data-en], [data-hi]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            element.placeholder = text;
          } else {
            element.textContent = text;
          }
        }
      });
    }
  
    // Initialize language
    toggleLanguage(currentLanguage);
  });