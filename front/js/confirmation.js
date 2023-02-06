// URLSearchParams to retrieve order number
const queryString = window.location.search; // Returns the entire parameter sting
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId"); // Get product ID from string

// Post order number
document.getElementById("orderId").textContent = orderId;
