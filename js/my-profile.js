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


function savePersonalInfo() {
    let personalInfo = {};
    personalInfo.profnombre = document.getElementById("profnombre").value;
    personalInfo.profsegundonombre = document.getElementById("profsegundonombre").value;
    personalInfo.profapellido = document.getElementById("profapellido").value;
    personalInfo.profsegundoapellido = document.getElementById("profsegundoapellido").value;
    personalInfo.profemail = document.getElementById("profemail").value;
    personalInfo.profnumero = document.getElementById("profnumero").value;

    localStorage.setItem("profile", JSON.stringify(personalInfo));
}

function getSavedPersonalInfo() {
    let personalInfo = JSON.parse(localStorage.getItem("profile"));
    if (personalInfo != null) {
        document.getElementById("profnombre").value = personalInfo.profnombre;
        document.getElementById("profsegundonombre").value = personalInfo.profsegundonombre;
        document.getElementById("profapellido").value = personalInfo.profapellido;
        document.getElementById("profsegundoapellido").value = personalInfo.profsegundoapellido;
        document.getElementById("profemail").value = personalInfo.profemail;
        document.getElementById("profnumero").value = personalInfo.profnumero;
    };
}
getSavedPersonalInfo();
