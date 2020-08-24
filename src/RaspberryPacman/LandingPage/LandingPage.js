import React from "react";
import { NavLink } from "react-router-dom"

const LandingPage = () => {
    return (
        <div>
            <NavLink exact to = "/Pacman">Zagraj</NavLink>
        </div>
    )
}



export default LandingPage;
