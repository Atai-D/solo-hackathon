import React from "react";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";

const MyBlog = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {user ? (
                user.usersBlogs.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {user?.usersBlogs.map((blog) => (
                            <BlogCard blog={blog} showAuthor={false} />
                        ))}
                        <EditBlog />
                    </div>
                ) : (
                    <h1 style={{ color: "#caedc5", fontFamily: "nunito" }}>
                        Похоже у вас нет блогов
                    </h1>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default MyBlog;
