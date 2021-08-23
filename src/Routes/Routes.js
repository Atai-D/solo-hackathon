import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Authorization/SignUp";
import AddBlog from "../components/Blog/AddBlog";
import BlogDetails from "../components/Blog/BlogDetails";
import BlogList from "../components/Blog/BlogList";
import FavoriteBlogs from "../components/Blog/FavoriteBlogs";
import MyBlog from "../components/Blog/MyBlog";
import Cart from "../components/Cart/Cart";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Payment from "../components/Payment/Payment";
import BlogContextProvider from "../contexts/BlogContext";
import AdminRoute from "./AdminRoute";
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
                    <Route exact path="/myblog" component={MyBlog} />
                    <Route exact path="/blog/:id" component={BlogDetails} />
                    <Route exact path="/payment" component={Payment} />
                    <ProtectedRoute exact path="/login" component={Login} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/favorite" component={FavoriteBlogs} />
                </Switch>
            </BlogContextProvider>
        </BrowserRouter>
    );
};

export default Routes;
