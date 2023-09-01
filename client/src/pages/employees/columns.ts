import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";

export const columns: ColumnsType<Employee> = [
    {
        title: 'Ім’я',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Прізвище',
        dataIndex: 'lastName',
        key: 'lastName'
    },
    {
        title: 'Вік',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Місто',
        dataIndex: 'address',
        key: 'address'
    }
]