import React from "react";
import { Link} from "@chakra-ui/react";
import "./NavBar.css";

const NavBar = () => {


    return (
        <div className={`nav-bar nav-bar`}>
            <Link href="/"><span className="nav-icon">🏠</span></Link>
            <Link href="/map"><span className="nav-icon">📌</span></Link>
            <Link href="/contact"><span className="nav-icon">📞</span></Link>
            <Link href="/premium"><span className="nav-icon">👑</span></Link>
        </div>
    );
};

export default NavBar;
