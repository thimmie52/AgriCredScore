import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AIChatPage from './pages/AIChatPage';
import Profile from './pages/Profile';
import UserDetailsPage from './pages/UserDetailsPage';
import LoginPage from './pages/Login';
import SignUpSelection from './pages/SelectPage';
import SignUpAgent from './pages/AgentSignUp';
import FullAgentRegistrationPage from './pages/AgentRegistration';
import AgentDashboardPage from './pages/AgentDashboard';
import LoginSelection from './pages/LoginSelectPage';
import AgentLoginPage from './pages/AgentLogin';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup-individual" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aichat/:username" element={<AIChatPage />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/user/:username" element={<UserDetailsPage />} />
                <Route path="/login-individual" element={<LoginPage />} />
                <Route path="signupselect" element={<SignUpSelection />} />
                <Route path="agentsignup" element={<SignUpAgent />} />
                <Route path='signup-agent-full' element={<FullAgentRegistrationPage />} />
                <Route path="/agent-dashboard/:username" element={<AgentDashboardPage />} />
                <Route path="/loginselect" element={<LoginSelection />} />
                <Route path='/login-agent' element={<AgentLoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;