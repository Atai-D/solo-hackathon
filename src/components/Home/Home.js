import React, { useEffect, useState } from "react";
import { CssBaseline, IconButton, makeStyles } from "@material-ui/core";
import { display, fontSize, fontWeight, textAlign } from "@material-ui/system";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Collapse } from "@material-ui/core";
import History from "../History/History";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
    mainRoot: {
        minHeight: "100vw",
        backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/main4.jpeg"
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        fontFamily: "nunito",
    },
    mainTitle: {
        color: "#fff",
        fontSize: "5vw",
        fontWeight: "bold",
        marginTop: "15vh",
    },
    mainContainer: {
        textAlign: "center",
    },
    mainArrow: {
        color: "#fff",
    },
    mainHeader: {
        backgroundColor: "rgb(0,0,0,0.3)",
    },
    mainCardRoot: {
        width: "45vw",
        background: "rgb(0,0,0,0.2)",
        margin: "10vh auto",
    },
    mainImage: {
        height: "25vw",
    },
    mainAboutBish: {
        fontFamily: "Nunito",
        fontWeight: "bold",
        fontSize: "2vw",
        color: "#fff",
    },
    mainCardDescr: {
        fontFamily: "Nunito",
        fontSize: "1.2vw",
        color: "#fff",
        fontWeight: "bold",
    },
}));
export default function Home() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <>
            <div className={classes.mainRoot}>
                <CssBaseline />
                <Collapse
                    in={checked}
                    {...(checked ? { timeout: 1000 } : {})}
                    collapsedHeight={50}
                >
                    <div className={classes.mainContainer}>
                        <div className={classes.mainHeader}>
                            <h1 className={classes.mainTitle}>
                                Welcome to <br /> The Best <br />
                                <span className={classes.colorText}>
                                    Bishkek Blog.
                                </span>
                            </h1>
                            <IconButton>
                                <ExpandMoreIcon className={classes.mainArrow} />
                            </IconButton>
                        </div>
                        <Card className={classes.mainCardRoot}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.mainImage}
                                    image={
                                        process.env.PUBLIC_URL +
                                        "/assets/bishkek1.jpeg"
                                    }
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h1"
                                        className={classes.mainAboutBish}
                                    >
                                        About Bishkek
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        className={classes.mainCardDescr}
                                    >
                                        Bishkek, the capital of Kyrgyzstan,
                                        borders Central Asia's Tian Shan range.
                                        It’s a gateway to the Kyrgyz Ala-Too
                                        mountains and Ala Archa National Park,
                                        with glaciers and wildlife trails. The
                                        city’s arts scene encompasses the
                                        monumental State Museum of Fine Arts and
                                        the colonnaded Opera and Ballet Theater.
                                        The vast, central Ala-Too Square
                                        features the Manas monument, honoring
                                        the hero of the Kyrgyz Epic of Manas.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </Collapse>
            </div>
        </>
    );
}
