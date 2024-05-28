import React, { useState } from "react";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import Layout from "../../components/layout/Layout";
import CustomInput from "../../components/input/CustomInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import CustomButton from "../../components/button/CustomButton";
import ErrorMessage from "../../components/error/ErrorMessage";

type RegisterData = Omit<User, 'id'> & {confirmPassword: string}

const RegisterPage = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [registerUser] = useRegisterMutation()

    const register = async (data: RegisterData) => {
        try {
            await registerUser(data).unwrap()
            navigate(Paths.home)
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
                <Card
                    title='Реєстрація'
                    headStyle={{ textAlign: 'center', fontSize: '20px' }}
                    style={{ width: '30rem' }}
                >
                    <Form onFinish={ register } autoComplete='off'>
                        <CustomInput name='name' placeholder='Повне ім’я' />
                        <CustomInput name='email' type='email' placeholder='Пошта' />
                        <PasswordInput name='password' placeholder='Пароль'/>
                        <PasswordInput name='confirmPassword' placeholder='Підтвердити пароль'/>
                        <CustomButton type='primary' htmlType='submit'>Зареєструватись</CustomButton>
                    </Form>
                    <ErrorMessage message={ error } marginBottom='14px' />
                    <Space direction='vertical' size='large'>
                        <Typography>Вже є акаунт? <Link to={Paths.login}>Ввійти</Link> </Typography>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default RegisterPage;
