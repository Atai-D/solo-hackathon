import React, { useEffect } from "react";
import BlogCard from "../Blog/BlogCard";
import "./LastOrdersCard.css";

const LastOrdersCard = ({ payment }) => {
    useEffect(() => {
        console.log(payment);
    }, []);
    return (
        <>
            <div className="order-container">
                {payment.blogs.map((blog) => {
                    console.log(blog);
                    return (
                        <div className="wrapper">
                            <BlogCard blog={blog.item} />
                            <h3 className="subPrice">
                                {blog.subPrice * blog.count}&#8381;
                            </h3>
                            <h3 className="count">Count: {blog.count}</h3>
                        </div>
                    );
                })}
                <h1 style={{ color: "#00aeff", margin: "auto" }}>
                    Total: {payment.totalPrice}&#8381;
                </h1>
            </div>
        </>
    );
};

export default LastOrdersCard;
