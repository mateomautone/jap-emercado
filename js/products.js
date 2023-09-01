const autos_url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
const juguetes_url = 'https://japceibal.github.io/emercado-api/cats_products/102.json';
const muebles_url = 'https://japceibal.github.io/emercado-api/cats_products/103.json';
let final_url = "";
let productsArray = [];
let minPrice = undefined;
let maxPrice = undefined;
let productsCopy = [];

function showProduct(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
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

function searchProduct(){
  let input = document.getElementById("barra").value;
  input = input.toLowerCase();
  let result = [];
  for(let i = 0; i < productsArray.products.length; i++){
      if(productsArray.products[i].name.toLowerCase().includes(input) || productsArray.products[i].description.toLowerCase().includes(input)){
          result.push(productsArray.products[i]);
      }
  }
  showProduct(result);
}

document.addEventListener("DOMContentLoaded", ()=>{
    if(localStorage.getItem("catID") === "101"){
        final_url = autos_url;
        document.getElementById("titulo").innerHTML = "Autos";
    }
    else if(localStorage.getItem("catID") === "102"){
        final_url = juguetes_url;
        document.getElementById("titulo").innerHTML = "Juguetes";
    }
    else if(localStorage.getItem("catID") === "103"){
        final_url = muebles_url;
        document.getElementById("titulo").innerHTML = "Muebles";
    }

    getJSONData(final_url).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            showProduct(productsArray.products);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", ()=>{
      productsArray.products.sort((a, b) => a.cost - b.cost);
      showProduct(productsArray.products);
    });

    document.getElementById("sortDesc").addEventListener("click", ()=>{
      productsArray.products.sort((a, b) => b.cost - a.cost);
      showProduct(productsArray.products);
    });

    document.getElementById("sortStock").addEventListener("click", ()=>{
      productsArray.products.sort((a, b) => b.soldCount - a.soldCount);
      showProduct(productsArray.products);
    });    

    document.getElementById("sort").addEventListener("click", ()=>{
      minPrice = parseInt(document.getElementById("min-price").value);
      maxPrice = parseInt(document.getElementById("max-price").value);
      if((minPrice == undefined || minPrice == 0) && (maxPrice != undefined)){
        productsArray.products.filter(product => product.cost <= parseInt(maxPrice));
      }
      else if((maxPrice == undefined || maxPrice == 0) && (minPrice != undefined)){
        productsArray.products.filter(product => product.cost >= parseInt(minPrice));
      }
      showProduct(productsArray.products);
    });

    document.getElementById("clear").addEventListener("click", () => {
      document.getElementById("min-price").value = "";
      document.getElementById("max-price").value = "";
      showProduct(productsArray.products); 
    });

    document.getElementById("barra").addEventListener("input", ()=>{
      searchProduct();
    });
    
  })