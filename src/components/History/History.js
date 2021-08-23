import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";

const useStyles = makeStyles((theme) => ({
    root1: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function () {
    const classes = useStyles();
    return (
        <div className={classes.root1}>
            <ImageCard />
        </div>
    );
}
