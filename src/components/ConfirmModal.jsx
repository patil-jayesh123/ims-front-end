import React, { useEffect } from "react";
import "../styles/ConfirmModal.css";

const ConfirmModal = ({
  show,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
  variant = "danger", // "danger" | "primary" | "warning"
}) => {
  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="cm-backdrop" role="dialog" aria-modal="true">
      <div className="cm-dialog">
        <div className="cm-body">
          <div className={`cm-icon-circle cm-icon-${variant}`}>
            <span>!</span>
          </div>

          <h5 className="cm-title">{title}</h5>
          <p className="cm-message">{message}</p>

          <div className="cm-actions">
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onCancel}>
              {cancelText}
            </button>
            <button className={`btn btn-${variant} rounded-pill px-4`} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;