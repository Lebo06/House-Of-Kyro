// Product Database
// TO USE IMAGES: Add an "image" property to each product (e.g., image: "product1.jpg")
// Then update the HTML generation to use <img src="images/${product.image}"> instead of emoji
const products = [
    {
        id: 1,
        name: "Nike Airforce",
        category: "running",
        price: 2000.00,
        salePrice: 1300.00,
        onSale: true,
        // emoji: "👟",
        colors: ["Black", "White", "Grey", "Red"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        image: "images/nike air force.jpg"
    },
    {
        id: 2,
        name: "New Balance 530",
        category: "lifestyle",
        price: 2200.00,
        salePrice: 1580.00,
        onSale: true,
        emoji: "👞",
        colors: ["Black", "White", "Navy", "Beige"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        image: "images/nb 530.jpg"
    },
    {
        id: 3,
        name: "Nike Airforce Shox",
        category: "basketball",
        price: 2100.00,
        salePrice: 1500.00,
        onSale: true,
        emoji: "🏀",
        colors: ["Black", "White", "Red", "Blue"],
        sizes: ["7", "8", "9", "10", "11", "12", "13"],
        image: "images/nike air force shox.jpg"
    },
    {
        id: 4,
        name: "CloudStep Runner",
        category: "running",
        price: 149.99,
        onSale: false,
        emoji: "🏃",
        colors: ["Black", "White", "Grey", "Blue"],
        sizes: ["7", "8", "9", "10", "11", "12"]
        // image: "cloudstep-runner.jpg"
    },
    {
        id: 5,
        name: "Neo Classic Low",
        category: "lifestyle",
        price: 129.99,
        onSale: false,
        emoji: "👟",
        colors: ["Black", "White", "Grey"],
        sizes: ["7", "8", "9", "10", "11", "12"]
        // image: "neo-classic-low.jpg"
    },
    {
        id: 6,
        name: "Court Master High",
        category: "basketball",
        price: 179.99,
        onSale: false,
        emoji: "⛹️",
        colors: ["Black", "White", "Red"],
        sizes: ["7", "8", "9", "10", "11", "12", "13"]
        // image: "court-master-high.jpg"
    },
    {
        id: 7,
        name: "Marathon Elite",
        category: "running",
        price: 169.99,
        salePrice: 139.99,
        onSale: true,
        emoji: "🏃‍♂️",
        colors: ["Black", "White", "Grey", "Green"],
        sizes: ["7", "8", "9", "10", "11", "12"]
        // image: "marathon-elite.jpg"
    },
    {
        id: 8,
        name: "Retro Wave Premium",
        category: "lifestyle",
        price: 119.99,
        onSale: false,
        emoji: "👟",
        colors: ["Black", "White", "Pink", "Purple"],
        sizes: ["7", "8", "9", "10", "11", "12"]
        // image: "retro-wave-premium.jpg"
    },
    {
        id: 9,
        name: "Hoop Dreams Pro",
        category: "basketball",
        price: 199.99,
        salePrice: 159.99,
        onSale: true,
        emoji: "🏀",
        colors: ["Black", "White", "Gold", "Red"],
        sizes: ["7", "8", "9", "10", "11", "12", "13"]
        // image: "hoop-dreams-pro.jpg"
    }
];

// Cart data - stored in localStorage for persistence
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('houseOfKryoCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('houseOfKryoCart', JSON.stringify(cart));
    updateCartCount();
}

// Helper function to render product image
function renderProductImage(product, size = 'default') {
    if (product.image) {
        return `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return `<span>${product.emoji}</span>`;
}

// Display sales products on home page
function displaySalesProducts() {
    const salesGrid = document.getElementById('sales-grid');
    if (!salesGrid) return;
    
    const saleProducts = products.filter(p => p.onSale);
    
    salesGrid.innerHTML = saleProducts.map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <div class="product-image">
                ${renderProductImage(product)}
                <div class="sale-badge">SALE</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">R${product.salePrice.toFixed(2)}</span>
                    <span class="price-original">R${product.price.toFixed(2)}</span>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); showProductModal(${product.id})">Select Options</button>
            </div>
        </div>
    `).join('');
}

// Display all products
function displayProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <div class="product-image">
                ${renderProductImage(product)}
                ${product.onSale ? '<div class="sale-badge">SALE</div>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="price-current">R${(product.onSale ? product.salePrice : product.price).toFixed(2)}</span>
                    ${product.onSale ? `<span class="price-original">R${product.price.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); showProductModal(${product.id})">Select Options</button>
            </div>
        </div>
    `).join('');
}

// Show product modal with size and color selection
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    ${renderProductImage(product)}
                    ${product.onSale ? '<div class="sale-badge">SALE</div>' : ''}
                </div>
                <div class="modal-details">
                    <div class="product-category">${product.category}</div>
                    <h2 class="modal-product-name">${product.name}</h2>
                    <div class="modal-price">
                        <span class="price-current">R${(product.onSale ? product.salePrice : product.price).toFixed(2)}</span>
                        ${product.onSale ? `<span class="price-original">R${product.price.toFixed(2)}</span>` : ''}
                    </div>
                    
                    <div class="option-group">
                        <label class="option-label">Select Size:</label>
                        <div class="size-options" id="size-options">
                            ${product.sizes.map(size => `
                                <button class="size-btn" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                        <div class="error-message" id="size-error" style="display: none;">Please select a size</div>
                    </div>

                    <div class="option-group">
                        <label class="option-label">Select Color:</label>
                        <div class="color-options" id="color-options">
                            ${product.colors.map(color => `
                                <button class="color-btn" data-color="${color}">
                                    <span class="color-name">${color}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div class="error-message" id="color-error" style="display: none;">Please select a color</div>
                    </div>

                    <button class="btn-primary btn-block modal-add-cart" onclick="addToCartWithOptions(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add click handlers for size buttons
    setTimeout(() => {
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('size-error').style.display = 'none';
            });
        });

        // Add click handlers for color buttons
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('color-error').style.display = 'none';
            });
        });
    }, 0);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Add product to cart with selected options
function addToCartWithOptions(productId) {
    const selectedSizeBtn = document.querySelector('.size-btn.selected');
    const selectedColorBtn = document.querySelector('.color-btn.selected');
    
    let hasError = false;

    if (!selectedSizeBtn) {
        document.getElementById('size-error').style.display = 'block';
        hasError = true;
    }

    if (!selectedColorBtn) {
        document.getElementById('color-error').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    const selectedSize = selectedSizeBtn.dataset.size;
    const selectedColor = selectedColorBtn.dataset.color;

    loadCart();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if this exact combination already exists in cart
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === selectedSize && 
        item.color === selectedColor
    );
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.onSale ? product.salePrice : product.price,
            emoji: product.emoji,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
        });
    }
    
    saveCart();
    closeModal();
    showNotification(`${product.name} (${selectedColor}, Size ${selectedSize}) added to cart!`);
}

// Setup filter buttons
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayProducts(btn.dataset.filter);
        });
    });
}

// Legacy function for backward compatibility (redirects to modal)
function addToCart(productId) {
    showProductModal(productId);
}

// Update cart count in navbar
function updateCartCount() {
    loadCart();
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Helper function to render cart item image
function renderCartItemImage(item) {
    if (item.image) {
        return `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return item.emoji;
}

// Display cart items
function displayCart() {
    loadCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="products.html" class="btn-primary">Shop Now</a>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        updateCartSummary();
        return;
    }
    
    if (checkoutBtn) checkoutBtn.style.display = 'block';
    
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">${renderCartItemImage(item)}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-options">
                    <span>Size: ${item.size}</span> | <span>Color: ${item.color}</span>
                </div>
                <div class="cart-item-price">R${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantityByIndex(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantityByIndex(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCartByIndex(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update item quantity by index
function updateQuantityByIndex(index, change) {
    loadCart();
    if (index < 0 || index >= cart.length) return;
    
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeFromCartByIndex(index);
        return;
    }
    
    saveCart();
    displayCart();
}

// Remove item from cart by index
function removeFromCartByIndex(index) {
    loadCart();
    if (index < 0 || index >= cart.length) return;
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Update cart summary
function updateCartSummary() {
    loadCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;
}

// Display checkout summary
function displayCheckoutSummary() {
    loadCart();
    const checkoutItems = document.getElementById('checkout-items');
    
    if (!checkoutItems) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-qty">Qty: ${item.quantity} | Size: ${item.size} | Color: ${item.color}</div>
            </div>
            <div class="checkout-item-price">R${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    loadCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');
    
    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;
}

// Setup checkout form
function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate order processing
        alert('Order placed successfully! Thank you for your purchase.');
        
        // Clear cart
        cart = [];
        saveCart();
        
        // Redirect to home
        window.location.href = 'index.html';
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1a1a1a;
        color: white;
        padding: 1rem 2rem;
        border: 2px solid white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
loadCart();