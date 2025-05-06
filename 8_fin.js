document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
    
    // Language Toggle
    const languageToggle = document.getElementById('languageToggle');
    const languageText = languageToggle.querySelector('span');
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (savedLanguage === 'hi') {
        toggleLanguage('hi');
    }
    
    languageToggle.addEventListener('click', () => {
        const currentLang = document.body.classList.contains('hindi') ? 'hi' : 'en';
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        toggleLanguage(newLang);
        localStorage.setItem('language', newLang);
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
                if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
                    const placeholder = element.getAttribute(`data-${lang}-placeholder`);
                    if (placeholder) {
                        element.placeholder = placeholder;
                    }
                    if (element.tagName === 'SELECT') {
                        // Handle select options
                        Array.from(element.options).forEach(option => {
                            const optionText = option.getAttribute(`data-${lang}`);
                            if (optionText) {
                                option.textContent = optionText;
                            }
                        });
                    }
                } else {
                    element.textContent = text;
                }
            }
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            if (!email.includes('@') || !email.includes('.')) {
                alert(document.body.classList.contains('hindi') ? 
                    'कृपया एक वैध ईमेल पता दर्ज करें' : 
                    'Please enter a valid email address');
                e.preventDefault();
            }
        });
    }
});