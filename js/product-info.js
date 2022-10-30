let productInfo = [];
let comentariosArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("product")}.json`).then(function (resultObj) {
        if (resultObj.status === "ok") {

            productInfo = resultObj.data
            getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${productInfo.id}.json`).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    comentariosArray = resultObj.data
                    showComentariosList(comentariosArray);

                }
            })
            showCategoriesList(productInfo);
            showProductosList(productInfo);
        }
    })
})

function showComentariosList(comentarios) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `<h3>Comentarios</h3>`
    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];
        let htmlEstrellas = "";
        for (let k = 0; k < 5; k++) {
            if (k < comentario.score) {
                htmlEstrellas += `<span class="fa fa-star checked"></span>`
            } else {
                htmlEstrellas += `<span class="fa fa-star"></span>`
            }

        }

        htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-1 fw-bold">${comentario.user} - <span class="text-muted">${comentario.dateTime}</span> - ${htmlEstrellas}</p>
                                
                            </div>
                            <p class="mb-1">${comentario.description}</p>
                        </div>
                    </div>
                </div>
                `
    }
    document.getElementById("comentarios-list-container").innerHTML = htmlContentToAppend;
}

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    htmlContentToAppend += ` 
        <div>
            <br>
                <div>
                    <h1> `+ array.name + ` </h1>
                </div>
                <hr>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h3>Precio</h3>
                        <p> `+ array.currency + " " + array.cost + `</p>
                        <h3>Descripción</h3>
                        <p> `+ array.description + `</p>
                        <h3>Categoría</h3>
                        <p>`+ array.category + `</p>
                        <h3>Cantidad de Vendidos</h3>
                        <p>`+ array.soldCount + `</p>
                        </div>
                        
                    </div>
                    <h3>Imágenes ilustrativas</h3>
                    <div class="row">
                        `
    let images = array.images
    images.forEach(image => {
        htmlContentToAppend += `
                            <div class="col">
                             <img src=" `  + image + `" alt="product image" class="img-thumbnail">
                            </div>`

    });
    htmlContentToAppend += `
                    </div>
                </div>
        </div>
        `

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;
}

function showProductosList(productos) {
    relatedProducts = productos.relatedProducts
    let htmlContentToAppend = ""
    htmlContentToAppend += `
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
        <div class="row">
        `
    relatedProducts.forEach(product => {
        htmlContentToAppend += `
    <div onclick="guardarProduct(${product.id})" class ="row">
    <div>
        <img src=" `  + product.image + `" alt="product image" class="img-thumbnail">
        <h3> ${product.name} </h3>
   </div>
   </div>
   </div>
        `
    });
    htmlContentToAppend += `    
        </div>
        
    </div>
    `
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function guardarProduct(id) {
    localStorage.setItem("product", id);
    window.location = "product-info.html"
}


