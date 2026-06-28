const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isRequired(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value).trim())
}

// Validate the add/edit form.
export function validateUserForm(values) {
  const errors = {}

  if (!isRequired(values.firstName)) {
    errors.firstName = 'First name is required.'
  }

  if (!isRequired(values.lastName)) {
    errors.lastName = 'Last name is required.'
  }

  if (!isRequired(values.email)) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!isRequired(values.department)) {
    errors.department = 'Department is required.'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}
