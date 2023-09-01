import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Result, Row } from "antd";
import { Statuses } from "./statuses";
import { Paths } from "../../paths";
import Layout from "../../components/layout/Layout";

const StatusPage: FC = () => {
    const { status } = useParams()
    const navigate = useNavigate()

    return (
        <Layout>
            <Row align='middle' justify='center' style={{ width: '100%' }}>
                <Result
                    status={ status ? 'success' : 404 }
                    title={ status ? Statuses[status] : 'Не знайдено' }
                    extra={
                        <Button key='dashboard' type='primary' onClick={() => navigate(Paths.home)}>
                            На головну
                        </Button>
                    }
                />
            </Row>
        </Layout>
    );
};

export default StatusPage;