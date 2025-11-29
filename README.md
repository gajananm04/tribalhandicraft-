# Tribal Handicrafts Platform (FEDF-PS02)

A complete web application for promoting value-added handicrafts to support tribal people. This platform connects tribal artisans with customers while ensuring cultural authenticity and fair trade practices.

## 🌟 Features

### Multi-Role System
- **Admin**: Manage platform, approve products, monitor transactions
- **Artisan**: Create listings, manage products, handle orders
- **Customer**: Browse products, make purchases, leave reviews
- **Cultural Consultant**: Verify cultural authenticity of products

### Core Functionality
- ✅ Role-based authentication system
- ✅ Product listing and management (CRUD operations)
- ✅ Shopping cart and checkout system
- ✅ Product approval workflow (Admin)
- ✅ Cultural verification system (Consultant)
- ✅ Order management and tracking
- ✅ Responsive design for all devices
- ✅ Local data storage using localStorage

## 🚀 How to Run

1. **Download/Clone the project**
   ```bash
   git clone [repository-url]
   cd "FEDF project"
   ```

2. **Open in browser**
   - Simply open `index.html` in any modern web browser
   - No server setup required - runs entirely in the browser

3. **Login with demo credentials**
   - **Admin**: username: `admin`, password: `admin123`
   - **Artisan**: username: `artisan`, password: `art123`
   - **Customer**: username: `customer`, password: `cust123`
   - **Consultant**: username: `consultant`, password: `cons123`

## 📁 File Structure

```
FEDF project/
├── index.html          # Login page
├── home.html           # Public home page
├── customer.html       # Customer dashboard
├── artisan.html        # Artisan dashboard
├── admin.html          # Admin dashboard
├── consultant.html     # Cultural consultant dashboard
├── styles.css          # Complete CSS styling
├── script.js           # All JavaScript functionality
└── README.md           # This file
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Color Theme**: Purple gradient theme representing creativity and culture
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔧 Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup with modern structure
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Poppins font family for modern typography

### Data Management
- **localStorage**: Client-side data persistence
- **JSON**: Structured data format for products, users, and orders
- **Real-time Updates**: Instant UI updates without page refresh

### Key JavaScript Functions

#### Authentication
```javascript
login(event)           // Handle user login
logout()              // Handle user logout
checkAuth()           // Verify user authentication
```

#### Product Management
```javascript
addProduct(event)     // Add new product (Artisan)
editProduct(id)       // Edit existing product (Artisan)
deleteProduct(id)     // Delete product (Artisan)
approveProduct(id)    // Approve product (Admin)
verifyProduct(id)     // Verify cultural authenticity (Consultant)
```

#### Shopping Features
```javascript
addToCart(id)         // Add product to cart
updateCartQuantity()  // Update item quantities
checkout()            // Process order
displayCart()         // Show cart contents
```

## 👥 User Roles & Permissions

### Admin
- View all products and users
- Approve/reject product listings
- Monitor platform statistics
- Manage user accounts
- Generate reports

### Artisan
- Create and manage product listings
- Upload product images and descriptions
- Track orders and earnings
- Edit product details
- View sales statistics

### Customer
- Browse approved products
- Add items to cart
- Complete purchases
- View order history
- Search and filter products

### Cultural Consultant
- Review product cultural significance
- Verify authenticity of tribal crafts
- Approve/reject cultural claims
- Provide feedback to artisans
- Maintain cultural guidelines

## 🛒 Shopping Workflow

1. **Browse Products**: Customers view approved, culturally verified products
2. **Add to Cart**: Select quantities and add items to shopping cart
3. **Checkout**: Review cart and complete purchase
4. **Order Processing**: Orders are tracked and managed
5. **Fulfillment**: Artisans receive orders and handle shipping

## ✅ Product Approval Process

1. **Artisan Submission**: Artisan creates product listing
2. **Admin Review**: Admin reviews for platform compliance
3. **Cultural Verification**: Consultant verifies cultural authenticity
4. **Publication**: Approved and verified products go live
5. **Customer Access**: Products become available for purchase

## 📊 Data Structure

### Products
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,
  stock: number,
  description: string,
  culturalSignificance: string,
  image: string,
  artisanId: number,
  status: 'pending' | 'approved' | 'rejected',
  culturalStatus: 'pending' | 'verified' | 'rejected'
}
```

### Users
```javascript
{
  id: number,
  username: string,
  password: string,
  role: 'admin' | 'artisan' | 'customer' | 'consultant',
  status: 'active' | 'inactive',
  joinDate: string
}
```

### Orders
```javascript
{
  id: number,
  customerId: number,
  items: Array<{productId: number, quantity: number, price: number}>,
  total: number,
  status: string,
  date: string
}
```

## 🎯 Future Enhancements

### Phase 2 Features
- **Payment Integration**: Stripe/PayPal integration
- **Real Database**: MySQL/PostgreSQL backend
- **Image Upload**: File upload functionality
- **Email Notifications**: Order confirmations and updates
- **Reviews & Ratings**: Customer feedback system
- **Advanced Search**: Filters by price, location, materials
- **Mobile App**: React Native mobile application

### Phase 3 Features
- **Multi-language Support**: Tribal language options
- **Video Tutorials**: Crafting technique videos
- **Live Chat**: Customer support system
- **Analytics Dashboard**: Advanced reporting
- **Social Features**: Artisan profiles and stories
- **Inventory Management**: Stock tracking and alerts

## 🔒 Security Considerations

- Input validation and sanitization
- XSS protection measures
- Secure authentication flow
- Data encryption for sensitive information
- Regular security audits

## 📱 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a college mini-project demonstrating full-stack web development skills. The codebase is designed to be:
- **Educational**: Clear, commented code for learning
- **Scalable**: Modular structure for easy expansion
- **Professional**: Industry-standard practices and patterns

## 📄 License

This project is created for educational purposes as part of the FEDF-PS02 assignment.

## 🙏 Acknowledgments

- Tribal artisan communities for inspiration
- Modern web development best practices
- Responsive design principles
- Accessibility guidelines (WCAG 2.1)

---

**Project Goal**: Create a sustainable platform that empowers tribal artisans while preserving cultural heritage through authentic handicrafts.# tribalhandicraft-
