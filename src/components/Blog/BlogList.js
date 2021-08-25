import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { BLOG_ACTIONS, BLOG_LIMIT, BRANDS } from "../../helpers/consts";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";
import { alpha, makeStyles } from "@material-ui/core/styles";
import fire from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        margin: "10px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,

        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
        marginLeft: "-15px !important",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },

    blogListContainer: {
        background: `url(
            "https://doctorhead.ru/local/templates/doctorhead/theme/build/images/bg.jpg"
        )`,
        paddingBottom: "20px",
    },
    blogListCards: {
        display: "flex",
        flexWrap: "wrap",
    },
    sideBar: {
        paddingLeft: "20px",
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgba(115,209,255,0.9)",
        borderRadius: "20px",
        fontWeight: "bold",
    },
}));

const BlogList = () => {
    const classes = useStyles();
    const { blogs, getBlogsData, dispatch, setLimit, limit } = useBlog();
    const [searchBar, setSearchBar] = useState("");

    const history = useHistory();

    useEffect(() => {
        getBlogsData();
    }, []);

    const [type, setType] = useState();
    const handleChangeType = (e) => {
        if (e.target.value == "all") {
            getBlogsData();
            setType(e.target.value);
        } else {
            const ref = fire
                .firestore()
                .collection("blogs")
                .where("brand", "==", e.target.value)
                .limit(limit);

            ref.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                dispatch({
                    type: BLOG_ACTIONS.GET_BLOGS_DATA,
                    payload: items,
                });
            });
        }
    };

    const handleChangeSort = (e) => {
        console.log(e.target.value);
        let sortedBlogs = [];
        if (e.target.value === "price") {
            sortedBlogs = blogs.sort((a, b) => b.price - a.price);
        } else {
            sortedBlogs = blogs.sort(
                (a, b) => b[e.target.value]?.length - a[e.target.value]?.length
            );
            console.log(sortedBlogs);
        }
        dispatch({
            type: BLOG_ACTIONS.GET_BLOGS_DATA,
            payload: sortedBlogs,
        });
    };

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            "&$checked": {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const [showCategories, setShowCategories] = useState(false);

    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedValue2, setSelectedValue2] = React.useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleChangeSortValue = (e) => {
        setSelectedValue2(e.target.value);
    };

    const showMore = () => {
        setLimit(limit + BLOG_LIMIT);
        getBlogsData(BLOG_LIMIT);
    };

    return (
        <>
            <div className={classes.blogListContainer}>
                <Button
                    onClick={() => setShowCategories(!showCategories)}
                    style={{
                        color: "#00aeff",
                        fontFamily: "nunito",
                        fontWeight: "bold",
                    }}
                >
                    Brands & sort
                </Button>
                {showCategories ? (
                    <div className={classes.sideBar}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={type}
                                onChange={handleChangeType}
                            >
                                {BRANDS.map((option) => (
                                    <FormControlLabel
                                        value={option.value}
                                        control={
                                            <GreenRadio
                                                checked={
                                                    selectedValue ===
                                                    option.value
                                                }
                                                onChange={handleChange}
                                                value={option.value}
                                                name="radio-button-demo"
                                            />
                                        }
                                        label={option.label}
                                    />
                                ))}
                                <FormControlLabel
                                    value="all"
                                    control={
                                        <GreenRadio
                                            checked={selectedValue === "all"}
                                            onChange={handleChange}
                                            value="all"
                                            name="radio-button-demo"
                                        />
                                    }
                                    label="Reset brand"
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={type}
                                onChange={handleChangeSort}
                            >
                                <FormControlLabel
                                    value={"usersLikes"}
                                    control={
                                        <GreenRadio
                                            checked={
                                                selectedValue2 === "usersLikes"
                                            }
                                            onChange={handleChangeSortValue}
                                            value={"usersLikes"}
                                            name="radio-button-demo"
                                        />
                                    }
                                    label={"sort by likes"}
                                />
                                <FormControlLabel
                                    value={"comments"}
                                    control={
                                        <GreenRadio
                                            checked={
                                                selectedValue2 === "comments"
                                            }
                                            onChange={handleChangeSortValue}
                                            value={"comments"}
                                            name="radio-button-demo"
                                        />
                                    }
                                    label={"sort by comments"}
                                />
                                <FormControlLabel
                                    value={"price"}
                                    control={
                                        <GreenRadio
                                            checked={selectedValue2 === "price"}
                                            onChange={handleChangeSortValue}
                                            value={"price"}
                                            name="radio-button-demo"
                                        />
                                    }
                                    label={"sort by price"}
                                />
                            </RadioGroup>
                        </FormControl>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={(e) => setSearchBar(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}

                {blogs?.length > 0 ? (
                    <>
                        <div className={classes.blogListCards}>
                            {blogs
                                .filter((val) => {
                                    if (!searchBar) {
                                        return val;
                                    } else if (
                                        val.title
                                            .toLowerCase()
                                            .includes(
                                                searchBar.toLowerCase()
                                            ) ||
                                        val.price
                                            .toString()
                                            .toLowerCase()
                                            .includes(
                                                searchBar.toLowerCase()
                                            ) ||
                                        val.text
                                            .toLowerCase()
                                            .includes(
                                                searchBar.toLowerCase()
                                            ) ||
                                        val.brand
                                            .toLowerCase()
                                            .includes(searchBar.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                })
                                .map((blog, index) => (
                                    <BlogCard blog={blog} key={index} />
                                ))}
                            <div>
                                <EditBlog />
                            </div>
                        </div>
                        {blogs.length >= limit ? (
                            <Button onClick={showMore}>show More</Button>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    <h1>Похоже здесь нет блогов</h1>
                )}
            </div>
        </>
    );
};

export default BlogList;
