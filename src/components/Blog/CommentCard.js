import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useBlog } from "../../contexts/BlogContext";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useAuth } from "../../contexts/AuthorizationContext";

const CommentCard = ({ comment, blogDetails, id }) => {
    // console.log(comment);
    const [openEditInp, setOpenEditInp] = useState(false);
    const [editInp, setEditInp] = useState("");
    const { addComment, deleteComment, editComment, getBlogDetails } =
        useBlog();
    const {
        user: { email },
    } = useAuth();
    const handleDeleteComment = (comment, blogDetails, id) => {
        deleteComment(comment, blogDetails, id);
    };

    const handleOpenEditComment = () => {
        setEditInp(comment.comment);
        setOpenEditInp(!openEditInp);
    };

    const handleEditComment = () => {
        editComment(comment, blogDetails, editInp, id);
        // console.log(blogDetails);
        setOpenEditInp(!openEditInp);
    };
    return (
        <div style={{ marginBottom: "30px" }}>
            <h5>
                <em style={{ color: "red" }}>{comment.author}</em>
            </h5>
            {openEditInp ? (
                <>
                    <input
                        value={editInp}
                        onChange={(e) => setEditInp(e.target.value)}
                    />
                    <Button onClick={handleEditComment}>
                        <EditIcon
                            style={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    </Button>
                    <br />
                </>
            ) : (
                <h5>{comment.comment}</h5>
            )}
            {comment.author === email ||
            email === "ataydjirgalbaev@gmail.com" ? (
                <>
                    <Button
                        onClick={() =>
                            handleDeleteComment(comment, blogDetails, id)
                        }
                    >
                        <DeleteIcon
                            style={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    </Button>
                    <Button onClick={handleOpenEditComment}>
                        <EditIcon
                            style={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    </Button>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommentCard;
