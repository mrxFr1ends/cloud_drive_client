import { Link } from 'react-router-dom';
import { DownloadIcon, FileIcon, FolderIcon, RecoveryIcon, TrashIcon } from '../../../../assets/icons';
import { useActions } from '../../../../hooks/useActions';
import cl from "./DriveTable.module.css";

interface TableRowProps {
  type: "file" | "folder",
  id: string,
  name: string,
  size: string,
  inTrash: boolean
}

const TableRow = ({ type, id, name, size, inTrash }: TableRowProps) => {
  const Actions = useActions();

  const onMoveObject = (inTrash: boolean) => {
    if (type === "file")
      Actions.moveFile(id, inTrash);
    else Actions.moveFolder(id, inTrash);
  }

  const onRemoveObject = () => {
    if (type === "file")
      Actions.removeFile(id);
    else Actions.removeFolder(id);
  }

  const onDownloadObject = () => {
    if (type === "file")
      Actions.downloadFile(id, name);
    else Actions.downloadFolder(id, name);
  }

  return (
    <div className={cl.row}>
      <div>{type === "file" ? <FileIcon /> : <FolderIcon />}</div>
      <div>
        {type === "folder"
          ? <Link to={`${inTrash ? "/trash" : ""}/${id}`} title={name}>
            {name}
          </Link>
          : name
        }
      </div>
      <div>{size}</div>
      <div>
        {inTrash ? <>
          <button
            title="Восстановить"
            onClick={() => onMoveObject(false)}
            className="drive_btn"
          ><RecoveryIcon /></button>
          <button
            title="Удалить навсегда"
            onClick={() => onRemoveObject()}
            className="drive_btn"
          ><TrashIcon /></button>
        </> : <>
          <button
            title="Скачать"
            onClick={() => onDownloadObject()}
            className="drive_btn"
          ><DownloadIcon /></button>
          <button
            title="Переместить в корзину"
            onClick={() => onMoveObject(true)}
            className="drive_btn"
          ><TrashIcon /></button>
        </>}
      </div>
    </div>
  );
}

export default TableRow;