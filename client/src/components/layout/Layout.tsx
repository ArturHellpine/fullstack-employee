import React, { FC } from "react";
import { Layout as AntLayout } from "antd";
import Header from "../header/Header";
import styles from "./layout.module.css";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.main}>
            <Header />
            <AntLayout.Content style={{ height: '100%' }}>
                { children }
            </AntLayout.Content>
        </div>
    );
};

export default Layout;