import React from "react";

const modal = () => {
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform scale-95 animate-enter">
          <h2 className="text-lg font-semibold text-gray-900">Attention!</h2>
          <p className="mt-2 text-sm text-gray-700">
            You must select the type of recycling from the images.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md transition duration-200 hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
};
export default modal;
