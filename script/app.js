document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    productListContainer: document.getElementById("productList"),
    paginationContainer: document.getElementById("pagination"),
    searchInput: document.getElementById("searchInput"),
    categoryFilter: document.getElementById("categoryFilter"),
    sortCriteria: document.getElementById("sortCriteria"),
  };

  let allProducts = [], currentPage = 1, productsPerPage = 10;

  fetch("https://dummyjson.com/products")
    .then(response => response.ok ? response.json() : Promise.reject("Network response was not ok"))
    .then(data => {
      allProducts = data.products;
      populateCategoryFilter(allProducts);
      displayProductList(allProducts, currentPage);
      displayPagination(allProducts);
    })
    .catch(error => console.error("Fetch operation problem:", error));

  function populateCategoryFilter(products) {
    const categories = [...new Set(products.map(product => product.category))];
    elements.categoryFilter.innerHTML += categories.map(category => `<option value="${category}">${category}</option>`).join("");
  }

  function displayProductList(products, page) {
    const startIdx = (page - 1) * productsPerPage, endIdx = startIdx + productsPerPage;
    const displayedProducts = products.slice(startIdx, endIdx);
    elements.productListContainer.innerHTML = "";
    
    displayedProducts.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.addEventListener("click", () => openProductPage(product));

      productCard.innerHTML = `<img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p>Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>`;
      
      elements.productListContainer.appendChild(productCard);
    });
  }

  function openProductPage(product) {
    const productPageURL = `product.html?id=${product.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&discount=${product.discountPercentage}&category=${encodeURIComponent(product.category)}&stock=${product.stock}&thumbnail=${encodeURIComponent(product.thumbnail)}`;
    window.location.href = productPageURL;
  }

  function displayPagination(products) {
    const totalPages = Math.ceil(products.length / productsPerPage);
    elements.paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        displayProductList(products, currentPage);
      });
      elements.paginationContainer.appendChild(pageButton);
    }
  }

  window.searchProducts = function () {
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCategory = elements.categoryFilter.value;
  
    const filteredProducts = allProducts.filter(product =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(keyword))
    );
  
    currentPage = 1;
    displayProductList(filteredProducts, currentPage);
    displayPagination(filteredProducts);
  };
  
  

  window.filterByCategory = function () {
    const selectedCategory = elements.categoryFilter.value;
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCriteria = elements.sortCriteria.value;
  
    let filteredProducts;
    if (selectedCategory === "all") {
      filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );
    } else {
      filteredProducts = allProducts.filter(product =>
        product.category === selectedCategory &&
        (product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword))
      );
    }
  
    let sortedProducts = [...filteredProducts];
    
    if (selectedCriteria === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
  
    currentPage = 1;
    displayProductList(sortedProducts, currentPage);
    displayPagination(sortedProducts);
  };
  

  window.sortProducts = function () {
    const selectedCriteria = elements.sortCriteria.value;
    const keyword = elements.searchInput.value.toLowerCase();
    const selectedCategory = elements.categoryFilter.value;
  
    let filteredProducts = allProducts.filter(product =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(keyword) || 
       product.description.toLowerCase().includes(keyword) || 
       product.category.toLowerCase().includes(keyword))
    );
  
    let sortedProducts = [...filteredProducts];
  
    if (selectedCriteria === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
  
    currentPage = 1;
    displayProductList(sortedProducts, currentPage);
    displayPagination(sortedProducts);
  };
  
});
