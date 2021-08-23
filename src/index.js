import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthorizationContextProvider from "./contexts/AuthorizationContext";

ReactDOM.render(
    <AuthorizationContextProvider>
        <App />
    </AuthorizationContextProvider>,
    document.getElementById("root")
);
