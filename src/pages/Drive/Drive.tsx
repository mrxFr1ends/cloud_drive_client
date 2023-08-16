import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Modal from '../../components/Modal';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../store';
import { IUser } from '../../types/auth';
import './Drive.css';
import DriveHeader from './DriveHeader/DriveHeader';
import DriveMain from './DriveMain/DriveMain';
import DriveModalContainer from './DriveModalContainer';

const Drive = ({ user, isTrash }: { user: IUser, isTrash: boolean }) => {
  const { folder: folderInfo } = useAppSelector(state => state.drive);
  const { getFolder, createFolder } = useActions();
  const { id } = useParams<{ id?: string }>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getFolder(id ?? "", isTrash ? "trashed" : undefined);
  }, [id, isTrash]);

  return (
    <div className="drive-container">
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DriveModalContainer onCreate={name => {
          setOpenModal(false);
          createFolder(name, folderInfo._id);
        }} />
      </Modal>
      <DriveHeader user={user} onOpenModal={() => setOpenModal(true)} />
      <DriveMain isTrash={isTrash} />
    </div>
  );
};

export default Drive;