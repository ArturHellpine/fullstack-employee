import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "../paths";
import Employees from "../pages/employees/Employees";
import CreateEmployee from "../pages/add-employee/CreateEmployee";
import StatusPage from "../pages/status/StatusPage";
import OneEmployeePage from "../pages/one-employee/OneEmployeePage";
import EditEmployee from "../pages/edit-employee/EditEmployee";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path={ Paths.home } element={ <Employees /> }/>
            <Route path={ Paths.employeeAdd } element={ <CreateEmployee /> }/>
            <Route path={ `${ Paths.status }/:status` } element={ <StatusPage /> }/>
            <Route path={ `${ Paths.employee }/:id` } element={ <OneEmployeePage /> }/>
            <Route path={ `${ Paths.employeeEdit }/:id` } element={ <EditEmployee /> }/>
            <Route path='/*' element={ <Navigate replace to={ Paths.home } /> } />
        </Routes>
    );
};

export default PrivateRoutes;