// Fetch JSON array by making HTTP GET request to API endpoint
fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertProducts(products);
  });

// Iterate over each element in the JSON array from API
function insertProducts(products) {
  const productsContainer = document.getElementById("items"); // Get existing DOM element where I will insert product cards
  products.forEach((product) => {
    const productLink = document.createElement("a");
    productLink.setAttribute("href", `./product.html?id=${product._id}`); // Get ID that links product on homepage to the same product on product page
    productsContainer.appendChild(productLink);

    const productCard = document.createElement("article"); // Create a new DOM card element that will be inserted into home page
    productLink.appendChild(productCard);

    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.setAttribute("alt", product.altTxt);
    productCard.appendChild(productImg);

    const productHeading = document.createElement("h3");
    productHeading.classList.add("productName");
    productHeading.textContent = product.name;
    productCard.appendChild(productHeading);

    const productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.textContent = product.description;
    productCard.appendChild(productDescription);
  });
}
