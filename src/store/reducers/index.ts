import { Reducer, combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { driveReducer } from "./driveReducer";
import { initialState } from "../index";
import { AuthAction, AuthActionTypes } from "../../types/auth";
import { DriveAction } from "../../types/drive";

const appReducer = combineReducers({
  auth: authReducer,
  drive: driveReducer
});

export const rootReducer: Reducer = (state: RootState, action: AuthAction | DriveAction) => {
  if (action.type === AuthActionTypes.AUTH_LOGOUT)
    return appReducer(initialState, action)
  return appReducer(state, action)
}

export type RootState = ReturnType<typeof appReducer>;
