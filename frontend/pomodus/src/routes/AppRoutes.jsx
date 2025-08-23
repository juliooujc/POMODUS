import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pages/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signin' element={<SignIn />}/>
    </Routes>
);

export default AppRoutes;
