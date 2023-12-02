document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const elements = {
    productListContainer: document.getElementById("productList"),
    paginationContainer: document.getElementById("pagination"),
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sortCriteria: document.getElementById("sortCriteria"),
  };

  // Data variables
  let allProducts = [];
  let currentPage = 1;
  const productsPerPage = 10;

  // Fetch product data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error("Unable to fetch data");
      }

      const data = await response.json();
      allProducts = data.products;
      populateCategoryFilter(allProducts);
      displayProductList(allProducts, currentPage);
      displayPagination(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Populate the category filter dropdown
  const populateCategoryFilter = (products) => {
    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    elements.categoryFilter.innerHTML += uniqueCategories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("");
  };

  // Display a subset of products based on the current page
  const displayProductList = (products, page) => {
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    const displayedProducts = products.slice(startIdx, endIdx);
    elements.productListContainer.innerHTML = "";

    displayedProducts.forEach((product) => {
      const productCard = createProductCard(product);
      elements.productListContainer.appendChild(productCard);
    });
  };

  // Create HTML for a product card
  const createProductCard = (product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.addEventListener("click", () => openProductPage(product));

    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Category: ${product.category}</p>
      <p>Stock: ${product.stock}</p>`;

    return productCard;
  };

  // Redirect to the product page
  const openProductPage = (product) => {
    const productPageURL = buildProductPageURL(product);
    window.location.href = productPageURL;
  };

  // Build URL for the product page
  const buildProductPageURL = (product) => {
    return `product.html?id=${product.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&discount=${product.discountPercentage}&category=${encodeURIComponent(product.category)}&stock=${product.stock}&thumbnail=${encodeURIComponent(product.thumbnail)}`;
  };

  // Display pagination buttons
  const displayPagination = (products) => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    elements.paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = createPageButton(i, products);
      elements.paginationContainer.appendChild(pageButton);
    }
  };

  // Create a pagination button
  const createPageButton = (pageNumber, products) => {
    const pageButton = document.createElement("button");
    pageButton.textContent = pageNumber;
    pageButton.addEventListener("click", () => {
      currentPage = pageNumber;
      displayProductList(products, currentPage);
    });
    return pageButton;
  };

  // Search for products based on keyword and category
  window.searchProducts = () => {
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCategory = elements.categoryFilter.value;

    const filteredProducts = filterProductsByKeywordAndCategory(keyword, selectedCategory);
    currentPage = 1;
    displayProductList(filteredProducts, currentPage);
    displayPagination(filteredProducts);
  };

  // Filter and sort products based on category, keyword, and criteria
  window.filterByCategory = () => {
    const selectedCategory = elements.categoryFilter.value;
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCriteria = elements.sortCriteria.value;

    let filteredProducts = filterProductsByCategoryAndKeyword(selectedCategory, keyword);
    let sortedProducts = sortProducts(filteredProducts, selectedCriteria);

    currentPage = 1;
    displayProductList(sortedProducts, currentPage);
    displayPagination(sortedProducts);
  };

  // Sort products based on criteria
  window.sortProducts = () => {
    const selectedCriteria = elements.sortCriteria.value;
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCategory = elements.categoryFilter.value;

    let filteredProducts = filterProductsByKeywordAndCategory(keyword, selectedCategory);
    let sortedProducts = sortProducts(filteredProducts, selectedCriteria);

    currentPage = 1;
    displayProductList(sortedProducts, currentPage);
    displayPagination(sortedProducts);
  };

  // Filter products by keyword and category
  const filterProductsByKeywordAndCategory = (keyword, selectedCategory) => {
    return allProducts.filter((product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      product.title.toLowerCase().includes(keyword)
    );
  };

  // Filter products by category and keyword
  const filterProductsByCategoryAndKeyword = (selectedCategory, keyword) => {
    return allProducts.filter((product) =>
      (selectedCategory === "all" ||
        (product.category === selectedCategory &&
          (product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword))))
    );
  };

  // Sort products based on criteria (price)
  const sortProducts = (products, selectedCriteria) => {
    let sortedProducts = [...products];

    if (selectedCriteria === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    return sortedProducts;
  };

  // Initial data fetch and setup
  fetchData();
});
