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
        const productDetailsContainer = document.getElementById('productDetails');
    }
        displayProductDetails(productDetails);

});