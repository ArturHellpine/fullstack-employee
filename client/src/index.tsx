import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { ConfigProvider, theme } from "antd";
import Auth from "./features/auth/auth";
import AuthProvider from "./router/AuthProvider";
import "./index.css";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={ store }>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Auth>
                <BrowserRouter>
                    <AuthProvider />
                </BrowserRouter>
            </Auth>
        </ConfigProvider>
    </Provider>
);

