import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    makeStyles,
    TableRow,
    Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useBlog } from "../../contexts/BlogContext";
import CartCard from "./CartCard";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableCellImg: {
        width: 50,
    },
});

const Cart = () => {
    const classes = useStyles();
    const { history, handlePayingBlogs } = useBlog();
    const { cart, getCart, changeBlogCount } = useBlog();

    useEffect(() => {
        getCart();
    }, []);

    const handlePayBtn = () => {
        history.push("/payment");
        handlePayingBlogs(cart);
    };
    return (
        <>
            {cart?.blogs?.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell
                                    align="right"
                                    style={{ paddingLeft: "130px" }}
                                >
                                    Price
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{ paddingLeft: "155px" }}
                                >
                                    Count
                                </TableCell>
                                <TableCell align="right">SubPrice</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart?.blogs?.length > 0 &&
                                cart.blogs.map((blog) => (
                                    <CartCard key={blog.item.id} blog={blog} />
                                ))}

                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>
                                    <Typography variant="h5">Total:</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="h5"
                                        style={{ color: "#00aeff" }}
                                    >
                                        {cart.totalPrice}&#8381;
                                        <Button onClick={handlePayBtn}>
                                            <PaymentIcon
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                            <h5
                                                style={{ marginBottom: "-2px" }}
                                            >
                                                Pay
                                            </h5>
                                        </Button>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h2>Add something to cart</h2>
            )}
        </>
    );
};

export default Cart;
