const cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let cartInfo = [];
let carrito = JSON.parse(localStorage.getItem('cart')) || [];

function showShop(){
    let htmlAppend = "";
    for(let j = 0; j < carrito.length; j++){
      	htmlAppend += `
      	<tr>
        	<th scope="row" style="width: 15%;"><img style="width: 45%;" src="${carrito[j].image}"</th>
        	<td id="name${j}">${carrito[j].name}</td>
        	<td id="unitCost${j}">USD ${carrito[j].price}</td>
        	<td style="width: 25%;"> <input id="unitCant${j}" style="width: 25%;" type="number" value="1" min="0"> </td>
        	<td id="unitSub${j}">USD ${carrito[j].price}</td>
            <td> <i id="delete${j}" class="fa fa-trash" style="color: #f00006;"></i> </td>
      	</tr>
    	`;
    };
    document.getElementById("tablaProd").innerHTML = htmlAppend;
};

document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(cart_url).then(function(resultObj){
        if (resultObj.status === "ok"){
          	cartInfo = resultObj.data.articles;
			if(carrito == ""){
				carrito.push({
					name: cartInfo[0].name,
					image: cartInfo[0].image,
					price: cartInfo[0].unitCost,
					currency: cartInfo[0].currency,
				});
				localStorage.setItem('cart', JSON.stringify(carrito));
			}
        };
    });

	showShop();

    for(let j = 0; j < carrito.length; j++){
        document.getElementById("unitCant"+j).addEventListener("input",()=>{
        	if(document.getElementById("unitCant"+j).value === ""){
            	document.getElementById("unitSub"+j).innerHTML = "USD 0";
            }
            else{
                document.getElementById("unitSub"+j).innerHTML = "USD " + parseInt(document.getElementById("unitCant"+j).value)*(parseInt(carrito[j].price));
            }
        }); 
    };
    
    for(let i = 0; i < carrito.length; i++){
		document.getElementById("delete"+i).addEventListener("click", ()=>{
			let j = 0;
			while(j < carrito.length && carrito[j].name != document.getElementById("name"+i).innerHTML){
				j++;
			}
			carrito.splice(j, 1);
			localStorage.setItem('cart', JSON.stringify(carrito));
			location.reload();
		});
	};

});

