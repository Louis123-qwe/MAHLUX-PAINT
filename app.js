// ============================================
// MAHLUX PAINT — E-Commerce App JS
// Supabase backend + WhatsApp checkout
// ============================================

// ── SUPABASE CONFIG ──
// Replace with your actual Supabase credentials
const SUPABASE_URL = 'https://jkidnovexonsuxantytf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DnLde50UgpykRaRyc1EBdA_7FbpyCVJ';

// WhatsApp number for orders
const WHATSAPP_NUMBER = '2348105341168';

// ── PRODUCT CATALOGUE ──
// Products are loaded from Supabase. Below is the default catalogue
// used before Supabase is connected or as fallback.
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Emulsion Paint",
        category: "paint",
        price: 12500,
        unit: "per 4L bucket",
        description: "Premium quality emulsion paint ideal for interior walls and ceilings. Provides a smooth, washable finish with excellent coverage. Available in hundreds of colours.",
        emoji: "🪣",
        badge: "Best Seller",
        stock: "instock",
        specs: { finish: "Matt", coverage: "40-50 m²/4L", drying: "1-2 hours", coats: "2 recommended" }
    },
    {
        id: 2,
        name: "Matte Paint",
        category: "paint",
        price: 11000,
        unit: "per 4L bucket",
        description: "Ultra-flat matte finish for a sophisticated, modern look. Perfect for feature walls and designer interiors. Hides surface imperfections beautifully.",
        emoji: "🎨",
        badge: "Premium",
        stock: "instock",
        specs: { finish: "Matte", coverage: "45-55 m²/4L", drying: "1 hour", coats: "2 recommended" }
    },
    {
        id: 3,
        name: "Silk Paint",
        category: "paint",
        price: 13500,
        unit: "per 4L bucket",
        description: "Luxurious silk finish that reflects light beautifully. Easy to clean and maintain — perfect for high-traffic areas like hallways, kitchens and bathrooms.",
        emoji: "✨",
        badge: "Popular",
        stock: "instock",
        specs: { finish: "Silk", coverage: "35-45 m²/4L", drying: "2 hours", coats: "2-3 recommended" }
    },
    {
        id: 4,
        name: "Texcoat Paint",
        category: "paint",
        price: 18000,
        unit: "per 5L bucket",
        description: "Heavy-duty textured coating for exterior walls. Provides exceptional weather resistance, crack-bridging properties and a distinctive textured finish.",
        emoji: "🏗️",
        badge: "Exterior",
        stock: "instock",
        specs: { finish: "Textured", coverage: "4-8 m²/5L", drying: "4-6 hours", coats: "1-2 recommended" }
    },
    {
        id: 5,
        name: "Screeding Paint",
        category: "finishing",
        price: 9500,
        unit: "per 4L bucket",
        description: "Specialist paint designed for screeded floors and surfaces. Provides a hard-wearing, dust-free finish suitable for garages, workshops and utility areas.",
        emoji: "🧱",
        badge: "Industrial",
        stock: "instock",
        specs: { finish: "Hard Matt", coverage: "30-40 m²/4L", drying: "6-8 hours", coats: "2 recommended" }
    },
    {
        id: 6,
        name: "Screeding Putty",
        category: "finishing",
        price: 7500,
        unit: "per 5kg bag",
        description: "Professional-grade wall putty for perfect surface preparation. Fills cracks, levels surfaces and ensures optimal paint adhesion for a flawless finish.",
        emoji: "🪨",
        badge: null,
        stock: "instock",
        specs: { coverage: "15-20 m²/5kg", drying: "24 hours", use: "Interior/Exterior", mix: "With water" }
    },
    {
        id: 7,
        name: "3D Interior Design",
        category: "service",
        price: 25000,
        unit: "per room",
        description: "See your space transformed before painting begins. Full 3D visualisation of your room with colour options, furniture placement and lighting — delivered digitally.",
        emoji: "🎭",
        badge: "Most Popular",
        stock: "instock",
        specs: { delivery: "3-5 days", revisions: "3 rounds", format: "Digital", includes: "Colour palette" }
    },
    {
        id: 8,
        name: "Interior House Painting",
        category: "service",
        price: 35000,
        unit: "per room",
        description: "Full interior painting service including surface preparation, priming and two coats of your chosen paint. Neat, professional finish with minimal disruption.",
        emoji: "🏠",
        badge: "Full Service",
        stock: "instock",
        specs: { preparation: "Included", coats: "2 coats", cleanup: "Included", warranty: "6 months" }
    },
    {
        id: 9,
        name: "Exterior House Painting",
        category: "service",
        price: 55000,
        unit: "per storey",
        description: "Complete exterior painting service for residential properties. Weather-resistant paints applied with professional equipment for lasting protection and curb appeal.",
        emoji: "🏡",
        badge: null,
        stock: "instock",
        specs: { preparation: "Included", coats: "2-3 coats", paint: "Weather resistant", warranty: "12 months" }
    },
    {
        id: 10,
        name: "Wallpaper Installation",
        category: "service",
        price: 20000,
        unit: "per room",
        description: "Professional wallpaper and decorative panel installation. Wide selection of designs available. We handle measuring, cutting and precise installation.",
        emoji: "🪟",
        badge: null,
        stock: "lowstock",
        specs: { measurement: "Included", adhesive: "Included", designs: "200+ options", warranty: "3 months" }
    },
    {
        id: 11,
        name: "Faux & Decorative Painting",
        category: "service",
        price: 45000,
        unit: "per room",
        description: "Transform ordinary walls into artistic masterpieces. Marble effects, venetian plaster, geometric patterns and custom artistic finishes for truly unique interiors.",
        emoji: "🎨",
        badge: "Premium",
        stock: "instock",
        specs: { techniques: "10+ styles", consultation: "Included", timeline: "2-3 days", finish: "Custom" }
    },
    {
        id: 12,
        name: "Colour Consultation",
        category: "service",
        price: 8000,
        unit: "per session",
        description: "Expert colour consultation to help you choose the perfect palette for every room. Our specialists consider lighting, furnishings and your personal style.",
        emoji: "🎯",
        badge: null,
        stock: "instock",
        specs: { duration: "1-2 hours", swatches: "Provided", recommendations: "Full report", followup: "Included" }
    },
];

// ── STATE ──
let products  = [...DEFAULT_PRODUCTS];
let cart      = JSON.parse(localStorage.getItem('mahlux_cart') || '[]');
let activeFilter = 'all';

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
    initNavScroll();
    tryLoadFromSupabase();
});

// ── NAV ──
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 60) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
}

window.toggleMenu = () => {
    const links = document.getElementById('nav-links');
    const burger = document.getElementById('hamburger');
    links.classList.toggle('open');
    burger.classList.toggle('open');
};

// ── SUPABASE LOADER ──
async function tryLoadFromSupabase() {
    if (SUPABASE_URL === 'https://YOUR_PROJECT.supabase.co') return; // not configured yet
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=created_at.desc`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                products = data;
                renderProducts(products);
            }
        }
    } catch(e) {
        console.log('Using default catalogue — Supabase not configured yet');
    }
}

// ── RENDER PRODUCTS ──
function renderProducts(items) {
    const grid = document.getElementById('prod-grid');
    if (!items.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted);">No products found.</div>`;
        return;
    }
    grid.innerHTML = items.map(p => `
        <div class="prod-card" data-category="${p.category}">
            <div class="pc-img-wrap">
                ${p.image
                    ? `<img class="pc-img" src="${p.image}" alt="${p.name}" loading="lazy">`
                    : `<div class="pc-emoji">${p.emoji || '🎨'}</div>`
                }
                ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ''}
                <span class="pc-stock ${p.stock}">${p.stock === 'instock' ? 'In Stock' : 'Low Stock'}</span>
            </div>
            <div class="pc-body">
                <div class="pc-cat">${getCatLabel(p.category)}</div>
                <h3 class="pc-name">${p.name}</h3>
                <p class="pc-desc">${p.description}</p>
                <div class="pc-price-row">
                    <span class="pc-price">₦${Number(p.price).toLocaleString()}</span>
                    <span class="pc-unit">${p.unit}</span>
                </div>
                <div class="pc-actions">
                    <button class="btn-add-cart" onclick="addToCart(${p.id})">Add to Cart</button>
                    <button class="btn-view-detail" onclick="openProdModal(${p.id})">Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCatLabel(cat) {
    const map = { paint:'🎨 Paint', service:'🔧 Service', finishing:'🧱 Finishing' };
    return map[cat] || cat;
}

// ── FILTER ──
window.filterProducts = (cat, btn) => {
    activeFilter = cat;
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('prod-search').value = '';
    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    renderProducts(filtered);
};

// ── SEARCH ──
window.searchProducts = (q) => {
    const query = q.toLowerCase();
    const filtered = products.filter(p =>
        (activeFilter === 'all' || p.category === activeFilter) &&
        (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
    );
    renderProducts(filtered);
};

// ── PRODUCT MODAL ──
window.openProdModal = (id) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const specs = p.specs || {};
    document.getElementById('prod-modal-content').innerHTML = `
        ${p.image
            ? `<img class="pm-img" src="${p.image}" alt="${p.name}">`
            : `<div class="pm-img-placeholder">${p.emoji || '🎨'}</div>`
        }
        <div class="pm-body">
            <div class="pm-cat">${getCatLabel(p.category)}</div>
            <h2 class="pm-name">${p.name}</h2>
            <div class="pm-price-row">
                <span class="pm-price">₦${Number(p.price).toLocaleString()}</span>
                <span class="pm-unit">${p.unit}</span>
            </div>
            <div class="pm-section">Description</div>
            <p class="pm-desc">${p.description}</p>
            ${Object.keys(specs).length ? `
            <div class="pm-section">Specifications</div>
            <div class="pm-specs">
                ${Object.entries(specs).map(([k,v]) => `
                    <div class="pm-spec">
                        <div class="pm-spec-label">${k}</div>
                        <div class="pm-spec-val">${v}</div>
                    </div>
                `).join('')}
            </div>` : ''}
            <div class="pm-actions">
                <button class="pm-add" onclick="addToCart(${p.id});closeProdModal();">Add to Cart</button>
                <button class="pm-wa" onclick="orderSingleItem(${p.id})">
                    💬 Order via WhatsApp
                </button>
            </div>
        </div>`;
    document.getElementById('prod-modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeProdModal = () => {
    document.getElementById('prod-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
};

// ── CART ──
window.addToCart = (id) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: p.id, name: p.name, price: p.price, emoji: p.emoji || '🎨', unit: p.unit, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`${p.name} added to cart 🛒`);
};

window.removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
};

window.changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('mahlux_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-total-amount').textContent = `₦${total.toLocaleString()}`;

    const itemsEl   = document.getElementById('cart-items');
    const footerEl  = document.getElementById('cart-footer');

    if (!cart.length) {
        itemsEl.innerHTML = `<div class="cart-empty">Your cart is empty 🛒</div>`;
        footerEl.style.display = 'none';
        return;
    }

    footerEl.style.display = 'block';
    itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="ci-icon">${item.emoji}</div>
            <div class="ci-info">
                <div class="ci-name">${item.name}</div>
                <div class="ci-price">₦${(item.price * item.qty).toLocaleString()}</div>
                <div class="ci-qty">
                    <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
                </div>
            </div>
            <button class="ci-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');
}

window.toggleCart = () => {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
};

// ── WHATSAPP ORDER ──
window.orderViaWhatsApp = () => {
    if (!cart.length) { showToast('Your cart is empty!'); return; }
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    let msg = `Hello Mahlux Paint! 🎨\n\nI'd like to place an order:\n\n`;
    cart.forEach(item => {
        msg += `• ${item.name} x${item.qty} — ₦${(item.price * item.qty).toLocaleString()}\n`;
    });
    msg += `\n*Total: ₦${total.toLocaleString()}*\n\nPlease confirm availability and payment details. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

window.orderSingleItem = (id) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const msg = `Hello Mahlux Paint! 🎨\n\nI'm interested in:\n\n• ${p.name} — ₦${Number(p.price).toLocaleString()} ${p.unit}\n\nPlease confirm availability and payment details. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ── CONTACT FORM ──
window.sendViaWhatsApp = () => {
    const name    = document.getElementById('cf-name').value.trim();
    const phone   = document.getElementById('cf-phone').value.trim();
    const service = document.getElementById('cf-service').value;
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !phone) { showToast('Please fill in your name and phone number.'); return; }

    let msg = `Hello Mahlux Paint! 🎨\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Phone:* ${phone}\n`;
    if (service) msg += `*Service Needed:* ${service}\n`;
    if (message) msg += `*Message:* ${message}\n`;
    msg += `\nLooking forward to hearing from you!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ── TOAST ──
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ── SMOOTH NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            document.getElementById('nav-links').classList.remove('open');
            document.getElementById('hamburger').classList.remove('open');
        }
    });
});
