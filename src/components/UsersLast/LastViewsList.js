import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import FavoriteCard from "../Blog/FavoriteCard";
import fire from "../firebase/firebase";

const LastViewsList = () => {
    const {
        user: { email },
    } = useAuth();
    const [lastViews, setLastViews] = useState([]);
    useEffect(async () => {
        const ref = fire.firestore().collection("users");
        const refGet = await ref.get();
        let newUser = {};
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                newUser = doc.data();
            }
        });
        setLastViews(newUser.lastViews);
    }, []);
    return (
        <>
            <h1 style={{ margin: "auto" }}>My Last Viewed Products:</h1>
            <div className="fav-container">
                {lastViews?.length > 0
                    ? lastViews.map((blogsId) => (
                          <FavoriteCard blogsId={blogsId} />
                      ))
                    : "Check some products"}
            </div>
        </>
    );
};

export default LastViewsList;
