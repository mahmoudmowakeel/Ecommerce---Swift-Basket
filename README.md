# 🛒 Swift Basket — E-Commerce Web Application

Swift Basket is a modern, fully responsive e-commerce web application built with **Angular (Standalone Components)** and styled using **Tailwind CSS**.  
The application integrates real APIs, secure authentication, Stripe payments, and advanced UX features to deliver a smooth shopping experience.

---

## 🚀 Live Demo

🔗 **Live Website:**  
[> [](https://ecommerce-swift-basket.vercel.app/)


---

## 🧰 Tech Stack

- **Angular 17+**
  - Standalone Components
  - Signals & Modern Angular Architecture
- **Tailwind CSS**
  - Fully responsive UI
- **Ngx-Spinner**
  - Global loading indicators
- **Angular Interceptors**
  - Auth token injection
  - Global error handling
- **RESTful API Integration**
  - Real backend APIs
- **Stripe Payment Gateway**
  - Secure online payments
- **Authentication System**
  - Login & Register
  - JWT-based authentication
- **Font Awesome**
  - Icons and UI elements

---

## ✨ Features

### 🛍️ E-Commerce Functionality
- Browse products
- Product details page
- Add to cart
- Cart quantity management
- Checkout flow

### 🔐 Authentication
- User registration
- User login
- Secure token-based authentication
- Protected routes using guards

### 💳 Payments
- Stripe payment integration
- Secure checkout process

### ⚡ Performance & UX
- Global loading spinner using **ngx-spinner**
- API request handling via **Angular Interceptors**
- Clean and responsive UI with Tailwind CSS

---


---

## 🔄 HTTP Interceptors

- Automatically attach authentication tokens
- Handle API errors globally
- Control global loading spinner state

---

## 🔑 Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored securely
4. Interceptor attaches token to all protected API calls

---

## 💳 Stripe Integration

- Secure card payment processing
- Stripe Checkout session creation via backend
- Payment confirmation handling

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mahmoudmowakeel/Ecommerce---Swift-Basket.git

npm install


ng serve --port 3000

http://localhost:3000



