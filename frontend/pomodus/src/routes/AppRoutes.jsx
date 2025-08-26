import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';
import Statistics from '../pages/Statistics';
import Debug from '../pages/Debug.jsx';
import RequireAuth from '../guards/RequireAuth';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pages/home" element={<RequireAuth><Home/></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signin' element={<SignIn />}/>
        <Route path="*" element={<NotFound />}/> 
        <Route path='/estatisticas' element={<RequireAuth><Statistics /></RequireAuth>}/>
        <Route path='/debuga' element={<Debug />}/>
    </Routes>
);

export default AppRoutes;
