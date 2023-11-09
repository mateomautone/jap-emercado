//Llenar campo de mail con lo de el login

let email = document.getElementById("profemail")
let localemail = localStorage.getItem("name")

email.value = localemail

//Guardo elementos necesarios en variables
document.addEventListener("DOMContentLoaded", ()=> {
let file = document.getElementById("subir-img");
let defaultImg = "./img/avatar.png";
let img = document.getElementById("img-perfil")

//Guardo en localStorage la variable img
let savedImg = localStorage.getItem("img");
if (savedImg) {
    img.src = savedImg; 
} else {
    img.src = defaultImg;
}
//Cambia foto de perfil
file.addEventListener("change", e=>{
    if (e.target.files[0]){
        let reader = new FileReader();
        reader.onload = function (e){
        img.src = e.target.result;
        localStorage.setItem("img", e.target.result);
    }
    reader.readAsDataURL(e.target.files[0])
    
    }else{
        img.src = defaultImg;
    }
});
//Evento para guardar los cambios de la imagen
    document.getElementById("guardar-cambios").addEventListener("click", ()=>{
        let savedImg = localStorage.getItem("img");
        if (savedImg) {
            img.src = savedImg;
        }
    });
});


