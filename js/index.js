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

document.addEventListener("DOMContentLoaded", function(){
    let cerrar = document.getElementById("cerrar-sesion");
    cerrar.addEventListener("click", function (){
        localStorage.clear("name");
    })
})
    
const switchButton = document.getElementById('switch');
        const body = document.body;
        function toggleDarkMode() {
            body.classList.toggle('dark');
            switchButton.classList.toggle('active');
            //Guarda la opcion seleccionada
            const DarkModeOn = body.classList.contains('dark');
            localStorage.setItem('darkModeEnabled', DarkModeOn);
        }
        //Almacenamiento de datos para mantener el darkmode
        const DarkModeOn = localStorage.getItem('darkModeEnabled') === 'true';
        if (DarkModeOn) {
            toggleDarkMode();
        }
        switchButton.addEventListener('click', toggleDarkMode);