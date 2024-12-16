import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Map from './components/Map/Map.jsx';
import TopBar from "@/components/Nav/TopBar.jsx";
import NavBar from "@/components/Nav/NavBar.jsx";
import RecommendationPage from "@/components/Recommendation/RecommendationPage.jsx";
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import { UserProvider } from './components/contexts/UserContext.jsx';

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <UserProvider>
                <Routes>
                    <Route>
                        <Route path='/' element={<RecommendationPage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/map' element={<Map />} />
                    </Route>
                </Routes>
            </UserProvider>
            <NavBar />
        </BrowserRouter>
    );
}

export default App;