import { useEffect, useState } from 'react'
import { DEPARTMENTS, EMPTY_FORM_VALUES } from '../utils/constants'
import { validateUserForm } from '../utils/validators'

export default function UserFormModal({ mode, initialValues, onSubmit, onClose, isSubmitting }) {
  // `initialValues` (when editing) is the full user record, including `id`.
  // Only the four editable fields should ever live in form state - pulling
  // in `id` here was harmless today (useUsers re-applies the real id on
  // save regardless), but it's a latent footgun: any future change that
  // spreads `values` straight into an API payload would silently leak it.
  function toFormValues(source) {
    const { firstName, lastName, email, department } = source || EMPTY_FORM_VALUES
    return { firstName, lastName, email, department }
  }

  const [values, setValues] = useState(() => toFormValues(initialValues))
  const [errors, setErrors] = useState({})

  // Re-sync the form whenever a different user is opened for editing.
  useEffect(() => {
    setValues(toFormValues(initialValues))
    setErrors({})
  }, [initialValues])

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const { isValid, errors: validationErrors } = validateUserForm(values)
    setErrors(validationErrors)
    if (!isValid) return

    await onSubmit(values)
  }

  const title = mode === 'edit' ? 'Edit User' : 'Add User'

  // Ignore overlay clicks while a save is in flight, so the modal can't be
  // dismissed mid-request - the in-flight request has no way to reopen it.
  function handleOverlayClick() {
    if (!isSubmitting) onClose()
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="user-form-title">{title}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={values.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={values.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(event) => handleChange('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={values.department}
              onChange={(event) => handleChange('department', event.target.value)}
            >
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            {errors.department && <p className="error-text">{errors.department}</p>}
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
