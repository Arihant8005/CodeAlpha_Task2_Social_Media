import { useEffect, useState } from "react";

function Profile() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/users"
            );

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const handleFollow = async (userId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/users/${userId}/follow`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage(data.message);

            fetchUsers();
        } catch (error) {
            console.error("Follow error:", error);
        }
    };

    return (
        <main className="profile-page">

            <div className="profile-container">

                <div className="profile-hero">

                    <div className="large-avatar">
                        👤
                    </div>

                    <div>
                        <p className="profile-label">
                            COMMUNITY
                        </p>

                        <h1>Discover People</h1>

                        <p>
                            Connect with people and grow
                            your social network.
                        </p>
                    </div>

                </div>

                {message && (
                    <div className="profile-message">
                        {message}
                    </div>
                )}

                <div className="people-header">
                    <div>
                        <h2>People on Socially</h2>
                        <p>
                            Discover users and connect with
                            the community.
                        </p>
                    </div>

                    <span>
                        {users.length} users
                    </span>
                </div>

                <div className="people-grid">

                    {users.length === 0 ? (
                        <div className="empty-people">
                            <div>👥</div>
                            <h3>No users found</h3>
                            <p>
                                There are no other users
                                available right now.
                            </p>
                        </div>
                    ) : (
                        users.map((user) => (
                            <div
                                className="person-card"
                                key={user._id}
                            >

                                <div className="person-top">

                                    <div className="person-avatar">
                                        {user.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="person-info">
                                        <h3>{user.name}</h3>

                                        <span>
                                            @{user.username}
                                        </span>
                                    </div>

                                </div>

                                <p className="person-bio">
                                    {user.bio ||
                                        "No bio available yet."}
                                </p>

                                <div className="person-stats">

                                    <div>
                                        <strong>
                                            {user.followers?.length ||
                                                0}
                                        </strong>

                                        <span>
                                            Followers
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            {user.following?.length ||
                                                0}
                                        </strong>

                                        <span>
                                            Following
                                        </span>
                                    </div>

                                </div>

                                <button
                                    className="follow-button"
                                    onClick={() =>
                                        handleFollow(user._id)
                                    }
                                >
                                    + Follow
                                </button>

                            </div>
                        ))
                    )}

                </div>

            </div>

        </main>
    );
}

export default Profile;