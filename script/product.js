document.addEventListener("DOMContentLoaded", function () {
    // Get information about the product from the web address
    const urlParams = new URLSearchParams(window.location.search);
    const productDetails = {
        id: urlParams.get('id'),
        title: decodeURIComponent(urlParams.get('title')),
        price: urlParams.get('price'),
        discount: urlParams.get('discount'),
        category: decodeURIComponent(urlParams.get('category')),
        stock: urlParams.get('stock'),
        thumbnail: decodeURIComponent(urlParams.get('thumbnail')),
    };

    // Show the product details on the page
    function displayProductDetails(product) {
        const productDetailsContainer = document.getElementById('productDetails');
        productDetailsContainer.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>Discount: ${product.discount}%</p>
            <p>Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>`;
    }

    // Display the details of the product when the page is loaded
    displayProductDetails(productDetails);
});
