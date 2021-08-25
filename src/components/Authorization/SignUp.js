import React from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import "./SignUp.css";

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogIn,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        resetPassword,
        showReset,
        showPasswordField,
        setShowPasswordField,
    } = useAuth();
    return (
        <>
            <section className="form">
                <form className="login-form">
                    <label>Email address</label>
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
                    {showPasswordField ? (
                        <>
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
                        </>
                    ) : (
                        ""
                    )}
                    <div>
                        {!showPasswordField ? (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        resetPassword(email);
                                    }}
                                >
                                    Change password
                                </button>
                                <p className="message">
                                    Have an account?{" "}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHasAccount(!hasAccount);
                                            setShowPasswordField(true);
                                        }}
                                    >
                                        Sign in
                                    </span>
                                </p>
                                <p className="message">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHasAccount(!hasAccount);
                                            setShowPasswordField(true);
                                        }}
                                        style={{ color: "#00aeff" }}
                                    >
                                        Sign up
                                    </span>
                                </p>
                            </>
                        ) : hasAccount ? (
                            <>
                                <button onClick={handleLogIn}>Sign in</button>
                                <p className="message">
                                    Don't have an account?{" "}
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHasAccount(!hasAccount);
                                        }}
                                        style={{ color: "#00aeff" }}
                                    >
                                        Sign up
                                    </span>
                                </p>
                                {showReset ? (
                                    <p className="message">
                                        Forgot your{" "}
                                        <span
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPasswordField(false);
                                            }}
                                            style={{ color: "#00aeff" }}
                                        >
                                            password?
                                        </span>
                                    </p>
                                ) : (
                                    ""
                                )}
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
                                        style={{ color: "#00aeff" }}
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
