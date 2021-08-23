import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";

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
            <section>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <p>{emailError}</p>
                    <label>Password</label>
                    <input
                        type="password"
                        autoFocus
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>{passwordError}</p>
                    <div>
                        {hasAccount ? (
                            <>
                                <button onClick={handleLogIn}>Sign in</button>
                                <p>
                                    Don't have an account ?
                                    <span
                                        onClick={() =>
                                            setHasAccount(!hasAccount)
                                        }
                                    >
                                        Sign up
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignup}>Sign up</button>
                                <p>
                                    Have an account ?
                                    <span
                                        onClick={() =>
                                            setHasAccount(!hasAccount)
                                        }
                                    >
                                        Sign in
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
