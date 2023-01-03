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
  // Get the current product
  products.forEach((product) => {
    // Create a link element
    const productLink = document.createElement("a");
    productLink.setAttribute("href", product._id);
    // Create a new DOM card element using article tag that will be inserted into home page
    const containerArticle = document.createElement("article");
    // Create an image element w/ [alt]
    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.setAttribute("alt", product.altTxt);
    // Create a heading element w/ class
    const productHeading = document.createElement("h3");
    productHeading.classList.add("productName");
    productHeading.textContent = product.name;
    // Create a paragraph element w/ class
    const productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.textContent = product.description;
    // Append img to article
    containerArticle.appendChild(productImg);
    // Append heading to article
    containerArticle.appendChild(productHeading);
    // Append paragraph to article
    containerArticle.appendChild(productDescription);
    // Append div to link
    productLink.appendChild(containerArticle);
    // Append link to product container
    productsContainer.appendChild(productLink);
  });
}
