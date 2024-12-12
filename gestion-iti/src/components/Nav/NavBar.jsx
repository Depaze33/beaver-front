import {Link} from "@chakra-ui/react";
import "./NavBar.css";
import {FaHome} from "react-icons/fa";
import {FaMapMarkedAlt} from "react-icons/fa";
import {IoIosContacts} from "react-icons/io";
import {FaCrown} from "react-icons/fa6";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <Link href="/" passHref>
                <a className="icon" aria-label="Home">
                    <span className="nav-icon"><FaHome size="24" /></span>
                </a>
            </Link>
            <Link href="/map" passHref>
                <a className="icon" aria-label="Map">
                    <span className="nav-icon"><FaMapMarkedAlt size="24" /></span>
                </a>
            </Link>
            <Link href="/contact" passHref>
                <a className="icon" aria-label="Contact">
                    <span className="nav-icon"><IoIosContacts size="24" /></span>
                </a>
            </Link>
            <Link href="/premium" passHref>
                <a className="icon" aria-label="Premium">
                    <span className="nav-icon"><FaCrown size="24" /></span>
                </a>
            </Link>
        </div>
    );
};

export default NavBar;
