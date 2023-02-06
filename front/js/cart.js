// Gets cart data from local storage
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
console.table(localStorageCart);

// Build and append product cards to DOM
let uri;
let totalQuantity = 0; // To calculate running sum of item quantity
let totalPrice = 0; // To calculate running sum of total price

localStorageCart.forEach((cartItem) => {
  uri = "http://localhost:3000/api/products/" + cartItem.cartProductId; // Gets URL with product ID

  // Fetch product information object from API
  fetch(uri)
    .then((res) => {
      return res.json();
    })

    .then((product) => addItemToCartPage(product, cartItem))
    .catch((err) => console.error(err));
});

function addItemToCartPage(product, cartItem) {
  // Accesses first element in HTML collection
  const cartContainer = document.getElementById("cart__items");
  const productArticle = document.createElement("article");
  productArticle.classList.add("cart__item");
  productArticle.setAttribute("data-id", product.id);
  cartContainer.appendChild(productArticle);

  const productImgDiv = document.createElement("div");
  productImgDiv.classList.add("cart__item__img");
  productArticle.appendChild(productImgDiv);

  const productCartImg = document.createElement("img");
  productCartImg.src = product.imageUrl;
  productCartImg.setAttribute("alt", product.altTxt);
  productImgDiv.appendChild(productCartImg);

  const productContentDiv = document.createElement("div");
  productContentDiv.classList.add("cart__item__content");
  productArticle.appendChild(productContentDiv);

  const productDescriptionDiv = document.createElement("div");
  productDescriptionDiv.classList.add("cart__item__content__description");
  productContentDiv.appendChild(productDescriptionDiv);

  const productHeading = document.createElement("h2");
  productHeading.textContent = product.name;
  productContentDiv.appendChild(productHeading);

  const productColor = document.createElement("p");
  productColor.innerHTML += `<option value="${cartItem.cartProductColor}">${cartItem.cartProductColor}</option>`;
  productContentDiv.appendChild(productColor);

  const productPrice = document.createElement("p");
  productPrice.textContent = `${
    product.price * parseInt(cartItem.cartProductQuantity)
  } €`; // Updates price based on amount selection
  productContentDiv.appendChild(productPrice);

  const productSettingsDiv = document.createElement("div");
  productSettingsDiv.classList.add("cart__item__content__settings");
  productArticle.appendChild(productSettingsDiv);

  const productSettingsQuantityDiv = document.createElement("div");
  productSettingsQuantityDiv.classList.add("cart__item__content__settings");
  productSettingsDiv.appendChild(productSettingsQuantityDiv);

  const productQuantity = document.createElement("p");
  productQuantity.textContent = "Quantity :";
  productSettingsQuantityDiv.appendChild(productQuantity);

  const productQuantityInput = document.createElement("input");
  productQuantityInput.setAttribute("type", "number");
  productQuantityInput.classList.add("itemQuantity");
  productQuantityInput.setAttribute("name", "itemQuantity");
  productQuantityInput.setAttribute("min", "1"); // Sets minimum and maximum quantities
  productQuantityInput.setAttribute("max", "100");
  productQuantityInput.setAttribute("value", cartItem.cartProductQuantity);
  productSettingsQuantityDiv.appendChild(productQuantityInput);

  const deleteItemDiv = document.createElement("div");
  deleteItemDiv.classList.add("cart__item__content__settings__delete");
  productSettingsDiv.appendChild(deleteItemDiv);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Delete";
  deleteItemDiv.appendChild(deleteItem);

  // Add total quantity
  const totalQuantitySpan = document.getElementById("totalQuantity");
  totalQuantity += parseInt(cartItem.cartProductQuantity); // Element in localStorageCart object needs to be parsed as an integer
  totalQuantitySpan.textContent = `${totalQuantity}`;

  // Add total price
  const totalPriceSpan = document.getElementById("totalPrice");
  totalPrice += product.price * parseInt(cartItem.cartProductQuantity); // Element in localStorageCart object needs to be parsed as an integer
  totalPriceSpan.textContent = `${totalPrice}`;

  // Listens to change event and updates
  productQuantityInput.addEventListener("change", ($event) => {
    changeCartItem(cartItem, $event);
  });

  // Listens to click event on delete button and updates item quantity in local storage and in DOM based on user input
  deleteItem.addEventListener("click", ($event) =>
    deleteCartItem(cartItem, $event)
  );

  function changeCartItem(cartItem, $event) {
    // Update total item price on page
    productPrice.textContent = `${
      product.price * parseInt($event.target.value)
    } €`; // Update price based on amount selection

    // Update total quantity on page
    totalQuantitySpan.textContent = `${
      parseInt(totalQuantitySpan.textContent) -
      parseInt(cartItem.cartProductQuantity) +
      parseInt($event.target.value)
    }`;

    // Update total price on page
    totalPriceSpan.textContent = `${
      parseInt(totalPriceSpan.textContent) -
      product.price * parseInt(cartItem.cartProductQuantity) +
      product.price * parseInt($event.target.value)
    }`;

    // Update item quantity in local storage
    cartItem.cartProductQuantity = $event.target.value;
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
  }
  function deleteCartItem(cartItem, $event) {
    // Remove item from DOM
    const domItem = $event.target.closest(".cart__item");
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

    // Remove item from local storage
    const cart = JSON.parse(localStorage.getItem("cart"));
    localStorage.removeItem("cart");
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
    localStorage.setItem("cart", JSON.stringify(filtered));
  }
}

// Collect form data submitted by user
const submit = document.getElementById("order");

// User's form input saved and sent to API on click
submit.addEventListener("click", ($event) => {
  $event.preventDefault(); // Prevents default page refresh
  const form = document.querySelector(".cart__order__form");
  // Retrieve user form data
  const firstName = form.elements["firstName"].value;
  const lastName = form.elements["lastName"].value;
  const address = form.elements["address"].value;
  const city = form.elements["city"].value;
  const email = form.elements["email"].value;

  const contact = {
    contact: {
      firstName,
      lastName,
      address,
      city,
      email,
    },
    products: getProductIdsFromCart(),
  };

  console.log(contact);
  sendFormData(contact);
});

function getProductIdsFromCart() {
  // Creates product table
  const shoppingCart = JSON.parse(localStorage.getItem("cart"));
  const productIds = [];
  for (const item of shoppingCart) {
    productIds.push(item.cartProductId);
  }

  return productIds;
}

function sendFormData(sendFormData) {
  const sendFormToBack = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendFormData),
  };

  fetch("http://localhost:3000/api/products/order", sendFormToBack)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      window.location.href = `confirmation.html?orderId=${data.orderId}`;
      localStorage.clear(); // Clears cart contents from local storage because user has already ourchased
    })
    .catch((err) => console.error(err));
}
