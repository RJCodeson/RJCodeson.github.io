document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = [];
    
    // Get DOM elements
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Debug: Check if elements exist
    if (!cartCount || !cartItems || !cartTotal || !checkoutBtn) {
        console.error('Missing elements:', 
            !cartCount ? 'cartCount ' : '',
            !cartItems ? 'cartItems ' : '',
            !cartTotal ? 'cartTotal ' : '',
            !checkoutBtn ? 'checkoutBtn' : ''
        );
        return;
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Check if item exists in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        // Update count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update items list
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-muted">Your cart is empty</p>';
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div>
                        <h6>${item.name}</h6>
                        <small>$${item.price.toFixed(2)} × ${item.quantity}</small>
                    </div>
                    <div>
                        <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                        <span class="remove-item ms-2" style="cursor:pointer;color:red;">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                </div>
            `).join('');

            // Add remove event listeners
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.closest('.cart-item').getAttribute('data-id');
                    cart = cart.filter(item => item.id !== itemId);
                    updateCart();
                });
            });
            
            checkoutBtn.disabled = false;
        }
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Initial cart update
    updateCart();
});