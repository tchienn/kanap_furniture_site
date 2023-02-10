// Use URLSearchParams to retrieve order number
const queryString = window.location.search; // Returns entire parameter sting
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId"); // Get confirmation ID from string

// Post order number to page
document.getElementById("orderId").textContent = orderId;
