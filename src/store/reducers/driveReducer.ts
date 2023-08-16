import {
  DriveAction,
  DriveActionTypes,
  Folder,
  IDriveState,
} from "../../types/drive";

const initialState: IDriveState = {
  folder: {} as Folder,
  subfolders: [],
  files: [],
};

export const driveReducer = (
  state: IDriveState = initialState,
  action: DriveAction
): IDriveState => {
  switch (action.type) {
    case DriveActionTypes.SET_FOLDER_INFO:
      return { ...action.payload };
    case DriveActionTypes.ADD_FOLDER:
      return { ...state, subfolders: [...state.subfolders, action.payload] };
    case DriveActionTypes.REMOVE_FOLDER:
      return {
        ...state,
        subfolders: state.subfolders.filter(
          folder => folder._id !== action.payload
        ),
      };
    case DriveActionTypes.ADD_FILES:
      return { ...state, files: [...state.files, ...action.payload] };
    case DriveActionTypes.REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter(file => file._id !== action.payload),
      };
    case DriveActionTypes.UPDATE_FOLDER: {
      console.log({ ...state, subfolders: state.subfolders.map(subfolder => subfolder._id === action.payload._id ? action.payload : subfolder) });
      return { ...state, subfolders: state.subfolders.map(subfolder => subfolder._id === action.payload._id ? action.payload : subfolder) };
    }
    case DriveActionTypes.UPDATE_FILE:
      return { ...state, files: state.files.map(file => file._id === action.payload._id ? action.payload : file) };
    default:
      return state;
  }
};
