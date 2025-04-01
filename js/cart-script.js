let products = JSON.parse(localStorage.getItem('cart'));
let total = 0;
let productQuantities = new Map();

products.forEach(product => {

    productQuantities.set(product.id, (productQuantities.get(product.id) || 0) + 1);

});


console.log(productQuantities);
console.log(products);
productQuantities.forEach(showCartProduct);


/*
productQuantities.forEach(product => {

    let i = product.id

    let img = document.createElement('img');
    img.setAttribute('src', product.image);
    img.className = "cart-img img-fluid col"

    let card = document.createElement('div');
    card.className = "d-flex flex-wrap cart-product row mb-4 p-3 mx-auto rounded border shadow-lg justify-content-between"

    let productInfo = document.createElement('div');
    productInfo.className = "col"

    let title = document.createElement('p');
    title.innerHTML = product.title;

    let price = document.createElement('p');
    price.innerHTML = "$" + product.price;

    let quantity = document.createElement('p');
    quantity.innerHTML = `Antal: <span id="quantity-${i}"></span>`;

    let increase = document.createElement('span');
    increase.id = "inc";
    increase.className = "change-quantity btn";
    increase.innerHTML = "+";

    let decrease = document.createElement('span');
    decrease.id = "dec";
    decrease.className = "change-quantity btn";
    decrease.innerHTML = "-";

    quantity.appendChild(increase);
    quantity.appendChild(decrease);

    productInfo.appendChild(title);
    productInfo.appendChild(quantity);
    productInfo.appendChild(price);
    

    card.appendChild(img);
    card.appendChild(productInfo);

    let cart = document.getElementById('cart');
    cart.appendChild(card);

    total += product.price;
});
*/

function showCartProduct(value, key, map) {

    let product = products.find((p) => p.id === key)
    console.log(product);
    let i = product.id

    let img = document.createElement('img');
    img.setAttribute('src', product.image);
    img.className = "cart-img img-fluid col"

    let card = document.createElement('div');
    card.className = "d-flex flex-wrap cart-product row mb-4 p-3 mx-auto rounded border shadow-lg justify-content-between"

    let productInfo = document.createElement('div');
    productInfo.className = "col"

    let title = document.createElement('p');
    title.innerHTML = product.title;

    let price = document.createElement('p');
    price.innerHTML = "$" + product.price;

    let quantity = document.createElement('p');
    quantity.innerHTML = `Antal: ${value}`;

    let increase = document.createElement('span');
    increase.id = "inc";
    increase.className = "change-quantity btn";
    increase.innerHTML = "+";

    let decrease = document.createElement('span');
    decrease.id = "dec";
    decrease.className = "change-quantity btn";
    decrease.innerHTML = "-";

    quantity.appendChild(increase);
    quantity.appendChild(decrease);

    productInfo.appendChild(title);
    productInfo.appendChild(quantity);
    productInfo.appendChild(price);
    

    card.appendChild(img);
    card.appendChild(productInfo);

    let cart = document.getElementById('cart');
    cart.appendChild(card);

    total += product.price;
};



document.getElementById('quantity').innerHTML = 'hej';
document.getElementById('price').innerHTML = total;