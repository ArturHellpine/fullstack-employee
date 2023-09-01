import React, { FC, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import CustomButton from "../../components/button/CustomButton";
import Layout from "../../components/layout/Layout";

const Employees: FC = () => {
    const { data, isLoading } = useGetAllEmployeesQuery()

    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if(!user) {
            navigate(Paths.login)
        }
    }, [navigate, user])

    const goToAddEmployee = () => {
        if(user) {
            navigate(Paths.employeeAdd)
        }
    }

    return (
        <Layout>
            <CustomButton
                type='primary'
                onClick={goToAddEmployee}
                icon={ <PlusCircleOutlined /> }
            >
                Добавити
            </CustomButton>
            <Table
                rowKey={(record) => record.id}
                columns={ columns }
                dataSource={ data }
                loading={ isLoading }
                pagination={ false }
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`${Paths.employee}/${record.id}`)
                    }
                }}
            />
        </Layout>
    );
};

export default Employees;