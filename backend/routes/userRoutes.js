const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// Search user by username
router.get("/search/:username", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to search user",
            error: error.message
        });
    }
});

// Follow / Unfollow a user
router.put("/:id/follow", protect, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (
            targetUser._id.toString() ===
            currentUser._id.toString()
        ) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const alreadyFollowing = currentUser.following.some(
            (id) =>
                id.toString() === targetUser._id.toString()
        );

        if (alreadyFollowing) {
            currentUser.following =
                currentUser.following.filter(
                    (id) =>
                        id.toString() !==
                        targetUser._id.toString()
                );

            targetUser.followers =
                targetUser.followers.filter(
                    (id) =>
                        id.toString() !==
                        currentUser._id.toString()
                );
        } else {
            currentUser.following.push(targetUser._id);
            targetUser.followers.push(currentUser._id);
        }

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: alreadyFollowing
                ? "User unfollowed"
                : "User followed",

            following: !alreadyFollowing
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to follow/unfollow user",
            error: error.message
        });
    }
});

module.exports = router;