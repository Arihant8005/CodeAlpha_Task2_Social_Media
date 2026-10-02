const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a post
router.post("/", protect, async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "Post content is required"
            });
        }

        const post = await Post.create({
            content,
            author: req.user._id
        });

        const populatedPost = await post.populate(
            "author",
            "name username"
        );

        res.status(201).json(populatedPost);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name username")
            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
});
// Like / Unlike a post
router.put("/:id/like", protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user._id.toString();

        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();

        res.json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likesCount: post.likes.length
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to like/unlike post",
            error: error.message
        });
    }
});

module.exports = router;