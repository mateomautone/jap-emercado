let user = localStorage.getItem("name");

document.addEventListener("DOMContentLoaded", function(){
    let userName = document.getElementById("userName");
    userName.textContent += user;
    if (user === "" || user === null) {
        location.href = "login.html";
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catName", "Autos");
        window.location = "products.html"
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catName", "Juguetes");
        window.location = "products.html"
    });

    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catName", "Muebles");
        window.location = "products.html"
    });

});