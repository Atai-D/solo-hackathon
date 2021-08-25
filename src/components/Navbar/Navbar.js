import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth, useAutho } from "../../contexts/AuthorizationContext";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button as ButtonUI, Button } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";

import { NavLink, useHistory } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";

import "./Navbar.css";
import { Container, Nav, Navbar as NavbarB } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
        minWidth: "100vw",
    },
    btn: {
        backgroundColor: "#fff",
        color: "#00aeff",
        marginRight: "5px",
        fontFamily: "nunito",
        border: "1px solid #fff",
        marginTop: "-3px",
        "&:hover": {
            border: "1px solid #00aeff",
        },
    },
}));

export default function Navbar() {
    const history = useHistory();

    const { getCart, deleteCart } = useBlog();

    const {
        user: { email },
        handleLogout,
        setHasAccount,
    } = useAuth();

    useEffect(() => {
        getCart();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.navbar}>
            <NavbarB bg="light" expand="lg" className="navig">
                <Container>
                    <NavbarB.Brand>
                        <NavLink to="/" className="home-link">
                            HACKASHOP
                        </NavLink>
                    </NavbarB.Brand>
                    <NavbarB.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarB.Collapse
                        id="basic-navbar-nav"
                        className="wrapper-c"
                    >
                        <Nav className="me-auto">
                            {email && email !== "ataydjirgalbaev@gmail.com" ? (
                                <>
                                    <NavLink
                                        className="navig-item"
                                        to="/myviews"
                                    >
                                        MyViews
                                    </NavLink>
                                    <NavLink
                                        className="navig-item"
                                        to="/myorders"
                                    >
                                        MyOrders
                                    </NavLink>
                                    <NavLink className="navig-item" to="/cart">
                                        Cart
                                    </NavLink>
                                </>
                            ) : (
                                ""
                            )}
                            <NavLink className="navig-item" to={`/bloglist`}>
                                AllBlogs
                            </NavLink>
                            {email && email !== "ataydjirgalbaev@gmail.com" ? (
                                <>
                                    <NavLink
                                        className="navig-item"
                                        to="/favorite"
                                    >
                                        Favorites
                                    </NavLink>
                                </>
                            ) : (
                                ""
                            )}
                            {email !== "ataydjirgalbaev@gmail.com" ? (
                                <NavLink className="navig-item" to="/chat">
                                    Chat
                                </NavLink>
                            ) : (
                                ""
                            )}
                            {email === "ataydjirgalbaev@gmail.com" ? (
                                <NavLink className="navig-item" to="/addblog">
                                    AddBlog
                                </NavLink>
                            ) : (
                                ""
                            )}

                            {email ? (
                                <>
                                    <Button
                                        className={classes.btn}
                                        onClick={() => {
                                            alert("Вы вышли из аккаунта");
                                            history.push("/");
                                            handleLogout();
                                            deleteCart();
                                        }}
                                    >
                                        LogOut
                                    </Button>
                                    {email}
                                </>
                            ) : (
                                ""
                            )}

                            {!email ? (
                                <>
                                    <ButtonUI
                                        className={classes.btn}
                                        onClick={() => {
                                            history.push("/login");
                                            setHasAccount(false);
                                        }}
                                    >
                                        SignUp
                                    </ButtonUI>
                                    <ButtonUI
                                        color="inherit"
                                        focusVisible={false}
                                        className={classes.btn}
                                        onClick={() => {
                                            history.push("/login");
                                            setHasAccount(true);
                                        }}
                                    >
                                        Login
                                    </ButtonUI>
                                </>
                            ) : (
                                ""
                            )}
                        </Nav>
                    </NavbarB.Collapse>
                </Container>
            </NavbarB>
        </div>
    );
}
