const cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let cartInfo = [];


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
        <td style="width: 25%;"> <input id="unitCant" style="width: 25%;" type="number" value="1"> </td>
        <td id="unitSub">USD ${array.unitCost}</td>
      </tr>
    `;
    for(let j = 0; j < carrito.length; j++){
      htmlAppend += `
      <tr>
        <th scope="row" style="width: 15%;"><img style="width: 45%;" src="${carrito[j].image}"</th>
        <td>${carrito[j].name}</td>
        <td id="unitCost${j}">USD ${carrito[j].price}</td>
        <td style="width: 25%;"> <input id="unitCant${j}" style="width: 25%;" type="number" value="1"> </td>
        <td id="unitSub${j}">USD ${carrito[j].price}</td>
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
        }
        }
        document.getElementById("unitCant").addEventListener("input", ()=>{
          let cantidad = parseFloat(document.getElementById("unitCant").value);
          let costoUnitario = parseFloat(cartInfo[0].unitCost);
          let subtotal = (cantidad*costoUnitario);
            document.getElementById("unitSub").innerHTML = `USD ${subtotal}`;
        });
    });
    document.getElementById("empty").addEventListener("click", ()=>{
      localStorage.removeItem("cart");
      location.reload();
    });
    
    console.log(carrito);
  });

