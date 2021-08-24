import React, { useEffect, useState } from "react";
import fire from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthorizationContext";
import ChatCard from "./ChatCard";
import SendIcon from "@material-ui/icons/Send";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const db = fire.firestore();
    const [message, setMessage] = useState("");
    const {
        user: { email },
    } = useAuth();

    useEffect(() => {
        if (db) {
            db.collection("chat")
                .orderBy("createdAt")
                .limit(100)
                .onSnapshot((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    setMessages(data);
                });
        }
    }, [db]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (db) {
            let newMessage = {
                text: message,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                id: uuidv4(),
                author: email,
            };
            db.collection("chat").doc(newMessage.id).set(newMessage);
            setMessage("");
        }
    };

    return (
        <>
            {messages?.length > 0 ? (
                <div>
                    {messages.map((message) => (
                        <ChatCard {...message} />
                    ))}
                </div>
            ) : (
                ""
            )}
            <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message"
                />
                <button type="submit" disabled={!message}>
                    <SendIcon>Send</SendIcon>
                </button>
            </form>
        </>
    );
};

export default Chat;
