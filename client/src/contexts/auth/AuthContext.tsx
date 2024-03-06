import { DispatchProp } from "react-redux";
import { AuthState } from "./type";
import { createContext } from "react";

export enum AuthActionType {
    INITIALIZE = 'INITIALIZE',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT'
}

export interface PayloadAction<T> {
    type: AuthActionType;
    payload: T;
}

export interface AuthContext extends AuthState {
    dispatch: DispatchProp<PayloadAction<AuthState>>;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
}

// const AuthContext = createContext<AuthActionType>({
//     ...initialState,
//     dispatch: () => null
// })