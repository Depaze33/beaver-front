import React from "react";
import { Link} from "@chakra-ui/react";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FaCrown } from "react-icons/fa6";

const NavBar = () => {


    return (
        <div className={`nav-bar nav-bar`}>
            <Link className="icon" href="/"><span className="nav-icon"><FaHome /></span></Link>
            <Link className="icon" href="/map"><span className="nav-icon"><FaMapMarkedAlt /></span></Link>
            <Link className="icon" href="/contact"><span className="nav-icon"><IoIosContacts /></span></Link>
            <Link className="icon" href="/premium"><span className="nav-icon"><FaCrown /></span></Link>
        </div>
    );
};

export default NavBar;
