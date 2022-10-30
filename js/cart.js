cartInfo = null
let DOLLAR_SYMBOL = "USD ";
const button = document.getElementById("finalizarcompra");
const transferencia = document.getElementById("transferencia");
const calle = document.getElementById("calle");
const numero = document.getElementById("numero");
const esquina = document.getElementById("esquina")
const tarjeta = document.getElementById("tarjeta");
const modal = document.getElementById("contidionsModal")
const cod = document.getElementById("cod");
const vencimiento = document.getElementById("vencimiento");
const numeroTarjeta = document.getElementById("numeroTarjeta");
const cuenta = document.getElementById("cuenta");
const PREMIUM = document.getElementById("goldradio")
const EXPRESS = document.getElementById("premiumradio")
const STANDARD = document.getElementById("standardradio")
let subtotal = 0
let tasa = 0

function showCartItems(array) {
    let htmlContentToAppend = "";
    let cart = array.articles
    cart.forEach(cartArticle => {
        subtotal = cartArticle.count * cartArticle.unitCost
        tasa = document.querySelector('input[name="publicationType"]:checked').value
        showTasa();
        htmlContentToAppend += `
        <div class="container col">
            <div><ul><img src="${cartArticle.image}" alt="${cartArticle.name}" class="img-thumbnail flex" id="imagen"></ul></div>
            <div><ul>${cartArticle.name}</ul></div>
            <div><ul> ${cartArticle.unitCost}</ul></div>
            <div class="container"><ul><input class="form-control" size="2" type="number" value="${cartArticle.count}" placeholder="${cartArticle.count}" id="cantProducto" oninput="myFunction(this.value, ${cartArticle.unitCost})"></ul></div>
            <div id="subtotal"><ul>${subtotal}</ul></div>

        </div>
                           `


    });


    document.getElementById("insertar").innerHTML = htmlContentToAppend;
    showSubtotal();
}

//Subtotal
function showSubtotal() {
    let htmlContentToAppend = ""
    htmlContentToAppend += `
    <span class="text-muted" id="subtotalTexto"> USD ${subtotal}</span>
    `
    document.getElementById("sub").innerHTML = htmlContentToAppend;
    showTotal();
}

function showTasa() {
    let htmlContentToAppend = ""
    htmlContentToAppend += `
    <span class="text-muted" id="tasaTexto"> USD ${tasa * subtotal}</span>
    `
    document.getElementById("tasa").innerHTML = htmlContentToAppend;
    showTotal();
}

function actualizarTasa(valorTasa) {
    tasa = document.querySelector('input[name="publicationType"]:checked').value
    console.log(tasa)
    showTasa();
}

function showTotal() {
    let htmlContentToAppend = ""
    htmlContentToAppend += `
    <span class="text-muted"> USD ${(tasa * subtotal) + subtotal}</span>
    `
    document.getElementById("totalCostText").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(`${CART_INFO_URL}25801.json`).then(function (resultObj) {
        if (resultObj.status === "ok") {

            cartInfo = resultObj.data;
            showCartItems(cartInfo);
        }
    })
})
//personalizar carteles
function alertMessageSuccess() {
    alert("Compra realizada con éxito!");
}

function alertMessageFail(texto) {
    alert("Datos Faltantes: " + texto)
}

//Validación datos del boton
button.addEventListener("click", function () {
    if (subtotal <= 0) { alertMessageFail("Debe comprar al menos una unidad"); return }
    if (!PREMIUM.checked && !EXPRESS.checked && !STANDARD.checked) { alertMessageFail("Modo de envío"); return }
    if (!calle.value) { alertMessageFail("Calle"); return }
    if (!numero.value) { alertMessageFail("Número"); return }
    if (!esquina.value) { alertMessageFail("Esquina"); return }
    if (tarjeta.checked) {
        if (!numeroTarjeta.value) { alertMessageFail("N° de Tarjeta"); return }
        if (!cod.value) { alertMessageFail("Cod. de Seguridad"); return }
        if (!vencimiento.value) { alertMessageFail("Vencimiento"); return }
        alertMessageSuccess();
        return

        //ver si se puede hacer algun desafíate
    }
    if (transferencia.checked) {
        if (!cuenta.value) { alertMessageFail("Cuenta"); return }
        alertMessageSuccess();
        return
    }
    alertMessageFail("Medio de pago");
    return

})

function myFunction(number, cost) {
    console.log("myfunction " + number + " " + cost)
    var x = number * cost;
    subtotal = x
    document.getElementById("subtotal").innerHTML = x;
    showSubtotal();
}

//Bloquear modo de pago no necesario
modal.addEventListener("click", function () {
    if (tarjeta.checked === true) {
        document.getElementById("cuenta").disabled = true;
        document.getElementById("cod").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("numeroTarjeta").disabled = false;
    } else
        if (transferencia.checked === true) {
            document.getElementById("cod").disabled = true;
            document.getElementById("vencimiento").disabled = true;
            document.getElementById("numeroTarjeta").disabled = true;
            document.getElementById("cuenta").disabled = false;
        }
})
