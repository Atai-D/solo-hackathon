import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fire from "../firebase/firebase";
import BlogCard from "./BlogCard";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useBlog } from "../../contexts/BlogContext";
import { useAuth } from "../../contexts/AuthorizationContext";

const FavoriteCard = ({ blogsId }) => {
    const [activeFav, setActiveFav] = useState(false);
    const [blog, setBlog] = useState({});
    const {
        user: { email },
    } = useAuth();
    const {
        deleteBlog,
        getBlogsData,
        setEditModal,
        edittingId,
        setEdittingId,
        addBlogToCart,
        addLike,
        addBlogToFavorites,
        addProductToCart,
    } = useBlog();

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
            (blogsId1) => blogsId1 === blogsId
        );
        if (idToFind?.length === 0) {
            setActiveFav(false);
        } else {
            setActiveFav(true);
        }
    };

    const handleFavBtn = async (blog) => {
        await addBlogToFavorites(blog);
        checkFav();
    };

    useEffect(async () => {
        const ref = fire.firestore().collection("blogs");
        let detailsBlog = {};
        await ref
            .doc(blogsId)
            .get()
            .then((snapshot) => {
                detailsBlog = snapshot.data();
                checkFav();
            })
            .catch((err) => {
                console.log(err);
            });
        setBlog(detailsBlog);
    }, []);
    // debugger;
    useEffect(() => {
        console.log(blog);
    }, [blog]);
    return (
        <>
            <div className="small">
                <article className="recipe">
                    <NavLink to={`blog/${blog?.id}`}>
                        <div className="pizza-box">
                            <img
                                src={blog?.image}
                                width="1500"
                                height="1368"
                                alt={blog?.image}
                            />
                        </div>
                    </NavLink>
                    <div className="recipe-content">
                        {/* <p className="recipe-tags">
                            <span className="recipe-tag">Gluten Free</span>
                            <span className="recipe-tag">Main dish</span>
                        </p> */}

                        <h1 className="recipe-title">
                            <NavLink to={`blog/${blog?.id}`}>
                                {blog?.title}
                            </NavLink>
                        </h1>

                        {/* <p className="recipe-metadata">
                            <span className="recipe-rating">
                                ★★★★<span>☆</span>
                            </span>
                            <span className="recipe-votes">(12 votes)</span>
                        </p> */}

                        {/* <p className="recipe-desc">{blog?.text}</p> */}

                        {/* <button
                            className="recipe-save"
                            onClick={() => handleFavBtn(blog)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={activeFav ? "#000" : "#fff"}
                            >
                                <path
                                    d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                                    // fill="currentColor"
                                />
                            </svg>
                            Favorite
                        </button> */}
                        {!activeFav ? (
                            <BookmarkBorderIcon
                                color="#fff"
                                style={{
                                    cursor: "pointer",
                                    fontSize: "40px",
                                }}
                                onClick={() => handleFavBtn(blog)}
                            />
                        ) : (
                            <BookmarkIcon
                                color="#fff"
                                style={{
                                    cursor: "pointer",
                                    fontSize: "40px",
                                }}
                                onClick={() => handleFavBtn(blog)}
                            />
                        )}
                    </div>
                </article>
            </div>
        </>
    );
};

export default FavoriteCard;
