import React, { FC } from "react";
import { Layout, Space, Typography} from "antd";
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
import CustomButton from "../button/CustomButton";
import styles from "./header.module.css";

const Header: FC = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate(Paths.login)
    }

    const goToHome = () => {
        if(user) {
            navigate(Paths.home)
        }
    }

    return (
      <Layout.Header className={styles.header}>
        <Space>
          <TeamOutlined className={styles.teamIcon} />
            <CustomButton type="ghost" onClick={goToHome}>
              <Typography.Title level={1}>Працівники</Typography.Title>
            </CustomButton>
        </Space>
        {user ? (
          <Space>
              <CustomButton type='text' icon={<UserOutlined />}>
                  { user?.name }
              </CustomButton>
            <CustomButton
              onClick={onLogoutClick}
              icon={<LogoutOutlined />}
              type="default"
            >
              Вийти
            </CustomButton>
          </Space>
        ) : (
          <Space>
            <Link to={Paths.login}>
              <CustomButton icon={<LoginOutlined />} type="default">
                Ввійти
              </CustomButton>
            </Link>
            <Link to={Paths.register}>
              <CustomButton icon={<UserOutlined />} type="default">
                Зареєструватись
              </CustomButton>
            </Link>
          </Space>
        )}
      </Layout.Header>
    );
};

export default Header;