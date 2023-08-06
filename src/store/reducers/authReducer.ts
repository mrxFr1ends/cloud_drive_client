import { AuthAction, AuthActionTypes, IAuthState } from "../../types/auth";

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  error: null,
};

export const authReducer = (
  state: IAuthState = initialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCESS:
      return { ...action.payload, error: null };
    case AuthActionTypes.AUTH_FAILURE:
      return { token: null, user: null, error: action.payload };
    case AuthActionTypes.AUTH_LOGOUT:
      return { token: null, user: null, error: null };
    default:
      return state;
  }
};
