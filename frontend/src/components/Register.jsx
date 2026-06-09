import "./style/register.css";
export default function Register() {
    return <>
    <div className="parent">
           <form className="register-form">
      <h2>Create Account</h2>
      <p>Join the luxury experience</p>

      <input type="text" placeholder="Full Name" />
      <input type="email" placeholder="Email Address" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />

      <div className="form-options">
        <label>
          <input type="checkbox" />
          I agree to the terms
        </label>
      </div>

      <button type="submit" className="register-button">
        Sign Up
      </button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
    </div>
        </>    
}