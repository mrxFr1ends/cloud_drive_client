import { AuthAction, AuthActionTypes, IAuthState } from "../../types/auth";

const initialState: IAuthState = {
  token: null,
  user: null,
  error: null,
  isLoading: true
};

export const authReducer = (
  state: IAuthState = initialState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCESS:
      return { ...action.payload, error: null, isLoading: false };
    case AuthActionTypes.AUTH_FAILURE:
      return { token: null, user: null, error: action.payload, isLoading: false };
    case AuthActionTypes.AUTH_LOGOUT:
      return { token: null, user: null, error: null, isLoading: false };
    case AuthActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case AuthActionTypes.SET_ERROR_MESSAGE:
      return { ...state, error: { message: action.payload }};
    default:
      return state;
  }
};
