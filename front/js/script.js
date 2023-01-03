// Fetch JSON array by making HTTP GET request to API endpoint
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json(); // An array of objects turned into a format readable by JS using .json method
  })
  .then((products) => {
    insertProducts(products);
  });
// This is a succession of functions. When using the 'then' method, the output of the first function becomes the input of the second.
// Therefore (products), the input of the second function, is = to (data.json), the output of the first function.
// The Fetch function returns a promise that resolves with a Response object when the request is successful.
// The 'then' method is called on the returned promise and is used to specify what should be done with the response.
// In this case, the first then block calls the json method on the Response object to parse the body of the response as JSON.
// The second then block calls the insertProducts function and passes the parsed JSON data (the array of products) as an argument.

// Get existing DOM element where I will insert product cards
const productsContainer = document.getElementById("items");

// Iterate over each element in the JSON array from API
function insertProducts(products) {
  let html = ""; // Create empty string
  products.forEach((product) => {
    // Get the current product and concatenate HTML strings to empty 'html' string in each iteration of the loop
    html += `<a href="${product._id}"> 
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;
  });
  productsContainer.innerHTML = html; // Set the 'innerHTML' of 'productsContainer' to the empty html string to avoid needing to create individual DOM elements
}
