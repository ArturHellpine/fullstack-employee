import React, { FC, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { Descriptions, Divider, Modal, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import Loader from "../../components/loader/Loader";
import CustomButton from "../../components/button/CustomButton";
import ErrorMessage from "../../components/error/ErrorMessage";
import Layout from "../../components/layout/Layout";

const OneEmployeePage: FC = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const params = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser)

    if(isLoading) {
        return <Loader />
    }

    if(!data) {
        return <Navigate to={Paths.home} />
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteEmployee = async () => {
        hideModal()
        try {
            await removeEmployee(data.id).unwrap()
            navigate(`${Paths.status}/deleted`)
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
            <Descriptions size='middle' title='Інформація про працівника' bordered>
                <Descriptions.Item label='Ім’я' span={ 3 }>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label='Вік' span={ 3 }>
                    {`${data.age}`}
                </Descriptions.Item>
                <Descriptions.Item label='Місто' span={ 3 }>
                    {`${data.address}`}
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data.userId ?
                <>
                    <Divider orientation='left'>Дія</Divider>
                    <Space>
                        <CustomButton
                            icon={ <EditOutlined /> }
                            shape="round"
                            type='default'
                            onClick={() => navigate(`${Paths.employeeEdit}/${data.id}`)}
                        >
                            Редагувати
                        </CustomButton>
                        <CustomButton 
                            shape='round'
                            danger onClick={showModal}
                            icon={ <DeleteOutlined /> }
                        >
                            Видалити
                        </CustomButton>
                    </Space>
                </> :
                    <>
                        <Divider orientation='left'>
                            Вам доступний лише перегляд
                        </Divider>
                    </>
            }
            <ErrorMessage message={ error } />
            <Modal
                title='Підтвердіть видалення'
                open={ isModalOpen }
                onOk={handleDeleteEmployee}
                onCancel={hideModal}
                okText='Підтвердити'
                cancelText='Скасувати'
            >
                Ви дійсно бажаєте видалити працівника з таблиці?
            </Modal>
        </Layout>
    );
};

export default OneEmployeePage;