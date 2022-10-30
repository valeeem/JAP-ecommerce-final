const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_SOLD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function showCategoriesList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend += ` 
        <div onclick="guardarProduct(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div>
                <div>
                    <img src=" `  + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + `</h4> 
                        <p> `+ product.description + `</p> 
                        <p> `+ product.currency + " " + product.cost + `</p>
                        </div>
                        <small class="text-muted"> `+ product.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    };
};
function guardarProduct(id){
    localStorage.setItem("product", id);
    window.location = "product-info.html"
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

async function orderAndLoad(sortCriteria) {
    id = localStorage.getItem("catID")
    let response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${id}.json`);
    let data = await response.json();

    currentSortCriteria = sortCriteria;

    currentProductsArray = sortProducts(currentSortCriteria, data.products);

    showCategoriesList(currentProductsArray);

}


/* async function loadData() {
    id = localStorage.getItem("catID")
    let response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${id}.json`);
    let data = await response.json();
    showCategoriesList(data.products)
} */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products
            showCategoriesList(currentProductsArray)
            //orderAndLoad(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        console.log("botoncito1")
        orderAndLoad(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        orderAndLoad(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        orderAndLoad(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList(currentProductsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList(currentProductsArray);
    });
});

