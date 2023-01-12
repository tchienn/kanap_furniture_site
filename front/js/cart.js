// TODO: [X] get cart data from localStorage
// TODO: [X] turn the JSON into JS obj array
// TODO: [] create functions that iterate over the data for loops to build and append cards to the DOM
// TODO: [] each cart item must have product, option, quantity, remove btn
// TODO: [] contact form gathers customer info
// TODO: [] order now btn has eventListener that gets data, creates request body, POSTs to server, on success handle response and navigate to order confirmation page - window.location

// Local storage
const localStorageCart = JSON.parse(localStorage.getItem("cart"));
console.table(localStorageCart); // logs JSON object

// Build and append product cards to DOM
function insertProducts() {
  let cartContainer = document.getElementById("cart__items"); // Get existing DOM element where I will insert products

  for (let product in localStorageCart) {
    // Adding <article>
    const productArticle = document.createElement("article");
    productArticle.classList.add("cart__item");
    productArticle.setAttribute(
      "data-id",
      localStorageCart[cartItem].cartProductId
    );
    cartContainer.appendChild(productArticle);

    // Adding <div>
    const productImgDiv = document.createElement("div");
    productImgDiv.classList.add("cart__item__img");
    productArticle.appendChild(productImgDiv);

    // Adding <img>
    const productCartImg = document.createElement("img");
    // productCartImg.src = localStorageCart[cartItem].cartProductId
    // productCartImg.setAttribute("alt", //);
    productImgDiv.appendChild(productCartImg);

    // Adding <div>
    // Adding <h2>
    // Adding <p>
    // Adding <p>
    // Adding <div>
    // Adding <div>
    // Adding <p>
    // Adding <input>
    // Adding <div>
    // Adding <p>
  }
}
