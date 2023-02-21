// Imports function and calls it
import { updateCartCount } from './fun.js';
updateCartCount();

// URLSearchParams
const queryString = window.location.search; // Returns the entire parameter sting
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id'); // Gets product ID from string

const uri = 'http://localhost:3000/api/products/' + productId; // Gets relevant URL with product ID

// Fetches product information object from API
fetch(uri)
    .then((res) => {
        return res.json();
    })
    .then((product) => createProduct(product))
    .catch((err) => console.error(err));

// Function iterates over each element in the JSON array retrieved from API and adds product information to DOM
function createProduct(product) {
    const imgContainer = document.getElementsByClassName('item__img')[0]; // Accesses first element in HTML collection
    const productImg = document.createElement('img');
    productImg.src = product.imageUrl;
    productImg.setAttribute('alt', product.altTxt);
    imgContainer.appendChild(productImg);

    const productHeading = document.getElementById('title');
    productHeading.textContent = product.name;

    const productPrice = document.getElementById('price');
    productPrice.textContent = product.price;

    const productDescription = document.getElementById('description');
    productDescription.textContent = product.description;

    // Loop to select product color from array
    product.colors.forEach((color) => {
        const select = document.getElementById('colors');
        select.addEventListener('change', () => {
            // Refreshes quantity to 0 when user changes the color of the item they want to select
            quantity = document.getElementById('quantity');
            quantity.value = 1;
        });
        const colorOption = document.createElement('option');
        colorOption.value = color; // Assigns color from array to option element
        colorOption.textContent = color;
        select.appendChild(colorOption);
    });
}

// Add products to cart
const addToCart = document.getElementById('addToCart'); // Gets 'add to cart' button
let color; // Declares undefined variable to be assigned in the function
let quantity;

// Loop to determine if new cart item already exists in stored cart and update cart accordingly
function updateStoredCart(storedCart, cartItem) {
    for (let i = 0; i < storedCart.length; i++) {
        if (
            cartItem.cartProductColor == storedCart[i].cartProductColor &&
            cartItem.cartProductId == storedCart[i].cartProductId
        ) {
            storedCart[i].cartProductQuantity =
                parseInt(storedCart[i].cartProductQuantity) +
                parseInt(cartItem.cartProductQuantity); // Adds to product quantity because item already exists in cart
            return; // Ends function when task is complete
        }
    }
    storedCart.push(cartItem); // Push new item to the array
}

// Listens to click event and stores product values as a variable
addToCart.addEventListener('click', () => {
    const quantity = document.getElementById('quantity').value;
    const color = document.getElementById('colors').value;
    console.log(color);

    // Ensure color is not empty and quantity is greater than 1
    if (quantity >= 1 && color !== '') {
        // Creates object representing each item that will append to cart array
        let cartItem = {
            cartProductId: productId,
            cartProductColor: color,
            cartProductQuantity: quantity,
        };

        // Add items to Local Storage
        let storedCart = JSON.parse(localStorage.getItem('cart')); // An array of cartItem objects

        if (storedCart == null) {
            // When nothing in cart, item added will be first in array
            localStorage.setItem('cart', JSON.stringify([cartItem])); // Converts back to readable string
        } else {
            // Appends new cartItem object to array or increases quantity of existing object
            updateStoredCart(storedCart, cartItem);
            localStorage.setItem('cart', JSON.stringify(storedCart));
        }

        updateCartCount();
    } else {
        alert('Please select a colour before adding to cart.');
    }
});
