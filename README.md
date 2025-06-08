# E-CommerceMart 🛍️

A modern, full-stack e-commerce platform built with Node.js, Express, MongoDB, and EJS. This project provides a complete solution for online shopping with features like user authentication, product management, shopping cart, and order processing.

## 🚀 Features

- User Authentication (Signup/Login)
- Product Management
- Shopping Cart
- Order Management
- File Upload for Product Images
- Responsive Design
- Session-based Authentication
- Admin Dashboard

### User Features
- 🔐 Secure user authentication (Signup/Login)
- 👤 User profile management
- 🛒 Shopping cart functionality
- 📦 Order tracking and history
- 💳 Secure payment processing
- 🔍 Advanced product search and filtering
- ⭐ Product reviews and ratings
- 📱 Responsive design for all devices

### Admin Features
- 📊 Admin dashboard
- 📝 Product management (CRUD operations)
- 👥 User management
- 📈 Order management
- 📊 Sales analytics
- 📤 Bulk product upload
- 📧 Email notifications

## 🛠️ Tech Stack

### Frontend
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: CSS3 with responsive design
- **Client-side**: Vanilla JavaScript
- **UI Components**: Custom-built components

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express Session, bcryptjs
- **File Upload**: Multer
- **Validation**: Express Validator
- **Security**: Helmet, CORS

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3333
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Session Configuration
SESSION_SECRET=your_session_secret

# File Upload Configuration
UPLOAD_PATH=uploads
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3333`

## 📁 Project Structure

```
├── controllers/          # Route controllers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── userController.js
├── models/              # Database models
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── public/             # Static files
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side scripts
│   └── images/        # Static images
├── routes/            # Application routes
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── uploads/           # Uploaded files
├── utils/            # Utility functions
│   ├── validators.js
│   └── helpers.js
├── views/            # EJS templates
│   ├── auth/         # Authentication views
│   ├── host/         # Host views
│   ├── partials/     # Reusable components
│   └── store/        # Store views
├── app.js           # Application entry point
└── package.json     # Project dependencies
```

## 🔐 Environment Variables

- `PORT`: Server port number
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret key for session
- `UPLOAD_PATH`: Path for file uploads

## 🚀 Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon

## 📝 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | User login |
| GET | `/auth/logout` | User logout |
| GET | `/auth/profile` | Get user profile |

### Product Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Cart Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | View cart |
| POST | `/cart/add` | Add item to cart |
| DELETE | `/cart/remove/:id` | Remove item from cart |
| PUT | `/cart/update/:id` | Update cart item quantity |

### Order Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get user orders |
| POST | `/orders` | Create new order |
| GET | `/orders/:id` | Get order details |
| PUT | `/orders/:id/status` | Update order status |

## 🔒 Security Features

- Password hashing using bcrypt
- Session-based authentication
- CSRF protection
- XSS prevention
- Rate limiting
- Input validation
- Secure file upload
- Environment variable protection

## 🧪 Testing

The project includes:
- Unit tests
- Integration tests
- API endpoint tests
- Authentication tests

Run tests using:
```bash
npm test
```



## 👨‍💻 Author

**Ajitesh Rastogi**
- GitHub: [@ajitehrastogi](https://github.com/ajiteshrastogi)

## 📞 Support

For support, email ajiteshrastogi19@gamil.com or create an issue in the repository. 
