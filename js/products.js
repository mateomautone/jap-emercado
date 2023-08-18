async function showProduct() {
  const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

  try {
      const response = await fetch(url);
      const datos = await response.json();

      let htmlContentToAppend = "";
      for (let i = 0; i < datos.products.length; i++) {
          let product = datos.products[i];

          htmlContentToAppend +=`
          <div class="list-group-item list-group-item-action cursor-active">
              <div class="row-p">
                  <div class="col-md-3">
                      <img src="${product.image}" alt="${product.description}" class="img-thumbnail"></img>
                  </div> 
                  <div class="col-md-5">
                       <h2>${product.name} - ${product.currency} ${product.cost}</h2>
                       <small>${product.soldCount} artículos vendidos</small>
                      <p>${product.description}</p>
                  </div>
              </div>
              </div>  ` ;
      }
      document.getElementById("prod-list").innerHTML = htmlContentToAppend;
  } catch (error) {
      console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showProduct(); // Invoca la funcion
});