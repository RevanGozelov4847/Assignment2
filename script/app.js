document.addEventListener("DOMContentLoaded", function () {
  let allProducts = [];
  let currentPage = 1;
  const productsPerPage = 10;

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
      displayProductList(allProducts, currentPage);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  window.filterByCategory = function () {
      const selectedCategory = categoryFilter.value;
      const keyword = searchInput.value.toLowerCase();
    
      if (selectedCategory === "all") {
        const filteredProducts = allProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword)
        );
      }
    };

  function displayProductList(products, page) {
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    const displayedProducts = products.slice(startIdx, endIdx);

    productListContainer.innerHTML = "";

    displayedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.addEventListener("click", () => openProductPage(product));

      productListContainer.appendChild(productCard);
    });
  }
  function openProductPage(product) {
    const productPageURL = `product.html?id=${
      product.id
    }&title=${encodeURIComponent(product.title)}&price=${
      product.price
    }&discount=${product.discountPercentage}&category=${encodeURIComponent(
      product.category
    )}&stock=${product.stock}&thumbnail=${encodeURIComponent(
      product.thumbnail
    )}`;
    window.location.href = productPageURL;
  }
});

function displayPagination(products) {
  const totalPages = Math.ceil(products.length / productsPerPage);

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
  }
}
