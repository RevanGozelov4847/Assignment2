document.addEventListener("DOMContentLoaded", function () {
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

    function displayProductDetails(product) {
        document.getElementById('productDetails').innerHTML = `<img src="${product.thumbnail}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>Discount: ${product.discount}%</p>
            <p>Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>`;
    }

    displayProductDetails(productDetails);
});
