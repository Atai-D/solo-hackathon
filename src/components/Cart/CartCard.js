import { TableCell, makeStyles, TableRow, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useBlog } from "../../contexts/BlogContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableCellImg: {
        width: 50,
    },
});

const CartCard = ({ blog }) => {
    const classes = useStyles();
    const [count, setCount] = useState(+blog.count);
    const { changeBlogCount, addBlogToCart } = useBlog();

    const handleCountChange = (e) => {
        const res = eval(`${count}${e.target.innerText}`);
        setCount(res);
        changeBlogCount(res, blog.item.id);
    };

    return (
        <>
            <TableRow key={blog.item.id}>
                <TableCell>
                    <img
                        className={classes.tableCellImg}
                        src={blog.item.image}
                        alt={blog.item.title}
                    />
                </TableCell>
                <TableCell
                    align="right"
                    style={{ color: "#00aeff", fontSize: "18px" }}
                >
                    {blog.item.title}
                </TableCell>
                <TableCell align="right" style={{ color: "red" }}>
                    {blog.item.price}
                </TableCell>
                <TableCell align="right">
                    <Button
                        onClick={handleCountChange}
                        disabled={count - 5 < 1 ? "disabled" : ""}
                    >
                        -5
                    </Button>
                    <Button
                        onClick={handleCountChange}
                        disabled={count - 1 < 1 ? "disabled" : ""}
                    >
                        -1
                    </Button>
                    {count}
                    <Button
                        onClick={handleCountChange}
                        disabled={count + 1 > 30 ? "disabled" : ""}
                    >
                        +1
                    </Button>
                    <Button
                        onClick={handleCountChange}
                        disabled={count + 5 > 30 ? "disabled" : ""}
                    >
                        +5
                    </Button>
                    <Button
                        onClick={() => addBlogToCart(blog.item)}
                        style={{ marginLeft: "10px", color: "#d90909" }}
                    >
                        Remove
                    </Button>
                </TableCell>
                <TableCell align="right">{blog.subPrice}&#8381;</TableCell>
            </TableRow>
        </>
    );
};

export default CartCard;
