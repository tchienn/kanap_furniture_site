function updateCartIcon() {
  /***********************************************
   ** Number of items in cart display above cart **
   ***********************************************/
  // Add items to local storage
  let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
  if (storedCart == null) {
    return;
  }
  let cartCount = 0;

  storedCart.forEach((cartItem) => {
    cartCount += parseInt(cartItem.cartProductQuantity);
  });

  // Adds a font awesome filled cart icon to cart link in header if an item is added to the cart
  if (cartCount > 0) {
    const cartCounter = document.getElementById("cart__counter");
    const cartSpan = document.createElement("span");
    cartSpan.textContent = ` (${cartCount})`;
    cartCounter.appendChild(cartSpan);
  }
}
