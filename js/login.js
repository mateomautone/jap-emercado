function check(){
    if(document.getElementById("name").value !== "" && document.getElementById("pass").value !== ""){
        location.replace("file:///C:/Users/aleja/OneDrive/Documentos/GitHub/jap-emercado/index.html");
    }
}

document.getElementById("boton").onclick = function() {check()};
