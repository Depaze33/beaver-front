import React, { useState } from 'react';
import Map from './components/Map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from "@/components/Nav/TopBar.jsx";
// import NavBar from "@/components/Nav/NavBar.jsx";
import Recommendation from "@/components/Recommendation/Recommendation.jsx";
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <TopBar/>

            <Routes>
                <Route>
                    <Route path='/recommendation' element={<Recommendation/>} />
                    <Route path='/map' element={<Map />} />
                </Route>
            </Routes>
            {/*<NavBar/>*/}
        </BrowserRouter>
    );
}

export default App;