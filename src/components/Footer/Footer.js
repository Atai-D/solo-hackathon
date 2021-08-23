import React from "react";
import { NavLink } from "react-router-dom";
import {
    AiFillInstagram,
    AiOutlineTwitter,
    AiFillFacebook,
} from "react-icons/ai";

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>ABOUT US</h4>
                        <p className="list-unstyled">
                            This blog puts together everyone's <br />{" "}
                            exploration of Bishkek, <br /> capital of
                            Kyrgyzstan.
                            <br />
                            Keep yourself up to date with us!{" "}
                        </p>
                    </div>
                    <div className="col">
                        <h4>CONTACT US</h4>
                        <ul className="list-unstyled">
                            <li>Logvinenko 12</li>
                            <li>Bishkek, Kyrgyzstan</li>
                            <li>PO Box 72000</li>
                            <li>
                                <a
                                    className="link"
                                    href="mailto:b-bblog@gmail.com"
                                >
                                    Send Email
                                </a>
                            </li>
                            <li>+996555776612</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>FOLLOW US</h4>
                        <ul className="icons">
                            <li>
                                <a
                                    href="https://www.instagram.com/akashkarbek/"
                                    target="_blank"
                                >
                                    <AiFillInstagram
                                        style={{ color: "#fff" }}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/home?lang=en"
                                    target="_blank"
                                >
                                    <AiOutlineTwitter
                                        style={{ color: "#fff" }}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Best Bishkek Blog | All
                        rights reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
