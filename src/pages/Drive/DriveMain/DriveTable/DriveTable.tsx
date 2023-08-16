import React, { useState } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useAppSelector } from '../../../../store';
import { toSizeFormat } from '../../../../utils/sizeFormat';
import cl from './DriveTable.module.css';
import TableRow from './TableRow';
import { UploadCloudIcon } from '../../../../assets/icons';
import Loader from '../../../../components/Loader/Loader';

// Проход по папка будет таким /trash:id, по этому создам хук useTrash который
// будет возвращать является ли сейчас пользователь в корзине
// по этому можно будет отказаться от пропсов

const DriveTable = ({ isTrash }: { isTrash: boolean }) => {
  const { folder: folderInfo, subfolders, files, isLoading } = useAppSelector(state => state.drive);
  const Actions = useActions();
  const [dragEnter, setDragEnter] = useState(false);

  const dragHandler = (event: React.DragEvent<HTMLElement>, dragEnter: boolean) => {
    if (isTrash) return;
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(dragEnter)
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
    <div className={cl.table}>
      <div className={cl.head}>
        <div className={cl.row}>
          <div></div>
          <div>Название</div>
          <div>Размер файла</div>
          <div></div>
        </div>
      </div>
      <div className={cl.body_wrapper}>
        {!isTrash && dragEnter && <div 
          className={cl.drop_zone}
          onDragLeave={e => dragHandler(e, false)}
          onDrop={dropHandler}
          onDragOver={e => dragHandler(e, true)} 
        >
          <UploadCloudIcon />
          <div className={cl.message}>
            Перемещенные файлы будут загружены в текущую папку
          </div>
        </div>}
        <div 
          className={cl.body}
          onDragEnter={e => dragHandler(e, true)} 
          onDragOver={e => dragHandler(e, true)} 
        >
          <Loader isLoading={isLoading} className={cl.loader} /> 
          {subfolders.map(folder =>
            <TableRow
              type="folder"
              id={folder._id}
              name={folder.name}
              size="_"
              inTrash={folder.trashed}
              key={folder._id}
            />
          )}
          {files.map(file =>
            <TableRow
              type="file"
              id={file._id}
              name={file.metadata.filename}
              size={toSizeFormat(file.metadata.length)}
              inTrash={file.trashed}
              key={file._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DriveTable;