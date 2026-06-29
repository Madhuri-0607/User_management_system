function escapeCsvValue(value) {
  const stringValue = String(value ?? '')
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

export function buildCsvContent(users) {
  const header = ['ID', 'First Name', 'Last Name', 'Email', 'Department'].join(',')
  const rows = users.map((user) => {
    const values = [
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.department
    ].map(escapeCsvValue)

    return values.join(',')
  })

  return [header, ...rows].join('\n') + '\n'
}
