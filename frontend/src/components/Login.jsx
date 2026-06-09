import Register from "./Register"
import { Link, Route, Routes } from "react-router-dom"
import "./style/login.css"
export default function Login() {
    return <>
        <div className="parent">
        <form className="login-form">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>

            <input
                type="email"
                placeholder="Email Address"
                required
            />

            <input
                type="password"
                placeholder="Password"
                required
            />

            <div className="form-options">
                <label>
                    <input type="checkbox" />
                    Remember me
                </label>

                <Link to="/forgot-password">
                    Forgot Password?
                </Link>
            </div>

            <button className="login-button" type="submit">
                Login
            </button>

            <p>
                Don't have an account?
                <Link to="/register"> Sign Up</Link>
            </p>
        </form>
        </div>
        
    </>
}