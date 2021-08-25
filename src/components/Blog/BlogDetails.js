import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { Button } from "@material-ui/core";
import EditBlog from "./EditBlog";
import CommentCard from "./CommentCard";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useAuth } from "../../contexts/AuthorizationContext";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import fire from "../firebase/firebase";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { formatRelative } from "date-fns";
import BlogCard from "./BlogCard";

const useStyles = makeStyles((theme) => ({
    btn: {
        cursor: "pointer",
        marginRight: "40px",
    },
    center: {
        maxWidth: "300px",
        margin: "0 auto",
    },
    recCont: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
}));

export default function BlogDetails() {
    const { id } = useParams();
    const {
        user: { email },
    } = useAuth();
    const classes = useStyles();
    const [openInp, setOpenInp] = useState(false);
    const [commentInp, setCommentInp] = useState("");
    const {
        blogDetails,
        getBlogDetails,
        deleteBlog,
        deleteBlogDetails,
        setEditModal,
        setEdittingId,
        addLike,
        history,
        addComment,
        addBlogToFavorites,
        addBlogToCart,
    } = useBlog();
    const [activeCart, setActiveCart] = useState(false);
    const [recomendations, setRecomendations] = useState([]);

    useEffect(() => {
        setEdittingId(id);
        getBlogDetails(id);
        checkLikes();
        checkFav();
        addBlogToLastViews();
        checkCart();
    }, []);

    useEffect(() => {
        if (blogDetails.brand) {
            renderRecomendations();
        }
    }, [blogDetails.brand]);

    function renderRecomendations() {
        const ref = fire
            .firestore()
            .collection("blogs")
            .where("brand", "==", blogDetails.brand)
            .limit(3);

        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setRecomendations(items);
        });
    }

    const handleDeleteBtn = (id) => {
        deleteBlog(id);
        deleteBlogDetails();
        history.push("/bloglist");
    };

    const handleEditBtn = (id) => {
        setEditModal(true);
        setEdittingId(id);
    };

    const handleLikeBtn = async () => {
        await addLike(blogDetails, id);
        await checkLikes();
        getBlogDetails(id);
    };

    const handleFavBtn = async (blog) => {
        await addBlogToFavorites(blog);
        await checkFav();
        getBlogDetails(id);
    };

    const [activeLike, setActiveLike] = useState(false);
    const [activeFav, setActiveFav] = useState(false);

    async function checkLikes() {
        const ref = fire.firestore().collection("blogs");
        let tempBlog = {};
        await ref
            .doc(blogDetails.id)
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
        const idToFind = newUser?.favorites?.filter((blogsId) => {
            return blogsId === blogDetails.id;
        });
        if (idToFind?.length === 0) {
            setActiveFav(false);
        } else {
            setActiveFav(true);
        }
    };

    async function addBlogToLastViews() {
        const ref = fire.firestore().collection("users");
        const refGet = await ref.get();
        let user = {};
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                user = doc.data();
            }
        });
        const idToFind = user?.lastViews?.filter((blogIds) => blogIds === id);
        if (idToFind?.length === 0) {
            user?.lastViews?.push(id);
            let userWithLast = { ...user };
            ref.doc(user.id).update(userWithLast);
        }
    }

    const handleOpenComment = () => {
        setOpenInp(true);
    };
    const handleSendComment = () => {
        addComment(commentInp, id);
        setOpenInp(false);
        getBlogDetails(id);
        setCommentInp("");
    };

    const checkCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const idToFind = cart?.blogs?.filter(
            (cartBlog) => cartBlog.item.id === blogDetails.id
        );
        if (idToFind?.length === 0) {
            setActiveCart(false);
        } else {
            setActiveCart(true);
        }
    };
    const handleCartBtn = (blog) => {
        addBlogToCart(blog);
        checkCart();
    };
    return (
        <>
            <div className="big" style={{ margin: "0 auto" }}>
                <article className="recipe">
                    <div className="pizza-box">
                        <img
                            src={blogDetails?.image}
                            width="1500"
                            height="1368"
                            alt={blogDetails?.title}
                        />
                    </div>
                    <div className="recipe-content">
                        <h1 className="recipe-title">{blogDetails?.title}</h1>

                        <p className="recipe-metadata">
                            {blogDetails?.createdAt?.seconds ? (
                                <span>
                                    {formatRelative(
                                        new Date(
                                            blogDetails.createdAt.seconds * 1000
                                        ),
                                        new Date()
                                    )}
                                </span>
                            ) : (
                                ""
                            )}
                            <p>
                                likes:{" "}
                                {blogDetails?.usersLikes?.length
                                    ? blogDetails?.usersLikes?.length
                                    : 0}
                                <br />
                                comments:{" "}
                                {blogDetails?.comments?.length
                                    ? blogDetails?.comments?.length
                                    : 0}
                            </p>
                            <h4>Price: {blogDetails.price}&#8381;</h4>
                            <p>
                                Brand: {blogDetails.brand}
                                <br />
                                Type: {blogDetails.type}
                            </p>
                        </p>

                        <p className="recipe-desc">{blogDetails.text}</p>

                        {email == "ataydjirgalbaev@gmail.com" ? (
                            <>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleDeleteBtn(id)}
                                    className={classes.btn}
                                >
                                    <DeleteIcon />
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleEditBtn(id)}
                                    className={classes.btn}
                                >
                                    <EditIcon />
                                </Button>
                                <div>
                                    <EditBlog />
                                </div>
                            </>
                        ) : email ? (
                            <>
                                {!activeLike ? (
                                    <FavoriteBorderIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() => handleLikeBtn()}
                                    />
                                ) : (
                                    <FavoriteIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() => handleLikeBtn()}
                                    />
                                )}
                                {!activeFav ? (
                                    <BookmarkBorderIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() =>
                                            handleFavBtn(blogDetails)
                                        }
                                    />
                                ) : (
                                    <BookmarkIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() =>
                                            handleFavBtn(blogDetails)
                                        }
                                    />
                                )}
                                {!activeCart ? (
                                    <ShoppingCartOutlinedIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() =>
                                            handleCartBtn(blogDetails)
                                        }
                                    />
                                ) : (
                                    <ShoppingCartIcon
                                        color="#fff"
                                        className={classes.btn}
                                        onClick={() =>
                                            handleCartBtn(blogDetails)
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </article>
            </div>
            <div>
                {email ? (
                    <div className={classes.center}>
                        <Button
                            onClick={handleOpenComment}
                            style={{ fontSize: "20px" }}
                        >
                            Add Comment
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                {openInp ? (
                    <div className={classes.center}>
                        <input
                            type="text"
                            value={commentInp}
                            onChange={(e) => setCommentInp(e.target.value)}
                        />
                        <Button onClick={handleSendComment}>
                            <SendIcon
                                style={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </Button>
                    </div>
                ) : (
                    ""
                )}
                {blogDetails?.comments?.length > 0 ? (
                    blogDetails.comments.map((comment, index) => (
                        <div className={classes.center}>
                            <CommentCard
                                key={index}
                                comment={comment}
                                blogDetails={blogDetails}
                                id={id}
                            />
                        </div>
                    ))
                ) : (
                    <>
                        <h2 className={classes.center}>There is no comments</h2>
                    </>
                )}
            </div>
            <h2 style={{ textAlign: "center", margin: "50px 0 10px" }}>
                RECOMENDATIONS:
            </h2>
            <div className={classes.recCont}>
                {recomendations?.length > 0
                    ? recomendations.map((blog, index) => (
                          <BlogCard key={index} blog={blog} />
                      ))
                    : ""}
            </div>
        </>
    );
}
