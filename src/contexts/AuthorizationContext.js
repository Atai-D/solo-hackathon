import React, { createContext, useContext, useEffect, useState } from "react";
import fire from "../components/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const [showPasswordField, setShowPasswordField] = useState(true);
    const [showReset, setShowReset] = useState(false);

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };
    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleLogIn = (e) => {
        e.preventDefault();
        clearErrors();

        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setShowReset(true);
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    function resetPassword(email) {
        const auth = fire.auth();
        return auth.sendPasswordResetEmail(email);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        clearErrors();
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const ref = fire.firestore().collection("users");
                let newUser = {
                    email: email,
                    password: password,
                    lastOrders: [],
                    lastViews: [],
                    favorites: [],
                    id: uuidv4(),
                };
                ref.doc(newUser.id)
                    .set(newUser)
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    const values = {
        email,
        user,
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
        resetPassword,
        showReset,
        setShowReset,
        showPasswordField,
        setShowPasswordField,
    };

    return (
        <authContext.Provider value={values}>{children}</authContext.Provider>
    );
};

export default AuthContextProvider;
