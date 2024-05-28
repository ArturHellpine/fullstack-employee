import React, { FC } from "react";
import { Employee } from "@prisma/client";
import { Card, Form } from "antd";
import CustomInput from "../input/CustomInput";
import ErrorMessage from "../error/ErrorMessage";
import CustomButton from "../button/CustomButton";

interface EmployeeFormProps {
    onFinish: (values: Employee) => void
    btnText: string
    title: string
    error?: string
    employee?: Employee
}

const EmployeeForm: FC<EmployeeFormProps> = ({ onFinish, title, btnText, error, employee }) => {
    return (
        <Card title={ title } style={{ width: '32rem' }} headStyle={{ textAlign: 'center', fontSize: '20px' }}>
            <Form name='employee-form' onFinish={ onFinish } initialValues={ employee } autoComplete='off'>
                <CustomInput type='text' name='firstName' placeholder='Ім’я' />
                <CustomInput type='text' name='lastName' placeholder='Прізвище' />
                <CustomInput type='text' name='age' placeholder='Вік' />
                <CustomInput type='text' name='address' placeholder='Місто' />
                <CustomButton type='primary' htmlType='submit'>
                    { btnText }
                </CustomButton>
            </Form>
            <ErrorMessage message={ error } />
        </Card>
    );
};

export default EmployeeForm;
