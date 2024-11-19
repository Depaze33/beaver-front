import React from 'react'
import './NavBar.css'
import { Button } from "@/components/ui/button"

const NavBar = () => {
    return (
        <div className="nav-bar">
            <Button>Home</Button>
            <Button>Map</Button>
            <Button>Premium</Button>

        </div>
    )
}
export default NavBar
