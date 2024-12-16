import Avatar from '../Div/UserAvatar.jsx';
import Badges from '../Div/Badges.jsx'
import { ColorModeButton } from "@/components/ui/color-mode"
import './TopBar.css';
import {Flex, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <Flex as = "header" className="top-bar">
            <div className="logo-top">
                <p className="logo-name">BEA</p>
                <Image className="logo" src="/logo.svg"/>
                <p className="logo-name">VEAR</p>
            </div>

            <div className="top-bar-right">
                <Badges/>
                <ColorModeButton/>
                <Link to="/profile"><Avatar/> {/* Utilisation de UserAvatar */}</Link>
                
            </div>

        </Flex>
    );
};

export default TopBar;
