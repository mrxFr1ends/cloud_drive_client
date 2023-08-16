import { ChangeEvent } from 'react';
import cl from "./DriveHeader.module.css";
import { AddFolderIcon, DownloadFolderIcon, LogoutIcon, SearchIcon, UploadFileIcon } from '../../../assets/icons';
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../store';
import { IUser } from '../../../types/auth';

const DriveHeader = ({ user, onOpenModal }: { user: IUser, onOpenModal: () => void }) => {
  const { folder } = useAppSelector(state => state.drive);
  const Actions = useActions();

  const fileUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0)
      return;
    Actions.uploadFiles(event.target.files, folder._id);
  }

  return (
    <header className={cl.header}>
      <div className={cl.actions}>
        <button
          className="drive_btn"
          onClick={_ => Actions.downloadFolder(folder._id, folder.name)}
          title="Скачать папку"
        >
          <DownloadFolderIcon />
        </button>

        <button className={`drive_btn ${cl.upload_btn}`} title="Загрузить файлы">
          <label htmlFor='upload_input'>
            <UploadFileIcon />
          </label>
          <input
            type="file"
            multiple={true}
            onChange={fileUploadHandler}
            id="upload_input"
          />
        </button>

        <button
          className="drive_btn"
          onClick={_ => onOpenModal()}
          title="Создать папку"
        >
          <AddFolderIcon />
        </button>

      </div>

      <div className={cl.search}>
        <label htmlFor="search_input">
          <SearchIcon />
        </label>
        <input type="text" placeholder="Поиск" id="search_input" />
      </div>

      <div className={cl.user}>
        <div className={cl.username}>
          {user.username}
        </div>
        <button
          className="drive_btn"
          onClick={_ => Actions.logout()}
          title="Выход из аккаунта"
        >
          <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default DriveHeader;