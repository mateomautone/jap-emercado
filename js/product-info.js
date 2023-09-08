const autos_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const juguetes_url = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
const muebles_url = 'https://japceibal.github.io/emercado-api/cats_products/103.json';
const herramientas_url = 'https://japceibal.github.io/emercado-api/cats_products/104.json';
const computadoras_url = 'https://japceibal.github.io/emercado-api/cats_products/105.json';
const vestimenta_url = 'https://japceibal.github.io/emercado-api/cats_products/106.json';
const electrodomesticos_url = 'https://japceibal.github.io/emercado-api/cats_products/107.json';
const deporte_url = 'https://japceibal.github.io/emercado-api/cats_products/108.json';
const celulares_url = 'https://japceibal.github.io/emercado-api/cats_products/109.json';
let comments_url = 'https://japceibal.github.io/emercado-api/products_comments/' + localStorage.getItem("prodID") + '.json';
let final_url = "";
let productsArray = [];
let product = [];
let comentarios = [];

function showProduct(array){
    let currentID = localStorage.getItem("prodID");
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        if(currentID == array[i].id){
            product = array[i];
        }
    }
    htmlContentToAppend +=`
   <div>
        <div>
            <h1 id="nombre-producto">${product.name}</h1>
        </div> 
        <hr>

        <div class=>
            <h2 class="h2-productos"><strong>Precio</strong></h2>
            <p> ${product.currency} ${product.cost} </p>
            <h2 class="h2-productos"><strong>Descripción</strong></h2>
            <p>${product.description}</p>
            <h2 class="h2-productos"><strong>Categoría</strong></h2>
            <p>${localStorage.getItem("catName")}</p>
            <h2 class="h2-productos"><strong>Cantidad de vendidos</strong></h2>
            <p>${product.soldCount}</p>
            </div>
        <div>

        <div>
            <h2 class="h2-productos"><strong>Imágenes ilustrativas</strong></h2><br>
            <img  id= "img-producto" src="img/prod${product.id}_1.jpg" alt="${product.description}" class="img-thumbnail"></img>
            <img  id= "img-producto" src="img/prod${product.id}_2.jpg" alt="${product.description}" class="img-thumbnail"></img>
            <img  id= "img-producto" src="img/prod${product.id}_3.jpg" alt="${product.description}" class="img-thumbnail"></img>
            <img  id= "img-producto" src="img/prod${product.id}_4.jpg" alt="${product.description}" class="img-thumbnail"></img>
        </div>
    </div>  `;
    document.getElementById("prod-info").innerHTML = htmlContentToAppend;
}

function showComments(array){
    let lista = document.getElementById("lista");
    for(let i = 0; i < array.length; i++){
        let nodo = document.createElement("ul");
        nodo.innerHTML += `
        <li class="list-group-item">
            ${array[i].user} - ${array[i].dateTime} - ${array[i].score} <br>
            ${array[i].description}
        </li>
        `;
        lista.appendChild(nodo);
    }
}

function addComment(){
    let lista = document.getElementById("lista");
    let comentario = document.getElementById("caja").value;
    let nodo = document.createElement("ul");
    let date = new Date();
    let fecha = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    nodo.innerHTML = `
    <li class="list-group-item">
        ${localStorage.getItem("name")} - ${fecha} - 5 <br>
        ${comentario}
    </li>
    `;
    lista.appendChild(nodo);
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

    getJSONData(comments_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;
            showComments(comentarios);
        }
    })

    document.getElementById("send").addEventListener("click", ()=>{
        addComment();
        document.getElementById("caja").value = "";
    })
})

