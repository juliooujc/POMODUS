import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Login from '../pages/Login';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pages/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default AppRoutes;
