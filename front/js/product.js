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
