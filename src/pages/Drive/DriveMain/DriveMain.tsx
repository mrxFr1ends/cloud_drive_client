import { Link } from 'react-router-dom';
import { DriveIcon, TrashIcon } from '../../../assets/icons';
import cl from "./DriveMain.module.css";
import DriveTable from './DriveTable/DriveTable';

const DriveMain = ({ isTrash }: { isTrash: boolean }) => {
  return (
    <main className={cl.content}>
      <div className={cl.left_bar}>
        <ul>
          <li className={!isTrash ? cl.select : ""}><Link to="/"><DriveIcon />Диск</Link></li>
          <li className={isTrash ? cl.select : ""}><Link to="/trash"><TrashIcon />Корзина</Link></li>
        </ul>
      </div>
      <DriveTable isTrash={isTrash} />
    </main>
  );
};

export default DriveMain;