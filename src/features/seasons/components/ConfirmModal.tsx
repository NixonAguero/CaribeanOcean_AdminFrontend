interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) => {

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
    >

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="confirm-icon">
          ⚠️
        </div>
      <div>
        <h2>{title}</h2>
     </div>
        <p className="confirm-modal-p">{message}</p>

        <div className="confirm-actions">

          <button
            className="add-button"
            onClick={onConfirm}
          >
            Delete
          </button>

          <button
            className="add-button"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;