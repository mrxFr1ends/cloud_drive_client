export interface Folder {
  _id: string;
  name: string;
  ownerId: string;
  parentId: string | null;
  trashed: boolean;
  prevParentId: any;
  __v: number;
}

export interface FileMetadata {
  length: number;
  uploadDate: string;
  filename: string;
}

export interface File {
  _id: string;
  ownerId: string;
  parentId: string;
  metadata: FileMetadata;
  trashed: boolean;
  prevParentId: any;
  __v: number;
}

export interface FolderInfo {
  folder: Folder;
  subfolders: Folder[];
  files: File[];
}

export interface UploadFilesResponse {
  files: File[];
}

export type IDriveState = FolderInfo;

export enum DriveActionTypes {
  SET_FOLDER_INFO = "SET_FOLDER_INFO",
  ADD_FOLDER = "ADD_FOLDER",
  REMOVE_FOLDER = "REMOVE_FOLDER",
  ADD_FILES = "ADD_FILES",
  REMOVE_FILE = "REMOVE_FILE",
  UPDATE_FOLDER = "UPDATE_FOLDER",
  UPDATE_FILE = "UPDATE_FILE",
}

interface SetFolderInfoAction {
  type: DriveActionTypes.SET_FOLDER_INFO;
  payload: FolderInfo;
}

interface AddFolderAction {
  type: DriveActionTypes.ADD_FOLDER;
  payload: Folder;
}

interface RemoveFolder {
  type: DriveActionTypes.REMOVE_FOLDER;
  payload: string;
}

interface AddFilesAction {
  type: DriveActionTypes.ADD_FILES;
  payload: File[];
}

interface RemoveFile {
  type: DriveActionTypes.REMOVE_FILE;
  payload: string;
}

interface UpdateFolder {
  type: DriveActionTypes.UPDATE_FOLDER;
  payload: Folder;
}

interface UpdateFile {
  type: DriveActionTypes.UPDATE_FILE;
  payload: File;
}

export type DriveAction =
  | SetFolderInfoAction
  | AddFolderAction
  | RemoveFolder
  | AddFilesAction
  | RemoveFile
  | UpdateFolder
  | UpdateFile;
