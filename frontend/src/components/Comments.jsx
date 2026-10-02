import { useEffect, useState } from "react";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    const fetchComments = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/comments/${postId}`
            );

            const data = await response.json();

            if (response.ok) {
                setComments(data);
            }
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleComment = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/comments/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ content })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setComments((currentComments) => [
                data,
                ...currentComments
            ]);

            setContent("");

        } catch (error) {
            console.error("Comment error:", error);
        }
    };

    return (
        <div className="comments-box">

            <div className="comments-title">
                <h4>Comments</h4>

                <span>
                    {comments.length}
                </span>
            </div>

            <form
                className="comment-form"
                onSubmit={handleComment}
            >
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                />

                <button type="submit">
                    Comment
                </button>
            </form>

            <div className="comments-list">

                {comments.length === 0 ? (
                    <p className="no-comments">
                        No comments yet. Be the first to comment.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            className="comment-item"
                            key={comment._id}
                        >
                            <div className="comment-avatar">
                                {comment.author?.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="comment-content">

                                <div className="comment-author">
                                    {comment.author?.name}

                                    <span>
                                        @{comment.author?.username}
                                    </span>
                                </div>

                                <p>
                                    {comment.content}
                                </p>

                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default Comments;