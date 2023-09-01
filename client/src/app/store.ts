import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { api } from "./services/api";
import { listenerLoginMiddleware, listenerRegisterMiddleware } from "../middleware/auth";
import authSlice from "../features/auth/authSlice";
import employeesSlice from "../features/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    employees: employeesSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
        .concat(api.middleware)
        .prepend(listenerLoginMiddleware.middleware, listenerRegisterMiddleware.middleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
