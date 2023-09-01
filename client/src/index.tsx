import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { router } from "./router/router";
import { ConfigProvider, theme } from "antd";
import Auth from "./features/auth/auth";
import "./index.css";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={ store }>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Auth>
                <RouterProvider router={ router } />
            </Auth>
        </ConfigProvider>
    </Provider>
);

