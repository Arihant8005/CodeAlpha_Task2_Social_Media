import { useState } from "react";

function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Please write something");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/posts",
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

            setContent("");
            onPostCreated(data);

        } catch (error) {
            console.error("Create post error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />

            <button type="submit">
                Post
            </button>
        </form>
    );
}

export default CreatePost;