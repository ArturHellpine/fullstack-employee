import { Paths } from "../paths";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import Employees from "../pages/employees/Employees";
import CreateEmployee from "../pages/add-employee/CreateEmployee";
import StatusPage from "../pages/status/StatusPage";
import OneEmployeePage from "../pages/one-employee/OneEmployeePage";
import EditEmployee from "../pages/edit-employee/EditEmployee";

export const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <Employees />
    },
    {
        path: Paths.login,
        element: <LoginPage />
    },
    {
        path: Paths.register,
        element: <RegisterPage />
    },
    {
        path: Paths.employeeAdd,
        element: <CreateEmployee />
    },
    {
        path: `${Paths.status}/:status`,
        element: <StatusPage />
    },
    {
        path: `${Paths.employee}/:id`,
        element: <OneEmployeePage />
    },
    {
        path: `${Paths.employeeEdit}/:id`,
        element: <EditEmployee />
    },
])