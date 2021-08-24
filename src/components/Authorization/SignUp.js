import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import "./SignUp.css";

const Login = () => {
    const {
        email,
        // user: { email: usersEmail },
        handleLogout,
        setEmail,
        password,
        setPassword,
        handleLogIn,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = useAuth();
    return (
        <>
            <section className="form">
                <form className="login-form">
                    <label>Username</label>
                    <input
                        type="text"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="email"
                    />
                    <p>{emailError}</p>
                    <label>Password</label>
                    <input
                        type="password"
                        autoFocus
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                    <p>{passwordError}</p>
                    <div>
                        {hasAccount ? (
                            <>
                                <button onClick={handleLogIn}>Sign in</button>
                                <p className="message">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHasAccount(!hasAccount);
                                        }}
                                    >
                                        Sign up
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignup}>Sign up</button>
                                <p className="message">
                                    Have an account?{" "}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHasAccount(!hasAccount);
                                        }}
                                    >
                                        Sign in
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
