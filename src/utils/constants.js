// Central place for fixed/static values used across the app.

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const DEPARTMENTS = ['Engineering', 'IT', 'HR', 'Marketing', 'Sales']

// Page size choices offered to the user. 10 is the default.
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
export const DEFAULT_PAGE_SIZE = 10

export const SORT_FIELDS = [
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
  { value: 'department', label: 'Department' }
]

export const EMPTY_FORM_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  department: DEPARTMENTS[0]
}
