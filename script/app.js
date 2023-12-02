document.addEventListener("DOMContentLoaded", function () {
  let allProducts = []; 
  const productListContainer = document.getElementById("productList");
  const paginationContainer = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortCriteria = document.getElementById("sortCriteria");
  const productsPerPage = 10;
  let currentPage = 1;

  fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data.products;
      populateCategoryFilter(allProducts);
      displayProductList(allProducts, currentPage);
      displayPagination(allProducts);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // Function to populate the category filter select box
  function populateCategoryFilter(products) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const categoryOptions = categories.map(
      (category) => `<option value="${category}">${category}</option>`
    );
    categoryFilter.innerHTML += categoryOptions.join("");
  }

  // Function to display the product list on the web page
  function displayProductList(products, page) {
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    const displayedProducts = products.slice(startIdx, endIdx);

    productListContainer.innerHTML = "";

    // Create HTML elements for each product
    displayedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Attach a click event to each product card
      productCard.addEventListener("click", () =>
        openProductPage(product)
      );

      productCard.innerHTML = `
                  <img src="${product.thumbnail}" alt="${product.title}" />
                  <h3>${product.title}</h3>
                  <p>Price: $${product.price}</p>
                  <p>Discount: ${product.discountPercentage}%</p>
                  <p>Category: ${product.category}</p>
                  <p>Stock: ${product.stock}</p>
              `;

      productListContainer.appendChild(productCard);
    });
  }

  // Function to open a new HTML page for each product with detailed information
  function openProductPage(product) {
    const productPageURL = `product.html?id=${
      product.id
    }&title=${encodeURIComponent(product.title)}&price=${
      product.price
    }&discount=${
      product.discountPercentage
    }&category=${encodeURIComponent(product.category)}&stock=${
      product.stock
    }&thumbnail=${encodeURIComponent(product.thumbnail)}`;
    window.location.href = productPageURL;
  }

  // Function to display pagination
  function displayPagination(products) {
    const totalPages = Math.ceil(products.length / productsPerPage);

    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        displayProductList(products, currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // Function to search products based on the keyword and category
  window.searchProducts = function () {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    // Filter products based on both keyword and category
    const filteredProducts = allProducts.filter(
      (product) =>
        (selectedCategory === "all" ||
          product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword))
    );

    currentPage = 1; // Reset to the first page after searching
    displayProductList(filteredProducts, currentPage);
    displayPagination(filteredProducts);
  };

  // Function to filter products based on the selected category
  window.filterByCategory = function () {
    const selectedCategory = categoryFilter.value;
    const keyword = searchInput.value.toLowerCase();

    if (selectedCategory === "all") {
      // If 'All Categories' is selected, filter based on the search term only
      const filteredProducts = allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword)
      );

      currentPage = 1; // Reset to the first page after filtering
      displayProductList(filteredProducts, currentPage);
      displayPagination(filteredProducts);
    } else {
      // If a specific category is selected, filter based on both category and search term
      const filteredProducts = allProducts.filter(
        (product) =>
          product.category === selectedCategory &&
          (product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword))
      );

      currentPage = 1; // Reset to the first page after filtering
      displayProductList(filteredProducts, currentPage);
      displayPagination(filteredProducts);
    }
  };

  // Function to sort products based on the selected criteria
  window.sortProducts = function () {
    const selectedCriteria = sortCriteria.value;
    let sortedProducts = [...allProducts];

    if (selectedCriteria === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    // Add more sorting criteria as needed

    currentPage = 1; // Reset to the first page after sorting
    displayProductList(sortedProducts, currentPage);
    displayPagination(sortedProducts);
  };
});
