const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add a comment
router.post("/:postId", protect, async (req, res) => {
    try {
        const { content } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            content,
            author: req.user._id,
            post: req.params.postId
        });

        const populatedComment = await comment.populate(
            "author",
            "name username"
        );

        res.status(201).json(populatedComment);

    } catch (error) {
        res.status(500).json({
            message: "Failed to add comment",
            error: error.message
        });
    }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId
        })
            .populate("author", "name username")
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch comments",
            error: error.message
        });
    }
});

module.exports = router;