function showProductDetails(productId) {
    const popup = document.getElementById('product-popup');
    // Fetch product details dynamically if needed
    popup.innerHTML = `Details for product ${productId}`;
    popup.style.display = 'block';
}

function hideProductDetails() {
    const popup = document.getElementById('product-popup');
    popup.style.display = 'none';
}
