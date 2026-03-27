// ============================================
// HOUSE OF KRYO - ENHANCED JAVASCRIPT
// Professional E-commerce Features
// ============================================

// Product Database with Ratings
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
        },
        rating: 4.8,
        reviewCount: 128,
        popularity: 95
    },
    {
        id: 2,
        name: "New Balance 530",
        category: "New-Balance",
        price: 2200.00,
        salePrice: 1580.00,
        onSale: true,
        colors: ["Black", "White", "Navy"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nb 530.jpg"],
        colorImages: {
            "Black": "images/nb 530.jpg",
            "White": "images/nb-530-white.jpg",
            "Navy": "images/nb-530-navy.jpg"
        },
        rating: 4.6,
        reviewCount: 89,
        popularity: 82
    },
    {
        id: 3,
        name: "Nike Shox",
        category: "Nike",
        price: 2100.00,
        salePrice: 1500.00,
        onSale: true,
        colors: ["Black", "White", "Red"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nike air force shox.jpg"],
        colorImages: {
            "Black": "images/nike air force shox.jpg",
            "White": "images/nike-airforce-shox-white.jpg",
            "Red": "images/nike-airforce-shox-red.jpg"
        },
        rating: 4.7,
        reviewCount: 156,
        popularity: 91
    },
    {
        id: 4,
        name: "Nike Air Max Plus",
        category: "Nike",
        price: 1899.00,
        onSale: false,
        colors: ["Black"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/airmaxPLus.jpg"],
        rating: 4.5,
        reviewCount: 67,
        popularity: 78
    },
    {
        id: 5,
        name: "Air Jordan 4 Retro",
        category: "Air-Jordan",
        price: 1500.00,
        onSale: false,
        colors: ["Military Black"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/militaryBlack.jpg"],
        rating: 4.9,
        reviewCount: 234,
        popularity: 98
    },
    {
        id: 6,
        name: "Nike Shox TL",
        category: "Nike",
        price: 1500.00,
        onSale: false,
        colors: ["Pearl White"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/showTL.jpg"],
        rating: 4.4,
        reviewCount: 45,
        popularity: 65
    },
    {
        id: 7,
        name: "Adidas Samba",
        category: "Adidas",
        price: 2300.00,
        salePrice: 1600.00,
        onSale: true,
        colors: ["Black", "White", "Grey"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/samba.jpg"],
        rating: 4.7,
        reviewCount: 112,
        popularity: 88
    },
    {
        id: 8,
        name: "Air Jordan 1",
        category: "Air-Jordan",
        price: 1350.00,
        onSale: false,
        colors: ["Black", "White", "Pink"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/jordan1.jpg"],
        rating: 4.8,
        reviewCount: 189,
        popularity: 94
    },
    {
        id: 9,
        name: "Air Jordan 4",
        category: "Air-Jordan",
        price: 1550.00,
        colors: ["Wet Cement", "White Thunder"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/wetCement.jpg"],
        colorImages: {
            "Wet Cement": "images/wetCement.jpg",
            "White Thunder": "images/whiteThunder.jpg"
        },
        rating: 4.6,
        reviewCount: 78,
        popularity: 85
    },
    {
        id: 10,
        name: "Adidas Megaride",
        category: "Adidas",
        price: 2500.00,
        salePrice: 1600.00,
        onSale: true,
        colors: ["Black", "White", "Grey"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/adidas.jpg"],
        rating: 4.3,
        reviewCount: 56,
        popularity: 72
    },
    {
        id: 11,
        name: "Jordan 4 Retro SB",
        category: "Air-Jordan",
        price: 2300.00,
        salePrice: 1500.00,
        onSale: true,
        colors: ["Pine Green", "White", "Navy"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/sb pine green.jpg"],
        rating: 4.9,
        reviewCount: 145,
        popularity: 96
    },
    {
        id: 12,
        name: "Nike Air Max TL 2.5",
        category: "Nike",
        price: 2250.00,
        salePrice: 1500.00,
        onSale: true,
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/tl.jpg"],
        rating: 4.5,
        reviewCount: 92,
        popularity: 80
    },
    {
        id: 13,
        name: "New Balance 550",
        category: "New-Balance",
        price: 1899.00,
        onSale: false,
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/nb550.jpg"],
        rating: 4.4,
        reviewCount: 63,
        popularity: 71
    },
    {
        id: 14,
        name: "Adidas Campus",
        category: "Adidas",
        price: 2300.00,
        salePrice: 1600.00,
        onSale: true,
        colors: ["Grey Three", "Green"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/campus1.jpg"],
        colorImages: {
            "Grey Three": "images/campus1.jpg",
            "Green": "images/campus2.jpg"
        },
        rating: 4.6,
        reviewCount: 84,
        popularity: 79
    },
    {
        id: 15,
        name: "Puma Suede XL",
        category: "Puma",
        price: 1500.00,
        colors: ["Red", "Black"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/xl1.jpg"],
        colorImages: {
            "Red": "images/xl1.jpg",
            "Black": "images/xl2.jpg"
        },
        rating: 4.2,
        reviewCount: 38,
        popularity: 58
    },
    {
        id: 16,
        name: "Adidas Samba OG",
        category: "Adidas",
        price: 2100.00,
        onSale: false,
        colors: ["Black", "White"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/samba.jpg"],
        rating: 4.7,
        reviewCount: 201,
        popularity: 92
    },
    {
        id: 17,
        name: "Air Jordan 1 Low",
        category: "Air-Jordan",
        price: 899.00,
        onSale: false,
        colors: ["Black", "White", "Pink"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/jordan1.jpg"],
        rating: 4.5,
        reviewCount: 167,
        popularity: 87
    },
    {
        id: 18,
        name: "Air Jordan 4 [White Thunder]",
        category: "Air-Jordan",
        price: 2000.00,
        salePrice: 1600.00,
        onSale: true,
        colors: ["White Thunder"],
        sizes: ["3", "4", "5", "6", "7", "8", "9", "10"],
        images: ["images/whiteThunder.jpg"],
        rating: 4.8,
        reviewCount: 178,
        popularity: 93
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let cart = [];
let wishlist = [];
let recentlyViewed = [];
let currentFilter = 'all';
let currentSort = 'featured';
let priceRange = { min: 0, max: 5000 };

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadWishlist();
    loadRecentlyViewed();
    initTheme();
    initScrollAnimations();
    initNavbarScroll();
    initSearch();
    initMobileMenu();
    initBackToTop();
    initCountdownTimer();
    initPromoBanner();
});

// ============================================
// CART FUNCTIONS
// ============================================
function loadCart() {
    const savedCart = localStorage.getItem('houseOfKryoCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('houseOfKryoCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        if (totalItems > 0) {
            el.classList.add('has-items');
        } else {
            el.classList.remove('has-items');
        }
    });
}

function addToCart(productId, color, size, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => 
        item.id === productId && item.color === color && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            category: product.category,
            price: product.salePrice || product.price,
            color: color || (product.colors ? product.colors[0] : 'Default'),
            size: size || (product.sizes ? product.sizes[0] : 'One Size'),
            quantity: quantity,
            image: product.images ? product.images[0] : null
        });
    }

    saveCart();
    showToast('Added to Cart', `${product.name} has been added to your cart.`, 'success');
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    displayCart();
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    displayCart();
    showToast('Removed from Cart', `${item.name} has been removed.`, 'warning');
}

// ============================================
// WISHLIST FUNCTIONS
// ============================================
function loadWishlist() {
    const savedWishlist = localStorage.getItem('houseOfKryoWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

function saveWishlist() {
    localStorage.setItem('houseOfKryoWishlist', JSON.stringify(wishlist));
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showToast('Added to Wishlist', `${product.name} saved for later.`, 'success');
    } else {
        wishlist.splice(index, 1);
        showToast('Removed from Wishlist', `${product.name} removed.`, 'warning');
    }
    
    saveWishlist();
    updateWishlistButtons();
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (isInWishlist(productId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================
// RECENTLY VIEWED
// ============================================
function loadRecentlyViewed() {
    const saved = localStorage.getItem('houseOfKryoRecentlyViewed');
    if (saved) {
        recentlyViewed = JSON.parse(saved);
    }
}

function saveRecentlyViewed() {
    localStorage.setItem('houseOfKryoRecentlyViewed', JSON.stringify(recentlyViewed));
}

function addToRecentlyViewed(productId) {
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    if (recentlyViewed.length > 8) {
        recentlyViewed = recentlyViewed.slice(0, 8);
    }
    saveRecentlyViewed();
}

// ============================================
// PRODUCT DISPLAY FUNCTIONS
// ============================================
function displaySalesProducts() {
    const salesGrid = document.getElementById('sales-grid');
    if (!salesGrid) return;

    const salesProducts = products.filter(p => p.onSale).slice(0, 4);
    
    salesGrid.innerHTML = salesProducts.map((product, index) => 
        createProductCard(product, index)
    ).join('');
    
    updateWishlistButtons();
}

function displayProducts(filter = 'all', sort = 'featured') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    let filteredProducts = filter === 'all' 
        ? [...products]
        : products.filter(p => p.category === filter);

    // Apply price filter
    filteredProducts = filteredProducts.filter(p => {
        const price = p.salePrice || p.price;
        return price >= priceRange.min && price <= priceRange.max;
    });

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, sort);

    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
    }

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map((product, index) => 
        createProductCard(product, index)
    ).join('');
    
    updateWishlistButtons();
}

function createProductCard(product, index) {
    const discount = product.onSale && product.salePrice 
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    return `
        <div class="product-card reveal stagger-${(index % 5) + 1}" onclick="openModal(${product.id})">
            <div class="product-image-wrapper">
                ${product.images ? 
                    `<img src="${product.images[0]}" alt="${product.name}" class="product-image">` : 
                    `<div class="product-image" style="display:flex;align-items:center;justify-content:center;font-size:4rem;">👟</div>`
                }
                <div class="image-zoom-overlay">
                    <span class="zoom-icon">🔍</span>
                </div>
                ${product.onSale ? `<div class="sale-badge">-${discount}%</div>` : ''}
                <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" 
                        data-product-id="${product.id}"
                        onclick="event.stopPropagation(); toggleWishlist(${product.id})"
                        title="Add to Wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <button class="quick-view-btn" onclick="event.stopPropagation(); openModal(${product.id})">
                    Quick View
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    <span class="price-current">R${(product.salePrice || product.price).toFixed(2)}</span>
                    ${product.salePrice ? `<span class="price-original">R${product.price.toFixed(2)}</span>` : ''}
                    ${discount > 0 ? `<span class="price-discount">Save ${discount}%</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<span class="star">★</span>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star empty">★</span>';
        }
    }
    return stars;
}

function sortProducts(products, sortType) {
    const sorted = [...products];
    switch (sortType) {
        case 'price-low':
            return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        case 'price-high':
            return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'popularity':
            return sorted.sort((a, b) => b.popularity - a.popularity);
        default:
            return sorted;
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToRecentlyViewed(productId);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">×</button>
            <div class="modal-body">
                <div class="modal-image-section">
                    <div class="modal-image" id="modal-main-image">
                        ${product.images ? 
                            `<img src="${product.images[0]}" alt="${product.name}">` : 
                            `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:6rem;">👟</div>`
                        }
                        ${product.onSale ? '<div class="sale-badge">SALE</div>' : ''}
                    </div>
                    ${product.colorImages ? `
                        <div class="thumbnail-gallery">
                            ${Object.entries(product.colorImages).map(([color, image]) => `
                                <div class="thumbnail" onclick="changeModalImage('${image}', ${productId})">
                                    <img src="${image}" alt="${color}">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-details">
                    <div class="product-category">${product.category}</div>
                    <h2 class="modal-product-name">${product.name}</h2>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span class="rating-count">${product.rating} (${product.reviewCount} reviews)</span>
                    </div>
                    <div class="modal-price">
                        <span class="price-current">R${(product.salePrice || product.price).toFixed(2)}</span>
                        ${product.salePrice ? `<span class="price-original">R${product.price.toFixed(2)}</span>` : ''}
                    </div>
                    
                    ${product.colors && product.colors.length > 0 ? `
                    <div class="option-group">
                        <label class="option-label">Color</label>
                        <div class="color-options">
                            ${product.colors.map((color, index) => `
                                <button class="color-btn ${index === 0 ? 'selected' : ''}" 
                                        data-color="${color}"
                                        data-image="${product.colorImages && product.colorImages[color] ? product.colorImages[color] : (product.images ? product.images[0] : '')}"
                                        onclick="selectColor(this)">
                                    <span class="color-dot" style="background: ${getColorCode(color)}"></span>
                                    <span class="color-name">${color}</span>
                                </button>
                            `).join('')}
                        </div>
                        <div class="error-message" id="color-error" style="display: none;">Please select a color</div>
                    </div>
                    ` : ''}
                    
                    ${product.sizes && product.sizes.length > 0 ? `
                    <div class="option-group">
                        <label class="option-label">Size 
                            <button class="size-guide-link" onclick="showSizeGuide()">Size Guide</button>
                        </label>
                        <div class="size-options">
                            ${product.sizes.map((size, index) => `
                                <button class="size-btn ${index === 0 ? 'selected' : ''}" data-size="${size}" onclick="selectSize(this)">${size}</button>
                            `).join('')}
                        </div>
                        <div class="error-message" id="size-error" style="display: none;">Please select a size</div>
                    </div>
                    ` : ''}

                    <div class="share-buttons">
                        <span style="font-size: 0.85rem; color: var(--mid-grey);">Share:</span>
                        <button class="share-btn" onclick="shareProduct('facebook', ${productId})" title="Share on Facebook">
                            📘
                        </button>
                        <button class="share-btn" onclick="shareProduct('twitter', ${productId})" title="Share on Twitter">
                            🐦
                        </button>
                        <button class="share-btn" onclick="shareProduct('whatsapp', ${productId})" title="Share on WhatsApp">
                            💬
                        </button>
                        <button class="share-btn" onclick="copyProductLink(${productId})" title="Copy Link">
                            📋
                        </button>
                    </div>
                    
                    <button class="btn-primary btn-block modal-add-cart" onclick="addToCartFromModal(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function changeModalImage(imageUrl, productId) {
    const modalImage = document.getElementById('modal-main-image');
    const product = products.find(p => p.id === productId);
    
    if (modalImage && product) {
        modalImage.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}">
            ${product.onSale ? '<div class="sale-badge">SALE</div>' : ''}
        `;
    }
}

function getColorCode(color) {
    const colorMap = {
        'Black': '#1a1a1a',
        'White': '#ffffff',
        'Grey': '#808080',
        'Red': '#dc2626',
        'Blue': '#2563eb',
        'Navy': '#1e3a5f',
        'Green': '#16a34a',
        'Pink': '#ec4899',
        'Yellow': '#facc15',
        'Orange': '#f97316',
        'Purple': '#9333ea',
        'Brown': '#92400e'
    };
    return colorMap[color] || '#cccccc';
}

function selectColor(btn) {
    const colorBtns = btn.parentElement.querySelectorAll('.color-btn');
    colorBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    const imageUrl = btn.dataset.image;
    if (imageUrl) {
        const modalImage = document.getElementById('modal-main-image');
        if (modalImage) {
            const img = modalImage.querySelector('img');
            if (img) img.src = imageUrl;
        }
    }
    
    const errorEl = document.getElementById('color-error');
    if (errorEl) errorEl.style.display = 'none';
}

function selectSize(btn) {
    const sizeBtns = btn.parentElement.querySelectorAll('.size-btn');
    sizeBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    const errorEl = document.getElementById('size-error');
    if (errorEl) errorEl.style.display = 'none';
}

function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    const selectedColorBtn = document.querySelector('.color-btn.selected');
    const selectedSizeBtn = document.querySelector('.size-btn.selected');
    
    let hasError = false;
    
    if (product.colors && product.colors.length > 0 && !selectedColorBtn) {
        const errorEl = document.getElementById('color-error');
        if (errorEl) errorEl.style.display = 'block';
        hasError = true;
    }
    
    if (product.sizes && product.sizes.length > 0 && !selectedSizeBtn) {
        const errorEl = document.getElementById('size-error');
        if (errorEl) errorEl.style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    const color = selectedColorBtn ? selectedColorBtn.dataset.color : (product.colors ? product.colors[0] : 'Default');
    const size = selectedSizeBtn ? selectedSizeBtn.dataset.size : (product.sizes ? product.sizes[0] : 'One Size');
    
    addToCart(productId, color, size);
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function showSizeGuide() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content size-guide-modal">
            <button class="modal-close" onclick="closeModal()">×</button>
            <div style="padding: 2rem;">
                <h2 style="margin-bottom: 1rem; text-transform: uppercase;">Size Guide</h2>
                <p style="color: var(--mid-grey); margin-bottom: 1.5rem;">Find your perfect fit with our size chart</p>
                <table class="size-guide-table">
                    <thead>
                        <tr>
                            <th>US Size</th>
                            <th>UK Size</th>
                            <th>EU Size</th>
                            <th>Foot Length (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>3</td><td>2.5</td><td>35</td><td>22</td></tr>
                        <tr><td>4</td><td>3.5</td><td>36</td><td>23</td></tr>
                        <tr><td>5</td><td>4.5</td><td>37</td><td>24</td></tr>
                        <tr><td>6</td><td>5.5</td><td>38</td><td>25</td></tr>
                        <tr><td>7</td><td>6.5</td><td>39</td><td>25.5</td></tr>
                        <tr><td>8</td><td>7.5</td><td>40</td><td>26</td></tr>
                        <tr><td>9</td><td>8.5</td><td>41</td><td>27</td></tr>
                        <tr><td>10</td><td>9.5</td><td>42</td><td>28</td></tr>
                    </tbody>
                </table>
                <p style="color: var(--mid-grey); font-size: 0.9rem; margin-top: 1rem;">
                    💡 Tip: Measure your foot from heel to toe and add 0.5cm for comfort.
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// SHARE FUNCTIONS
// ============================================
function shareProduct(platform, productId) {
    const product = products.find(p => p.id === productId);
    const url = `${window.location.origin}/products.html?id=${productId}`;
    const text = `Check out the ${product.name} at House of Kryo!`;
    
    let shareUrl = '';
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyProductLink(productId) {
    const url = `${window.location.origin}/products.html?id=${productId}`;
    navigator.clipboard.writeText(url).then(() => {
        showToast('Link Copied', 'Product link copied to clipboard!', 'success');
    });
}

// ============================================
// CART DISPLAY
// ============================================
function displayCart() {
    loadCart();
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn-primary">Start Shopping</a>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }
    
    if (checkoutBtn) checkoutBtn.style.display = 'block';
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<span>👟</span>`}
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-category">${item.category}</div>
                <div class="cart-item-options">Size: ${item.size} | Color: ${item.color}</div>
                <div class="cart-item-price">R${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shipping;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;
}

// ============================================
// CHECKOUT FUNCTIONS
// ============================================
function displayCheckoutSummary() {
    loadCart();
    
    const checkoutItems = document.getElementById('checkout-items');
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-qty">${item.color} | Size ${item.size} | Qty: ${item.quantity}</div>
            </div>
            <div class="checkout-item-price">R${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 2000 ? 0 : 150;
    const total = subtotal + shipping;
    
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutShipping = document.getElementById('checkout-shipping');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `R${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `R${total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zipCode').value;
        
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 2000 ? 0 : 150;
        const total = subtotal + shipping;

        try {
            const baseUrl = window.location.origin;
            const basePath = window.location.pathname.replace(/\/[^\/]*$/, '/');
            const checkoutUrl = basePath + 'create-checkout.php';

            console.log('Fetching:', checkoutUrl, 'amount:', total);

            const resp = await fetch(checkoutUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: total,
                    currency: 'ZAR',
                    successUrl: baseUrl + basePath + 'success.html',
                    cancelUrl:  baseUrl + basePath + 'cancel.html',
                    customerDetails: {
                        name:    firstName + ' ' + lastName,
                        email:   email,
                        phone:   phone,
                        address: address + ', ' + city + ', ' + zipCode
                    }
                })
            });

            const rawText = await resp.text();
            console.log('Raw server response:', rawText);

            let data;
            try {
                data = JSON.parse(rawText);
            } catch(e) {
                throw new Error('Unexpected server response: ' + rawText.substring(0, 300));
            }

            if (data.error) throw new Error(data.error);
            if (!data.redirectUrl) throw new Error('No redirect URL from Yoco: ' + JSON.stringify(data));

            sessionStorage.setItem('checkoutId', data.id);
            window.location.href = data.redirectUrl;

        } catch (error) {
            console.error('Checkout error:', error.message);
            showToast('Payment Error', error.message, 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// FILTER & SORT FUNCTIONS
// ============================================
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayProducts(currentFilter, currentSort);
        });
    });

    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            displayProducts(currentFilter, currentSort);
        });
    }

    // Price range
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    if (minPriceInput && maxPriceInput) {
        minPriceInput.addEventListener('change', updatePriceRange);
        maxPriceInput.addEventListener('change', updatePriceRange);
    }
}

function updatePriceRange() {
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    priceRange.min = parseInt(minPrice.value) || 0;
    priceRange.max = parseInt(maxPrice.value) || 5000;
    
    displayProducts(currentFilter, currentSort);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        debounceTimer = setTimeout(() => performSearch(query), 300);
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            searchResults.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('active');
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    const lowerQuery = query.toLowerCase();
    
    const results = products.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <p>No products found for "${query}"</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.slice(0, 5).map(product => `
            <div class="search-result-item" onclick="openModal(${product.id}); document.getElementById('search-results').classList.remove('active');">
                <div class="search-result-image">
                    ${product.images ? `<img src="${product.images[0]}" alt="${product.name}">` : '<span>👟</span>'}
                </div>
                <div class="search-result-info">
                    <div class="search-result-name">${product.name}</div>
                    <div class="search-result-price">R${(product.salePrice || product.price).toFixed(2)}</div>
                </div>
            </div>
        `).join('');
        
        if (results.length > 5) {
            searchResults.innerHTML += `
                <div class="search-result-item" style="justify-content: center; color: var(--mid-grey);" onclick="window.location.href='products.html?search=${encodeURIComponent(query)}'">
                    View all ${results.length} results →
                </div>
            `;
        }
    }
    
    searchResults.classList.add('active');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(title, message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    const savedTheme = localStorage.getItem('houseOfKryoTheme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('houseOfKryoTheme', newTheme);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// NAVBAR SCROLL
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdownTimer() {
    const timerEl = document.getElementById('countdown-timer');
    if (!timerEl) return;

    // Set end time to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            timerEl.innerHTML = '<span class="countdown-item">00</span>:<span class="countdown-item">00</span>:<span class="countdown-item">00</span>:<span class="countdown-item">00</span>';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerEl.innerHTML = `
            <span class="countdown-item">${String(hours).padStart(2, '0')}</span>:
            <span class="countdown-item">${String(minutes).padStart(2, '0')}</span>:
            <span class="countdown-item">${String(seconds).padStart(2, '0')}</span>
        `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// PROMO BANNER
// ============================================
function initPromoBanner() {
    const banner = document.querySelector('.promo-banner');
    const closeBtn = document.querySelector('.promo-banner-close');
    
    if (!banner || !closeBtn) return;

    // Check if user closed banner before
    if (localStorage.getItem('promoBannerClosed')) {
        banner.style.display = 'none';
        return;
    }

    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
        localStorage.setItem('promoBannerClosed', 'true');
    });
}

// ============================================
// CART PREVIEW
// ============================================
function toggleCartPreview() {
    const preview = document.getElementById('cart-preview');
    if (preview) {
        preview.classList.toggle('active');
    }
}

// ============================================
// NEWSLETTER
// ============================================
function setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        showToast('Subscribed!', 'Thank you for subscribing to our newsletter.', 'success');
        form.reset();
    });
}

// ============================================
// PAYMENT VERIFICATION
// ============================================
async function verifyPaymentAndDisplaySuccess() {
    const successContent = document.getElementById('success-content');
    if (!successContent) return;

    const checkoutId = sessionStorage.getItem('checkoutId');

    if (!checkoutId) {
        successContent.innerHTML = `
            <div style="width:100px;height:100px;background:#f59e0b;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 2rem;font-size:3rem;color:white;">⚠</div>
            <h1 style="font-size:2.5rem;margin-bottom:1rem;color:var(--primary);">No Payment Found</h1>
            <p style="color:var(--mid-grey);margin-bottom:2rem;">We couldn't find your payment information. Please try again.</p>
            <a href="index.html" class="btn-primary">Return to Home</a>
        `;
        return;
    }

    try {
        const response = await fetch('/verify-payment.php?checkoutId=' + checkoutId);

        if (!response.ok) throw new Error('Failed to verify payment');

        const data = await response.json();
        console.log('Payment verification data:', data);

        if (data.status === 'successful' || data.status === 'complete' || data.status === 'completed' || data.status === 'paid') {
            loadCart();
            cart = [];
            saveCart();
            sessionStorage.removeItem('checkoutId');

            successContent.innerHTML = `
                <div style="width:100px;height:100px;background:#22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 2rem;font-size:3rem;color:white;animation:scaleIn 0.5s ease;">✓</div>
                <h1 style="font-size:2.5rem;margin-bottom:1rem;color:var(--primary);">Payment Successful!</h1>
                <p style="color:var(--mid-grey);margin-bottom:2rem;font-size:1.1rem;">Thank you for your purchase. Your order has been confirmed and is being processed.</p>
                <div style="background:var(--light-grey);padding:2rem;border-radius:16px;margin-bottom:2rem;text-align:left;">
                    <p style="font-weight:600;margin-bottom:1rem;color:var(--primary);">Order Details</p>
                    <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border);">
                        <span style="color:var(--mid-grey);">Order ID:</span>
                        <strong>${data.id ? data.id.substring(0, 8).toUpperCase() : 'N/A'}</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border);">
                        <span style="color:var(--mid-grey);">Amount Paid:</span>
                        <strong>R${data.totalAmount ? (data.totalAmount / 100).toFixed(2) : '0.00'}</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;padding:0.5rem 0;">
                        <span style="color:var(--mid-grey);">Payment Method:</span>
                        <strong>Card</strong>
                    </div>
                </div>
                <p style="color:var(--mid-grey);margin-bottom:2rem;">Order confirmation has been sent to your email.</p>
                <a href="index.html" class="btn-primary">Continue Shopping</a>
            `;
        } else {
            throw new Error('Payment status: ' + (data.status || 'unknown'));
        }

    } catch (error) {
        console.error('Error verifying payment:', error);
        successContent.innerHTML = `
            <div style="width:100px;height:100px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 2rem;font-size:3rem;color:white;">⚠</div>
            <h1 style="font-size:2.5rem;margin-bottom:1rem;color:var(--primary);">Verification Failed</h1>
            <p style="color:var(--mid-grey);margin-bottom:2rem;">We couldn't verify your payment. Please contact support with your order reference.</p>
            <a href="index.html" class="btn-primary">Return to Home</a>
        `;
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
