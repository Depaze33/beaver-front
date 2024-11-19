import React from 'react';
import Avatar from '../Div/UserAvatar.jsx';
import { Switch } from "@/components/ui/switch"// Import du composant UserAvatar
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <h1 className="top-bar-title">Bienvenue</h1>
            <div className="top-bar-right">
                <Switch></Switch>
                <Avatar/> {/* Utilisation de UserAvatar */}
            </div>

        </div>
    );
};

export default TopBar;
