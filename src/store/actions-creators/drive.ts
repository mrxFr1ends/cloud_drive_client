import { AxiosError, AxiosProgressEvent } from "axios";
import { Dispatch } from "react";
import { $api } from "../../http";
import { IApiError } from "../../types/api";
import {
  DriveAction,
  DriveActionTypes,
  File,
  Folder,
  FolderInfo,
  UploadFilesResponse,
} from "../../types/drive";

export const getFolder = (folderId: string, filter?: string) => {
  const url = `disk/${folderId}?type=folder` + (filter ? `&filter=${filter}` : '');
  return (dispatch: Dispatch<DriveAction>) => {
    $api
      .get<FolderInfo>(url, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: DriveActionTypes.SET_FOLDER_INFO,
          payload: data,
        });
      })
      .catch((error: AxiosError<IApiError>) => {
        if (error.response) console.log(error);
      });
  };
};

export const createFolder = (name: string, parentId: string) => {
  return (dispatch: Dispatch<DriveAction>) => {
    $api
      .post<Folder>(
        `disk/`,
        {
          name,
          parentId,
          type: "folder",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(({ data }) => {
        dispatch({ type: DriveActionTypes.ADD_FOLDER, payload: data });
      })
      .catch((error: AxiosError<IApiError>) => {
        if (error.response) console.log(error);
      });
  };
};

export const uploadFiles = (uploadedFiles: FileList, folderId: string) => {
  return (dispath: Dispatch<DriveAction>) => {
    const formData = new FormData();
    Array.from(uploadedFiles).forEach(file =>
      formData.append("uploadedFiles", file)
    );
    formData.append("folderId", folderId);
    $api
      .post<UploadFilesResponse>("disk/upload/file", formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const totalLength = progressEvent.total;
          console.log(totalLength);
          if (totalLength) {
            let progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            console.log(progress);
          }
        },
      })
      .then(response => {
        console.log(response.data);
        dispath({
          type: DriveActionTypes.ADD_FILES,
          payload: response.data.files,
        });
      })
      .catch((error: AxiosError<IApiError>) => {
        if (error.response) console.log(error);
      });
  };
};

const removeObject = (
  id: string,
  objectType: string,
  actionType: DriveActionTypes.REMOVE_FOLDER | DriveActionTypes.REMOVE_FILE
) => {
  return (dispatch: Dispatch<DriveAction>) => {
    $api
      .delete(`disk/${id}?type=${objectType}`)
      .then(_ => dispatch({ type: actionType, payload: id }))
      .catch((error: AxiosError<IApiError>) => {
        if (error.response) console.log(error);
      });
  };
};

const moveObject = (
  id: string,
  objectType: string,
  actionType: DriveActionTypes.REMOVE_FILE | DriveActionTypes.REMOVE_FOLDER,
  inTrash: boolean
) => {
  return (dispatch: Dispatch<DriveAction>) => {
    $api
      .put<Folder | File>(`disk/`, {
        id,
        type: objectType,
        trashed: inTrash
      })
      .then(_ => dispatch({ type: actionType, payload: id }))
      .catch((error: AxiosError<IApiError>) => {
        if (error.response) console.log(error);
      });
  };
};


const downloadObject = (id: string, type: string, fileName: string) => {
  return async (dispatch: Dispatch<DriveAction>) => {
    return $api
      .request({
        url: `/disk/download/${type}/${id}`,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          console.log(progressEvent.loaded);
        },
      })
      .then(response => {
        const href = window.URL.createObjectURL(response.data);

        const anchorElement = document.createElement("a");

        anchorElement.href = href;
        anchorElement.download = fileName;

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
      })
      .catch(error => {
        console.log("error: ", error);
      });
  };
};

export const removeFolder = (id: string) =>
  removeObject(id, "folder", DriveActionTypes.REMOVE_FOLDER);
  
export const removeFile = (id: string) =>
  removeObject(id, "file", DriveActionTypes.REMOVE_FILE);

export const moveFolder = (id: string, inTrash: boolean) => 
  moveObject(id, "folder", DriveActionTypes.REMOVE_FOLDER, inTrash);

export const moveFile = (id: string, inTrash: boolean) => 
  moveObject(id, "file", DriveActionTypes.REMOVE_FILE, inTrash);

export const downloadFile = (id: string, filename: string) =>
  downloadObject(id, "file", filename);

export const downloadFolder = (id: string, filename: string) =>
  downloadObject(id, "folder", filename);
