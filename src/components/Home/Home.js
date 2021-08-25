import React, { useEffect, useState } from "react";
import { CssBaseline, IconButton, makeStyles } from "@material-ui/core";
import { Carousel } from "bootstrap";

const useStyles = makeStyles((theme) => ({}));
export default function Home() {
    // const [checked, setChecked] = useState(false);
    // useEffect(() => {
    //     setChecked(true);
    // }, []);
    return (
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://static.highsnobiety.com/thumbor/DsS6DHdGCzaI8ECwg8U5l03LGpY=/1600x960/static.highsnobiety.com/wp-content/uploads/2021/04/29105715/nike-air-jordan-1-ko-chicago-2021-release-date-price-feat-02.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}
