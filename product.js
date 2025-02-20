// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

// Sample product data
const products = [
    { id: 1, name: "Black Casual Dress", price: 4200, category: "casual", image: "sample.png", description: "A stylish black casual dress for everyday wear." },
    { id: 2, name: "Elegant Party Dress", price: 10000, category: "party", image: "elegent party dress.png", description: "A beautiful dress perfect for parties and special occasions." },
    { id: 3, name: "Wedding Gown", price: 25000, category: "wedding", image: "wedding.png", description: "An elegant wedding gown for a dream wedding." },
    { id: 4, name: "Summer Floral Dress", price: 5000, category: "casual", image: "flowaara.png", description: "A lightweight floral dress for summer comfort." },
    { id: 5, name: "Velvet Evening Dress", price: 12500, category: "party", image: "velvet.png", description: "A luxurious velvet dress for evening events." }
];

// Sample reviews
const reviews = {
    1: ["Great quality!", "Loved it!"],
    2: ["Perfect for parties!", "Amazing fabric."],
    3: ["Wedding perfection!", "Super elegant."],
    4: ["Love the floral print.", "Very comfy!"],
    5: ["Looks classy!", "Great fabric!"]
};

// Find product by ID
const product = products.find(p => p.id === productId);

// If product exists, update the page
if (product) {
    const productImage = document.getElementById("product-img");
    productImage.src = product.image;
    productImage.onerror = () => productImage.src = "images/placeholder.png"; // Use placeholder if image fails to load

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₹${product.price}`;
    document.getElementById("product-description").textContent = product.description;

    // Load reviews
    const reviewList = document.getElementById("reviews");
    reviewList.innerHTML = ""; // Clear previous reviews
    const productReviews = reviews[productId] || ["No reviews yet."];

    productReviews.forEach(review => {
        const li = document.createElement("li");
        li.textContent = review;
        reviewList.appendChild(li);
    });

    updateCartCount(); // Update cart count when the page loads

} else {
    document.body.innerHTML = "<h1>Product not found</h1>";
}

// Add to Cart function
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Prevent duplicate entries
    if (!cart.some(item => item.id === product.id)) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
        updateCartCount(); // Refresh cart count
    } else {
        alert("Product is already in the cart.");
    }
}

// Buy Now function (redirects to checkout)
function buyNow() {
    alert("Redirecting to checkout...");
    window.location.href = "checkout.html";
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}
