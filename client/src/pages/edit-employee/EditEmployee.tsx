import React, { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../app/services/employees";
import { Row } from "antd";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { Paths } from "../../paths";
import Loader from "../../components/loader/Loader";
import Layout from "../../components/layout/Layout";
import EmployeeForm from "../../components/employee-form/EmployeeForm";

const EditEmployee: FC = () => {
    const navigate = useNavigate()
    const params = useParams<{ id: string }>()
    const [error, setError] = useState('')
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [editEmployee] = useEditEmployeeMutation()

    if(isLoading) {
        return <Loader />
    }

    const handleEditEmployee = async (employee: Employee) => {
        try {
            await editEmployee({...data, ...employee}).unwrap()
            navigate(`${Paths.status}/updated`)
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
                    onFinish={ handleEditEmployee }
                    employee={ data }
                    btnText='Зберегти зміни'
                    title='Редагувати працівника'
                    error={ error }
                />
            </Row>
        </Layout>
    );
};

export default EditEmployee;