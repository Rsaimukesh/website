// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

// Sample product data (same as in index.js)
const products = [
    { id: 1, name: "Black Casual Dress", price: 4200, category: "casual", image: "sample.png" },
    { id: 2, name: "Elegant Party Dress", price: 10000, category: "party", image: "elegent party dress.png" },
    { id: 3, name: "Wedding Gown", price: 25000, category: "wedding", image: "wedding.png" },
    { id: 4, name: "Summer Floral Dress", price: 5000, category: "casual", image: "flowaara.png" },
    { id: 5, name: "Velvet Evening Dress", price: 12500, category: "party", image: "velvet.png" }
];

// Find product by ID
const product = products.find(p => p.id === productId);

// If product exists, update the page
if (product) {
    document.getElementById("product-img").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₹${product.price}`;
} else {
    document.body.innerHTML = "<h1>Product not found</h1>";
}

// Add to Cart function
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// Buy Now function (redirects to checkout)
function buyNow() {
    alert("Redirecting to checkout...");
    window.location.href = "checkout.html";
}
