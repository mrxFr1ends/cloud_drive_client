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
}

export enum AuthActionTypes {
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_FAILURE = "AUTH_FAILURE",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}

interface AuthSuccessAction {
  type: AuthActionTypes.AUTH_SUCCESS;
  payload: AuthResponse;
}

interface AuthFailureAction {
  type: AuthActionTypes.AUTH_FAILURE;
  payload: IApiError;
}

interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}

export type AuthAction =
  | AuthSuccessAction
  | AuthFailureAction
  | AuthLogoutAction;
