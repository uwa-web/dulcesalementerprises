// ========== CART FUNCTIONALITY ==========
let cart = [];
let cartTotal = 0;

// Add to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
    updateCartCount();
    showNotification('Item added to cart!');
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItems || !cartTotalElement) return;

    cartItems.innerHTML = '';
    cartTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <span>${item.name.substring(0, 10)}...</span>
            </div>
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotalElement.textContent = cartTotal.toLocaleString();
}

// Update quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== id);
        }
        updateCartUI();
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
}

// Show/hide cart
const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cart-overlay')?.classList.add('active');
    });
}

function closeCart() {
    document.getElementById('cart-overlay')?.classList.remove('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    showNotification('Redirecting to checkout...');
    setTimeout(() => {
        alert('Checkout functionality would be integrated with Paystack/Flutterwave here');
    }, 1000);
}

// ========== WISHLIST FUNCTIONALITY ==========
let wishlist = [];

function addToWishlist(id) {
    if (!wishlist.includes(id)) {
        wishlist.push(id);
        showNotification('Added to wishlist!');
    } else {
        showNotification('Already in wishlist!');
    }
}

// ========== NEWSLETTER FUNCTIONALITY ==========
function showNewsletter() {
    document.getElementById('newsletter-popup')?.classList.add('active');
}

function closeNewsletter() {
    document.getElementById('newsletter-popup')?.classList.remove('active');
}

function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification('Thank you for subscribing!');
    closeNewsletter();
}

setTimeout(showNewsletter, 10000);

// ========== NOTIFICATION FUNCTION ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--burnt-orange);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1003;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========== UI BEHAVIOR & EFFECTS ==========

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle')?.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
});

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function () {
        const category = this.dataset.category;
        showNotification(`Browsing ${category} category...`);
        // Logic to filter products goes here
    });
});

// Intersection Observer for animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.category-card, .product-card, .story-text').forEach(el => {
    observer.observe(el);
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay && !cartOverlay.contains(e.target) && !e.target.closest('#cart-btn')) {
        cartOverlay.classList.remove('active');
    }
});

// Close newsletter when clicking outside
document.addEventListener('click', (e) => {
    const newsletterPopup = document.getElementById('newsletter-popup');
    if (e.target === newsletterPopup) {
        closeNewsletter();
    }
});

