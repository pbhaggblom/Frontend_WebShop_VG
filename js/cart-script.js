let products = JSON.parse(localStorage.getItem('cart'));

if (products === null) {
    document.getElementById('cart').innerHTML = 'Din varukorg är tom';
}

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
    img.className = "cart-img img-fluid"

    let card = document.createElement('div');
    card.className = "d-flex flex-wrap cart-product row mb-4 p-3 mx-auto rounded border shadow-lg justify-content-between";
    card.id = "card-" + id;

    let productInfo = document.createElement('div');
    productInfo.className = "col"

    let title = document.createElement('p');
    title.innerHTML = product.title;

    let quantityContainer = document.createElement('div');
    
    quantityContainer.innerHTML = 'Antal: ';

    let quantity = document.createElement('span');
    quantity.id = "quantity-" + id;
    quantity.innerHTML = productQuantities.get(id)

    quantityContainer.appendChild(quantity);

    let changeQuantity = document.createElement('div');
    changeQuantity.className = "mb-3";

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

    changeQuantity.appendChild(increase);
    changeQuantity.appendChild(decrease);
    quantityContainer.appendChild(changeQuantity)
    
    let itemTotalContainer = document.createElement('p');
    itemTotalContainer.innerHTML = '$'
    itemTotalContainer.className = "";
    

    let itemTotal = document.createElement('span');
    itemTotal.innerHTML = calculateItemTotal(id);
    itemTotal.id = "itemTotal-" + id;
    itemTotalContainer.appendChild(itemTotal);
    

    productInfo.appendChild(title);
    productInfo.appendChild(quantityContainer);
    productInfo.appendChild(itemTotalContainer);
    
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
    console.log(products.length);
    
    if (quantity === 0) {
        productQuantities.delete(id);
        if (products.length === 0) {
            document.getElementById('cart').innerHTML = 'Din varukorg är tom';
        }
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

function emptyCart() {
    products = [];
    productQuantities = new Map();
    document.getElementById('cart').innerHTML = 'Din varukorg är tom';
    localStorage.removeItem('cart');
    document.getElementById('price').innerHTML = calculateCartTotal();
}