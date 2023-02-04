// Gets cart data from local storage
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
console.table(localStorageCart);

// Build and append product cards to DOM
let uri;
let totalQuantity = 0; // For calculating running sum of item quantity
let totalPrice = 0; // For calculating running sum of total price

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
  productPriceNumber = product.price * parseInt(cartItem.cartProductQuantity);
  productPrice.textContent = `${productPriceNumber} €`; // Updates price based on amount selection
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
  // Listens to change event and updates item quantity in local storage based on user input
  productQuantityInput.addEventListener("change", ($event) => {
    let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
    storedCart.find(
      (product) => product.cartProductId == cartItem.cartProductId
    ).cartProductQuantity = $event.target.value;
    localStorage.setItem("cart", JSON.stringify(storedCart));
  });

  const deleteItemDiv = document.createElement("div");
  deleteItemDiv.classList.add("cart__item__content__settings__delete");
  productSettingsDiv.appendChild(deleteItemDiv);
  const deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Delete";
  deleteItemDiv.appendChild(deleteItem);
  // Listens to click event on delete button and updates item quantity in local storage and in DOM based on user input
  deleteItem.addEventListener("click", (event) =>
    deleteCartItem(cartItem, event)
  );
  function deleteCartItem(cartItem, event) {
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

    const domItem = event.target.closest(".cart__item");
    domItem.remove();
  }

  const totalQuantitySpan = document.getElementById("totalQuantity");
  totalQuantity += parseInt(cartItem.cartProductQuantity); // Element in localStorageCart object needs to be parsed as an integer
  totalQuantitySpan.textContent = `${totalQuantity}`;
  // Listens to change event and updates item quantity on page based on user input
  productQuantityInput.addEventListener("change", ($event) => {
    const updatedQuantity =
      parseInt(productQuantityInput.value) - cartItem.cartProductQuantity;
    totalQuantity += updatedQuantity;
    totalQuantitySpan.textContent = `${totalQuantity}`;
    let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
    storedCart.find(
      (product) =>
        product.cartProductId == cartItem.cartProductId &&
        product.cartProductColor == cartItem.cartProductColor
    ).cartProductQuantity += parseInt(updatedQuantity);
    localStorage.setItem("cart", JSON.stringify(storedCart));
  });

  // const totalPriceSpan = document.getElementById("totalPrice");
  // totalPrice += productPriceNumber;
  // totalPriceSpan.textContent = `${totalPrice}`;
  // Listens to change event and updates item quantity on page based on user input
  // productQuantityInput.addEventListener("change", ($event) => {
  //   let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
  //   storedCart.find(
  //     (product) => product.cartProductId == cartItem.cartProductId
  //   ).cartProductQuantity = $event.target.value;
  //   localStorage.setItem("cart", JSON.stringify(storedCart));
  // });
}

// Collecting form data submitted by user
// const submit = document.getElementById("order");
// submit.addEventListener("click", ($event) => {
//   $event.preventDefault(); // Prevents default page refresh
//   const form = document.querySelector(".cart__order__form");
//   const firstName = form.elements["firstName"].value;
//   const lastName = form.elements["lastName"].value;
//   const address = form.elements["address"].value;
//   const city = form.elements["city"].value;
//   const email = form.elements["email"].value;

//   const data = {
//     contact: {
//       firstName,
//       lastName,
//       address,
//       city,
//       email,
//     },
//     products: getProductIdsFromCart(),
//   };

//   console.log(data);
//   sendFormData(data);
// });

// function getProductIdsFromCart() {
//   const shoppingCart = JSON.parse(localStorage.getItem("cart"));
//   const productIds = [];
//   for (const item of shoppingCart) {
//     productIDs.push(item.cartProductId);
//   }

//   return productIds;
// }
