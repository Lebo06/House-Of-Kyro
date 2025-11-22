// Product Database
const products = [
    {
        id: 1,
        name: "Nike Airforce",
        category: "Nike",
        price: 2000.00,
        salePrice: 1300.00,
        onSale: true,
        colors: ["Black", "White", "Grey"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nike air force.jpg"],
        colorImages: {
            "Black": "images/nike air force.jpg",
            "White": "images/nike-airforce-white.jpg",
            "Grey": "images/nike-airforce-grey.jpg"
        }
    },
    {
        id: 2,
        name: "New Balance 530",
        category: "New-Balance",
        price: 2200.00,
        salePrice: 1580.00,
        onSale: true,
        emoji: "👞",
        colors: ["Black", "White", "Navy"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nb 530.jpg"],
        colorImages: {
            "Black": "images/nb 530.jpg",
            "White": "images/nb-530-white.jpg",
            "Navy": "images/nb-530-navy.jpg"
        }
    },
    {
        id: 3,
        name: "Nike Shox",
        category: "Nike",
        price: 2100.00,
        salePrice: 1500.00,
        onSale: true,
        emoji: "🏀",
        colors: ["Black", "White", "Red"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nike air force shox.jpg"],
        colorImages: {
            "Black": "images/nike air force shox.jpg",
            "White": "images/nike-airforce-shox-white.jpg",
            "Red": "images/nike-airforce-shox-red.jpg"
        }
    },
    {
        id: 4,
        name: "Nike Air Max Plus",
        category: "Nike",
        price: 1899.00,
        onSale: false,
        emoji: "🏃",
        colors: ["Black"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/airmaxPlus.jpg"]
    },
    {
        id: 5,
        name: "Air Jordan 4 Retro",
        category: "Air-Jordan",
        price: 1500.00,
        onSale: false,
        emoji: "👟",
        colors: ["Military Black"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/militaryBlack.jpg"]
    },
    {
        id: 6,
        name: "Nike Shox TL",
        category: "Nike",
        price: 1500.00,
        onSale: false,
        emoji: "⛹️",
        colors: ["Pearl White"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/showTL.jpg"]
    },
    {
        id: 7,
        name: "Adidas Samba",
        category: "Adidas",
        price: 2300.00,
        salePrice: 1600.00,
        onSale: true,
        emoji: "🏃‍♂️",
        colors: ["Black", "White", "Grey"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/samba.jpg"]
    },
    {
        id: 8,
        name: "Air Jordan 1",
        category: "Air-Jordan",
        price: 899.00,
        onSale: false,
        emoji: "👟",
        colors: ["Black", "White", "Pink"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/jordan1.jpg"]
    },
    {
        id: 9,
        name: "Air Jordan 4 [White Thunder]",
        category: "Air-Jordan",
        price: 2000.00,
        salePrice: 1600.00,
        onSale: true,
        emoji: "🏀",
        colors: ["White Thunder"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/whiteThunder.jpg"]
    }
];

// Cart data
let cart = [];

// Load cart from sessionStorage
function loadCart() {
    const savedCart = sessionStorage.getItem('houseOfKryoCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
    }
}

// Save cart to sessionStorage
function saveCart() {
    sessionStorage.setItem('houseOfKryoCart', JSON.stringify(cart));
    updateCartCount();
}

// Helper function to render product image
function renderProductImage(product, size = 'default') {
    if (product.images && product.images.length > 0) {
        return `<img src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return `<span>${product.emoji || '👟'}</span>`;
}

// Helper function to render image carousel for modal
function renderImageCarousel(product) {
    const defaultColor = product.colors[0];
    const defaultImage = product.colorImages && product.colorImages[defaultColor] 
        ? product.colorImages[defaultColor] 
        : (product.images && product.images.length > 0 ? product.images[0] : null);
    
    if (defaultImage) {
        return `<img src="${defaultImage}" alt="${product.name}" id="modal-main-image" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return `<span>${product.emoji || '👟'}</span>`;
}

// Change main image in carousel
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('modal-main-image');
    if (mainImage && imageSrc) {
        mainImage.src = imageSrc;
    }
}

// Change image based on selected color
function changeImageByColor(productId, color) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.colorImages || !product.colorImages[color]) return;
    
    changeMainImage(product.colorImages[color]);
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
                <div class="product-category">${getCategoryDisplay(product.category)}</div>
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

// Helper function to get display name for category
function getCategoryDisplay(category) {
    const categoryMap = {
        'Nike': 'Nike',
        'Adidas': 'Adidas',
        'Air-Jordan': 'Air Jordan',
        'New-Balance': 'New Balance',
        'Puma': 'Puma',
        'Others': 'Others'
    };
    return categoryMap[category] || category;
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
                <div class="product-category">${getCategoryDisplay(product.category)}</div>
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
                    ${renderImageCarousel(product)}
                    ${product.onSale ? '<div class="sale-badge">SALE</div>' : ''}
                </div>
                <div class="modal-details">
                    <div class="product-category">${getCategoryDisplay(product.category)}</div>
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

    setTimeout(() => {
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('size-error').style.display = 'none';
            });
        });

        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('color-error').style.display = 'none';
                
                const selectedColor = this.dataset.color;
                changeImageByColor(productId, selectedColor);
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
            images: product.images,
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
    if (item.images && item.images.length > 0) {
        return `<img src="${item.images[0]}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    return item.emoji || '👟';
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
                <div class="cart-item-category">${getCategoryDisplay(item.category)}</div>
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
    const shipping = 0;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = 'FREE';
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
    const shipping = 0;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');
    
    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = 'FREE';
    if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;
}

// Setup checkout form with Yoco payment integration
function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zipCode').value;
        
        // Load cart
        loadCart();
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            window.location.href = 'cart.html';
            return;
        }
        
        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;
        
        // Prepare line items for Yoco
        const lineItems = cart.map(item => ({
            displayName: `${item.name} - ${item.color} (Size ${item.size})`,
            quantity: item.quantity,
            pricingDetails: {
                price: Math.round(item.price * 100) // Convert to cents
            }
        }));
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        try {
            // Get current URL for redirects
            const baseUrl = window.location.origin;
            
            // Create checkout session with Yoco
            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total,
                    currency: 'ZAR',
                    successUrl: `${baseUrl}/success.html`,
                    cancelUrl: `${baseUrl}/cancel.html`,
                    customerDetails: {
                        name: `${firstName} ${lastName}`,
                        email: email,
                        phone: phone,
                        address: `${address}, ${city}, ${zipCode}`
                    },
                    lineItems: lineItems
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }
            
            const data = await response.json();
            
            // Save checkout ID for verification later
            sessionStorage.setItem('checkoutId', data.id);
            
            // Redirect to Yoco payment page
            window.location.href = data.redirectUrl;
            
        } catch (error) {
            console.error('Error creating checkout:', error);
            alert('There was an error processing your order. Please try again.');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Verify payment and display success
async function verifyPaymentAndDisplaySuccess() {
    const successContent = document.getElementById('success-content');
    if (!successContent) return;
    
    const checkoutId = sessionStorage.getItem('checkoutId');
    
    if (!checkoutId) {
        successContent.innerHTML = `
            <div class="success-icon">⚠️</div>
            <h1>No Payment Found</h1>
            <p>We couldn't find your payment information.</p>
            <a href="index.html" class="btn-primary">Return to Home</a>
        `;
        return;
    }
    
    try {
        // Verify payment with backend
        const response = await fetch(`/.netlify/functions/verify-payment?checkoutId=${checkoutId}`);
        
        if (!response.ok) {
            throw new Error('Failed to verify payment');
        }
        
        const data = await response.json();
        
        console.log('Payment verification data:', data);
        console.log('Payment status:', data.status);
        
        // Yoco might return different status values, check for multiple
        if (data.status === 'successful' || data.status === 'complete' || data.status === 'completed' || data.status === 'paid') {
            // Payment successful - prepare order details
            loadCart();
            const orderItemsHtml = cart.map(item => 
                `${item.name} - Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}`
            ).join('<br>');
            
            const orderItemsText = cart.map(item => 
                `${item.name} - ${item.color} (Size ${item.size}) x${item.quantity} - R${(item.price * item.quantity).toFixed(2)}`
            ).join('\n');
            
            // Send order notification email
            try {
                const orderDate = new Date().toLocaleString('en-ZA', { 
                    timeZone: 'Africa/Johannesburg',
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                await fetch('/.netlify/functions/send-order-notification', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        orderNumber: data.id.substring(0, 8).toUpperCase(),
                        orderDate: orderDate,
                        orderTotal: (data.totalAmount / 100).toFixed(2),
                        customerName: data.metadata?.customerName || 'N/A',
                        customerEmail: data.metadata?.customerEmail || 'N/A',
                        customerPhone: data.metadata?.customerPhone || 'N/A',
                        customerAddress: data.metadata?.customerAddress || 'N/A',
                        orderItems: orderItemsText,
                        checkoutId: data.id
                    })
                });
                console.log('Order notification sent successfully');
            } catch (emailError) {
                console.error('Failed to send order notification:', emailError);
                // Don't fail the whole process if email fails
            }
            
            cart = [];
            saveCart();
            sessionStorage.removeItem('checkoutId');
            
            successContent.innerHTML = `
                <div class="success-icon">✓</div>
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your order has been confirmed.</p>
                <div class="order-details">
                    <h3>Order Details</h3>
                    <div class="detail-row">
                        <span>Order ID:</span>
                        <strong>${data.id.substring(0, 8).toUpperCase()}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Amount Paid:</span>
                        <strong>R${(data.totalAmount / 100).toFixed(2)}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Payment Method:</span>
                        <strong>Card</strong>
                    </div>
                </div>
                <p>A confirmation email has been sent to the store. We'll process your order shortly!</p>
                <a href="index.html" class="btn-primary">Continue Shopping</a>
            `;
        } else {
            throw new Error('Payment not successful');
        }
        
    } catch (error) {
        console.error('Error verifying payment:', error);
        successContent.innerHTML = `
            <div class="success-icon" style="color: #f44336;">⚠️</div>
            <h1>Payment Verification Failed</h1>
            <p>We couldn't verify your payment. Please contact support.</p>
            <a href="index.html" class="btn-primary">Return to Home</a>
        `;
    }
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