require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Task 2 Social Media Backend is running"
    });
});

const PORT = 5000;

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});