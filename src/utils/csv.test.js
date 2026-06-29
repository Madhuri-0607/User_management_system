import { describe, expect, it } from 'vitest'
import { buildCsvContent } from './csv'

describe('csv helpers', () => {
  it('formats users as csv rows', () => {
    const users = [
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        department: 'IT'
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Smith, Jr.',
        email: 'john@example.com',
        department: 'Sales'
      }
    ]

    const csv = buildCsvContent(users)

    expect(csv).toContain('ID,First Name,Last Name,Email,Department')
    expect(csv).toContain('"Smith, Jr."')
  })

  it('returns a header-only csv for empty data', () => {
    const csv = buildCsvContent([])
    expect(csv).toBe('ID,First Name,Last Name,Email,Department\n')
  })
})
