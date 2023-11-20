/* function check(){
   let nombre = document.getElementById ("name").value;
    if(document.getElementById("name").value !== "" && document.getElementById("pass").value !== ""){
        localStorage.setItem ("name", nombre);
        location.replace("index.html");
    }
    else{
        alert('Faltan datos');
    }
}
 */

/* document.getElementById("boton").addEventListener('click', () =>{
        check();
});
 */



document.getElementById('boton').addEventListener('click', function (event) {
    event.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('pass').value;
    let nombre = document.getElementById ("name").value;
    localStorage.setItem ("name", nombre);
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
  });

 
