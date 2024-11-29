import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Map from './components/Map/Map.jsx';
import TopBar from "@/components/Nav/TopBar.jsx";
import NavBar from "@/components/Nav/NavBar.jsx";
import Recommendation from "@/components/Recommendation/Recommendation.jsx";
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <Routes>
                <Route>
                    <Route path='/' element={<Recommendation />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/map' element={<Map />} />
                </Route>
            </Routes>
            <NavBar />
        </BrowserRouter>
    );
}

export default App;