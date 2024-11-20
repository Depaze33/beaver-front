import React from "react";
import { Link} from "@chakra-ui/react";
import "./NavBar.css";

const NavBar = () => {


    return (
        <div className='nav-bar nav-bar-${colorMode'>
            <Link href="/">Home</Link>
            <Link href="/map">Map</Link>
            <Link href="/premium">Premium</Link>
        </div>
    );
};

export default NavBar;
