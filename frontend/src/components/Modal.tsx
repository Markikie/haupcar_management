interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({
  children,
  onClose
}: ModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;