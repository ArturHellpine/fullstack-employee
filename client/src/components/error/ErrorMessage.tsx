import React, { FC } from "react";
import { Alert, Space } from "antd";

interface ErrorMessageProps {
    message?: string
    marginBottom?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, marginBottom }) => {
    if(!message) return null
    return (
        <Space style={{ display: 'flex', marginBottom: marginBottom }}>
            <Alert style={{ padding: '8px 10px' }} message={ message } type='error' />
        </Space>
    );
};

export default ErrorMessage;