document.addEventListener('DOMContentLoaded', () => {
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
    showSignup.addEventListener('click', (e) => {
      e.preventDefault();
      loginBox.classList.add('hidden');
      signupBox.classList.remove('hidden');
    });
  
    showLogin?.addEventListener('click', (e) => {
      e.preventDefault();
      signupBox.classList.add('hidden');
      loginBox.classList.remove('hidden');
    });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      const res = await fetch('login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`
      });
      const text = await res.text();
      alert(text);
      if (text.includes('success')) window.location.href = 'dashboard.html';
    });
  
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
  
      if (name.length < 3 || !/^[a-zA-Z ]+$/.test(name)) {
        alert('Invalid name. Use alphabets only, at least 3 characters.');
        return;
      }
      if (password !== confirm) {
        alert('Passwords do not match!');
        return;
      }
  
      const res = await fetch('signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${name}&email=${email}&password=${password}`
      });
      const text = await res.text();
      alert(text);
      if (text.includes('created')) {
        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
        signupForm.reset();
      }
    });
  });
  