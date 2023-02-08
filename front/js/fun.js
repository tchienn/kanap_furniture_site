// Function is exported to all pages calling it
// Function displays number of items in cart next to cart link in header
export function updateCartCount() {
  // Add items to local storage
  let storedCart = JSON.parse(localStorage.getItem("cart")); // An array of cartItem objects
  if (storedCart == null) {
    return; // Function ends here if no items are in cart
  }
  let cartCount = 0;

  storedCart.forEach((cartItem) => {
    cartCount += parseInt(cartItem.cartProductQuantity); //
  });

  if (cartCount > 0) {
    const cartCounter = document.getElementById("cart__counter");
    const cartSpan = document.createElement("span");
    cartSpan.textContent = ` (${cartCount})`; // Inserts cart item number into HTML if there is an item in the cart
    cartCounter.appendChild(cartSpan);
  }
}
