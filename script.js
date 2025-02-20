class Product {
    constructor(id, name, price, category, image, description = '', stock = 10) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
        this.stock = stock;
    }
}

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }

        this.saveCart();
        this.showNotification('Product added to cart!');
    }

    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

class ProductList {
    constructor(products) {
        this.products = products.map(p => new Product(p.id, p.name, p.price, p.category, p.image, p.description));
        this.filteredProducts = [...this.products];
    }

    renderProducts() {
        const productList = document.getElementById('product-list');
        if (!productList) return;
        productList.innerHTML = '';

        this.filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" 
                     onclick="window.location.href='product.html?id=${product.id}'">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <input type="number" min="1" max="${product.stock}" value="1" id="quantity-${product.id}">
                    <button data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productList.appendChild(productCard);
        });

        // Attach event listeners for "Add to Cart" buttons
        document.querySelectorAll('.product-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
                cart.addItem(productId, quantity);
            });
        });
    }

    filterProducts(category, searchTerm = '') {
        this.filteredProducts = this.products
            .filter(product => 
                (category === 'all' || product.category === category) &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        this.renderProducts();
    }

    sortProducts(sortType) {
        switch (sortType) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        this.renderProducts();
    }
}

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

// Initialize cart and product list
const cart = new ShoppingCart();
const productList = new ProductList(products);

document.addEventListener('DOMContentLoaded', () => {
    productList.renderProducts();
    cart.updateCartCount();

    document.getElementById('filter').addEventListener('change', (e) => {
        productList.filterProducts(e.target.value, document.getElementById('search').value);
    });

    document.getElementById('sort').addEventListener('change', (e) => {
        productList.sortProducts(e.target.value);
    });

    document.getElementById('search').addEventListener('input', (e) => {
        productList.filterProducts(document.getElementById('filter').value, e.target.value);
    });
});
