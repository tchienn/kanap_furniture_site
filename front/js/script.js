console.log("Hello world!");

const data = [
  {
    colors: ["Blue", "White", "Black"],
    _id: "107fb5b75607497b96722bda5b504926",
    name: "Kanap Sinopé",
    price: 1849,
    imageUrl: "http://localhost:3000/images/kanap01.jpeg",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    altTxt: "Photo of a blue sofa, two seats",
  },
  {
    colors: ["Black/Yellow", "Black/Red"],
    _id: "415b7cacb65d43b2b5c1ff70f3393ad1",
    name: "Kanap Cyllène",
    price: 4499,
    imageUrl: "http://localhost:3000/images/kanap02.jpeg",
    description:
      "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    altTxt: "Photo of a yellow and black sofa, four seats",
  },
  {
    colors: ["Green", "Red", "Orange"],
    _id: "055743915a544fde83cfdfc904935ee7",
    name: "Kanap Calycé",
    price: 3199,
    imageUrl: "http://localhost:3000/images/kanap03.jpeg",
    description:
      "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    altTxt: "Photo of a green angle sofa, three seats",
  },
  {
    colors: ["Pink", "White"],
    _id: "a557292fe5814ea2b15c6ef4bd73ed83",
    name: "Kanap Autonoé",
    price: 1499,
    imageUrl: "http://localhost:3000/images/kanap04.jpeg",
    description:
      "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    altTxt: "Photo of a pink sofa, one to two seats",
  },
  {
    colors: ["Grey", "Purple", "Blue"],
    _id: "8906dfda133f4c20a9d0e34f18adcf06",
    name: "Kanap Eurydomé",
    price: 2249,
    imageUrl: "http://localhost:3000/images/kanap05.jpeg",
    description:
      "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    altTxt: "Photo of a gray sofa, three seats",
  },
  {
    colors: ["Grey", "Navy"],
    _id: "77711f0e466b4ddf953f677d30b0efc9",
    name: "Kanap Hélicé",
    price: 999,
    imageUrl: "http://localhost:3000/images/kanap06.jpeg",
    description:
      "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    altTxt: "Photo of a gray sofa, two seats",
  },
  {
    colors: ["Red", "Silver"],
    _id: "034707184e8e4eefb46400b5a3774b5f",
    name: "Kanap Thyoné",
    price: 1999,
    imageUrl: "http://localhost:3000/images/kanap07.jpeg",
    description:
      "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    altTxt: "Photo of a red sofa, two seats",
  },
  {
    colors: ["Pink", "Brown", "Yellow", "White"],
    _id: "a6ec5b49bd164d7fbe10f37b6363f9fb",
    name: "Kanap orthosie",
    price: 3999,
    imageUrl: "http://localhost:3000/images/kanap08.jpeg",
    description:
      "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    altTxt: "Photo of a pink sofa, three seats",
  },
];

const productsContainer = document.getElementById("items");

// array method
data.forEach((product) => {
  // step 1: create a link element w/ attribute
  const productLink = document.createElement("a");
  productLink.setAttribute("href", product._id);
  // step 2: create a container article for image, title, and description
  const containerArticle = document.createElement("article");
  // step 3: create an image element w/ alt
  const productImg = document.createElement("img");
  productImg.src = product.imageUrl;
  productImg.setAttribute("alt", product.altTxt);
  console.log(productImg);
  // step 4: create a heading element
  // step 5: create a paragraph element
  // step 6: append paragrraph to div
  // step 7: append heading to div
  // step 8: append image to div
  // step 9: append div to link
  // step 10: append div to product container
});
