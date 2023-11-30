document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productDetails = {
        id: urlParams.get('id'),
        title: decodeURIComponent(urlParams.get('title')),
        price: urlParams.get('price'),
    };

    function displayProductDetails(product) {
        const productDetailsContainer = document.getElementById('productDetails');

        productDetailsContainer.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
        `;
    }
    displayProductDetails(productDetails);
});
