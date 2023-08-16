import { IApiError } from "./api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  error: IApiError | null;
  isLoading: boolean;
}

export enum AuthActionTypes {
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_FAILURE = "AUTH_FAILURE",
  AUTH_LOGOUT = "AUTH_LOGOUT",
  CLEAR_ERROR = "CLEAR_ERROR",
  SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE",
}

interface AuthSuccessAction {
  type: AuthActionTypes.AUTH_SUCCESS;
  payload: AuthResponse;
}

interface AuthFailureAction {
  type: AuthActionTypes.AUTH_FAILURE;
  payload: IApiError | null;
}

interface AuthLogoutAction { 
  type: AuthActionTypes.AUTH_LOGOUT;
}

interface ClearErrorAction {
  type: AuthActionTypes.CLEAR_ERROR;
}

interface SetErrorMessageAction {
  type: AuthActionTypes.SET_ERROR_MESSAGE;
  payload: string;
}

export type AuthAction =
  | AuthSuccessAction
  | AuthFailureAction
  | AuthLogoutAction
  | ClearErrorAction
  | SetErrorMessageAction;
