export const JSON_API_USERS = "http://localhost:8000/users";
export const JSON_API_BLOGS = "http://localhost:8000/blogs";

export const BLOG_LIMIT = 4;

export const BRANDS = [
    {
        value: "Sennheiser",
        label: "Sennheiser",
    },
    {
        value: "Sony",
        label: "Sony",
    },
    {
        value: "JBL",
        label: "JBL",
    },
    {
        value: "Beyerdynamic",
        label: "Beyerdynamic",
    },
    {
        value: "Xiaomi",
        label: "Xiaomi",
    },
    {
        value: "HyperX",
        label: "HyperX",
    },
];

export const TYPES = [
    {
        value: "In-Ear",
        label: "In-Ear",
    },
    {
        value: "On-Ear",
        label: "On-Ear",
    },
    {
        value: "Over-Ear",
        label: "Over-Ear",
    },
];

export const ACTIONS = {
    SET_USER: "SET_USER",
    CHANGE_LOGGED: "CHANGE_LOGGED",
};

export const BLOG_ACTIONS = {
    ADD_BLOG: "ADD_BLOG",
    GET_BLOG_DETAILS: "GET_BLOG_DETAILS",
    GET_BLOGS_DATA: "GET_BLOGS_DATA",
    DELETE_BLOG_DETAILS: "DELETE_BLOG_DETAILS",
    ISEDITTING_USER: "ISEDITTING_USER",
    ADD_PROMOTION_BLOG: "ADD_PROMOTION_BLOG",
    GET_CART: "GET_CART",
    GET_PAYING_BLOGS: "GET_PAYING_BLOGS",
    GET_PROMOTIONS_DATA: "GET_PROMOTIONS_DATA",
    GET_PAGES: "GET_PAGES",
};

export const calcSubPrice = (blog) => {
    return blog.count * blog.item.price;
};
export const calcTotalPrice = (blogs) => {
    return blogs.reduce((ac, cur) => {
        return (ac += cur.subPrice);
    }, 0);
};

// export const calcSubPrice = (blog) => {
//     return +blog.days * +blog.promPrice;
// };

// export const calcTotalPrice = (blogs) => {
//     return blogs.reduce((ac, cur) => {
//         return (ac += cur.subPrice);
//     }, 0);
// };
