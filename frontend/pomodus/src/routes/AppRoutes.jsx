import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pages/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signin' element={<SignIn />}/>
        <Route path="*" element={<NotFound />}/> 
    </Routes>
);

export default AppRoutes;
