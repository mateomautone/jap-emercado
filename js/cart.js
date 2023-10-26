const cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let cartInfo = [];
let subtotalesFinales = [];


//funcion carrito
let carrito = JSON.parse(localStorage.getItem('cart')) || [];

//aaa


function showShop(array){
    let htmlAppend = "";
    htmlAppend += `
      <tr>
        <th scope="row" style="width: 15%;"><img style="width: 45%;" src="${array.image}"</th>
        <td>${array.name}</td>
        <td id="unitCost">USD ${array.unitCost}</td>
        <td style="width: 25%;"> <input id="unitCant" style="width: 25%;" type="number" value="0"> </td>
        <td id="unitSub">USD ${0}</td>
      </tr>
    `;
    for(let j = 0; j < carrito.length; j++){
      htmlAppend += `
      <tr>
        <th scope="row" style="width: 15%;"><img style="width: 45%;" src="${carrito[j].image}"</th>
        <td>${carrito[j].name}</td>
        <td id="unitCost${j}" >USD ${carrito[j].price}</td>
        <td style="width: 25%;"> <input id="unitCant${j}" style="width: 25%;" type="number" value="0"> </td>
        <td id="unitSub${j}">USD ${0}</td>
      </tr>
    `;
    };
    document.getElementById("tablaProd").innerHTML = htmlAppend;
};



document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(cart_url).then(function(resultObj){
        if (resultObj.status === "ok"){
          cartInfo = resultObj.data.articles;
          showShop(cartInfo[0]);
        for(let j = 0; j < carrito.length; j++){
            document.getElementById("unitCant"+j).addEventListener("input",()=>{
            document.getElementById("unitSub"+j).innerHTML = "USD " + parseInt(document.getElementById("unitCant"+j).value)*(parseInt(carrito[j].price));
          }); 
        }}
        document.getElementById("empty").addEventListener("click", () => {
          localStorage.removeItem("cart");
          location.reload();
                  });

//Calcula el subtotal de cada artículo del carrito
        document.getElementById("unitCant").addEventListener("input", ()=>{
          let costoUnitario = parseFloat(cartInfo[0].unitCost);
          let cantidad = parseFloat(document.getElementById("unitCant").value)
          let subtotal = (cantidad*costoUnitario);
            document.getElementById("unitSub").innerHTML = `USD ${subtotal}`;       

//Calcula la suma de todos los subtotales
            subtotalesFinales.push(subtotal);
            console.log(subtotalesFinales);
            let contador = 0;
            for (i=0;i<subtotalesFinales.length;i++){
              contador=subtotalesFinales[i];
              document.getElementById("subtotal").innerHTML = "USD " + contador;
            if (cantidad = 0){
              subtotalesFinales.length = 0;
              }
            }

//Calcula en precio del envío y el total
let envioP = document.getElementById("premium");
let envioE = document.getElementById("express");
let envioS = document.getElementById("standard");
let envio = 0;

envioP.addEventListener("click", () => {
  if (envioP.checked) {
    envio = subtotal * 0.15;
    let totalFinal = (envio + contador);
    console.log(envio);
    document.getElementById("costoEnvio").innerHTML = "USD " + envio;
    document.getElementById("total").innerHTML= "USD " + totalFinal;
  }
});

envioE.addEventListener("click", () => {
  if (envioE.checked) {
    envio = subtotal * 0.07;
    let totalFinal = (envio + contador);
    document.getElementById("costoEnvio").innerHTML = "USD " + envio;
    document.getElementById("total").innerHTML= "USD " + totalFinal;
  }
});

envioS.addEventListener("click", () => {
  if (envioS.checked) {
    envio = subtotal * 0.05;
    let totalFinal = (envio + contador);
    document.getElementById("costoEnvio").innerHTML = "USD " + envio;
    document.getElementById("total").innerHTML= "USD " + totalFinal;
  } 
});

       });
    });
});