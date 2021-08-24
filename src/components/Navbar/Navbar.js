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

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { BLOG_LIMIT } from "../../helpers/consts";
import { useBlog } from "../../contexts/BlogContext";
import BookIcon from "@material-ui/icons/Book";

import "./Navbar.css";
import {
    Container,
    Nav,
    Navbar as NavbarB,
    NavDropdown,
} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
        minWidth: "100vw",
    },
    grow: {
        flexGrow: 1,
        maxWidth: "1500px",
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    btn: {
        backgroundColor: "#fff",
        color: "#00aeff",
        marginRight: "5px",
        fontFamily: "nunito",
        border: "1px solid #fff",
        marginTop: "-3px",
        "&:hover": {
            // backgroundColor: "#00aeff",
            border: "1px solid #00aeff",
            // color: "#4a825b",
        },
    },
    title: {
        color: "#fff",
    },
    mbMenu: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: "#bfe0c2",
        textDecoration: "none",
    },
    navLogoutBtn: {
        border: "1px solid white",
        color: "white",
    },
}));

export default function Navbar() {
    const history = useHistory();

    const { getCart, deleteCart } = useBlog();

    const {
        user: { email },
        handleLogout,
        hasAccount,
        setHasAccount,
    } = useAuth();

    useEffect(() => {
        getCart();
    }, []);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = "primary-search-account-menu-mobile";

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem
                className={classes.mbMenu}
                onClick={handleProfileMenuOpen}
            >
                <>
                    <NavLink
                        style={{
                            color: "#fff",
                            fontSize: "1.25rem",
                            marginRight: "15px",
                            paddingTop: "4px",
                        }}
                        to="/promotion"
                    >
                        Promotion
                    </NavLink>
                    <NavLink
                        style={{
                            color: "#fff",
                            fontSize: "1.25rem",
                            marginRight: "15px",
                            paddingTop: "4px",
                        }}
                        to="/mypromotions"
                    >
                        My Promotions
                    </NavLink>
                </>
                <NavLink
                    style={{
                        color: "#fff",
                        fontSize: "1.25rem",
                        marginRight: "15px",
                        fontFamily: "nunito",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        textDecoration: "none",
                    }}
                    to={`/bloglist?_limit=${BLOG_LIMIT}&_sort=priority&_order=desc`}
                >
                    All blogs
                </NavLink>
                <NavLink
                    style={{
                        color: "#fff",
                        fontSize: "1.25rem",
                        marginRight: "15px",
                        fontFamily: "nunito",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        textDecoration: "none",
                    }}
                    to="/myblog"
                >
                    My Blogs
                </NavLink>
                <NavLink
                    style={{
                        color: "#fff",
                        fontSize: "1.25rem",
                        marginRight: "15px",
                        fontFamily: "nunito",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        textDecoration: "none",
                    }}
                    to="/addblog"
                >
                    Add Blog
                </NavLink>

                <>
                    <Button
                        className={classes.btn}
                        onClick={() => {
                            deleteCart();
                            alert("Вы вышли из аккаунта");
                            handleLogout();
                            history.push("/");
                        }}
                    >
                        Log out
                    </Button>
                    {/* <Typography variant="p">{logged.email}</Typography> */}
                </>
                <div>
                    {!email ? (
                        <>
                            <ButtonUI className={classes.btn}>Sign Up</ButtonUI>
                            <ButtonUI
                                color="inherit"
                                focusVisible={false}
                                className={classes.btn}
                            >
                                Log in
                            </ButtonUI>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.navbar}>
            {/* <AppBar style={{ backgroundColor: "#00aeff", position: "static" }}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.5rem",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            B B-Blog
                        </NavLink>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}></div>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                paddingTop: "4px",
                            }}
                            to="/cart"
                        >
                            Cart
                        </NavLink>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to={`/bloglist?_limit=${BLOG_LIMIT}&_sort=priority&_order=desc`}
                        >
                            All blogs
                        </NavLink>

                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to="/favorite"
                        >
                            Favorite
                        </NavLink>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to="/addblog"
                        >
                            Add Blog
                        </NavLink>

                        {email ? (
                            <>
                                <Button
                                    className={classes.navLogoutBtn}
                                    onClick={() => {
                                        alert("Вы вышли из аккаунта");
                                        history.push("/");
                                        handleLogout();
                                        deleteCart();
                                    }}
                                >
                                    Log out
                                </Button>
                                {email}
                            </>
                        ) : (
                            ""
                        )}
                        <div>
                            {!email ? (
                                <>
                                    <ButtonUI
                                        className={classes.btn}
                                        onClick={() => {
                                            history.push("/login");
                                            setHasAccount(false);
                                        }}
                                    >
                                        Sign Up
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
                                        Log in
                                    </ButtonUI>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu} */}
            <NavbarB bg="light" expand="lg" className="navig">
                <Container>
                    <NavbarB.Brand>
                        <NavLink to="/home" className="home-link">
                            HACKASHOP
                        </NavLink>
                    </NavbarB.Brand>
                    <NavbarB.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarB.Collapse
                        id="basic-navbar-nav"
                        className="wrapper-c"
                    >
                        <Nav className="me-auto">
                            {email ? (
                                <>
                                    <NavLink
                                        className="navig-item"
                                        to="/myviews"
                                    >
                                        MyViews
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
                            {email ? (
                                <>
                                    <NavLink
                                        className="navig-item"
                                        to="/favorite"
                                    >
                                        Favorites
                                    </NavLink>
                                    <NavLink className="navig-item" to="/chat">
                                        Chat
                                    </NavLink>
                                </>
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
