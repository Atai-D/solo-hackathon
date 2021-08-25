import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BLOG_ACTIONS,
    BRANDS,
    TYPES,
    BLOG_LIMIT,
    calcTotalPrice,
    calcSubPrice,
} from "../helpers/consts";
import { useAuth } from "./AuthorizationContext";
import fire from "../components/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";

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
    const [blogCategory, setBlogCategory] = useState(BRANDS[0].value);
    const [blogType, setBlogType] = useState(TYPES[0].value);
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
                detailsBlog = snapshot.data();
            })
            .catch((err) => {
                console.log(err);
            });
        dispatch({
            type: BLOG_ACTIONS.GET_BLOG_DETAILS,
            payload: detailsBlog,
        });
    };

    const getBlogsData = (tempLimit = 0) => {
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
    };

    const addBlog = async (title, image, text, price, category, type) => {
        const ref = fire.firestore().collection("blogs");
        let newBlog = {
            title: title,
            image: image,
            text: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            price: +price,
            brand: category,
            type: type,
            usersLikes: [],
            comments: [],
            id: uuidv4(),
        };
        ref.doc(newBlog.id)
            .set(newBlog)
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteBlog = (id) => {
        const ref = fire.firestore().collection("blogs");
        ref.doc(id)
            .delete()
            .catch((err) => {
                console.log(err);
            });
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
        ref.doc(editedBlog.id)
            .update(editedBlog)
            .catch((err) => {
                console.log(err);
            });
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
        let newblog = {
            item: blog,
            count: 1,
            subPrice: +blog.price,
        };

        console.log(newblog);

        let blogToFind = cart.blogs.filter((item) => item.item.id === blog.id);
        if (blogToFind.length == 0) {
            cart.blogs.push(newblog);
        } else {
            cart.blogs = cart.blogs.filter((item) => item.item.id !== blog.id);
        }
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const changeBlogCount = (count, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.blogs = cart.blogs.map((blog) => {
            if (blog.item.id === id) {
                blog.count = count;
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
        const ref = fire.firestore().collection("users");
        const refGet = await ref.get();
        let curUser = {};
        refGet.docs.forEach((doc) => {
            if (doc.data().email === email) {
                curUser = doc.data();
            }
        });
        console.log(curUser);
        console.log(blogs);
        curUser.lastOrders.push(blogs);
        let userWithPayment = { ...curUser };
        console.log(userWithPayment);
        ref.doc(curUser.id).set(userWithPayment);
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
            const newBlog = { ...blog, usersLikes: likes };
            ref.doc(blog.id).update(newBlog);
        }
        getBlogDetails(blog.id);
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
    };

    const addBlogToFavorites = async (blog) => {
        const ref = fire.firestore().collection("users");
        let newUser = {};
        let user = {};
        const refGet = await ref.get();
        refGet.docs.forEach((doc) => {
            if (doc.exists) {
                if (doc.data().email === email) {
                    user = doc.data();
                }
            } else {
                console.log("No such document!");
            }
        });

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

        ref.doc(newUser.id)
            .set(newUser)
            .catch((err) => {
                console.log(err);
            });
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
        deleteCart,
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
        addBlogToFavorites,
        blogType,
        setBlogType,
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
