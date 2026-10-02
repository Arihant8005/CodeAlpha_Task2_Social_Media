import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Comments from "../components/Comments";

function Home() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/posts/${postId}/like`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post._id === postId
                        ? {
                              ...post,
                              likes: Array(data.likesCount).fill(null)
                          }
                        : post
                )
            );
        } catch (error) {
            console.error("Like error:", error);
        }
    };

    return (
        <main className="home-page">

            <div className="home-layout">

                {/* Main Feed */}
                <section className="feed-section">

                    <div className="welcome-section">
                        <div>
                            <p className="small-label">
                                YOUR FEED
                            </p>

                            <h1>
                                What's happening?
                            </h1>

                            <p className="welcome-text">
                                Share your thoughts and connect
                                with people.
                            </p>
                        </div>

                        <div className="welcome-icon">
                            ✨
                        </div>
                    </div>

                    <div className="create-post-card">
                        <CreatePost
                            onPostCreated={(newPost) => {
                                setPosts((currentPosts) => [
                                    newPost,
                                    ...currentPosts
                                ]);
                            }}
                        />
                    </div>

                    <div className="feed-header">
                        <h2>Latest Posts</h2>
                        <span>{posts.length} posts</span>
                    </div>

                    {posts.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                📝
                            </div>

                            <h3>No posts yet</h3>

                            <p>
                                Be the first person to share
                                something with the community.
                            </p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <article
                                className="post-card"
                                key={post._id}
                            >

                                <div className="post-header">

                                    <div className="avatar">
                                        {post.author?.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="author-info">
                                        <h3>
                                            {post.author?.name}
                                        </h3>

                                        <span>
                                            @{post.author?.username}
                                        </span>
                                    </div>

                                    <button className="more-button">
                                        •••
                                    </button>

                                </div>

                                <div className="post-content">
                                    <p>{post.content}</p>
                                </div>

                                <div className="post-stats">
                                    <span>
                                        ❤️ {post.likes?.length || 0} likes
                                    </span>
                                </div>

                                <div className="post-actions">

                                    <button
                                        className="action-button like-button"
                                        onClick={() =>
                                            handleLike(post._id)
                                        }
                                    >
                                        ❤️ Like
                                    </button>

                                </div>

                                <div className="comments-section">
                                    <Comments
                                        postId={post._id}
                                    />
                                </div>

                            </article>
                        ))
                    )}

                </section>

                {/* Right Sidebar */}
                <aside className="sidebar">

                    <div className="sidebar-card profile-card">

                        <div className="profile-avatar">
                            👤
                        </div>

                        <h3>Welcome back!</h3>

                        <p>
                            Connect, share and discover
                            something new.
                        </p>

                    </div>

                    <div className="sidebar-card">

                        <h3>Community</h3>

                        <div className="community-item">
                            <span>👥</span>
                            <div>
                                <strong>People</strong>
                                <small>
                                    Connect with others
                                </small>
                            </div>
                        </div>

                        <div className="community-item">
                            <span>💬</span>
                            <div>
                                <strong>Conversations</strong>
                                <small>
                                    Share your thoughts
                                </small>
                            </div>
                        </div>

                        <div className="community-item">
                            <span>❤️</span>
                            <div>
                                <strong>Engagement</strong>
                                <small>
                                    Like and comment
                                </small>
                            </div>
                        </div>

                    </div>

                </aside>

            </div>

        </main>
    );
}

export default Home;