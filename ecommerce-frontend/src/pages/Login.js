import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8081/auth/login",
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Credentials");
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={handleLogin}
                >

                    Login

                </button>

            </div>

        </div>
    );
}

export default Login;