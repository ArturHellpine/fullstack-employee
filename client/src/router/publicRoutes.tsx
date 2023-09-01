import React from 'react';
import { Paths } from "../paths";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path={ Paths.login } element={ <LoginPage /> } />
            <Route path={ Paths.register } element={ <RegisterPage /> } />
            <Route path='/*' element={ <Navigate replace to={ Paths.login } /> } />
        </Routes>
    );
};

export default PublicRoutes;