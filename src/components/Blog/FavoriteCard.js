import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fire from "../firebase/firebase";
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
    const { addBlogToFavorites } = useBlog();

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
                        <h1 className="recipe-title">
                            <NavLink to={`blog/${blog?.id}`}>
                                {blog?.title}
                            </NavLink>
                        </h1>
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
