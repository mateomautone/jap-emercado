autos_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
juguetes_url = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
muebles_url = 'https://japceibal.github.io/emercado-api/cats_products/103.json';

function showProduct(){
    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.products.length; i++) {
        let product = productsArray.products[i];
        htmlContentToAppend +=`
        <div id="id" class="list-group-item list-group-item-action cursor-active ho-ver">
            <div class="row">
                <div class="col-md-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail"></img>
                </div> 
                <div class="col-md-5">
                    <h2 class="name_cost">${product.name} - ${product.currency} ${product.cost}</h2>
                    <small class="sold_count">${product.soldCount} artículos vendidos</small>
                    <p class="desc">${product.description}</p>
                </div>
            </div>
        </div>  `;
    }
    document.getElementById("prod-list").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", ()=>{
    let final_url = "";
    if(localStorage.getItem("catID") === "101"){
        final_url = autos_url;
    }
    else if(localStorage.getItem("catID") === "102"){
        final_url = juguetes_url;
    }
    else if(localStorage.getItem("catID") === "103"){
        final_url = muebles_url;
    }

    getJSONData(final_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProduct(productsArray);
        }
    });
})