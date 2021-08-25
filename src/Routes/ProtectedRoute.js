import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthorizationContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        user: { email },
    } = useAuth();
    return (
        // <></>
        <Route
            {...rest}
            render={({ location }) => {
                if (email) {
                    return <Component />;
                } else {
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
