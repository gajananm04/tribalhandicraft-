// Global Variables and Data Storage
let currentUser = null;
let products = [];
let users = [];
let orders = [];
let cart = [];

// Initialize demo data
function initializeData() {
    // Demo users
    users = [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin', status: 'active', joinDate: '2024-01-01' },
        { id: 2, username: 'artisan', password: 'art123', role: 'artisan', status: 'active', joinDate: '2024-01-15' },
        { id: 3, username: 'customer', password: 'cust123', role: 'customer', status: 'active', joinDate: '2024-02-01' },
        { id: 4, username: 'consultant', password: 'cons123', role: 'consultant', status: 'active', joinDate: '2024-01-20' }
    ];

    // Demo products
    products = [
        {
            id: 1,
            name: 'Traditional Clay Pot',
            category: 'pottery',
            price: 45.99,
            stock: 15,
            description: 'Handcrafted clay pot using traditional tribal techniques passed down through generations.',
            culturalSignificance: 'Used in traditional ceremonies and daily cooking. Made with sacred clay from ancestral lands.',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            artisanId: 2,
            status: 'approved',
            culturalStatus: 'verified',
            createdAt: '2024-01-20',
            approvedBy: 1,
            verifiedBy: 4
        },
        {
            id: 2,
            name: 'Woven Tribal Basket',
            category: 'textiles',
            price: 32.50,
            stock: 8,
            description: 'Beautiful handwoven basket made from natural fibers using ancient weaving techniques.',
            culturalSignificance: 'Traditional storage basket with patterns representing tribal history and nature spirits.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
            artisanId: 2,
            status: 'approved',
            culturalStatus: 'verified',
            createdAt: '2024-01-25'
        },
        {
            id: 3,
            name: 'Silver Tribal Necklace',
            category: 'jewelry',
            price: 89.99,
            stock: 5,
            description: 'Intricate silver necklace featuring traditional tribal symbols and gemstones.',
            culturalSignificance: 'Ceremonial jewelry worn during important tribal celebrations and rites of passage.',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
            artisanId: 2,
            status: 'pending',
            culturalStatus: 'pending',
            createdAt: '2024-02-01'
        }
    ];

    // Demo orders
    orders = [
        {
            id: 1,
            customerId: 3,
            items: [{ productId: 1, quantity: 2, price: 45.99 }],
            total: 91.98,
            status: 'completed',
            date: '2024-02-05'
        }
    ];

    // Save to localStorage
    saveData();
}

// Data persistence functions
function saveData() {
    localStorage.setItem('tribalHandicrafts_users', JSON.stringify(users));
    localStorage.setItem('tribalHandicrafts_products', JSON.stringify(products));
    localStorage.setItem('tribalHandicrafts_orders', JSON.stringify(orders));
    localStorage.setItem('tribalHandicrafts_cart', JSON.stringify(cart));
}

function loadData() {
    const savedUsers = localStorage.getItem('tribalHandicrafts_users');
    const savedProducts = localStorage.getItem('tribalHandicrafts_products');
    const savedOrders = localStorage.getItem('tribalHandicrafts_orders');
    const savedCart = localStorage.getItem('tribalHandicrafts_cart');

    if (savedUsers) users = JSON.parse(savedUsers);
    if (savedProducts) products = JSON.parse(savedProducts);
    if (savedOrders) orders = JSON.parse(savedOrders);
    if (savedCart) cart = JSON.parse(savedCart);

    // Initialize demo data if no data exists
    if (users.length === 0) {
        initializeData();
    }
}

// Authentication functions
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect based on role
        switch (role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'artisan':
                window.location.href = 'artisan.html';
                break;
            case 'customer':
                window.location.href = 'customer.html';
                break;
            case 'consultant':
                window.location.href = 'consultant.html';
                break;
            default:
                window.location.href = 'home.html';
        }
    } else {
        showMessage('Invalid credentials or role selection', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserWelcome();
    } else {
        window.location.href = 'index.html';
    }
}

function updateUserWelcome() {
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement && currentUser) {
        welcomeElement.textContent = `Welcome, ${currentUser.username}`;
    }
}

// Utility functions
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(messageDiv, main.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function generateId() {
    return Date.now() + Math.random();
}

// Product management functions
function displayProducts(productsToShow = products, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsToShow.length === 0) {
        container.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }

    container.innerHTML = productsToShow.map(product => {
        const artisan = users.find(u => u.id === product.artisanId);
        const artisanName = artisan ? artisan.username : 'Unknown';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                ${product.status ? `<div class="status-badge status-${product.status}">${product.status}</div>` : ''}
                <div class="product-image">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">` : ''}
                    <i class="fas fa-image"></i>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-category">${product.category}</div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    ${product.culturalSignificance ? `<div class="cultural-info"><strong>Cultural Significance:</strong> ${product.culturalSignificance}</div>` : ''}
                    <div class="product-meta">
                        <small>By: ${artisanName} | Stock: ${product.stock}</small>
                    </div>
                    <div class="product-actions">
                        ${getProductActions(product)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getProductActions(product) {
    if (!currentUser) return '';

    switch (currentUser.role) {
        case 'customer':
            return product.status === 'approved' && product.stock > 0 ? 
                `<button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>` : 
                '<span class="text-muted">Not available</span>';
        
        case 'artisan':
            return product.artisanId === currentUser.id ? 
                `<button class="btn btn-warning" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>` : '';
        
        case 'admin':
            return `
                ${product.status === 'pending' ? 
                    `<button class="btn btn-success" onclick="approveProduct(${product.id})">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-danger" onclick="rejectProduct(${product.id})">
                        <i class="fas fa-times"></i> Reject
                    </button>` : ''}
                <button class="btn btn-secondary" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-eye"></i> View
                </button>
            `;
        
        case 'consultant':
            return product.culturalStatus === 'pending' ? 
                `<button class="btn btn-primary" onclick="verifyProduct(${product.id})">
                    <i class="fas fa-certificate"></i> Verify Culture
                </button>` : 
                `<button class="btn btn-secondary" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-eye"></i> View
                </button>`;
        
        default:
            return '';
    }
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showMessage('Product not available', 'error');
        return;
    }

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showMessage('Item quantity updated in cart', 'success');
        } else {
            showMessage('Maximum stock reached', 'error');
            return;
        }
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            price: product.price
        });
        showMessage('Item added to cart', 'success');
    }

    updateCartCount();
    saveData();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function displayCart() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="no-items">Your cart is empty.</p>';
        if (totalElement) totalElement.textContent = '0.00';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const itemTotal = item.quantity * item.price;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<i class="fas fa-image"></i>'}
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">$${item.price} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, 1)">+</button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.productId})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item || !product) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
    } else if (newQuantity <= product.stock) {
        item.quantity = newQuantity;
        displayCart();
        updateCartCount();
        saveData();
    } else {
        showMessage('Maximum stock reached', 'error');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    displayCart();
    updateCartCount();
    saveData();
    showMessage('Item removed from cart', 'success');
}

function checkout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty', 'error');
        return;
    }

    // Create order
    const order = {
        id: generateId(),
        customerId: currentUser.id,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    };

    orders.push(order);

    // Update product stock
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // Clear cart
    cart = [];
    
    saveData();
    updateCartCount();
    displayCart();
    
    showMessage('Order placed successfully!', 'success');
    
    // Refresh orders display if on orders section
    if (document.getElementById('ordersSection')?.classList.contains('active')) {
        displayOrders();
    }
}

// Product CRUD operations
function addProduct(event) {
    event.preventDefault();
    
    const product = {
        id: generateId(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        description: document.getElementById('productDescription').value,
        culturalSignificance: document.getElementById('culturalSignificance').value,
        image: document.getElementById('productImage').value,
        artisanId: currentUser.id,
        status: 'pending',
        culturalStatus: 'pending',
        createdAt: new Date().toISOString().split('T')[0]
    };

    products.push(product);
    saveData();
    
    showMessage('Product added successfully! Awaiting approval.', 'success');
    document.getElementById('addProductForm').reset();
    
    // Refresh displays
    updateArtisanStats();
    if (document.getElementById('myProductsSection')?.classList.contains('active')) {
        displayMyProducts();
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.artisanId !== currentUser.id) return;

    // Populate edit form
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductStock').value = product.stock;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editCulturalSignificance').value = product.culturalSignificance || '';
    document.getElementById('editProductImage').value = product.image || '';

    // Show modal
    document.getElementById('editModal').style.display = 'block';
}

function updateProduct(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const product = products.find(p => p.id === productId);
    
    if (!product || product.artisanId !== currentUser.id) return;

    // Update product
    product.name = document.getElementById('editProductName').value;
    product.category = document.getElementById('editProductCategory').value;
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.stock = parseInt(document.getElementById('editProductStock').value);
    product.description = document.getElementById('editProductDescription').value;
    product.culturalSignificance = document.getElementById('editCulturalSignificance').value;
    product.image = document.getElementById('editProductImage').value;
    
    // Reset approval status if significant changes
    product.status = 'pending';
    product.culturalStatus = 'pending';

    saveData();
    closeEditModal();
    showMessage('Product updated successfully!', 'success');
    
    // Refresh displays
    displayMyProducts();
    updateArtisanStats();
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const productIndex = products.findIndex(p => p.id === productId && p.artisanId === currentUser.id);
    if (productIndex === -1) return;

    products.splice(productIndex, 1);
    saveData();
    
    showMessage('Product deleted successfully!', 'success');
    displayMyProducts();
    updateArtisanStats();
}

// Admin functions
function approveProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    product.status = 'approved';
    product.approvedBy = currentUser.id;
    saveData();
    
    showMessage('Product approved successfully!', 'success');
    displayPendingProducts();
    updateAdminStats();
}

function rejectProduct(productId) {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    const product = products.find(p => p.id === productId);
    if (!product) return;

    product.status = 'rejected';
    product.rejectionReason = reason;
    product.rejectedBy = currentUser.id;
    saveData();
    
    showMessage('Product rejected successfully!', 'success');
    displayPendingProducts();
    updateAdminStats();
}

// Consultant functions
function verifyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Show verification modal
    const modalContent = `
        <h2>Cultural Verification</h2>
        <div class="product-details">
            <h3>${product.name}</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Cultural Significance:</strong> ${product.culturalSignificance || 'Not provided'}</p>
            ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 300px; border-radius: 10px;">` : ''}
        </div>
        <div class="verification-form">
            <h4>Verification Decision</h4>
            <textarea id="verificationNotes" placeholder="Add verification notes..." rows="4" style="width: 100%; margin: 10px 0; padding: 10px; border-radius: 5px; border: 1px solid #ddd;"></textarea>
            <div class="verification-actions">
                <button class="btn btn-success" onclick="approveVerification(${productId})">
                    <i class="fas fa-check"></i> Approve Cultural Authenticity
                </button>
                <button class="btn btn-danger" onclick="rejectVerification(${productId})">
                    <i class="fas fa-times"></i> Reject Verification
                </button>
            </div>
        </div>
    `;

    document.getElementById('verificationModalContent').innerHTML = modalContent;
    document.getElementById('verificationModal').style.display = 'block';
}

function approveVerification(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const notes = document.getElementById('verificationNotes').value;
    
    product.culturalStatus = 'verified';
    product.verifiedBy = currentUser.id;
    product.verificationNotes = notes;
    saveData();
    
    closeVerificationModal();
    showMessage('Product culturally verified successfully!', 'success');
    displayPendingVerification();
    updateConsultantStats();
}

function rejectVerification(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const notes = document.getElementById('verificationNotes').value;
    if (!notes.trim()) {
        showMessage('Please provide verification notes', 'error');
        return;
    }
    
    product.culturalStatus = 'rejected';
    product.rejectedBy = currentUser.id;
    product.verificationNotes = notes;
    saveData();
    
    closeVerificationModal();
    showMessage('Product verification rejected!', 'success');
    displayPendingVerification();
    updateConsultantStats();
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

// Page-specific functions
function showProducts() {
    if (document.getElementById('productsSection')) {
        showSection('productsSection');
        const approvedProducts = products.filter(p => p.status === 'approved');
        displayProducts(approvedProducts);
    }
}

function showCart() {
    showSection('cartSection');
    displayCart();
}

function showOrders() {
    showSection('ordersSection');
    displayOrders();
}

function showMyProducts() {
    showSection('myProductsSection');
    displayMyProducts();
}

function showAddProduct() {
    showSection('addProductSection');
}

function showPendingProducts() {
    showSection('pendingProductsSection');
    displayPendingProducts();
}

function showAllProducts() {
    showSection('allProductsSection');
    displayAllProducts();
}

function showUsers() {
    showSection('usersSection');
    displayUsers();
}

function showReports() {
    showSection('reportsSection');
    displayReports();
}

function showPendingVerification() {
    showSection('pendingVerificationSection');
    displayPendingVerification();
}

function showVerifiedProducts() {
    showSection('verifiedProductsSection');
    displayVerifiedProducts();
}

function showGuidelines() {
    showSection('guidelinesSection');
}

function showAbout() {
    showSection('aboutSection');
}

// Display functions for different roles
function displayMyProducts() {
    if (!currentUser || currentUser.role !== 'artisan') return;
    
    const myProducts = products.filter(p => p.artisanId === currentUser.id);
    displayProducts(myProducts, 'myProductsGrid');
}

function displayPendingProducts() {
    const pendingProducts = products.filter(p => p.status === 'pending');
    displayProducts(pendingProducts, 'pendingProductsGrid');
}

function displayAllProducts() {
    displayProducts(products, 'allProductsGrid');
}

function displayPendingVerification() {
    const pendingProducts = products.filter(p => p.culturalStatus === 'pending');
    displayProducts(pendingProducts, 'pendingVerificationGrid');
}

function displayVerifiedProducts() {
    const verifiedProducts = products.filter(p => p.culturalStatus === 'verified');
    displayProducts(verifiedProducts, 'verifiedProductsGrid');
}

function displayOrders() {
    const container = document.getElementById('ordersList');
    if (!container) return;

    let userOrders = [];
    
    if (currentUser.role === 'customer') {
        userOrders = orders.filter(o => o.customerId === currentUser.id);
    } else if (currentUser.role === 'artisan') {
        // Show orders for artisan's products
        userOrders = orders.filter(order => 
            order.items.some(item => {
                const product = products.find(p => p.id === item.productId);
                return product && product.artisanId === currentUser.id;
            })
        );
    } else {
        userOrders = orders;
    }

    if (userOrders.length === 0) {
        container.innerHTML = '<p class="no-orders">No orders found.</p>';
        return;
    }

    container.innerHTML = userOrders.map(order => {
        const customer = users.find(u => u.id === order.customerId);
        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${formatDate(order.date)}</div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        return product ? `${product.name} x${item.quantity}` : 'Unknown product';
                    }).join(', ')}
                </div>
                <div class="order-total">Total: $${order.total.toFixed(2)}</div>
                ${customer ? `<div class="order-customer">Customer: ${customer.username}</div>` : ''}
                <div class="order-status">Status: ${order.status}</div>
            </div>
        `;
    }).join('');
}

function displayUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>${formatDate(user.joinDate)}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="toggleUserStatus(${user.id})">
                    ${user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        </tr>
    `).join('');
}

function displayReports() {
    updateAdminStats();
    
    // Calculate additional report data
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const monthlyOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        const now = new Date();
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    }).length;
    
    // Find top category
    const categoryCount = {};
    products.forEach(product => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    const topCategory = Object.keys(categoryCount).reduce((a, b) => 
        categoryCount[a] > categoryCount[b] ? a : b, 'N/A'
    );

    // Update report elements
    document.getElementById('totalRevenue').textContent = totalRevenue.toFixed(2);
    document.getElementById('monthlyOrders').textContent = monthlyOrders;
    document.getElementById('topCategory').textContent = topCategory;
    
    document.getElementById('activeProducts').textContent = products.filter(p => p.status === 'approved').length;
    document.getElementById('pendingReview').textContent = products.filter(p => p.status === 'pending').length;
    document.getElementById('rejectedProducts').textContent = products.filter(p => p.status === 'rejected').length;
    
    document.getElementById('activeArtisans').textContent = users.filter(u => u.role === 'artisan' && u.status === 'active').length;
    document.getElementById('activeCustomers').textContent = users.filter(u => u.role === 'customer' && u.status === 'active').length;
    document.getElementById('newUsers').textContent = users.filter(user => {
        const joinDate = new Date(user.joinDate);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
    }).length;
}

// Stats update functions
function updateArtisanStats() {
    if (currentUser?.role !== 'artisan') return;
    
    const myProducts = products.filter(p => p.artisanId === currentUser.id);
    const myOrders = orders.filter(order => 
        order.items.some(item => {
            const product = products.find(p => p.id === item.productId);
            return product && product.artisanId === currentUser.id;
        })
    );
    const earnings = myOrders.reduce((sum, order) => sum + order.total, 0);

    document.getElementById('totalProducts').textContent = myProducts.length;
    document.getElementById('totalOrders').textContent = myOrders.length;
    document.getElementById('totalEarnings').textContent = `$${earnings.toFixed(2)}`;
}

function updateAdminStats() {
    if (currentUser?.role !== 'admin') return;
    
    document.getElementById('pendingCount').textContent = products.filter(p => p.status === 'pending').length;
    document.getElementById('totalProductsCount').textContent = products.length;
    document.getElementById('totalUsersCount').textContent = users.length;
    document.getElementById('totalSalesCount').textContent = orders.length;
}

function updateConsultantStats() {
    if (currentUser?.role !== 'consultant') return;
    
    document.getElementById('pendingVerificationCount').textContent = products.filter(p => p.culturalStatus === 'pending').length;
    document.getElementById('verifiedCount').textContent = products.filter(p => p.culturalStatus === 'verified').length;
    document.getElementById('rejectedVerificationCount').textContent = products.filter(p => p.culturalStatus === 'rejected').length;
}

// Search and filter functions
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.status === 'approved' &&
        (product.name.toLowerCase().includes(searchTerm) ||
         product.description.toLowerCase().includes(searchTerm) ||
         product.category.toLowerCase().includes(searchTerm))
    );
    displayProducts(filteredProducts);
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    let filteredProducts = products.filter(p => p.status === 'approved');
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    displayProducts(filteredProducts);
}

function filterAdminProducts() {
    const status = document.getElementById('statusFilter').value;
    let filteredProducts = products;
    
    if (status) {
        filteredProducts = products.filter(p => p.status === status);
    }
    
    displayProducts(filteredProducts, 'allProductsGrid');
}

// Modal functions
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

function closeVerificationModal() {
    document.getElementById('verificationModal').style.display = 'none';
}

function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = `
        <h2>${product.name}</h2>
        <div class="product-details">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 10px; margin-bottom: 15px;">` : ''}
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            ${product.culturalSignificance ? `<p><strong>Cultural Significance:</strong> ${product.culturalSignificance}</p>` : ''}
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    document.getElementById('modalContent').innerHTML = modalContent;
    document.getElementById('productModal').style.display = 'block';
}

function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const artisan = users.find(u => u.id === product.artisanId);
    const modalContent = `
        <h2>${product.name}</h2>
        <div class="product-details">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; border-radius: 10px; margin-bottom: 15px;">` : ''}
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Artisan:</strong> ${artisan ? artisan.username : 'Unknown'}</p>
            <p><strong>Status:</strong> ${product.status}</p>
            <p><strong>Cultural Status:</strong> ${product.culturalStatus}</p>
            <p><strong>Created:</strong> ${formatDate(product.createdAt)}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            ${product.culturalSignificance ? `<p><strong>Cultural Significance:</strong> ${product.culturalSignificance}</p>` : ''}
            ${product.verificationNotes ? `<p><strong>Verification Notes:</strong> ${product.verificationNotes}</p>` : ''}
            ${product.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${product.rejectionReason}</p>` : ''}
        </div>
    `;

    const modalId = currentUser.role === 'admin' ? 'reviewModal' : 'verificationModal';
    document.getElementById(modalId === 'reviewModal' ? 'reviewModalContent' : 'verificationModalContent').innerHTML = modalContent;
    document.getElementById(modalId).style.display = 'block';
}

// User management functions
function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || user.id === currentUser.id) return;

    user.status = user.status === 'active' ? 'inactive' : 'active';
    saveData();
    
    showMessage(`User ${user.status === 'active' ? 'activated' : 'deactivated'} successfully!`, 'success');
    displayUsers();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Check if on login page
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', login);
        return;
    }
    
    // Check authentication for other pages
    checkAuth();
    
    // Initialize page-specific content
    if (currentUser) {
        updateCartCount();
        
        switch (currentUser.role) {
            case 'customer':
                showProducts();
                break;
            case 'artisan':
                showMyProducts();
                updateArtisanStats();
                
                // Add product form listener
                const addForm = document.getElementById('addProductForm');
                if (addForm) {
                    addForm.addEventListener('submit', addProduct);
                }
                
                // Edit product form listener
                const editForm = document.getElementById('editProductForm');
                if (editForm) {
                    editForm.addEventListener('submit', updateProduct);
                }
                break;
            case 'admin':
                showPendingProducts();
                updateAdminStats();
                break;
            case 'consultant':
                showPendingVerification();
                updateConsultantStats();
                break;
        }
    }
    
    // Close modals when clicking outside
    window.onclick = function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
});

// Initialize data on first load
if (typeof window !== 'undefined') {
    loadData();
}
