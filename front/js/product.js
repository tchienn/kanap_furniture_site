const queryString = window.location.search; // Returns the entire parameter sting ?id=415b7cacb65d43b2b5c1ff70f3393ad1
const urlParams = new URLSearchParams(queryString); // An object that allows me to manipulate a string using methods
const productId = urlParams.get("id"); // Get product ID from string
console.log(productId);

const uri = "http://localhost:3000/api/products/" + productId; // Gets relevant URL with product ID

// Fetch product information object from API
fetch(uri)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    console.log(product);
  });
