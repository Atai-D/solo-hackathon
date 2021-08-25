import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthorizationContext";
import BlogCard from "../Blog/BlogCard";
import FavoriteCard from "../Blog/FavoriteCard";
import fire from "../firebase/firebase";
import LastOrdersCard from "./LastOrdersCard";

const LastOrdersList = () => {
    const {
        user: { email },
    } = useAuth();
    const [lastOrders, setLastOrders] = useState([]);
    useEffect(async () => {
        const ref = fire.firestore().collection("users");
        const refGet = await ref.get();
        let newUser = {};
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                newUser = doc.data();
            }
        });
        setLastOrders(newUser.lastOrders);
    }, []);
    return (
        <div className="fav-container">
            {lastOrders?.length > 0
                ? lastOrders.map((payment) => {
                      return <LastOrdersCard payment={payment} />;
                  })
                : "Order something"}
        </div>
    );
};

export default LastOrdersList;
