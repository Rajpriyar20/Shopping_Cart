let carts = document.querySelectorAll("#cartAdd");

let products = [{
        proName: 'Cotton Masks',
        proDesc: 'set of 12',
        Propic: 'masks',
        proPrice: 710.00,
        inCart: 0
    },
    {
        proName: 'Realme 8',
        proDesc: 'smartphone',
        Propic: 'phone',
        proPrice: 15499.00,
        inCart: 0
    },
    {
        proName: 'LED TV',
        proDesc: 'Mi 108cm',
        Propic: 'hearphones',
        proPrice: 26999.00,
        inCart: 0
    },
    {
        proName: 'Headphone',
        proDesc: 'Black',
        Propic: 'headphone',
        proPrice: 640.00,
        inCart: 0
    }
];


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector("#cart span").textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("#cart span").textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.proName] == undefined) {
            cartItems = {
                ...cartItems,
                [product.proName]: product
            }
        }
        cartItems[product.proName].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.proName]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + (product.inCart * (product.proPrice - (product.proPrice * 0.05))));
    } else {
        localStorage.setItem("totalCost", product.inCart * (product.proPrice - (product.proPrice * 0.05)));
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem("totalCost");
    let productContainer = document.querySelector(".products");
    let i = 1;
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `           
              <div class="products d-flex justify-content-around mb-2">
                 <h5 class="sno">${i++}</h5>
                 <h5 class="product"><img style="width:75%; height:120px;" src="${item.Propic}.jpg" alt="an image"/></h5>
                <h5 class="name">${item.proName}</h5>
                <h5 class="price">₹${item.proPrice}</h5>
                <h5 class="quantity">${item.inCart}</h5>
                <h5 class="discount">₹${item.proPrice * 0.05}</h5>
                <h5 class="total">₹${item.inCart * (item.proPrice - (item.proPrice * 0.05))}</h5>
                 `;

        });

        productContainer.innerHTML += `
         <div class="float-end">
           <h5 style="color:blue;">TOTAL BASKET COST</h5>
           <h5 style="color:green;">₹${cartCost}.00</h5>
        </div>
        `;
    }
}


onLoadCartNumbers();
displayCart();