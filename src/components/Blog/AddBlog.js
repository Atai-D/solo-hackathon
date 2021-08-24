import { makeStyles } from "@material-ui/core";
import {
    Container,
    Grid,
    TextField,
    Typography,
    Button as ButtonUI,
    MenuItem,
} from "@material-ui/core";
import React from "react";
import { useBlog } from "../../contexts/BlogContext";
import { CATEGORIES } from "../../helpers/consts";

const useStyles = makeStyles({
    inp: {
        color: "#00aeff",
        marginBottom: "10px",
    },
});

const AddBlog = () => {
    const classes = useStyles();
    const {
        blogTitle,
        setBlogTitle,
        blogImage,
        setBlogImage,
        blogText,
        setBlogText,
        blogCategory,
        setBlogCategory,
        blogPrice,
        setBlogPrice,
        addBlog,
    } = useBlog();

    const handleSubmit = async (e) => {
        e.preventDefault();
        addBlog(blogTitle, blogImage, blogText, blogPrice, blogCategory);
        setBlogTitle("");
        setBlogImage("");
        setBlogText("");
        setBlogPrice("");
    };

    return (
        <Container commponent="main" maxWidth="xs">
            <form action="" onSubmit={handleSubmit}>
                <Grid container style={{ margin: "100px 0px" }}>
                    <Typography
                        component="h1"
                        variant="h5"
                        style={{
                            marginBottom: "10px",
                            color: "#00aeff",
                            fontFamily: "nunito",
                        }}
                    >
                        Add Blog
                    </Typography>
                    <Grid>
                        <TextField
                            fullWidth={720}
                            name="title"
                            variant="outlined"
                            required
                            label="Title"
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            className={classes.inp}
                        />
                        <br />
                        <TextField
                            fullWidth={720}
                            name="image"
                            variant="outlined"
                            required
                            label="Image URL"
                            type="text"
                            value={blogImage}
                            onChange={(e) => setBlogImage(e.target.value)}
                            className={classes.inp}
                        />
                        <br />
                        <TextField
                            fullWidth={720}
                            name="price"
                            variant="outlined"
                            required
                            label="Average Price (KG)"
                            type="number"
                            value={blogPrice}
                            onChange={(e) => setBlogPrice(e.target.value)}
                            className={classes.inp}
                        />

                        <TextField
                            fullWidth={720}
                            name="text"
                            label="Your text"
                            multiline
                            rows={5}
                            cols={5}
                            variant="outlined"
                            value={blogText}
                            onChange={(e) => setBlogText(e.target.value)}
                            className={classes.inp}
                        />
                        <br />
                        <TextField
                            fullWidth={720}
                            name="category"
                            id="outlined-select-currency"
                            select
                            required
                            label="Select"
                            value={blogCategory}
                            onChange={(e) => setBlogCategory(e.target.value)}
                            variant="outlined"
                            className={classes.inp}
                            // style={{ color: "#00aeff", fontFamily: "nunito" }}
                        >
                            {CATEGORIES.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <ButtonUI
                        variant="contained"
                        type="submit"
                        className={classes.inp}
                    >
                        Add
                    </ButtonUI>
                </Grid>
            </form>
        </Container>
    );
};

export default AddBlog;
