import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AIChatPage from './pages/AIChatPage';
import Profile from './pages/Profile';
import UserDetailsPage from './pages/UserDetailsPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aichat/:username" element={<AIChatPage />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/user/:username" element={<UserDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;