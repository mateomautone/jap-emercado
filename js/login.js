document.getElementById('boton').addEventListener('click', function (event) {
  event.preventDefault();

  const username = document.getElementById('name').value;
  const password = document.getElementById('pass').value;

  if (username !== "" && password !== "") {
    localStorage.setItem("name", username);
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Store the received token in local storage
        localStorage.setItem('token', data.token);

        // Redirect to the main website
        location.replace("index.html");
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  } else {
    alert("falta info");
  }
});