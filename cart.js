        document.addEventListener('DOMContentLoaded', function () {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartCountElement = document.querySelector('.cart-count');
            const cartItemsContainer = document.querySelector('.cart-items');
            const cartTotalElement = document.querySelector('.cart-total');

            function updateCartDisplay() {
                cartItemsContainer.innerHTML = '';
                let total = 0;
                cart.forEach((item, index) => {
                    total += item.price * item.quantity;
                    const cartItem = document.createElement('li');
                    cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    cartItem.innerHTML = `
                        ${item.title} - π${item.price.toFixed(2)} x ${item.quantity}
                        <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
                cartTotalElement.textContent = total.toFixed(2);
                cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            function addToCart(title, price) {
                const existingItem = cart.find(item => item.title === title);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ title, price: parseFloat(price), quantity: 1 });
                }
                updateCartDisplay();
            }

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const title = this.getAttribute('data-title');
                    const price = this.getAttribute('data-price');
                    addToCart(title, price);
                });
            });

cartItemsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCartDisplay();
    }
});

document.querySelector('.clear-cart').addEventListener('click', function () {
    cart.length = 0;
    updateCartDisplay();
});

// Initialize cart display
updateCartDisplay();
});