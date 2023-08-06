import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { driveReducer } from "./driveReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  drive: driveReducer
});

export type RootState = ReturnType<typeof rootReducer>;
