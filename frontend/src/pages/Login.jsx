import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
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
                "http://localhost:5000/api/auth/login",
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

            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to server");
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">

                <div className="auth-brand">
                    <div className="auth-logo">S</div>
                    <h1>Welcome back</h1>
                    <p>
                        Sign in to continue your social journey.
                    </p>
                </div>

                <div className="auth-card">

                    <h2>Login</h2>

                    <p className="auth-subtitle">
                        Enter your account details below.
                    </p>

                    <form onSubmit={handleSubmit}>

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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Sign In
                        </button>

                    </form>

                    <div className="auth-footer">
                        Don't have an account?

                        <Link to="/register">
                            Create account
                        </Link>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Login;