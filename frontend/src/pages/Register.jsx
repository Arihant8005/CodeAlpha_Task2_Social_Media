import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Account created successfully!");

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to connect to server");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">

                <div className="auth-brand">
                    <div className="auth-logo">S</div>

                    <h1>Join Socially</h1>

                    <p>
                        Create an account and connect
                        with your community.
                    </p>
                </div>

                <div className="auth-card">

                    <h2>Create account</h2>

                    <p className="auth-subtitle">
                        Fill in your details to get started.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>Full name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <label>Email address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Create Account
                        </button>

                    </form>

                    <div className="auth-footer">
                        Already have an account?

                        <Link to="/login">
                            Sign in
                        </Link>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Register;