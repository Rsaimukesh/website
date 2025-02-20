// Sample product data
const products = [
    { id: 1, name: "Black Casual Dress", price: 50, category: "casual", image: "sample.png" },
    { id: 2, name: "Elegant Party Dress", price: 120, category: "party", image: "elegent party dress.png" },
    { id: 3, name: "Wedding Gown", price: 300, category: "wedding", image: "wedding.png" },
    { id: 4, name: "Summer Floral Dress", price: 60, category: "casual", image: "flowaara.png" },
    { id: 5, name: "Velvet Evening Dress", price: 150, category: "party", image: "velvet.png" },
    { id: 6, name: "Classic A-Line Dress", price: 80, category: "casual", image: "aline.png" },
    { id: 7, name: "Sparkly Sequin Dress", price: 200, category: "party", image: "queen.png" },
    { id: 8, name: "Boho Maxi Dress", price: 90, category: "casual", image: "maxi.png" },
    { id: 9, name: "Chic Cocktail Dress", price: 130, category: "party", image: "cocktail.png" },
    { id: 10, name: "Lace Wedding Dress", price: 350, category: "wedding", image: "lace.png" },
    { id: 11, name: "Off-Shoulder Dress", price: 70, category: "casual", image: "offshoulder.png" },
    { id: 12, name: "Glitter Mini Dress", price: 110, category: "party", image: "giltter.png" },
    { id: 13, name: "Long Sleeve Dress", price: 85, category: "casual", image: "longsleeve.png" },
    { id: 14, name: "Silk Slip Dress", price: 180, category: "party", image: "slip.png" },
    { id: 15, name: "Princess Ball Gown", price: 400, category: "wedding", image: "princessgown.png" },
    { id: 16, name: "Denim Shirt Dress", price: 65, category: "casual", image: "denim.png" },
    { id: 17, name: "Sequined Mermaid Dress", price: 250, category: "party", image: "mermaid.png" },
    { id: 18, name: "Floral Wrap Dress", price: 75, category: "casual", image: "flowaara.png" },
    { id: 19, name: "Embroidered Gown", price: 280, category: "wedding", image: "embroided.png" },
    { id: 20, name: "Polka Dot Dress", price: 55, category: "casual", image: "polaka.png" },
];

let cart = [];

// Render products
function renderProducts(productsToRender) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productsToRender.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    saveCartToLocalStorage();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = savedCart;
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

// Filter products
document.getElementById("filter").addEventListener("change", (e) => {
    const category = e.target.value;
    const filteredProducts = category === "all" 
        ? products 
        : products.filter(product => product.category === category);
    renderProducts(filteredProducts);
});

// Sort products
document.getElementById("sort").addEventListener("change", (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...products];

    if (sortValue === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name-asc") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-desc") {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    renderProducts(sortedProducts);
});

// Load cart when the page loads
window.onload = () => {
    loadCartFromLocalStorage();
    renderProducts(products);
};