import { AssignmentInd } from "@material-ui/icons";
import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
    BLOG_LIMIT,
    calcTotalPrice,
    calcSubPrice,
} from "../helpers/consts";
import { useAuth } from "./AuthorizationContext";
import fire from "../components/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

const BlogContextProvider = ({ children }) => {
    const {
        user: { email },
    } = useAuth();

    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogText, setBlogText] = useState("");
    const [blogPrice, setBlogPrice] = useState("");
    const [blogCategory, setBlogCategory] = useState(CATEGORIES[0].value);
    const [promoted, setPromoted] = useState("");
    const [isPromoted, setIsPromoted] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const history = useHistory();

    const [edittingId, setEdittingId] = useState(1);

    const [limit, setLimit] = useState(BLOG_LIMIT);

    const INIT_STATE = {
        blogs: [],
        blogDetails: {},
        pages: 1,
        promotionBlogs: [],
        cart: [],
        payingBlogs: [],
    };

    const reduce = (state = INIT_STATE, action) => {
        switch (action.type) {
            case BLOG_ACTIONS.GET_BLOGS_DATA:
                // console.log(action.payload.length);
                return {
                    ...state,
                    blogs: action.payload,
                };
            case BLOG_ACTIONS.GET_PAGES:
                return {
                    ...state,
                    pages: Math.ceil(action.payload.length / BLOG_LIMIT),
                };
            case BLOG_ACTIONS.ADD_BLOG:
                let newBlogs = [...state.blogs];
                newBlogs.push(action.payload);
                return { ...state, blogs: newBlogs };
            case BLOG_ACTIONS.GET_BLOG_DETAILS:
                return { ...state, blogDetails: action.payload };
            case BLOG_ACTIONS.ISEDITTING_USER:
                return { ...state, isEdittingUser: action.payload };
            case BLOG_ACTIONS.ADD_PROMOTION_BLOG:
                return { ...state, promotionBlogs: action.payload };
            case BLOG_ACTIONS.GET_CART:
                return { ...state, cart: action.payload };
            case BLOG_ACTIONS.GET_PAYING_BLOGS:
                return { ...state, payingBlogs: action.payload };
            case BLOG_ACTIONS.GET_PROMOTIONS_DATA:
                return { ...state, promotionBlogs: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reduce, INIT_STATE);

    const getBlogDetails = async (id) => {
        const ref = fire.firestore().collection("blogs");
        let detailsBlog = {};
        await ref
            .doc(id)
            .get()
            .then((snapshot) => {
                // console.log(snapshot.data());
                detailsBlog = snapshot.data();
            })
            .catch((err) => {
                console.log(err);
            });
        // console.log(detailsBlog);
        dispatch({
            type: BLOG_ACTIONS.GET_BLOG_DETAILS,
            payload: detailsBlog,
        });
        ////////////////////////////////////////////////

        // const todoRef = await fire.database().ref("Blog").child(id);

        // let detailsBlog = {};
        // todoRef.on("value", (snapshot) => {
        //     const todos = snapshot.val();
        //     for (let id in todos) {
        //         detailsBlog = { ...detailsBlog, [id]: todos[id] };
        //     }
        // });
        // dispatch({
        //     type: BLOG_ACTIONS.GET_BLOG_DETAILS,
        //     payload: detailsBlog,
        // });
    };

    const getBlogsData = (tempLimit = 0) => {
        // const search = new URLSearchParams(history.location.search);
        // search.set("_limit", BLOG_LIMIT);
        // search.set("_sort", "priority");
        // search.set("_order", "desc");
        // history.push(`${history.location.pathname}?${search.toString()}`);

        const ref = fire
            .firestore()
            .collection("blogs")
            .limit(limit + tempLimit);

        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            // console.log(items);
            dispatch({
                type: BLOG_ACTIONS.GET_BLOGS_DATA,
                payload: items,
            });
        });

        /////////////////////////////////
        // const blogs = [];
        // const res = fire.database().ref("Blog").limitToFirst(BLOG_LIMIT);
        // res.on("value", (snapshot) => {
        //     const todos = snapshot.val();
        //     for (let id in todos) {
        //         blogs.push({ id, ...todos[id] });
        //     }
        // });
        // dispatch({
        //     type: BLOG_ACTIONS.GET_BLOGS_DATA,
        //     payload: blogs,
        // });
        // const tempBlogs = [];
        // const resol = fire.database().ref("Blog");
        // resol.on("value", (snapshot) => {
        //     const todos = snapshot.val();
        //     for (let id in todos) {
        //         tempBlogs.push({ id, ...todos[id] });
        //     }
        // });
        // dispatch({
        //     type: BLOG_ACTIONS.GET_PAGES,
        //     payload: tempBlogs,
        // });
    };

    const addBlog = async (title, image, text, price, category) => {
        const ref = fire.firestore().collection("blogs");
        const date = Date.now();
        let newBlog = {
            title: title,
            image: image,
            text: text,
            date: date,
            price: +price,
            category: category,
            usersLikes: [],
            comments: [],
            id: uuidv4(),
        };
        // console.log(newBlog.id);
        ref.doc(newBlog.id)
            .set(newBlog)
            .catch((err) => {
                console.log(err);
            });

        ////////////////////////////////////

        // const date = Date.now();
        // const blogRef = fire.database().ref("Blog");
        // let newBlog = {
        //     title: title,
        //     image: image,
        //     text: text,
        //     date: date,
        //     price: +price,
        //     usersLikes: [],
        //     comments: [],
        // };
        // blogRef.push(newBlog);
        // alert("Ваш блог успешно опубликован");
    };

    const deleteBlog = (id) => {
        const ref = fire.firestore().collection("blogs");
        ref.doc(id)
            .delete()
            .catch((err) => {
                console.log(err);
            });
        // console.log(id);
        // const todoRef = fire.database().ref("Blog").child(id);
        // console.log(todoRef);
        // todoRef.remove();
        // getBlogsData();
    };

    const deleteBlogDetails = () => {
        const data = {};
        dispatch({
            type: BLOG_ACTIONS.GET_BLOG_DETAILS,
            payload: data,
        });
        history.goBack();
    };

    const saveEditBlog = (editedBlog, edittingId) => {
        const ref = fire.firestore().collection("blogs");
        // console.log(editedBlog.id);
        ref.doc(editedBlog.id)
            .update(editedBlog)
            .catch((err) => {
                console.log(err);
            });
        // const todoRef = await fire.database().ref("Blog").child(edittingId);
        // todoRef.update(editedBlog);
        // getBlogsData();
        getBlogDetails(editedBlog.id);
    };

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            localStorage.setItem(
                "cart",
                JSON.stringify({
                    blogs: [],
                    totalPrice: 0,
                })
            );
            cart = {
                blogs: [],
                totalPrice: 0,
            };
        }
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const addBlogToCart = (blog) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = {
                blogs: [],
                totalPrice: 0,
            };
        }
        let newBlog = {
            ...blog,
            count: 1,
            subPrice: +blog.price,
        };

        // console.log(blog);

        let blogToFind = cart.blogs.filter((item) => item.id === blog.id);
        if (blogToFind.length == 0) {
            cart.blogs.push(newBlog);
        } else {
            cart.blogs = cart.blogs.filter((item) => item.id !== blog.id);
        }
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const changeBlogCount = (days, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.blogs = cart.blogs.map((blog) => {
            if (blog.id === id) {
                blog.days = days;
                blog.subPrice = calcSubPrice(blog);
            }
            return blog;
        });
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const changeBlogPrice = (promPrice, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.blogs = cart.blogs.map((blog) => {
            if (blog.id === id) {
                blog.promPrice = promPrice;
                blog.subPrice = calcSubPrice(blog);
            }
            return blog;
        });
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const deleteCart = () => {
        localStorage.removeItem("cart");
        let noCart = [];
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: noCart,
        });
    };

    const handlePayingBlogs = (blogs) => {
        dispatch({
            type: BLOG_ACTIONS.GET_PAYING_BLOGS,
            payload: blogs,
        });
    };

    const payForBlogs = async (blogs) => {
        let cart = JSON.parse(localStorage.getItem("cart"));

        const newBlogs = blogs?.map((blog) => {
            return { ...blog, promotionDate: Date.now() };
        });
        let tempBlogs = newBlogs.concat(state.promotionBlogs);
        dispatch({
            type: BLOG_ACTIONS.ADD_PROMOTION_BLOG,
            payload: tempBlogs,
        });

        blogs.map(async (blog) => {
            const changedBlog = { ...blog, priority: 3 };

            const { data } = await axios.patch(
                `${JSON_API_BLOGS}/${blog.id}`,
                changedBlog
            );
            const res = await axios(`${JSON_API_USERS}/${blog.authorsId}`);

            const array = res.data.usersBlogs.map((usersBlog) => {
                if (blog.id === usersBlog.id) {
                    return changedBlog;
                } else {
                    return usersBlog;
                }
            });
            const changedUser = { ...res.data, usersBlogs: array };

            const a = await axios.patch(
                `${JSON_API_USERS}/${blog.authorsId}`,
                changedUser
            );
        });
        const newChangedBlogs = await axios(`${JSON_API_BLOGS}`);

        dispatch({
            type: BLOG_ACTIONS.GET_BLOGS_DATA,
            payload: newChangedBlogs,
        });

        deleteCart();
    };

    const renderPromotionBlogs = (promotionBlogs) => {
        dispatch({
            type: BLOG_ACTIONS.GET_PROMOTIONS_DATA,
            payload: promotionBlogs,
        });
    };

    const addLike = async (blog, blogsId) => {
        const ref = fire.firestore().collection("blogs");
        let blogData = {};
        await ref
            .doc(blog.id)
            .get()
            .then((snapshot) => {
                // console.log(snapshot.data());
                blogData = snapshot.data();
            })
            .catch((err) => {
                console.log(err);
            });
        if (!blogData?.usersLikes) {
            ref.doc(blog.id).update({ ...blog, usersLikes: [email] });
        } else {
            const idToFind = blogData?.usersLikes?.filter(
                (usersEmail) => usersEmail === email
            );
            let likes = [...blogData?.usersLikes];
            if (idToFind.length === 0) {
                likes.push(email);
            } else {
                likes = likes.filter((usersEmail) => usersEmail !== email);
            }
            // console.log(likes);
            const newBlog = { ...blog, usersLikes: likes };
            ref.doc(blog.id).update(newBlog);
        }
        getBlogDetails(blog.id);

        //////////////////////////////
        // const todoRef = await fire.database().ref("Blog").child(blogsId);
        // let blogData = {};
        // todoRef.on("value", (snapshot) => {
        //     const todos = snapshot.val();
        //     for (let id in todos) {
        //         blogData = { ...blogData, [id]: todos[id] };
        //     }
        // });
        // if (!blogData?.usersLikes) {
        //     todoRef.update({ ...blog, usersLikes: [email] });
        // } else {
        //     const idToFind = blogData?.usersLikes?.filter(
        //         (usersEmail) => usersEmail === email
        //     );
        //     let likes = [...blogData?.usersLikes];
        //     if (idToFind.length === 0) {
        //         likes.push(email);
        //     } else {
        //         likes = likes.filter((usersEmail) => usersEmail !== email);
        //     }
        //     console.log(likes);
        //     const newBlog = { ...blog, usersLikes: likes };
        //     todoRef.update(newBlog);
        // }

        // getBlogsData();
        // getBlogDetails(blogsId);
    };

    const addComment = async (comment, id) => {
        const ref = fire.firestore().collection("blogs");
        let blogData = {};
        await ref
            .doc(id)
            .get()
            .then((snapshot) => {
                // console.log(snapshot.data());
                blogData = snapshot.data();
            })
            .catch((err) => {
                console.log(err);
            });
        let newBlog = {};
        if (!blogData?.comments) {
            newBlog = {
                ...blogData,
                comments: [{ comment, author: email, id: uuidv4() }],
            };
        } else {
            newBlog = {
                ...blogData,
                comments: [
                    ...blogData.comments,
                    { comment, author: email, id: uuidv4() },
                ],
            };
        }
        ref.doc(id).update(newBlog);
        getBlogDetails(id);

        // const blogRef = await fire.database().ref("Blog").child(id);
        // let blogData = {};
        // blogRef.on("value", (snapshot) => {
        //     const todos = snapshot.val();
        //     for (let id in todos) {
        //         blogData = { ...blogData, [id]: todos[id] };
        //     }
        // });
        // let newBlog = {};
        // if (!blogData?.comments) {
        //     newBlog = {
        //         ...blogData,
        //         comments: [{ comment, author: email, id: Date.now() }],
        //     };
        // } else {
        //     newBlog = {
        //         ...blogData,
        //         comments: [
        //             ...blogData.comments,
        //             { comment, author: email, id: Date.now() },
        //         ],
        //     };
        // }
        // blogRef.update(newBlog);
    };

    const deleteComment = async (comment, blogDetails, id) => {
        let commentsWithoutComment = blogDetails.comments.filter(
            ({ id }) => id !== comment.id
        );
        let blogWithoutComment = {
            ...blogDetails,
            comments: commentsWithoutComment,
        };

        const ref = await fire.firestore().collection("blogs");
        await ref.doc(blogDetails.id).update(blogWithoutComment);
        getBlogDetails(blogDetails.id);

        // const blogRef = await fire.database().ref("Blog").child(id);
        // blogRef.update(blogWithoutComment);
        // getBlogDetails(blogDetails.id);
    };

    const editComment = async (comment, blogDetails, newComment, id) => {
        let editedComment = { ...comment, comment: newComment };
        let commentsWithNewComment = blogDetails.comments.map(
            (usersComment) => {
                if (usersComment.id === comment.id) {
                    return editedComment;
                } else {
                    return usersComment;
                }
            }
        );
        let blogWithEditedComment = {
            ...blogDetails,
            comments: commentsWithNewComment,
        };
        const ref = await fire.firestore().collection("blogs");
        await ref.doc(blogDetails.id).update(blogWithEditedComment);
        getBlogDetails(blogDetails.id);

        // const blogRef = await fire.database().ref("Blog").child(id);
        // blogRef.update(blogWithEditedComment);
        // getBlogDetails(id);
    };

    const addBlogToFavourites = async (blog) => {
        const ref = fire.firestore().collection("users");
        let newUser = {};
        // ref.onSnapshot((querySnapshot) => {
        //     let user = {};
        //     querySnapshot.forEach((doc) => {
        //         if (doc.data().email === email) {
        //             user = doc.data();
        //         }
        //     });
        //     console.log(user);

        let user = {};
        const refGet = await ref.get();
        refGet.docs.forEach((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data());
                if (doc.data().email === email) {
                    user = doc.data();
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
        // if (user?.favorites?.length === 0) {
        //     console.log("if");
        //     newUser = { ...user, favorites: [blog.id] };
        //     // ref.doc(user.id).update({ ...user, favorites: [blog.id] });
        // } else {
        const idToFind = user.favorites?.filter(
            (usersBlogId) => usersBlogId === blog.id
        );
        let favorites = [...user.favorites];
        if (idToFind.length === 0) {
            favorites.push(blog.id);
        } else {
            favorites = favorites.filter(
                (usersBlogId) => usersBlogId !== blog.id
            );
        }
        newUser = { ...user, favorites: favorites };
        // const ref2 =  fire.firestore().collection("users");
        //  ref2.doc(user.id).update(newUser);

        // debugger;
        // }
        // });
        ref.doc(newUser.id)
            .set(newUser)
            .catch((err) => {
                console.log(err);
            });
        // debugger;
    };

    const value = {
        history,
        dispatch,
        blogs: state.blogs,
        blogTitle,
        setBlogTitle,
        blogImage,
        setBlogImage,
        blogText,
        setBlogText,
        blogCategory,
        setBlogCategory,
        blogDetails: state.blogDetails,
        getBlogDetails,
        getBlogsData,
        deleteBlog,
        deleteBlogDetails,
        editModal,
        setEditModal,
        edittingId,
        setEdittingId,
        saveEditBlog,
        pages: state.pages,
        blogPrice,
        setBlogPrice,
        addBlog,
        promoted,
        setPromoted,
        isPromoted,
        setIsPromoted,
        promotionBlogs: state.promotionBlogs,
        addBlogToCart,
        cart: state.cart,
        getCart,
        changeBlogCount,
        changeBlogPrice,
        deleteCart,
        changeBlogPrice,
        payForBlogs,
        payingBlogs: state.payingBlogs,
        handlePayingBlogs,
        renderPromotionBlogs,
        addLike,
        addComment,
        deleteComment,
        editComment,
        setLimit,
        limit,
        addBlogToFavourites,
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
