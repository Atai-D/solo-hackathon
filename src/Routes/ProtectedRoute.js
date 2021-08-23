import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthorizationContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        user: { email },
    } = useAuth();
    // useEffect(() => {
    //     console.log(email);
    // }, [email]);
    return (
        // <></>
        <Route
            {...rest}
            render={({ location }) => {
                if (!email) {
                    return <Component />;
                } else {
                    // setLogModal(true);
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
