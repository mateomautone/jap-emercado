function check(){
    if(document.getElementById("name").value !== "" && document.getElementById("pass").value !== ""){
        location.replace("index.html");
    }
    else{
        alert('Faltan datos');
    }
}

document.getElementById("boton").addEventListener('click', () =>{
    check();
});
