import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import fire from "../firebase/firebase";
import BlogCard from "../Blog/BlogCard";
import "./Home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
    const [array, setArray] = useState(false);
    useEffect(() => {
        const ref = fire.firestore().collection("blogs").limit(3);

        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setArray(items);
        });
    }, []);
    return (
        <>
            <Carousel>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://www.picturesof.pics/images/quotes/english/general/headphones-wallpaper-52650-306862.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>The best internet shop - HACKASHOP</h3>
                        <p>Buy here a lot of headphones</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://cdn.mos.cms.futurecdn.net/ANouj8QW4xuaPFaADCo7PW.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>The best internet shop - HACKASHOP</h3>
                        <p>The best headphones form different companies</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src="https://wallpaperaccess.com/full/1910636.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>The best internet shop - HACKASHOP</h3>
                        <p>But NOW</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="home-container">
                {array?.length > 0
                    ? array.map((blog) => <BlogCard blog={blog} />)
                    : ""}
            </div>
            <NavLink to="/bloglist" className="more">
                See More...
            </NavLink>
        </>
    );
}
