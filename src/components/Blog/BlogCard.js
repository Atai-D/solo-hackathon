import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { JSON_API_BLOGS, JSON_API_USERS } from "../../helpers/consts";
import axios from "axios";
import { useBlog } from "../../contexts/BlogContext";
import EditBlog from "./EditBlog";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useAuth } from "../../contexts/AuthorizationContext";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import fire from "../firebase/firebase";

const useStyles = makeStyles({
    cardRoot: {
        width: 300,
        height: 550,
        margin: 15,
        // backgroundColor: "#f0ed90",
        fontFamily: "nunito",
    },
    blogCardAuthor: {},
    blogCardBtn: {
        width: "100%",
    },
    blogBtn: {
        color: "black",
        margin: "3px",
        width: "100%",
    },
    blogCardInf: {},
});

export default function BlogCard({ blog, showAuthor }) {
    const classes = useStyles();
    const {
        user: { email },
    } = useAuth();
    const history = useHistory();

    const {
        deleteBlog,
        getBlogsData,
        setEditModal,
        edittingId,
        setEdittingId,
        addBlogToCart,
        addLike,
        addBlogToFavourites,
    } = useBlog();

    const handleDeleteBtn = (id) => {
        // console.log(blog);
        deleteBlog(id);
        history.push("/bloglist");
    };

    const handleEditBtn = (id) => {
        // console.log(id);
        setEditModal(true);
        setEdittingId(id);
    };

    const handlePromotionBtn = (blog, authorId) => {
        addBlogToCart(blog);
    };

    const handleLikeBtn = async (blog, blogsId) => {
        await addLike(blog, blogsId);
        checkLikes();
    };

    const handleFavBtn = async (blog) => {
        await addBlogToFavourites(blog);
        checkFav();
    };

    const [activeLike, setActiveLike] = useState(false);
    const [activeFav, setActiveFav] = useState(false);

    useEffect(() => {
        checkLikes();
        checkFav();
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
        if (emailToFind.length === 0) {
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

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sx={3}>
                    <Card className={classes.cardRoot} elevation={5}>
                        <CardActionArea
                            id={blog.id}
                            onClick={() => {
                                history.push(`/blog/${blog.id}`);
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt="asd"
                                height="200"
                                image={blog.image}
                                title="Show more about this blog"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {blog.title}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="p"
                                    component="p"
                                >
                                    Likes:{" "}
                                    {blog?.usersLikes?.length
                                        ? blog?.usersLikes?.length
                                        : 0}
                                    <br />
                                    Comments:{" "}
                                    {blog?.comments?.length
                                        ? blog?.comments?.length
                                        : 0}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Price: {blog.price} KG
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {blog?.text
                                        ?.split("")
                                        ?.slice(0, 20)
                                        ?.join("") + "..."}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Category: {blog.category}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions
                            className={classes.blogCardInf}
                        ></CardActions>
                        <CardActions>
                            {email ? (
                                <>
                                    {!activeLike ? (
                                        <FavoriteBorderIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleLikeBtn(blog, blog.id)
                                            }
                                        />
                                    ) : (
                                        <FavoriteIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleLikeBtn(blog, blog.id)
                                            }
                                        />
                                    )}
                                    {!activeFav ? (
                                        <BookmarkBorderIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFavBtn(blog)}
                                        />
                                    ) : (
                                        <BookmarkIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFavBtn(blog)}
                                        />
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </CardActions>
                        <CardActions className={classes.blogCardInf}>
                            {email == "ataydjirgalbaev@gmail.com" ? (
                                <div>
                                    <DeleteOutlineIcon
                                        className={classes.blogBtn}
                                        size="#fff"
                                        color="secondary"
                                        onClick={() => handleDeleteBtn(blog.id)}
                                        style={{
                                            display: "flex",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </DeleteOutlineIcon>
                                    <EditOutlinedIcon
                                        className={classes.blogBtn}
                                        style={{ cursor: "pointer" }}
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleEditBtn(blog.id)}
                                    >
                                        Edit
                                    </EditOutlinedIcon>
                                    <Button
                                        className={classes.blogBtn}
                                        size="small"
                                        color="secondary"
                                        onClick={() =>
                                            handlePromotionBtn(
                                                blog,
                                                blog.authorsId
                                            )
                                        }
                                    >
                                        Promote
                                    </Button>
                                </div>
                            ) : (
                                ""
                            )}
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {
                                    // <div className={classes.blogCardAuthor}>
                                    //     {showAuthor ? (
                                    //         blog.priority == 2 ? (
                                    //             <em style={{ color: "red" }}>
                                    //                 RECOMENDED BY B-BBLOG
                                    //             </em>
                                    //         ) : blog.priority == 3 ? (
                                    //             <>
                                    //                 <em
                                    //                     style={{
                                    //                         color: "black",
                                    //                     }}
                                    //                 >
                                    //                     Author:{blog.author}
                                    //                 </em>
                                    //                 <br />
                                    //                 <em
                                    //                     style={{
                                    //                         color: "red",
                                    //                     }}
                                    //                 >
                                    //                     RECOMENDED BY B-BBLOG
                                    //                 </em>
                                    //             </>
                                    //         ) : (
                                    //             <em style={{ color: "black" }}>
                                    //                 Author: {blog.author}
                                    //             </em>
                                    //         )
                                    //     ) : (
                                    //         ""
                                    //     )}
                                    // </div>
                                }
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
