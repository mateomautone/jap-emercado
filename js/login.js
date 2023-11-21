document.getElementById('boton').addEventListener('click', function (event) {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('pass').value;
    localStorage.setItem ("name", username);
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      location.replace("index.html");
    })
    
    .catch(error => {
      console.error('Login failed:', error);
    });
  });

 
