function check(){
   let nombre = document.getElementById ("name").value;
    if(document.getElementById("name").value !== "" && document.getElementById("pass").value !== ""){
        localStorage.setItem ("name", nombre);
        location.replace("index.html");
    }
    else{
        alert('Faltan datos');
    }
}

document.getElementById("boton").addEventListener('click', () =>{
        check();
});

