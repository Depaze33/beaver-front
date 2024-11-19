import React, { useState } from 'react';
import Map from './components/Map';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/map' element={<Map />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
