import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const LogIn = () => {
    const { user } = useAuth;
    return (
        <>
            {user ? (
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            ) : (
                <Login />
            )}
        </>
    );
};

export default LogIn;
