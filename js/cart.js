// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
});

// Get cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('autoPartsCart')) || [];

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartEl.classList.remove('hidden');
        updateSummary(0);
        return;
    }

    emptyCartEl.classList.add('hidden');
    let html = '';
    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        subtotal += itemTotal;

        html += `
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="font-semibold">${item.name}</h3>
                        ${item.number ? `<p class="text-gray-600 text-sm">Номер: ${item.number}</p>` : ''}
                        <p class="text-primary font-semibold mt-1">${item.price.toFixed(2)} лв.</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <button onclick="changeQuantity(${index}, -1)" class="text-gray-500 hover:text-primary">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="w-8 text-center">${item.quantity || 1}</span>
                            <button onclick="changeQuantity(${index}, 1)" class="text-gray-500 hover:text-primary">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    updateSummary(subtotal);
    updateCartIcon();
}

// Function to update order summary
function updateSummary(subtotal) {
    const shipping = subtotal >= 100 ? 0 : 10;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' лв.';
    document.getElementById('shipping').textContent = shipping.toFixed(2) + ' лв.';
    document.getElementById('total').textContent = total.toFixed(2) + ' лв.';
}

// Function to update cart icon
function updateCartIcon() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems || '';
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('autoPartsCart', JSON.stringify(cartItems));
    updateCartDisplay();
}

// Function to change item quantity
function changeQuantity(index, change) {
    if (!cartItems[index].quantity) {
        cartItems[index].quantity = 1;
    }
    
    cartItems[index].quantity += change;
    
    if (cartItems[index].quantity < 1) {
        removeFromCart(index);
    } else {
        localStorage.setItem('autoPartsCart', JSON.stringify(cartItems));
        updateCartDisplay();
    }
}

// Function to handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    if (cartItems.length === 0) {
        showNotification('Количката е празна', true);
        return;
    }

    // Show success message
    document.getElementById('orderComplete').classList.remove('hidden');
    
    // Clear cart
    cartItems = [];
    localStorage.removeItem('autoPartsCart');
    updateCartDisplay();
}

// Function to show notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        isError ? 'bg-red-500' : 'bg-green-500'
    } text-white z-50 transition-opacity duration-300`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Function to add test item (for development only)
function addTestItem() {
    const testItem = {
        id: 'test-' + Date.now(),
        name: 'Test Auto Part ' + Math.floor(Math.random() * 100),
        number: 'P' + Math.floor(Math.random() * 10000),
        price: Math.floor(Math.random() * 200) + 50,
        quantity: 1
    };
    
    cartItems.push(testItem);
    localStorage.setItem('autoPartsCart', JSON.stringify(cartItems));
    updateCartDisplay();
    showNotification(`${testItem.name} добавен в количката`);
}
