import React, { useState } from 'react';
import Map from './components/Map';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from "@/components/Nav/TopBar.jsx";
import NavBar from "@/components/Nav/NavBar.jsx";
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <TopBar/>
            <NavBar/>
            <Routes>
                <Route>
                    <Route path='/map' element={<Map />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
