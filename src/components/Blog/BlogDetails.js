import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { Button, Grid } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,

        backgroundColor: "#f0ed90",
        fontFamily: "nunito",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
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
        getBlogsData,
        deleteBlogDetails,
        setEditModal,
        setEdittingId,
        addLike,
        history,
        addComment,
        addBlogToFavorites,
    } = useBlog();

    useEffect(() => {
        setEdittingId(id);
        getBlogDetails(id);
        checkLikes();
        checkFav();
        addBlogToLastViews();
    }, []);

    const handleDeleteBtn = (id) => {
        // console.log(id);
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
        const idToFind = newUser?.favorites?.filter(
            (blogsId) => blogsId === blogDetails.id
        );
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
        console.log(user);
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
    return (
        <div style={{ overflowX: "hidden" }}>
            {blogDetails ? (
                <Grid
                    container
                    spacing={10}
                    style={{
                        margin: "20px 0",
                        padding: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100vw",
                    }}
                >
                    <Card className={classes.root}>
                        <CardHeader
                            title={blogDetails.title}
                            subheader={new Date(
                                blogDetails?.date
                            ).toUTCString()}
                        />
                        <CardMedia
                            className={classes.media}
                            image={blogDetails.image}
                            title="Paella dish"
                        />
                        <CardActions style={{ marginLeft: "25px" }}>
                            <h5>
                                likes:{" "}
                                {blogDetails?.usersLikes?.length
                                    ? blogDetails?.usersLikes?.length
                                    : 0}
                            </h5>
                            {email ? (
                                <>
                                    {!activeLike ? (
                                        <FavoriteBorderIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleLikeBtn()}
                                        />
                                    ) : (
                                        <FavoriteIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleLikeBtn()}
                                        />
                                    )}
                                    {!activeFav ? (
                                        <BookmarkBorderIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleFavBtn(blogDetails)
                                            }
                                        />
                                    ) : (
                                        <BookmarkIcon
                                            color="#fff"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                handleFavBtn(blogDetails)
                                            }
                                        />
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                            {email == "ataydjirgalbaev@gmail.com" ? (
                                <>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => handleDeleteBtn(id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => handleEditBtn(id)}
                                    >
                                        <EditIcon />
                                    </Button>
                                    <div>
                                        <EditBlog />
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </CardActions>
                        <CardContent style={{ marginLeft: "20px" }}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {blogDetails.text}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price: {blogDetails.price} KG
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                Category: {blogDetails.category}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                {/* {blogDetails.priority == 2 ? (
                                    <em style={{ color: "red" }}>
                                        RECOMENDED BY B-BBLOG
                                    </em>
                                ) : blogDetails.priority == 3 ? (
                                    <>
                                        <em style={{ color: "red" }}>
                                            Автор:{blogDetails.author}
                                        </em>
                                        <br />
                                        <em style={{ color: "red" }}>
                                            RECOMENDED BY B-BBLOG
                                        </em>
                                    </>
                                ) : (
                                    <em> Автор:{blogDetails.author}</em>
                                )} */}
                            </Typography>
                        </CardContent>
                        <div style={{ marginLeft: "40px" }}>
                            {email ? (
                                <Button onClick={handleOpenComment}>
                                    Add Comment
                                </Button>
                            ) : (
                                ""
                            )}
                            <br />
                            {openInp ? (
                                <>
                                    <input
                                        type="text"
                                        value={commentInp}
                                        style={{ backgroundColor: "#f0ed90" }}
                                        onChange={(e) =>
                                            setCommentInp(e.target.value)
                                        }
                                    />
                                    <Button onClick={handleSendComment}>
                                        <SendIcon
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                            {blogDetails?.comments?.length > 0 ? (
                                blogDetails.comments.map((comment) => (
                                    <CommentCard
                                        comment={comment}
                                        blogDetails={blogDetails}
                                        id={id}
                                    />
                                ))
                            ) : (
                                <>
                                    <div>Здесь нет комментариев</div>
                                </>
                            )}
                        </div>
                    </Card>
                </Grid>
            ) : (
                ""
            )}
        </div>
    );
}
