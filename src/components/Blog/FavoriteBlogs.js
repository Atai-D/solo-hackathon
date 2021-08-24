import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import fire from "../firebase/firebase";
import FavoriteCard from "./FavoriteCard";
import "./assets/FavoriteCard.css";

const FavoriteBlogs = () => {
    const [favorites, setFavorites] = useState([]);
    const {
        user: { email },
    } = useAuth();

    useEffect(async () => {
        const ref = fire.firestore().collection("users");
        const refGet = await ref.get();
        let user = {};
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                user = doc.data();
            }
        });
        console.log(user);
        console.log(user.favorites);
        setFavorites(user.favorites);
    }, []);
    return (
        <div class="fav-container">
            {/* <div class="slideshow-buttons">
                    <div class="one"></div>
                    <div class="two"></div>
                    <div class="three"></div>
                    <div class="four"></div>
                </div> */}
            {favorites?.map((id) => (
                <FavoriteCard key={id} blogsId={id} />
            ))}
        </div>
    );
};

export default FavoriteBlogs;
