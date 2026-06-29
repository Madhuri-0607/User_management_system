function normalizeValue(value) {
  return String(value ?? '').trim().toLowerCase()
}

export function filterUsers(users, searchTerm, departmentFilter, advancedFilters) {
  const normalizedSearch = normalizeValue(searchTerm)
  const normalizedDepartment = normalizeValue(departmentFilter)

  return users.filter((user) => {
    const firstName = normalizeValue(user.firstName)
    const lastName = normalizeValue(user.lastName)
    const email = normalizeValue(user.email)
    const department = normalizeValue(user.department)

    const matchesSearch =
      normalizedSearch === '' ||
      firstName.includes(normalizedSearch) ||
      lastName.includes(normalizedSearch) ||
      email.includes(normalizedSearch)

    const matchesDepartment = normalizedDepartment === 'all' || department === normalizedDepartment

    const matchesFirstName =
      normalizeValue(advancedFilters.firstName) === '' ||
      firstName.includes(normalizeValue(advancedFilters.firstName))

    const matchesLastName =
      normalizeValue(advancedFilters.lastName) === '' ||
      lastName.includes(normalizeValue(advancedFilters.lastName))

    const matchesEmail =
      normalizeValue(advancedFilters.email) === '' ||
      email.includes(normalizeValue(advancedFilters.email))

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesFirstName &&
      matchesLastName &&
      matchesEmail
    )
  })
}
