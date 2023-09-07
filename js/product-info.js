const autos_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const juguetes_url = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
const muebles_url = 'https://japceibal.github.io/emercado-api/cats_products/103.json';
const herramientas_url = 'https://japceibal.github.io/emercado-api/cats_products/104.json';
const computadoras_url = 'https://japceibal.github.io/emercado-api/cats_products/105.json';
const vestimenta_url = 'https://japceibal.github.io/emercado-api/cats_products/106.json';
const electrodomesticos_url = 'https://japceibal.github.io/emercado-api/cats_products/107.json';
const deporte_url = 'https://japceibal.github.io/emercado-api/cats_products/108.json';
const celulares_url = 'https://japceibal.github.io/emercado-api/cats_products/109.json';
let final_url = "";
let productsArray = [];
let product = [];

function showProduct(array){
    let currentID = localStorage.getItem("prodID");
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        if(currentID == array[i].id){
            product = array[i];
        }
    }
    htmlContentToAppend +=`
   <div class=>
        <div class=>
            <h1 id="nombre-producto">${product.name}</h1>
        </div> 
        <hr>

        <div class=>
            <h2 class="h2-productos"><strong>Precio</strong></h2>
            <p>  ${product.currency}  ${product.cost} </p>
            <h2 class="h2-productos"><strong>Descripción</strong></h2>
            <p>${product.description}</p>
            <h2 class="h2-productos"><strong>Categoría</strong></h2>
            <p>${product.category}</p>
            <h2 class="h2-productos"><strong>Cantidad de vendidos</strong></h2>
            <p>${product.soldCount}</p>
            </div>
        <div>

        <div>
        <h2 class="h2-productos"><strong>Imágenes ilustrativas</strong></h2><br>
        <img  id= "img-producto" src="${product.image}" alt="${product.description}" class="img-thumbnail"></img>
           </div>
        <div>
            <h2 class="h2-productos"><strong>Comentarios</strong></h2>
            <div id="comments-section">
            </div>
        </div>
    </div>  `;
    document.getElementById("prod-info").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem("catID") === "101"){
        final_url = autos_url;
    }
    else if(localStorage.getItem("catID") === "102"){
        final_url = juguetes_url;
    }
    else if(localStorage.getItem("catID") === "103"){
        final_url = muebles_url;
    }
    else if(localStorage.getItem("catID") === "104"){
        final_url = herramientas_url;
    }
    else if(localStorage.getItem("catID") === "105"){
        final_url = computadoras_url;
    }
    else if(localStorage.getItem("catID") === "106"){
        final_url = vestimenta_url;
    }
    else if(localStorage.getItem("catID") === "107"){
        final_url = electrodomesticos_url;
    }
    else if(localStorage.getItem("catID") === "108"){
        final_url = deporte_url;
    }
    else if(localStorage.getItem("catID") === "109"){
        final_url = celulares_url;
    }

    getJSONData(final_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProduct(productsArray.products);
        }
    });
})