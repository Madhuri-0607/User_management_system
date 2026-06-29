import { compareStrings } from './helpers'

export function sortUsers(users, sortConfig) {
  if (!sortConfig?.field) return users

  return [...users].sort((a, b) => {
    const result = compareStrings(a[sortConfig.field], b[sortConfig.field])
    return sortConfig.direction === 'asc' ? result : -result
  })
}
