import React, { FC, ReactNode } from "react";
import { Button, Form } from "antd";

interface CustomButtonProps {
    onClick?: () => void
    children: React.ReactNode
    htmlType?: "button" | "submit" | "reset" | undefined
    type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed" | undefined
    danger?: boolean
    loading?: boolean
    shape?: "default" | "circle" | "round" | undefined
    icon?: ReactNode
    disabled?: boolean
}

const CustomButton: FC<CustomButtonProps> = ({ htmlType = 'button', children, onClick, type, danger, loading, shape, icon, disabled }) => {
    return (
        <Form.Item>
            <Button
                disabled={ disabled }
                type={ type }
                loading={ loading }
                danger={ danger }
                htmlType={ htmlType }
                shape={ shape }
                icon={ icon }
                onClick={ onClick }
            >
                { children }
            </Button>
        </Form.Item>
    );
};

export default CustomButton;