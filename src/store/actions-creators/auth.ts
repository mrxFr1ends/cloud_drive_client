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

export const register = (payload: RegisterPayload) => {
  return (dispatch: Dispatch<AuthAction>) => {
    $api
      .post<AuthResponse>("auth/register", payload)
      .then(response => authSuccess(dispatch, response.data))
      .catch(error => authFailure(dispatch, error));
  };
};

export const login = (payload: LoginPayload) => {
  return (dispatch: Dispatch<AuthAction>) => {
    $api
      .post<AuthResponse>("auth/login", payload)
      .then(response => authSuccess(dispatch, response.data))
      .catch(error => authFailure(dispatch, error));
  };
}

export const auth = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    if (!localStorage.getItem("token"))
      return dispatch({ type: AuthActionTypes.AUTH_FAILURE, payload: null });
    $api
      .get<AuthResponse>("auth/auth")
      .then(response => authSuccess(dispatch, response.data))
      .catch(error => authFailure(dispatch, error));
  };
}

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  localStorage.removeItem("token");
  dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
};

export const clearError = () => ({ type: AuthActionTypes.CLEAR_ERROR });
export const setErrorMessage = (errorMessage: string) => ({ 
  type: AuthActionTypes.SET_ERROR_MESSAGE, 
  payload: errorMessage 
});

const authSuccess = (dispatch: Dispatch<AuthAction>, { token, user }: AuthResponse) => {
  localStorage.setItem("token", token);
  dispatch({
    type: AuthActionTypes.AUTH_SUCCESS,
    payload: { token, user },
  });
}
const authFailure = (dispatch: Dispatch<AuthAction>, error: AxiosError<IApiError>) => {
  localStorage.removeItem("token");
  if (error.response)
    dispatch({
      type: AuthActionTypes.AUTH_FAILURE,
      payload: error.response.data,
    });
  else 
    dispatch({
      type: AuthActionTypes.AUTH_FAILURE,
      payload: { message: error.message }
    })
}