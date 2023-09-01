import React, { FC } from "react";
import { Form, Input } from "antd";

interface CustomInputProps {
    name: string
    placeholder: string
    type?: string
}

const CustomInput: FC<CustomInputProps> = ({ name, placeholder, type = 'text' }) => {
    return (
        <Form.Item
            name={ name }
            shouldUpdate={ true }
            rules={[{ required: true, message: 'Обов’язкове поле' }]}
        >
            <Input
                placeholder={ placeholder }
                type={ type }
                size='large'
            />
        </Form.Item>
    );
};

export default CustomInput;