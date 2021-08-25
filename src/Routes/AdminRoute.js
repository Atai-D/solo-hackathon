import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthorizationContext";

const AdminRoute = ({ component: Component, ...rest }) => {
    const {
        user: { email },
    } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (email == "ataydjirgalbaev@gmail.com") {
                    return <Component />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default AdminRoute;
