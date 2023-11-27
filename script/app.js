document.addEventListener("DOMContentLoaded", function () {
    let allProducts = []; 
    let currentPage = 1;
    const productListContainer = document.getElementById("productList");


    fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data.products;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});