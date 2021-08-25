import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthorizationContext";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button as ButtonUI, Button } from "@material-ui/core";

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
                                AllHeadphones
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
                            {email && email !== "ataydjirgalbaev@gmail.com" ? (
                                <NavLink className="navig-item" to="/chat">
                                    Chat
                                </NavLink>
                            ) : (
                                ""
                            )}
                            {email === "ataydjirgalbaev@gmail.com" ? (
                                <NavLink className="navig-item" to="/addblog">
                                    AddHeadPhone
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
