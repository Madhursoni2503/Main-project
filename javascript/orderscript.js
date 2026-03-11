const collection = [
    { id: 1, name: "Red Apple", price: 700.00, img: "Images/apple.webp" },
    { id: 2, name: "Emerald Green", price: 900.00, img: "Images/greenapple.webp" },
    { id: 3, name: "Immersive Berry", price: 1100.00, img: "Images/berry.webp" },
    { id: 4, name: "Immersive Litchi", price: 685.00, img: "Images/litchi.webp" },
    { id: 5, name: "Golden Pineapple", price: 654.00, img: "Images/pine.webp" },
    { id: 6, name: "Immersive Strawberry", price: 950.50, img: "Images/strawberry.webp" },
    { id: 7, name: "Immersive Orange", price: 640.00, img: "Images/orange.webp" },
    { id: 8, name: "Immersive Mango", price: 800.00, img: "Images/mango.webp" },
    { id: 9, name: "Immersive Kiwi", price: 1500.50, img: "Images/Kiwi.webp" },
    { id:10, name: "Immersive Dragon", price: 1600.00, img: "Images/dragon.webp" }
];

let cart = [];

function init() {
    const grid = document.getElementById('juice-grid');
    collection.forEach(item => {
        grid.innerHTML += `
            <div class="juice-card">
                <div class="image-box"><img src="${item.img}" alt="${item.name}"></div>
                <h3>${item.name}</h3>
                <div class="price">₹${item.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(${item.id})">ADD TO BAG</button>
            </div>`;
    });
}

function toggleCart() { document.getElementById('cart-overlay').classList.toggle('active'); }

function addToCart(id) {
    const item = collection.find(p => p.id === id);
    cart.push(item);
    updateUI();
    if (!document.getElementById('cart-overlay').classList.contains('active')) toggleCart();
}

function updateUI() {
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        itemsContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size: 0.9rem;">
                <span>${item.name}</span>
                <span>₹${item.price.toFixed(2)} <button onclick="remove(${index})" style="background:none; border:none; color:#ff4e50; cursor:pointer; margin-left:10px;">✕</button></span>
            </div>`;
        total += item.price;
    });
    document.getElementById('total-price').textContent = `₹${ total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.length;
}

function remove(index) { cart.splice(index, 1); updateUI(); }

function openCheckout() {
    if (cart.length === 0) return;
    toggleCart();
    document.getElementById('checkout-page').style.display = 'block';
    const summary = document.getElementById('final-summary-items');
    summary.innerHTML = '';
    cart.forEach(item => {
        summary.innerHTML += `<div style="display:flex; justify-content:space-between; opacity:0.7; margin-bottom:10px; font-size:0.85rem;"><span>${item.name}</span><span>₹${item.price.toFixed(2)}</span></div>`;
    });
    document.getElementById('sum-subtotal').textContent = document.getElementById('total-price').textContent;
    document.getElementById('sum-total').textContent = document.getElementById('total-price').textContent;
}

function closeCheckout() { document.getElementById('checkout-page').style.display = 'none'; }

function confirmFinalOrder(e) {
    e.preventDefault();
    const btn = document.getElementById('pay-btn');
    btn.textContent = "VERIFYING...";
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('checkout-page').style.display = 'none';
        document.getElementById('receipt-screen').style.display = 'flex';
        document.getElementById('receipt-no').textContent = "#VVT-" + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('receipt-date').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const receiptList = document.getElementById('receipt-items-list');
        receiptList.innerHTML = '';
        cart.forEach(item => {
            receiptList.innerHTML += `<div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:8px;"><span>${item.name}</span><span>$${item.price.toFixed(2)}</span></div>`;
        });
        document.getElementById('receipt-total').textContent = document.getElementById('total-price').textContent;
        btn.textContent = "COMPLETE PURCHASE";
        btn.disabled = false;
    }, 2000);
}

function returnToHome() {
    cart = []; updateUI();
    document.getElementById('receipt-screen').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


init();
