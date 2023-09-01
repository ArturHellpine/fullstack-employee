import React from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

const AuthProvider = () => {
    const user = useSelector(selectUser)

    if(user) {
        return <PrivateRoutes />
    } else {
        return <PublicRoutes />
    }
};

export default AuthProvider;