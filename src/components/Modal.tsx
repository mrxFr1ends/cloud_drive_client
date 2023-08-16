import React, { useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalProps {
  isOpen: boolean;
  onClose: (event: MouseEvent) => void;
  children: React.ReactElement;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onClose);

  if (!isOpen)
    return <></>;

  return (
    <div className="drive-modal">
      {React.cloneElement(children, { ref: wrapperRef })}
    </div>
  );
};

export default Modal;