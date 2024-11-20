import React from "react";
import { Link, useColorMode, useColorModeValue } from "@chakra-ui/react";
import "./NavBar.css";

const NavBar = () => {
    const { colorMode } = useColorMode(); // Récupère le mode actuel : "light" ou "dark"
    const textColor = useColorModeValue("gray.800", "white"); // Couleur du texte
    const hoverColor = useColorModeValue("blue.500", "blue.300"); // Couleur au survol

    return (
        <div className={`nav-bar nav-bar-${colorMode}`}>
            <Link href="/" _hover={{ color: hoverColor }} style={{ color: textColor }}>
                Home
            </Link>
            <Link href="/map" _hover={{ color: hoverColor }} style={{ color: textColor }}>
                Map
            </Link>
            <Link href="/premium" _hover={{ color: hoverColor }} style={{ color: textColor }}>
                Premium
            </Link>
        </div>
    );
};

export default NavBar;
