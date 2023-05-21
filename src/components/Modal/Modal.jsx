import { AiOutlineCloseCircle } from "react-icons/ai";

import "./Modal.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <AiOutlineCloseCircle className="modal-close" onClick={closeModal} />
        {children}
      </div>
    </article>
  );
};

export default Modal;
