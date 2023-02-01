// TODO: [X] get cart data from localStorage
// TODO: [X] turn the JSON into JS obj array
// TODO: [X] create functions that iterate over the data for loops to build and append cards to the DOM
// TODO: [] each cart item must have a functional product, option, quantity, remove btn
// TODO: [] contact form gathers customer info
// TODO: [] order now btn has eventListener that gets data, creates request body, POSTs to server, on success handle response and navigate to order confirmation page - window.location

// Gets cart data from local storage
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
console.table(localStorageCart);

// Build and append product cards to DOM
let uri;
localStorageCart.forEach((cartItem) => {
  console.log(cartItem);
  console.log(cartItem.cartProductId);

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
  // Adding <article>
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
  productPrice.textContent = `${product.price * cartItem.cartProductQuantity}€`; // Updates price based on amount selection
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
  productQuantity.setAttribute("min", "1"); // Sets minimum and maximum quantity
  productQuantity.setAttribute("max", "100");
  productQuantityInput.setAttribute("value", cartItem.cartProductQuantity);
  productSettingsQuantityDiv.appendChild(productQuantityInput);
  productQuantityInput.addEventListener("change", ($event) => {
    let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
    storedCart.find(
      // this works like a for if statement !
      (product) => product.cartProductId == cartItem.cartProductId
    ).cartProductQuantity = $event.target.value;
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }); // turn this into a function and recall within loop

  const deleteItemDiv = document.createElement("div");
  deleteItemDiv.classList.add("cart__item__content__settings__delete");
  productSettingsDiv.appendChild(deleteItemDiv);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Delete";
  deleteItemDiv.appendChild(deleteItem);
  deleteItem.addEventListener("change", ($event) => {
    let storedCart = JSON.parse(localStorage.getItem("cart"));
    storedCart
      .filter((product) => product.cartProductId != cartItem.cartProductId) // instruction here
      .localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }); // turn this into a function and recall within loop
}

// Listens to change event and updates variables accordingly
// const quantityInput = document.getElementsByClassName("itemQuantity");

// quantityInput.addEventListener("change", ($event) => {
//   for (let i = 0; i < storedCart.length; i++) {
//     if (
//       cartItem.cartProductColor == storedCart[i].cartProductColor &&
//       cartItem.cartProductId == storedCart[i].cartProductId
//     ) {
//     }
//   }

// });
