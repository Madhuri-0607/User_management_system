export default function DeleteModal({ user, onConfirm, onCancel, isSubmitting }) {
  function handleOverlayClick() {
    if (!isSubmitting) onCancel()
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="modal modal--small"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-title">Delete User</h2>
        <p>
          Are you sure you want to delete{' '}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ? This action cannot be undone.
        </p>
        <div className="modal__actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
