import { forwardRef, useState } from 'react';

interface DriveModalContainerProps {
  onCreate: (folderName: string) => void;
}

const DriveModalContainer = forwardRef<HTMLDivElement, DriveModalContainerProps>(({ onCreate }, ref) => {
  const [folderName, setFolderName] = useState("Без названия");

  return (
    <div className="modal_container" ref={ref}>
      <h1>Новая папка</h1>
      <input
        type="text"
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
      />
      <button onClick={_ => onCreate(folderName)}>
        Создать
      </button>
    </div>
  );
});

export default DriveModalContainer;