document.addEventListener("DOMContentLoaded", function () {
    // Get information about the product from the web address
    const urlParams = new URLSearchParams(window.location.search);
    const productDetails = {
        images: JSON.parse(decodeURIComponent(urlParams.get('images'))) || [],
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
            <h2>${product.title}</h2>
            <div id="firstImageContainer">
                <img src="${product.images[0]}" alt="${product.title}" />
            </div>
            <div id="productGallery"></div>
            <p>Price: $${product.price}</p>
            <p>Discount: ${product.discount}%</p>
            <p>Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>`;
        displayProductGallery(product.images.slice(1)); // Pass the remaining images
    }

    function displayProductGallery(images) {
        const productGalleryContainer = document.getElementById('productGallery');
        productGalleryContainer.innerHTML = '';

        const galleryRow = document.createElement('div');
        galleryRow.classList.add('gallery-row');

        images.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = productDetails.title;
            galleryRow.appendChild(imgElement);
        });

        productGalleryContainer.appendChild(galleryRow);
    }

    // Display the details of the product when the page is loaded
    displayProductDetails(productDetails);
});
