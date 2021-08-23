import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import fire from "../firebase/firebase";
import FavoriteCard from "./FavoriteCard";

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
        <div>
            <h1>favorite</h1>
            {favorites?.map((id) => (
                <FavoriteCard key={id} blogsId={id} />
            ))}
        </div>
    );
};

export default FavoriteBlogs;
