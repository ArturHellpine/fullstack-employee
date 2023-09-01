import React, { FC, ReactElement } from "react";
import { useCurrentQuery } from "../../app/services/auth";
import Loader from "../../components/loader/Loader";

interface AuthProps {
    children: ReactElement
}

const Auth: FC<AuthProps> = ({ children }) => {
    const { isLoading } = useCurrentQuery()

    if(isLoading) {
        return (
            <Loader />
        )
    }
    return children
};

export default Auth;