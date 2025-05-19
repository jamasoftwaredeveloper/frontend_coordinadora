interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Cerrar al clickear fuera
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-full overflow-y-auto p-6 relative"
        onClick={e => e.stopPropagation()} // Prevenir cierre al click dentro
      >
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        <div className="mt-4">{children}</div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
