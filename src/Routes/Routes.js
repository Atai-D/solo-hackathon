import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Authorization/SignUp";
import AddBlog from "../components/Blog/AddBlog";
import BlogDetails from "../components/Blog/BlogDetails";
import BlogList from "../components/Blog/BlogList";
import FavoriteBlogs from "../components/Blog/FavoriteBlogs";
import Cart from "../components/Cart/Cart";
import Chat from "../components/Chat/Chat";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Payment from "../components/Payment/Payment";
import BlogContextProvider from "../contexts/BlogContext";
import AdminRoute from "./AdminRoute";
import LoginRoute from "./LoginRoute";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
    return (
        <BrowserRouter>
            <BlogContextProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/bloglist" component={BlogList} />
                    <AdminRoute exact path="/addblog" component={AddBlog} />
                    <Route exact path="/blog/:id" component={BlogDetails} />
                    <ProtectedRoute exact path="/payment" component={Payment} />
                    <LoginRoute exact path="/login" component={Login} />
                    <ProtectedRoute exact path="/cart" component={Cart} />
                    <ProtectedRoute
                        exact
                        path="/favorite"
                        component={FavoriteBlogs}
                    />
                    <ProtectedRoute exact path="/chat" component={Chat} />
                </Switch>
            </BlogContextProvider>
        </BrowserRouter>
    );
};

export default Routes;
