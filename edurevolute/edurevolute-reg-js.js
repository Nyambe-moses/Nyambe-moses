// Generate a random login code
function generateLoginCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  
  // Register user and generate login code
  document.getElementById('register-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginCode = generateLoginCode();
  
    // Store user data and login code in local storage
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      users[username] = {
        email,
        password,
        loginCode,
      };
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      const users = {
        [username]: {
          email,
          password,
          loginCode,
        },
      };
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    // Display login code
    document.getElementById('login-code-display').style.display = 'block';
    document.getElementById('login-code-text').textContent = loginCode;
  
    // Hide registration form and show login form
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  });
  
  // Login user
  document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const loginCode = document.getElementById('login-code').value;
  
    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users'));
  
    // Check if user exists and login code is correct
    if (users && users[username] && users[username].loginCode === loginCode) {
      console.log('Login successful!');
      // Show dashboard or other protected content
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    } else {
      console.log('Invalid username or login code.');
      alert('Invalid username or login code.');
    }
  });
  
  // Logout user
  document.getElementById('logout-btn').addEventListener('click', () => {
    // Clear local storage
    localStorage.removeItem('users');
    // Show login form
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  });
  
  // Initialize dashboard
  document.getElementById('dashboard').style.display = 'none';
  
  // Check if user is already logged in
  if (localStorage.getItem('users')) {
    const users = JSON.parse(localStorage.getItem('users'));
    const usernames = Object.keys(users);
    if (usernames.length > 0) {
      // Show dashboard
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
    }
  }