// Function is exported to all pages calling it
// Function displays number of items in cart next to cart link in header
export function updateCartCount() {
    try {
        // Add items to local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // An array of cartItem objects
        let cartCount = 0;

        storedCart.forEach((cartItem) => {
            cartCount += parseInt(cartItem.cartProductQuantity, 10); //
        });

        const cartCounter = document.getElementById('cart__counter');
        cartCounter.innerHTML = ''; // Clear any existing cart count

        if (cartCount > 0) {
            const cartSpan = document.createElement('span');
            cartSpan.textContent = `Cart (${cartCount})`; // Inserts cart item number into HTML if there is an item in the cart
            cartCounter.appendChild(cartSpan);
        }
    } catch (err) {
        console.error('Error loading cart:', err);
    }
}
