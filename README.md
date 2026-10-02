# Socially – Social Media Platform

A full-stack social media platform developed as part of the **CodeAlpha Full Stack Development Internship – Task 2**.

The application allows users to create accounts, log in securely, create posts, like posts, comment on posts, and connect with other users through a follow/unfollow system.

---

## 🚀 Features

### 🔐 User Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected backend routes
- Secure logout

### 📝 Posts
- Create new posts
- View latest posts
- Display post author information
- Like and unlike posts
- Display total likes

### 💬 Comments
- Add comments to posts
- View comments
- Display comment author information
- Real-time frontend update after commenting

### 👥 User Connections
- View registered users
- View user profiles
- Follow users
- Unfollow users
- Display followers and following counts
- Prevent users from following themselves

### 🎨 User Interface
- Responsive design
- Modern social media layout
- Navigation bar
- Authentication pages
- Profile/community page
- Responsive comments section
- Mobile-friendly layout

---

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- React Router
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication & Security
- JWT
- bcryptjs

---

## 📁 Project Structure

```text
Task2_Social_Media/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Comments.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md