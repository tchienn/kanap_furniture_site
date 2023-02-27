// Imports function and calls it
import { updateCartCount } from './fun.js';
updateCartCount();

// Gets cart data from local storage
const localStorageCart = JSON.parse(localStorage.getItem('cart'));

// Build and append product cards to DOM
let uri;
let totalQuantity = 0; // To calculate running sum of item quantity
let totalPrice = 0; // To calculate running sum of total price

localStorageCart.forEach((cartItem) => {
    uri = 'http://localhost:3000/api/products/' + cartItem.cartProductId; // Gets URL with product ID

    // Fetch product information object from API
    fetch(uri)
        .then((res) => {
            return res.json();
        })

        .then((product) => addItemToCartPage(product, cartItem))
        .catch((err) => console.error(err));
});

// Function iterates over each element in the JSON array retrieved from API and adds information to DOM
function addItemToCartPage(product, cartItem) {
    const cartContainer = document.getElementById('cart__items');
    const productArticle = document.createElement('article');
    productArticle.classList.add('cart__item');
    productArticle.setAttribute('data-id', product.id);
    cartContainer.appendChild(productArticle);

    const productImgDiv = document.createElement('div');
    productImgDiv.classList.add('cart__item__img');
    productArticle.appendChild(productImgDiv);

    const productCartImg = document.createElement('img');
    productCartImg.src = product.imageUrl;
    productCartImg.setAttribute('alt', product.altTxt);
    productImgDiv.appendChild(productCartImg);

    const productContentDiv = document.createElement('div');
    productContentDiv.classList.add('cart__item__content');
    productArticle.appendChild(productContentDiv);

    const productDescriptionDiv = document.createElement('div');
    productDescriptionDiv.classList.add('cart__item__content__description');
    productContentDiv.appendChild(productDescriptionDiv);

    const productHeading = document.createElement('h2');
    productHeading.textContent = product.name;
    productContentDiv.appendChild(productHeading);

    const productColor = document.createElement('p');
    productColor.innerHTML += `<option value="${cartItem.cartProductColor}">${cartItem.cartProductColor}</option>`;
    productContentDiv.appendChild(productColor);

    const productPrice = document.createElement('p');
    productPrice.textContent = `${
        product.price * parseInt(cartItem.cartProductQuantity)
    } €`; // Updates price based on quantity selected
    productContentDiv.appendChild(productPrice);

    const productSettingsDiv = document.createElement('div');
    productSettingsDiv.classList.add('cart__item__content__settings');
    productArticle.appendChild(productSettingsDiv);

    const productSettingsQuantityDiv = document.createElement('div');
    productSettingsQuantityDiv.classList.add('cart__item__content__settings');
    productSettingsDiv.appendChild(productSettingsQuantityDiv);

    const productQuantity = document.createElement('p');
    productQuantity.textContent = 'Quantity :';
    productSettingsQuantityDiv.appendChild(productQuantity);

    const productQuantityInput = document.createElement('input');
    productQuantityInput.setAttribute('type', 'number');
    productQuantityInput.classList.add('itemQuantity');
    productQuantityInput.setAttribute('name', 'itemQuantity');
    productQuantityInput.setAttribute('min', '1'); // Sets minimum and maximum quantities
    productQuantityInput.setAttribute('max', '100');
    productQuantityInput.setAttribute('value', cartItem.cartProductQuantity);
    productSettingsQuantityDiv.appendChild(productQuantityInput);

    const deleteItemDiv = document.createElement('div');
    deleteItemDiv.classList.add('cart__item__content__settings__delete');
    productSettingsDiv.appendChild(deleteItemDiv);
    const deleteItem = document.createElement('p');
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = 'Delete';
    deleteItemDiv.appendChild(deleteItem);

    // Add total quantity
    const totalQuantitySpan = document.getElementById('totalQuantity');
    totalQuantity += parseInt(cartItem.cartProductQuantity); // Element in localStorageCart object needs to be parsed as an integer
    totalQuantitySpan.textContent = `${totalQuantity}`;

    // Add total price
    const totalPriceSpan = document.getElementById('totalPrice');
    totalPrice += product.price * parseInt(cartItem.cartProductQuantity); // Element in localStorageCart object needs to be parsed as an integer
    totalPriceSpan.textContent = `${totalPrice}`;

    // Listens to change event and updates DOM based on changeCartItem function declared below
    productQuantityInput.addEventListener('change', ($event) => {
        changeCartItem(cartItem, $event);
    });

    // Listens to click event on delete button and updates item quantity in local storage and in DOM based on user input
    deleteItem.addEventListener('click', ($event) =>
        deleteCartItem(cartItem, $event)
    );

    // Function updates item price, total price, and article totals on page based on quantity selected
    function changeCartItem(cartItem, $event) {
        // Updates item total based on quantity selected
        productPrice.textContent = `${
            product.price * parseInt($event.target.value)
        } €`;

        // Updates total quantity on page
        totalQuantitySpan.textContent = `${
            parseInt(totalQuantitySpan.textContent) -
            parseInt(cartItem.cartProductQuantity) +
            parseInt($event.target.value)
        }`;

        // Updates total price on page
        totalPriceSpan.textContent = `${
            parseInt(totalPriceSpan.textContent) -
            product.price * parseInt(cartItem.cartProductQuantity) +
            product.price * parseInt($event.target.value)
        }`;

        // Updates item quantity in local storage
        cartItem.cartProductQuantity = $event.target.value;
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
        updateCartCount();
    }

    // Function deletes item from page
    function deleteCartItem(cartItem, $event) {
        // Remove item from DOM
        const domItem = $event.target.closest('.cart__item');
        domItem.remove();

        // Update total quantity on page
        totalQuantitySpan.textContent = `${
            parseInt(totalQuantitySpan.textContent) -
            parseInt(cartItem.cartProductQuantity)
        }`;

        // Update total price on page
        totalPriceSpan.textContent = `${
            parseInt(totalPriceSpan.textContent) -
            product.price * parseInt(cartItem.cartProductQuantity)
        }`;

        // Removes item from local storage
        const cart = JSON.parse(localStorage.getItem('cart'));
        localStorage.removeItem('cart');
        const filtered = [];
        for (const item of cart) {
            if (
                item.cartProductId !== cartItem.cartProductId ||
                (item.cartProductId === cartItem.cartProductId &&
                    item.cartProductColor !== cartItem.cartProductColor)
            ) {
                filtered.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(filtered));
        updateCartCount();
    }
}

// Displays error message
function showErrorMessage(elementId, message) {
    const errorPara = document.getElementById(elementId);
    errorPara.textContent = message;
    return false;
}

// Ensure form is disabled if no items present in cart
const form = document.querySelector('.cart__order__form');
// Check if localStorageCart is empty or not
if (!localStorageCart || localStorageCart.length === 0) {
    // Disable form
    form.querySelectorAll('input, textarea, select').forEach((input) => {
        input.disabled = true;
    });
} else {
    form.querySelectorAll('input, textarea, select').forEach((input) => {
        input.disabled = false;
    });
}

// Use RegEx to control form data input by user and submit only if these conditions are fulfilled
let wordPattern = /^[a-zA-Z]+$/;
let addressPattern = /^[a-zA-Z0-9]/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

// Users' form input saved and sent to API on click
submit.addEventListener('click', ($event) => {
    // Retrieve user form data
    $event.preventDefault(); // Prevents default page refresh
    const form = document.querySelector('.cart__order__form');

    // Validates data based on response to RegEx matcher
    let isDataCorrect = true;

    const firstName = form.elements['firstName'].value;
    if (!wordPattern.test(firstName)) {
        showErrorMessage('firstNameErrorMsg', 'Please enter a valid name');
        isDataCorrect = false;
    } else {
        showErrorMessage('firstNameErrorMsg', '');
    }

    const lastName = form.elements['lastName'].value;
    if (!wordPattern.test(lastName)) {
        showErrorMessage('lastNameErrorMsg', 'Please enter a valid name');
        isDataCorrect = false;
    } else {
        showErrorMessage('lastNameErrorMsg', '');
    }

    const address = form.elements['address'].value;
    if (!addressPattern.test(address)) {
        showErrorMessage('addressErrorMsg', 'Please enter a valid address');
        isDataCorrect = false;
    } else {
        showErrorMessage('addressErrorMsg', '');
    }

    const city = form.elements['city'].value;
    if (!wordPattern.test(city)) {
        showErrorMessage('cityErrorMsg', 'Please enter a valid city');
        isDataCorrect = false;
    } else {
        showErrorMessage('cityErrorMsg', '');
    }

    const email = form.elements['email'].value;
    if (!emailPattern.test(email)) {
        showErrorMessage('emailErrorMsg', 'Please enter a valid email address');
        isDataCorrect = false;
    } else {
        showErrorMessage('emailErrorMsg', '');
    }

    const formData = {
        contact: {
            // The contact object
            firstName,
            lastName,
            address,
            city,
            email,
        },
        products: getProductIdsFromCart(),
    };

    if (isDataCorrect == true) {
        sendFormData(formData); // Will submit form data only if all input conditions are met
    }
});

// Function creates product table
function getProductIdsFromCart() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    const productIds = [];
    for (const item of shoppingCart) {
        productIds.push(item.cartProductId);
    }

    return productIds;
}

// Function sends POST request to server (sends form data)
function sendFormData(sendFormData) {
    const sendFormToBack = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendFormData),
    };

    // Retrieves response (order number)
    fetch('http://localhost:3000/api/products/order', sendFormToBack)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.status); // May be unnecessary
            }
            return response.json();
        })
        .then((data) => {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            localStorage.clear(); // Clears cart contents from local storage
        })
        .catch((err) => console.error(err));
}
