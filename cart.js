// Cart management class
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.elements = {
            cartItems: document.getElementById("cart-items"),
            totalPrice: document.getElementById("total-price"),
            cartCount: document.getElementById("cart-count"),
            checkoutBtn: document.getElementById("checkout-btn")
        };
        this.init();
    }

    init() {
        this.renderCart();
        this.updateCheckoutButton();
    }

    loadCart() {
        try {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error loading cart:", error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem("cart", JSON.stringify(this.cart));
        } catch (error) {
            console.error("Error saving cart:", error);
            this.showNotification("Error saving cart", "error");
        }
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    updateCheckoutButton() {
        if (this.elements.checkoutBtn) {
            this.elements.checkoutBtn.disabled = this.cart.length === 0;
        }
    }

    renderCart() {
        if (!this.elements.cartItems) return;

        this.elements.cartItems.innerHTML = "";
        
        if (this.cart.length === 0) {
            this.elements.cartItems.innerHTML = `
                <div class="empty-cart-message">
                    <p>Your cart is empty</p>
                    <button onclick="window.location.href='index.html'">
                        Continue Shopping
                    </button>
                </div>
            `;
            this.updateTotals(0);
            return;
        }

        this.cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${this.sanitizeUrl(item.image)}" 
                     alt="${this.escapeHtml(item.name)}"
                     onerror="this.src='images/placeholder.jpg'">
                <div class="item-details">
                    <h3>${this.escapeHtml(item.name)}</h3>
                    <p class="item-price">Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button onclick="cartManager.updateQuantity(${index}, ${item.quantity - 1})"
                                ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <input type="number" 
                               value="${item.quantity}" 
                               min="1" 
                               max="99"
                               onchange="cartManager.updateQuantity(${index}, this.value)">
                        <button onclick="cartManager.updateQuantity(${index}, ${item.quantity + 1})"
                                ${item.quantity >= 99 ? 'disabled' : ''}>+</button>
                    </div>
                    <p class="item-total">
                        Total: $${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button class="remove-btn" 
                            onclick="cartManager.removeFromCart(${index})">
                        Remove
                    </button>
                </div>
            `;
            this.elements.cartItems.appendChild(cartItem);
        });

        const totalPrice = this.calculateTotal();
        this.updateTotals(totalPrice);
    }

    updateTotals(totalPrice) {
        if (this.elements.totalPrice) {
            this.elements.totalPrice.textContent = totalPrice.toFixed(2);
        }
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = this.cart.reduce(
                (total, item) => total + item.quantity, 0
            );
        }
    }

    removeFromCart(index) {
        if (index >= 0 && index < this.cart.length) {
            const removedItem = this.cart[index];
            this.cart.splice(index, 1);
            this.saveCart();
            this.renderCart();
            this.showNotification(`${removedItem.name} removed from cart`);
        }
    }

    updateQuantity(index, newQuantity) {
        newQuantity = parseInt(newQuantity);
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > 99) {
            newQuantity = 99;
        }

        if (index >= 0 && index < this.cart.length) {
            this.cart[index].quantity = newQuantity;
            this.saveCart();
            this.renderCart();
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification("Your cart is empty!", "error");
            return;
        }

        try {
            localStorage.setItem("checkoutCart", JSON.stringify(this.cart));
            window.location.href = "checkout.html";
        } catch (error) {
            console.error("Error during checkout:", error);
            this.showNotification("Error processing checkout", "error");
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Security helpers
    sanitizeUrl(url) {
        // Basic URL sanitization
        return url.replace(/[^\w-._~:/?#[\]@!$&'()*+,;=]/gi, '');
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => cartManager.checkout());
    }
});