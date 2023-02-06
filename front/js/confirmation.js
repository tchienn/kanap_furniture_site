// TODO: [] if POST request on cart page is successful server will send a response object with a confirmation number and the data you POSTed
// TODO: [] pick a strategy to save data and send to this page - for example, localStorage, template literals

// URLSearchParams to retrieve order number
const queryString = window.location.search; // Returns the entire parameter sting
const urlParams = new URLSearchParams(queryString);

// Post order number
const productId = urlParams.get("id"); // Get product ID from string
