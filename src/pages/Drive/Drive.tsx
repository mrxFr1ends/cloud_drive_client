import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../store';
import { IUser } from '../../types/auth';
import './Drive.css';
import { AddFolderIcon, DownloadFolderIcon, UploadFileIcon, SearchIcon, LogoutIcon, DownloadIcon, TrashIcon, FolderIcon, FileIcon, DriveIcon, RecoveryIcon } from "../../assets/icons";
import { toSizeFormat } from '../../utils/sizeFormat';

const Drive = ({ user }: { user: IUser }) => {
  const { folder: folderInfo, subfolders, files } = useAppSelector(state => state.drive);
  const Actions = useActions();
  const { id } = useParams<{ id?: string }>();
  const { pathname } = useLocation();
  const inTrash = pathname === "/trash";

  const [folderName, setFolderName] = useState("");
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    // TODO: если ты в корзине, ты не можешь восстановить файл. 
    // TODO: + иконки бы другие и т.д.
    console.log(123)
    Actions.getFolder(id ?? "", inTrash ? "trashed" : undefined);
  }, [id, inTrash]);

  const fileUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0)
      return;
    Actions.uploadFiles(event.target.files, folderInfo._id);
  }

  const dragEnterHandler = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  const dragLeaveHandler = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.dataTransfer || event.dataTransfer.files.length === 0)
        return;
      Actions.uploadFiles(event.dataTransfer.files, folderInfo._id);
      setDragEnter(false)
  }

  return (
    <div className="drive-container">
      <div className="drive-modal">
        {/* <Form<{type: "text", placeholder: "Название папки", name: "folderName"}>> */}
        <input
          type="text"
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
        />
        <button
          onClick={_ => Actions.createFolder(folderName, folderInfo._id)}
        >
          Создать папку
        </button>
      </div>
      <header className="drive-header">
        <div className="drive-header-actions">
          <button
            className="drive-btn"
            onClick={_ => Actions.downloadFolder(folderInfo._id, folderInfo.name)}
            title="Скачать папку"
          >
            <DownloadFolderIcon />
          </button>
          <button className="drive-btn drive-upload" title="Загрузить файлы">
            <label htmlFor='drive-upload-input'>
              <UploadFileIcon />
            </label>
            <input
              type="file"
              multiple={true}
              onChange={fileUploadHandler}
              id="drive-upload-input"
            />
          </button>
          <button
            className="drive-btn"
            onClick={_ => Actions.createFolder("Test Folder", folderInfo._id)}
            title="Создать папку"
          >
            <AddFolderIcon />
          </button>
        </div>
        <div className="drive-header-search">
          <label className="drive-header-search-label" htmlFor="drive-header-search-input">
            <SearchIcon />
          </label>
          <input type="text" placeholder="Поиск" id="drive-header-search-input" />
        </div>
        <div className="drive-header-user">
          <div className="drive-header-username">{user.username}</div>
          <button 
            className="drive-btn"
            onClick={_ => Actions.logout()}
            title="Выход из аккаунта"
          >
            <LogoutIcon />
          </button>
        </div>
      </header>
      {!dragEnter ? <main className="drive-content" onDragEnter={dragEnterHandler} onDragOver={dragEnterHandler} onDragLeave={dragLeaveHandler}>
        <div className="drive-left-bar">
          <ul>
            <li className={!inTrash ? "select" : ""}><Link to="/"><DriveIcon />Диск</Link></li>
            <li className={inTrash ? "select" : ""}><Link to="/trash"><TrashIcon />Корзина</Link></li>
          </ul>
        </div>
        <div className="drive-table">
          <div className="head">
            <div className="row"> 
              <div></div>
              <div>Название</div>
              <div>Размер файла</div>
              <div></div>
            </div>
          </div>
          <div className="body">
            {subfolders.map(folder =>
              <div className="row">
                <div><FolderIcon /></div>
                <div><Link to={`/${folder._id}`} title={folder.name}>{folder.name}</Link></div>
                <div>_</div>
                <div>
                  {inTrash ? <>
                    <button 
                      className="drive-btn" 
                      title="Восстановить папку"
                      onClick={() => Actions.moveFolder(folder._id, false)}
                    >
                      <RecoveryIcon />
                    </button>
                    <button 
                      className="drive-btn" 
                      onClick={() => Actions.removeFolder(folder._id)} 
                      title="Удалить папку навсегда"
                    >
                      <TrashIcon />
                    </button>
                  </> : <>
                    <button 
                      className="drive-btn" 
                      onClick={() => Actions.downloadFolder(folder._id, folder.name)} 
                      title="Скачать папку"
                    >
                      <DownloadIcon />  
                    </button>
                    <button 
                      className="drive-btn" 
                      onClick={() => Actions.moveFolder(folder._id, true)} 
                      title="Переместить в корзину"
                    >
                      <TrashIcon />
                    </button>
                  </>}
                </div>
              </div>
            )}
            {files.map(file =>
              <div className="row">
                <div><FileIcon /></div>
                <div>{file.metadata.filename}</div>
                <div>{toSizeFormat(file.metadata.length)}</div>
                <div>
                  {inTrash ? <>
                    <button 
                      className="drive-btn" 
                      onClick={() => Actions.moveFile(file._id, false)} 
                      title="Восстановить файл"
                    >
                      <RecoveryIcon />
                    </button>
                    <button 
                      className="drive-btn" 
                      onClick={_ => Actions.removeFile(file._id)} 
                      title="Удалить файл навсегда"
                    >
                      <TrashIcon />
                    </button>
                  </> : <>
                    <button 
                      className="drive-btn" 
                      onClick={() => Actions.downloadFile(file._id, file.metadata.filename)} 
                      title="Скачать файл"
                    >
                      <DownloadIcon />
                    </button>
                    <button 
                      className="drive-btn" 
                      onClick={_ => Actions.moveFile(file._id, true)} 
                      title="Переместить в корзину"
                    >
                      <TrashIcon />
                    </button>
                  </>}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      : <div style={{width: "100%", height: "100%", backgroundColor: "red"}} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragOver={dragEnterHandler} onDragLeave={dragLeaveHandler}>
        Загрузка файла
      </div>}
    </div>
  );
};

export default Drive;