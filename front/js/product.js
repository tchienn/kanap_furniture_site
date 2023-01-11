// URLSearchParams
const queryString = window.location.search; // Returns the entire parameter sting ?id=415b7cacb65d43b2b5c1ff70f3393ad1
const urlParams = new URLSearchParams(queryString); // An object that allows me to manipulate a string using methods
const productId = urlParams.get("id"); // Get product ID from string

const uri = "http://localhost:3000/api/products/" + productId; // Gets relevant URL with product ID

// Fetch product information object from API
fetch(uri)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    const imgContainer = document.getElementsByClassName("item__img")[0]; // Accesses first element in HTML collection
    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.setAttribute("alt", product.altTxt);
    imgContainer.appendChild(productImg);

    const productHeading = document.getElementById("title");
    productHeading.textContent = product.name;

    const productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    const productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

    // Loop to select product color from array
    product.colors.forEach((color) => {
      const select = document.getElementById("colors"); // Gets dropdown select element
      const colorOption = document.createElement("option");
      colorOption.value = color; // Assigns color from array to option element
      colorOption.textContent = color;
      select.appendChild(colorOption); // Appends color list to dropdown
    });
  });

// Add products to cart
const addToCart = document.getElementById("addToCart"); // Gets 'add to cart' button
let color; // const?
let quantity;

function updateStoredCart(storedCart, cartItem) {
  storedCart.push(cartItem);
  // TODO: Write conditional that pushes an item to cart array if color and ID match, otherwise, increase item quantity in object
}

// Listens to click event and stores product values as a variable
addToCart.addEventListener("click", () => {
  quantity = document.getElementById("quantity");
  color = document.getElementById("colors");

  // Creates object representing each item that will append to cart array
  let cartItem = {
    cartProductId: productId,
    cartProductColor: color.value,
    cartProductQuantity: quantity.value,
  };

  // Add items to local storage
  let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects

  if (storedCart == null) {
    // When nothing in cart, item added will be first in array
    localStorage.setItem("cart", JSON.stringify([cartItem]));
  } else {
    // Appends new cartItem object to array or increases quantity of existing object
    updateStoredCart(storedCart, cartItem);
    //call fn here instead of line above
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }

  console.log(storedCart);

  // fn input storedcart output stored cart
});

// TODO: attach function to check if the product is already in cart - no duplicates
// TODO: handle that function accordingly using a conditional
// TODO: keep localStorage cart synced to cart array on this page
