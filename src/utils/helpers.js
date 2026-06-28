import { DEPARTMENTS } from './constants'

const REALISTIC_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']

// The API returns a full name, so split it into first and last name.
export function splitName(fullName = '') {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) {
    return { firstName: parts[0] || '', lastName: '' }
  }
  const lastName = parts.pop()
  return { firstName: parts.join(' '), lastName }
}

// Generate a realistic email address from a user's name.
export function generateRealisticEmail(firstName, lastName, userId) {
  const domainIndex = userId % REALISTIC_EMAIL_DOMAINS.length
  const domain = REALISTIC_EMAIL_DOMAINS[domainIndex]
  const emailName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/\s+/g, '')
  return `${emailName}@${domain}`
}

// Give each user a department from a small fixed list.
export function assignDepartment(index) {
  return DEPARTMENTS[index % DEPARTMENTS.length]
}

export function transformUser(rawUser, index) {
  const { firstName, lastName } = splitName(rawUser.name)
  const realisticEmail = generateRealisticEmail(firstName, lastName, rawUser.id)
  return {
    id: rawUser.id,
    firstName,
    lastName,
    email: realisticEmail,
    department: rawUser.department || assignDepartment(index)
  }
}

export function transformUsers(rawUsers) {
  return rawUsers.map((user, index) => transformUser(user, index))
}

// Build the name string for API requests.
export function buildFullName(user) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ')
}

export function generateLocalId(users) {
  if (users.length === 0) return 1
  return Math.max(...users.map((user) => user.id)) + 1
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ')
}

// Compare values in a way that also handles accents.
export function compareStrings(a = '', b = '') {
  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base' })
}
