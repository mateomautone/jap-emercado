const cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let cartInfo = [];
let carrito = JSON.parse(localStorage.getItem('cart')) || [];
let Sub = 0;
let subFinal = 0;
let numeroBanco = document.getElementById("numberbank");
let numeroTarjeta = document.getElementById("numbercard");
let codeTarjeta = document.getElementById("codecard");
let vencTarjeta = document.getElementById("datecard");
let cantidades;

function showShop(){
    let htmlAppend = "";
    for(let j = 0; j < carrito.length; j++){
      	htmlAppend += `
      	<tr>
        	<th scope="row" style="width: 15%;"><img style="width: 45%;" src="${carrito[j].image}"</th>
        	<td id="name${j}">${carrito[j].name}</td>
        	<td id="unitCost${j}">${carrito[j].currency} ${carrito[j].price}</td>
        	<td style="width: 25%;"> <input class="inputs" id="unitCant${j}" style="width: 25%;" type="number" value="1" min="0"> </td>
        	<td id="unitSub${j}">${carrito[j].currency} ${carrito[j].price}</td>
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

	//Mostrar cada subtotal por separado
	for(let j = 0; j < carrito.length; j++){
        document.getElementById("unitCant"+j).addEventListener("input",()=>{
            document.getElementById("unitSub"+j).innerHTML = carrito[j].currency + " " + parseInt(document.getElementById("unitCant"+j).value)*(parseInt(carrito[j].price));
			cantidades = 0;
			let inputs = document.getElementsByClassName("inputs");
			for(let k = 0; k < carrito.length; k++){
				if(parseInt(inputs[k].value) > 0){
					cantidades += 1;
				}
			}
        });
    };

	//Mostrar el subtotal
	function mostrarSub(){
		for(let a = 0; a < carrito.length; a++){
			if(document.getElementById("unitSub" + a).innerHTML.slice(0,3) == "USD"){
				Sub = (parseInt(document.getElementById("unitSub" + a).innerHTML.slice(4)));
			}
			else{
				Sub = (parseInt(document.getElementById("unitSub" + a).innerHTML.slice(4))/40);
			}
			subFinal += Sub;
		}
		document.getElementById("subtotal").innerHTML = "USD " + subFinal.toFixed(2);
		subFinal = 0;
	};
	mostrarSub();
	for(let a = 0; a < carrito.length; a++){
		document.getElementById("unitCant"+a).addEventListener("input", ()=>{
			mostrarSub();
		});
	};

	//Mostrar costo de envío
	document.getElementById("premiumradio").addEventListener("click", ()=>{
		document.getElementById("envio").innerHTML = "USD " + (parseFloat(document.getElementById("subtotal").innerHTML.slice(4))*0.15).toFixed(2);
	});
	document.getElementById("expressradio").addEventListener("click", ()=>{
		document.getElementById("envio").innerHTML = "USD " + (parseFloat(document.getElementById("subtotal").innerHTML.slice(4))*0.07).toFixed(2);
	});
	document.getElementById("standardradio").addEventListener("click", ()=>{
		document.getElementById("envio").innerHTML = "USD " + (parseFloat(document.getElementById("subtotal").innerHTML.slice(4))*0.05).toFixed(2);
	});

	//Mostrar total
	setInterval(()=>{
		document.getElementById("total").innerHTML = "USD " + ((parseFloat(document.getElementById("envio").innerHTML.slice(4)) + parseFloat(document.getElementById("subtotal").innerHTML.slice(4))).toFixed(2));
	}, 10);

	//Borrar elementos
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
	
	/* VALIDAR Form */
	'use strict'
      
    const form = document.getElementById("form")
      
    form.addEventListener('submit', event => {
        if (!form.checkValidity() || cantidades < carrito.length) {
            event.preventDefault()
            event.stopPropagation()
			if(cantidades < carrito.length){
				document.getElementById("invalidcant").hidden = false;
			}
			else{
				document.getElementById("invalidcant").hidden = true;
			}
        }
		else{
			event.preventDefault();
			document.getElementById("successPopup").style.display = "block";
			setTimeout(function(){
				document.getElementById("successPopup").style.display = "none";
			}, 2000);
			document.getElementById("invalidcant").hidden = true;
		}
      
        form.classList.add('was-validated')

    }, false);
	// FIN VALIDAR FORM

	//Deshabilitar campos banco
	document.getElementById("creditcard").addEventListener("input", ()=>{
		document.getElementById("nada").hidden = true;
		document.getElementById("formabanco").hidden = true;
		document.getElementById("formatarjeta").hidden = false;
		numeroBanco.disabled = true;
		numeroBanco.value = "";
		numeroTarjeta.disabled = false;
		codeTarjeta.disabled = false;
		vencTarjeta.disabled = false;
	});

	//Deshabilitar campos tarjeta
	document.getElementById("bank").addEventListener("input", ()=>{
		document.getElementById("nada").hidden = true;
		document.getElementById("formabanco").hidden = false;
		document.getElementById("formatarjeta").hidden = true;
		numeroBanco.disabled = false;
		numeroTarjeta.disabled = true;
		numeroTarjeta.value = "";
		codeTarjeta.disabled = true;
		codeTarjeta.value = "";
		vencTarjeta.disabled = true;
		vencTarjeta.value = "";
	});
});

