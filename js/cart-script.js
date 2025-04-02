let products = JSON.parse(localStorage.getItem('cart'));

let productQuantities = new Map();

products.forEach(product => {
    productQuantities.set(product.id, (productQuantities.get(product.id) || 0) + 1);
});
let total = calculateCartTotal();

productQuantities.forEach(showCartProduct);

document.getElementById('price').innerHTML = total;

function showCartProduct(value, key, map) {

    let product = products.find((p) => p.id === key)
    let id = product.id

    let img = document.createElement('img');
    img.setAttribute('src', product.image);
    img.className = "cart-img img-fluid col"

    let card = document.createElement('div');
    card.className = "d-flex flex-wrap cart-product row mb-4 p-3 mx-auto rounded border shadow-lg justify-content-between";
    card.id = "card-" + id;

    let productInfo = document.createElement('div');
    productInfo.className = "col"

    let title = document.createElement('p');
    title.innerHTML = product.title;

    let price = document.createElement('p');
    price.innerHTML = "$" + product.price;

    let quantity = document.createElement('p');
    quantity.id = "quantity-" + id;
    quantity.innerHTML = `Antal: ${value}`;

    let increase = document.createElement('span');
    increase.id = "inc";
    increase.className = "change-quantity btn";
    increase.innerHTML = "+";
    increase.addEventListener('click', e => addItem(id));

    let decrease = document.createElement('span');
    decrease.id = "dec";
    decrease.className = "change-quantity btn";
    decrease.innerHTML = "-";
    decrease.addEventListener('click', e => removeFromCart(id));
    
    let itemTotal = document.createElement('p');
    itemTotal.innerHTML = "$" + calculateItemTotal(id);
    itemTotal.id = "itemTotal-" + id;

    productInfo.appendChild(title);
    productInfo.appendChild(quantity);
    productInfo.appendChild(increase);
    productInfo.appendChild(decrease);
    productInfo.appendChild(price);
    productInfo.appendChild(itemTotal);
    
    card.appendChild(img);
    card.appendChild(productInfo);

    let cart = document.getElementById('cart');
    cart.appendChild(card);
};


function calculateItemTotal(id) {
    let quantity = productQuantities.get(id);
    let price = products.find(p => p.id === id).price;
    return quantity * price;
}

function calculateCartTotal() {
    let total = 0;
    productQuantities.forEach((value, key, map) => {
        total += calculateItemTotal(key);
    })
    return total;
}

function addItem(id) {
    
    let product = products.find(p => p.id === id);
    products.push(product);
    localStorage.setItem('cart', JSON.stringify(products));
    
    let quantity = productQuantities.get(id) + 1;
    productQuantities.set(id, quantity);

    updateCard(id, quantity);
}

function removeFromCart(id) {

    let product = products.find(p => p.id === id);
    products.splice(products.indexOf(product), 1);
    localStorage.setItem('cart', JSON.stringify(products));
    
    let quantity = productQuantities.get(id) - 1;
    if (quantity === 0) {
        productQuantities.delete(id);
    } else {
        productQuantities.set(id, quantity);
    }
    
    updateCard(id, quantity);
}

function updateCard(id, quantity) {
    document.getElementById('price').innerHTML = calculateCartTotal();
    if (quantity === 0) {
        document.getElementById('card-' + id).remove();
    } else {
        document.getElementById('quantity-'+id).innerHTML = quantity;
        document.getElementById('itemTotal-'+id).innerHTML = calculateItemTotal(id);
    }
}