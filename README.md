# DevBandhan - Developer Networking Platform 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green.svg)](https://www.mongodb.com/)

## Checkout
<div style="display: flex; align-items: center; gap: 8px; margin: 16px 0;">
  <img src="./frontend/src/assets/logo.jpg" alt="Website" style="width: 25px; height: 25px; border-radius: 50%;" />
  <a href="https://devbandhan.tech" target="_blank" style="color: #3b82f6; font-size:18px; text-decoration: none; font-weight: 500;">
    https://devbandhan.tech
  </a>
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Security Features](#security-features)
- [Real-time Features](#real-time-features)
- [Payment Integration](#payment-integration)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

DevBandhan is a professional networking platform inspired by Tinder, designed specifically for developers to connect, collaborate, and grow their careers. Unlike traditional dating apps, DevBandhan focuses on professional relationships, mentorship, skill sharing, and career opportunities.

**Key Objectives:**
- Connect developers based on skills and interests
- Facilitate mentorship relationships
- Enable professional networking
- Support career growth and collaboration
- Create a community of like-minded developers

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration**: Email-based signup with OTP verification
- **Secure Login**: JWT-based authentication with password validation
- **Password Reset**: Secure password reset via email OTP
- **Profile Management**: Comprehensive user profiles with skills, achievements, and social links

### 👤 Profile Features
- **Detailed Profiles**: Personal information, skills, achievements, profession
- **Profile Photos**: Image upload and display
- **Social Links**: Integration with GitHub, LinkedIn, and other platforms
- **Skill Management**: Add, edit, and showcase technical skills
- **Achievement System**: Display professional accomplishments

### 🤝 Networking & Matching
- **User Feed**: Discover potential connections
- **Smart Matching**: Skill and interest-based recommendations
- **Connection Requests**: Send/receive connection requests
- **Request Management**: Accept, reject, or ignore requests
- **Connection List**: View and manage your professional network

### 💬 Real-time Communication
- **Live Chat**: Real-time messaging between connected users
- **Socket.io Integration**: Instant message delivery
- **Chat History**: Persistent conversation storage
- **Online Status**: Real-time user presence indicators

### 💳 Premium Features & Payments
- **Subscription Plans**: Gold and Silver membership tiers
- **Razorpay Integration**: Secure payment processing
- **Membership Management**: Subscription status tracking
- **Premium Features**: Enhanced functionality for subscribers
- **Payment Webhooks**: Automated payment verification

### 📧 Email System
- **Automated Notifications**: Connection requests, verifications
- **Email Templates**: Professional email formatting
- **SMTP Integration**: Reliable email delivery
- **Scheduled Emails**: Cron job-based email reminders
- **Multi-provider Support**: AWS SES and NodeMailer integration

### 📱 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Custom components with DaisyUI
- **Interactive Elements**: Animations and micro-interactions

## 🛠️ Tech Stack

###  Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Email**: NodeMailer + AWS SES
- **Payments**: Razorpay
- **Validation**: Validator.js
- **Security**: bcrypt, CORS, cookie-parser
- **Scheduling**: node-cron
- **Date Handling**: date-fns

### Frontend
- **Framework**: React.js v19+
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **UI Components**: DaisyUI, MagicUI
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React, React Icons
- **Real-time**: Socket.io Client

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier (implied)
- **Environment**: dotenv
- **Version Control**: Git

## 🏗️ Architecture

### 📁 Backend Structure
```
backend/
├── src/
│   ├── app.js                 # Main application entry point
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── middlewares/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── models/
│   │   ├── user.js           # User schema and methods
│   │   ├── connectionRequest.js # Connection request schema
│   │   ├── chat.js           # Chat and message schema
│   │   └── payment.js        # Payment transaction schema
│   ├── routes/
│   │   ├── authRouter.js     # Authentication endpoints
│   │   ├── profileRouter.js  # Profile management
│   │   ├── requestRouter.js  # Connection requests
│   │   ├── userRouter.js     # User feed and connections
│   │   ├── chatRouter.js     # Chat functionality
│   │   └── paymentRouter.js  # Payment processing
│   └── utils/
│       ├── constants.js      # Application constants
│       ├── validate.js       # Data validation utilities
│       ├── socket.js         # Socket.io configuration
│       ├── nodeMailer.js     # Email service
│       ├── sendEmail.js      # Email sending utilities
│       ├── sesClient.js      # AWS SES client
│       ├── razorpay.js       # Payment integration
│       └── jobCron.js        # Scheduled tasks
└── package.json
```

### 📁 Frontend Structure
```
frontend/
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global styles
│   ├── Components/
│   │   ├── Body.jsx        # Main layout component
│   │   ├── magicui/        # Reusable UI components
│   │   └── ui/             # Page components
│   │       ├── Login.jsx
│   │       ├── Signup.jsx
│   │       ├── Profile.jsx
│   │       ├── Feed.jsx
│   │       ├── Chat.jsx
│   │       ├── Home.jsx
│   │       ├── Premium.jsx
│   │       └── [other components]
│   ├── store/              # Redux store configuration
│   │   ├── appStore.js
│   │   ├── userSlice.js
│   │   ├── userFeedSlice.js
│   │   ├── connectionRequestSlice.js
│   │   └── signupDataSlice.js
│   ├── utils/
│   │   ├── constants.js    # API endpoints and constants
│   │   ├── validation.js   # Form validation utilities
│   │   └── socketClient.js # Socket.io client setup
│   ├── assets/             # Images and static files
│   └── lib/
│       └── utils.ts        # Utility functions
├── components.json         # Shadcn UI configuration
├── vite.config.js         # Vite configuration
└── package.json
```

## 🚀 Installation

### Prerequisites
- Node.js v18 or higher
- MongoDB v6 or higher
- npm or yarn package manager

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/opdsbanasya/devBandhan.git
   cd devBandhan/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   # Database
   URI=mongodb://localhost:27017/devBandhan

   # JWT
   SECRET_KEY=your_jwt_secret_key

   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # AWS SES (Optional)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region

   # Razorpay
   RAZORPAY_TEST_KEY_ID=your_razorpay_key_id
   RAZORPAY_TEST_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

### Frontend Setup
1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📚 API Documentation

### Authentication Routes (`/`)

#### POST `/signup`
Register a new user account
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "dateOfBirth": "1995-01-01"
}
```

#### POST `/login`
Authenticate user and return JWT token
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### POST `/logout`
Clear authentication cookie and logout user

#### POST `/authcode/send`
Send OTP for email verification
```json
{
  "email": "john@example.com"
}
```

#### POST `/authcode/verify`
Verify email with OTP
```json
{
  "email": "john@example.com",
  "otpFromUser": "123456"
}
```

#### PATCH `/reset/password`
Reset user password after OTP verification
```json
{
  "email": "john@example.com",
  "newPassword": "NewSecurePass123!"
}
```

### Profile Routes (`/profile`)

#### GET `/profile/view`
Get current user's profile data
- **Auth Required**: Yes
- **Returns**: Complete user profile

#### PATCH `/profile/edit`
Update user profile information
- **Auth Required**: Yes
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "about": "Full-stack developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "achievements": ["AWS Certified"],
  "profession": "Software Engineer"
}
```

#### PATCH `/profile/password/change`
Change user password
- **Auth Required**: Yes
```json
{
  "password": "CurrentPassword123!",
  "newPassword": "NewPassword123!"
}
```

### Connection Routes (`/request`)

#### POST `/request/send/:status/:toUserId`
Send connection request to another user
- **Auth Required**: Yes
- **Parameters**: 
  - `status`: "interested" | "ignored"
  - `toUserId`: Target user's ID

#### POST `/request/review/:status/:requestId`
Review received connection request
- **Auth Required**: Yes
- **Parameters**:
  - `status`: "accepted" | "rejected"
  - `requestId`: Connection request ID

### User Routes (`/user`)

#### GET `/user/feed`
Get user feed with potential connections
- **Auth Required**: Yes
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Results per page (default: 10)

#### GET `/user/connections`
Get list of user's connections
- **Auth Required**: Yes

#### GET `/user/requests/recieved`
Get received connection requests
- **Auth Required**: Yes

### Chat Routes (`/chat`)

#### GET `/chat/:toUserId`
Get chat history with specific user
- **Auth Required**: Yes
- **Parameters**: `toUserId`: Chat partner's user ID

### Payment Routes (`/`)

#### POST `/create/order`
Create Razorpay payment order
- **Auth Required**: Yes
```json
{
  "membershipType": "gold" | "silver"
}
```

#### POST `/payment/webhook`
Handle Razorpay payment webhooks
- **Auth Required**: No (Webhook endpoint)

#### GET `/payment/verify`
Verify user's premium status
- **Auth Required**: Yes

## 🎨 Frontend Features

### State Management
- **Redux Store**: Centralized state management
- **User Slice**: User authentication and profile data
- **Feed Slice**: User feed and recommendations
- **Connection Slice**: Connection requests and networking
- **Signup Slice**: Multi-step registration process

### Routing Structure
```
/                          # Home/Feed (Protected)
├── /get-started          # Landing page
├── /login                # User login
├── /signup               # User registration
├── /verify               # Email verification
├── /profile/:userId      # User profile
│   └── /edit            # Profile editing
├── /connection           # Connections list
├── /requests             # Connection requests
├── /chat/:toUserId       # Chat interface
├── /upgrade              # Premium subscription
├── /settings             # User settings
├── /privacy              # Privacy policy
├── /terms                # Terms and conditions
└── /contact-us           # Contact information
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Issues and Bug Reports
- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include environment information
- Add relevant screenshots or logs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Developer**: Dharm Singh Saini
- **GitHub**: [@opdsbanasya](https://github.com/opdsbanasya)
- **Repository**: [devBandhan](https://github.com/opdsbanasya/devBandhan.git)

## 🙏 Acknowledgments

- Inspired by Tinder's user experience
- Built with modern web technologies
- Community-driven development approach
- Open source contributions welcome

---

**Made with ❤️ for the developer community**