import { AxiosError } from "axios";
import { Dispatch } from "react";
import { $api } from "../../http";
import { IApiError } from "../../types/api";
import {
  AuthAction,
  AuthActionTypes,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../../types/auth";

const auth = (url: string, payload: RegisterPayload | LoginPayload) => {
  return (dispatch: Dispatch<AuthAction>) => {
    $api
      .post<AuthResponse>(`auth/${url}`, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data: { token, user } }) => {
        localStorage.setItem("token", token);
        dispatch({
          type: AuthActionTypes.AUTH_SUCCESS,
          payload: { token, user },
        });
      })
      .catch((error: AxiosError<IApiError>) => {
        if (error.response)
          dispatch({
            type: AuthActionTypes.AUTH_FAILURE,
            payload: error.response.data,
          });
      });
  };
};

export const register = (payload: RegisterPayload) => auth("register", payload);
export const login = (payload: LoginPayload) => auth("login", payload);
export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  localStorage.removeItem("token");
  dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
};
