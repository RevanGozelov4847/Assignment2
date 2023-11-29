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

  function displayProductList(products, page) {
    const startIdx = (page - 1) * productsPerPage;
    const endIdx = startIdx + productsPerPage;
    const displayedProducts = products.slice(startIdx, endIdx);

    productListContainer.innerHTML = "";

    displayedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.addEventListener("click", () => openProductPage(product));

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
