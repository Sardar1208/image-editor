interface ModalInterface {
  closeModal: () => void,
  onApply: () => void,
}

const Modal = ({ closeModal, onApply }: ModalInterface) => {
  const applyChanges = () => {
    onApply();
    closeModal();
  };

  return (
    <div>
      <div style={modalStyles.overlay} onClick={closeModal}>
        <div style={modalStyles.container} onClick={(e) => e.stopPropagation()}>
          
          <div style={modalStyles.history}>
            History will be shown here
          </div>

          <p>Are you sure you want to commit this changes? This will merge the active changes into history!</p>
          <div style={modalStyles.buttons}>
            <button
              style={modalStyles.cancelButton}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              style={modalStyles.applyButton}
              onClick={applyChanges}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const modalStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    background: "black",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
  },
  history: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: "20px",
    padding: "0px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButtonHover: {
    backgroundColor: "#d32f2f",
  },
  applyButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  applyButtonHover: {
    backgroundColor: "#388e3c",
  },
};

export default Modal;
