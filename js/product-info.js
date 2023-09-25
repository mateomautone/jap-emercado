let comments_url = 'https://japceibal.github.io/emercado-api/products_comments/' + localStorage.getItem("prodID") + '.json';
let prod_url = 'https://japceibal.github.io/emercado-api/products/' + localStorage.getItem("prodID") + '.json';
let productsArray = [];
let product = [];
let comentarios = [];

function showProduct(product){
    let htmlContentToAppend = "";
    htmlContentToAppend +=`
    <div>
        <div>
            <h1 id="nombre-producto">${product.name}</h1>
        </div> 
        <hr>
        <div>
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
        <h2 class="h2-productos"><strong>Imágenes ilustrativas</strong></h2><br>
    </div>
    `;
    for(let i = 0; i < product.images.length; i++){
        htmlContentToAppend +=`
            <img id="img-producto" src="${product.images[i]}" class="img-thumbnail"></img>
        `;
    }
    document.getElementById("prod-info").innerHTML = htmlContentToAppend;
}

function showComments(array){
    let lista = document.getElementById("lista");
    for(let i = 0; i < array.length; i++){
        let nodo = document.createElement("ul");
        let stars = "";
        for(let j = 0; j < 5; j++){
            if(j < array[i].score){
                stars += `<span class="fa fa-star checked"></span>`;
            }
            else{
                stars += `<span class="fa fa-star"></span>`;
            }
        }
        nodo.innerHTML += `
        <li class="list-group-item">
            ${array[i].user} - ${array[i].dateTime} - ${stars} <br>
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
    let puntuacion = "";
    for(let i = 0; i < 5; i++){
        if(i < document.getElementById("points").value){
            puntuacion += `<span class="fa fa-star checked"></span>`;
        }
        else{
            puntuacion += `<span class="fa fa-star"></span>`;
        }
    }
    nodo.innerHTML = `
    <li class="list-group-item">
        ${localStorage.getItem("name")} - ${fecha} - ${puntuacion} <br>
        ${comentario}
    </li>
    `;
    lista.appendChild(nodo);
}

function showRelated(product){
    let content = "";
    for(let i = 0; i < product.length; i++){
        content += `
        <h3>${product[i].name}</h3>    
        <img onclick="window.location='https://japceibal.github.io/emercado-api/products/${product[i].id}';" id="img-producto" src=${product[i].image} class="img-thumbnail"></img>
        `;  
    }
    document.getElementById("related").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(prod_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProduct(productsArray);
            showRelated(productsArray.relatedProducts);
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

