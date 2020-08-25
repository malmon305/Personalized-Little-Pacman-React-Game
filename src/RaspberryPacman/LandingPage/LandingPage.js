import React from "react";
import { NavLink } from "react-router-dom";
import './LandingPage.scss';


const LandingPage = () => {
    return (
        <div className="home">
            <div className="neon">
                <span className="text" data-text="zagraj">zagraj</span>
                <span className="gradient"/>
                <span className="spotlight"/>
            </div>
            <div className="link">
                <NavLink className="navLink" exact to = "/Pacman">Zagraj</NavLink>
            </div>
        </div>
    )
}



export default LandingPage;
