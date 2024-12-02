import React, { useState } from 'react';
import Map from './components/Map/Map.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from "@/components/Nav/TopBar.jsx";
 import NavBar from "@/components/Nav/NavBar.jsx";
import RecommendationPage from "@/components/Recommendation/RecommendationPage.jsx";
import './App.css';
// import { ColorModeProvider } from "@/components/ui/color-mode"
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

function App() {
    return (
        <BrowserRouter>
            <TopBar/>
            <Routes>
                <Route>
                    <Route path='/' element={<RecommendationPage/>} />
                    <Route path='/map' element={<Map />} />
                </Route>
            </Routes>
            <NavBar/>
        </BrowserRouter>

    );
}

export default App;