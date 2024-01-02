"use client";
import "./login.scss";
export default function LoginPage() {
  return (
    <div className="login-main">
      <form>
        <h2>Login</h2>
        <input placeholder="Username" />

        <button>Login</button>
        <div className="no-accout">
          <p tabIndex={0}>Don't have a account yet?</p>
        </div>
      </form>
    </div>
  );
}
