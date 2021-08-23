import React, { useEffect, useState } from "react";
import fire from "../firebase/firebase";

const FavoriteCard = ({ blogsId }) => {
    const [blog, setBlog] = useState({});
    useEffect(async () => {
        const ref = fire.firestore().collection("blogs");
        let detailsBlog = {};
        await ref
            .doc(blogsId)
            .get()
            .then((snapshot) => {
                detailsBlog = snapshot.data();
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
        <div>
            <h1>{blog?.title}</h1>
        </div>
    );
};

export default FavoriteCard;
