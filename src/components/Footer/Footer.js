import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>ABOUT PROJECT</h4>
                        <p className="list-unstyled">
                            This is store where you can buy <br /> different
                            awesome headphones <br />
                            The name 'HACKASHOP' comes from <br />
                            two words: 'hackathon' and 'shop'
                        </p>
                    </div>
                    <div className="col">
                        <h4>CONTACT ME</h4>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    className="link"
                                    target="_blank"
                                    href="https://2gis.kg/bishkek/geo/15763234351062857?m=74.586734%2C42.871584%2F16"
                                >
                                    Tabishalieva 29
                                </a>
                            </li>
                            <li>Bishkek, Kyrgyzstan</li>
                            <li>PO Box 72000</li>
                            <li>
                                <a
                                    className="link"
                                    target="_blank"
                                    href="mailto:ataydjirgalbaev@gmail.com"
                                >
                                    Send Email
                                </a>
                            </li>
                            <li>+996-709-544-452</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>FOLLOW ME</h4>
                        <ul className="icons">
                            <li>
                                <a
                                    href="https://www.instagram.com/dzh_atai_05/"
                                    target="_blank"
                                >
                                    <AiFillInstagram
                                        style={{ color: "#000" }}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/%D0%B0%D1%82%D0%B0%D0%B9-%D0%B4%D0%B6%D0%B8%D1%80%D0%B3%D0%B0%D0%BB%D0%B1%D0%B0%D0%B5%D0%B2-354a6221a/"
                                    target="_blank"
                                >
                                    <LinkedInIcon
                                        style={{
                                            color: "#000",
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} HACKASHOP | All rights
                        reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
