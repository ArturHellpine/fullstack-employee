import React from 'react';
import { Spin } from "antd";

const Loader = () => {
    return (
        <Spin tip="Loading..." size="large" style={{ marginTop: '20vh' }}>
            <div />
        </Spin>
    );
};

export default Loader;