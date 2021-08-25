import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth } from "../../contexts/AuthorizationContext";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import fire from "../firebase/firebase";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

import "./assets/BlogCard.css";

const useStyles = makeStyles({
    blogBtn: {
        color: "black",
        margin: "3px",
        width: "100%",
    },
});

export default function BlogCard({ blog }) {
    const classes = useStyles();
    const {
        user: { email },
    } = useAuth();
    const history = useHistory();

    const {
        deleteBlog,
        setEditModal,
        setEdittingId,
        addBlogToCart,
        addLike,
        addBlogToFavorites,
        getBlogDetails,
    } = useBlog();

    const handleDeleteBtn = (id) => {
        deleteBlog(id);
        history.push("/bloglist");
    };

    const handleEditBtn = (id) => {
        setEditModal(true);
        setEdittingId(id);
        getBlogDetails(id);
    };

    const handleCartBtn = (blog) => {
        addBlogToCart(blog);
        checkCart();
    };

    const handleLikeBtn = async (blog, blogsId) => {
        await addLike(blog, blogsId);
        checkLikes();
    };

    const handleFavBtn = async (blog) => {
        await addBlogToFavorites(blog);
        checkFav();
    };

    const [activeLike, setActiveLike] = useState(false);
    const [activeFav, setActiveFav] = useState(false);
    const [activeCart, setActiveCart] = useState(false);

    useEffect(() => {
        checkLikes();
        checkFav();
        checkCart();
    }, []);

    async function checkLikes() {
        const ref = fire.firestore().collection("blogs");
        let tempBlog = {};
        await ref
            .doc(blog.id)
            .get()
            .then((snapshot) => {
                tempBlog = snapshot.data();
            })
            .catch((err) => {
                console.log(err);
            });
        const emailToFind = tempBlog?.usersLikes?.filter(
            (usersEmail) => usersEmail === email
        );
        if (emailToFind?.length === 0) {
            setActiveLike(false);
        } else {
            setActiveLike(true);
        }
    }

    const checkFav = async () => {
        const ref = fire.firestore().collection("users");
        let newUser = {};
        const refGet = await ref.get();
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                newUser = doc.data();
            }
        });
        const idToFind = newUser?.favorites?.filter(
            (blogsId) => blogsId === blog.id
        );
        if (idToFind?.length === 0) {
            setActiveFav(false);
        } else {
            setActiveFav(true);
        }
    };

    const checkCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const idToFind = cart?.blogs?.filter(
            (cartBlog) => cartBlog.item.id === blog.id
        );
        if (idToFind?.length === 0) {
            setActiveCart(false);
        } else {
            setActiveCart(true);
        }
    };

    return (
        <>
            <div className="ft-recipe">
                <NavLink to={`/blog/${blog.id}`} className="ft-recipe__thumb">
                    <img src={blog.image} alt={blog.image} />
                </NavLink>
                <div className="ft-recipe__content">
                    <header className="content__header">
                        <div className="row-wrapper">
                            <NavLink
                                to={`/blog/${blog.id}`}
                                className="recipe-title"
                            >
                                {blog.title}
                            </NavLink>
                        </div>
                        <div>
                            Likes:{" "}
                            {blog?.usersLikes?.length
                                ? blog?.usersLikes?.length
                                : 0}
                        </div>
                        <div>
                            Comments:{" "}
                            {blog?.comments?.length
                                ? blog?.comments?.length
                                : 0}
                        </div>
                        <div>Brand: {blog.brand}</div>
                        <h5>
                            Price:{" "}
                            <span style={{ color: "red" }}>
                                {blog.price}&#8381;
                            </span>
                        </h5>
                        <ul className="recipe-details">
                            {email ? (
                                <>
                                    {email == "ataydjirgalbaev@gmail.com" ? (
                                        <>
                                            <li className="recipe-details-item time">
                                                <DeleteOutlineIcon
                                                    className={classes.blogBtn}
                                                    size="#fff"
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleDeleteBtn(blog.id)
                                                    }
                                                    style={{
                                                        display: "flex",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Delete
                                                </DeleteOutlineIcon>
                                            </li>
                                            <li className="recipe-details-item time">
                                                <EditOutlinedIcon
                                                    className={classes.blogBtn}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleEditBtn(blog.id)
                                                    }
                                                >
                                                    Edit
                                                </EditOutlinedIcon>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="recipe-details-item time">
                                                {!activeLike ? (
                                                    <FavoriteBorderIcon
                                                        // className="title"
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleLikeBtn(
                                                                blog,
                                                                blog.id
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <FavoriteIcon
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleLikeBtn(
                                                                blog,
                                                                blog.id
                                                            )
                                                        }
                                                    />
                                                )}
                                            </li>
                                            <li className="recipe-details-item ingredients">
                                                {!activeFav ? (
                                                    <BookmarkBorderIcon
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleFavBtn(blog)
                                                        }
                                                    />
                                                ) : (
                                                    <BookmarkIcon
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleFavBtn(blog)
                                                        }
                                                    />
                                                )}
                                            </li>
                                            <li className="recipe-details-item servings">
                                                {!activeCart ? (
                                                    <ShoppingCartOutlinedIcon
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleCartBtn(blog)
                                                        }
                                                    />
                                                ) : (
                                                    <ShoppingCartIcon
                                                        color="#fff"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleCartBtn(blog)
                                                        }
                                                    />
                                                )}
                                            </li>
                                        </>
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </ul>
                    </header>
                </div>
            </div>
        </>
    );
}
