import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pages/home" element={<Home/>} />
    </Routes>
);

export default AppRoutes;
