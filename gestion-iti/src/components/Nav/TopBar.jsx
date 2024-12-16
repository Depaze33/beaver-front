import Avatar from '../Div/UserAvatar.jsx';
import Badges from '../Div/Badges.jsx'
import { ColorModeButton } from "@/components/ui/color-mode"
import './TopBar.css';
import {Flex} from "@chakra-ui/react";

const TopBar = () => {
    return (
        <Flex as = "header" className="top-bar">
            <h1 className="top-bar-title">Bienvenue</h1>

            <div className="top-bar-right">
                <Badges/>
                <ColorModeButton />
                <Avatar/> {/* Utilisation de UserAvatar */}
            </div>

        </Flex>
    );
};

export default TopBar;
