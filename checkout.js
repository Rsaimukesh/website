// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items
const cartList = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");

if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    totalPriceEl.textContent = "";
} else {
    let total = 0;
    cartList.innerHTML = "";
    
    cart.forEach((item, index) => {
        total += item.price;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeItem(${index})">Remove</button>`;
        cartList.appendChild(li);
    });

    totalPriceEl.textContent = `Total: ₹${total}`;
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Refresh to update the cart
}

// Handle order submission
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nPayment: ${paymentMethod}`);
    
    // Clear cart after order
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // Redirect to home page
});
