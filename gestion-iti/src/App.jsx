import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Map from './components/Map/Map.jsx';
import TopBar from "@/components/Nav/TopBar.jsx";
import NavBar from "@/components/Nav/NavBar.jsx";
import RecommendationPage from "@/components/Recommendation/RecommendationPage.jsx";
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import { UserProvider } from './components/contexts/UserContext.jsx';
import UserPage from '@/components/user_profil/UserPage';
import { useEffect } from 'react';
import { ProtectedRoute } from './components/Login/ProtectedRoute.jsx';

function App() {

    return (
        <BrowserRouter>
            <TopBar />
            <UserProvider>
                <Routes>
                    <Route>
                        <Route path='/' element={<ProtectedRoute>
                                                    <RecommendationPage />
                                                </ProtectedRoute>} />
                        <Route path='/map' element={<ProtectedRoute>
                                                        <Map />
                                                    </ProtectedRoute>} />
                        <Route path='/profile' element={<ProtectedRoute>
                                                            <UserPage />
                                                        </ProtectedRoute>} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </Route>
                </Routes>
            </UserProvider>
            <NavBar />
        </BrowserRouter>
    );
}

export default App;