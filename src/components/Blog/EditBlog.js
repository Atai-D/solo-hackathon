import {
    Container,
    Grid,
    TextField,
    Typography,
    Button as ButtonUI,
} from "@material-ui/core";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useBlog } from "../../contexts/BlogContext";
import { BRANDS } from "../../helpers/consts";

const EditBlog = () => {
    const { editModal, setEditModal, blogDetails, edittingId, saveEditBlog } =
        useBlog();

    const [blog, setBlog] = useState(blogDetails);

    const handleInp = (e) => {
        let obj = {
            ...blog,
            [e.target.name]: e.target.value,
        };
        setBlog(obj);
    };

    useEffect(() => {
        setBlog(blogDetails);
    }, [blogDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveEditBlog(blog, edittingId);
        setEditModal(false);
    };

    return (
        <Modal
            size="lg"
            show={editModal}
            onHide={() => {
                setEditModal(false);
            }}
            style={{ color: "#00aeff", zIndex: "10000" }}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container commponent="main" maxWidth="xs">
                    <form action="" onSubmit={handleSubmit}>
                        <Grid container>
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{ marginBottom: "10px" }}
                            >
                                Add Blog
                            </Typography>
                            <Grid>
                                <TextField
                                    name="title"
                                    variant="outlined"
                                    required
                                    label="Title"
                                    type="text"
                                    value={blog.title}
                                    onChange={handleInp}
                                />
                                <TextField
                                    name="image"
                                    variant="outlined"
                                    required
                                    label="Image URL"
                                    type="text"
                                    value={blog.image}
                                    onChange={handleInp}
                                />
                                <TextField
                                    name="text"
                                    label="Your text"
                                    multiline
                                    rows={5}
                                    cols={5}
                                    variant="outlined"
                                    value={blog.text}
                                    onChange={handleInp}
                                />
                                <TextField
                                    name="price"
                                    variant="outlined"
                                    required
                                    label="Price (RUB)"
                                    type="number"
                                    value={blog.price}
                                    onChange={handleInp}
                                />
                            </Grid>
                            <ButtonUI variant="contained" type="submit">
                                Save
                            </ButtonUI>
                        </Grid>
                    </form>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default EditBlog;
