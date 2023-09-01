import React, { FC, useState } from "react";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import ErrorMessage from "../../components/error/ErrorMessage";
import CustomButton from "../../components/button/CustomButton";
import PasswordInput from "../../components/password-input/PasswordInput";
import CustomInput from "../../components/input/CustomInput";
import Layout from "../../components/layout/Layout";

const LoginPage: FC = () => {
    const [loginUser, loginUserResult] = useLoginMutation()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const login = async (data: UserData) => {
        try {
            await loginUser(data).unwrap()
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
                    title='Авторизація'
                    headStyle={{ textAlign: 'center', fontSize: '20px' }}
                    style={{ width: '30rem' }}
                >
                    <Form onFinish={ login }>
                        <CustomInput name='email' type='email' placeholder='Пошта' />
                        <PasswordInput name='password' placeholder='Пароль'/>
                        <CustomButton type='primary' htmlType='submit'>Ввійти</CustomButton>
                    </Form>
                    <ErrorMessage message={ error } marginBottom='14px' />
                    <Space direction='vertical' size='large'>
                        <Typography.Text>
                            Немає акаунта? <Link to={Paths.register}>Зареєструватись</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default LoginPage;