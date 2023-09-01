import React, { useEffect, useState } from "react";
import { Row } from "antd";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import Layout from "../../components/layout/Layout";
import EmployeeForm from "../../components/employee-form/EmployeeForm";

const CreateEmployee = () => {
    const [error, setError] = useState('')
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const [addEmployee] = useAddEmployeeMutation()

    useEffect(() => {
        if(!user) {
            navigate(Paths.login)
        }
    }, [navigate, user])

    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap()
            navigate(`${Paths.status}/created`)
        } catch (err) {
            const isError = isErrorWithMessage(err)
            if(isError) {
                setError(err.data.message)
            } else {
                setError('Невідома помилка')
            }
        }
    }
    
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <EmployeeForm
                    onFinish={handleAddEmployee}
                    btnText='Створити'
                    title='Створити працівника'
                    error={ error }
                />
            </Row>
        </Layout>
    );
};

export default CreateEmployee;