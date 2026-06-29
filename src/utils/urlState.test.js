import { describe, expect, it } from 'vitest'
import { buildUserListParams, parseUserListParams } from './urlState'

describe('urlState helpers', () => {
  it('parses valid query values', () => {
    const params = new URLSearchParams('?search=john&department=IT&sort=email&order=desc&page=2&limit=25')

    expect(parseUserListParams(params)).toEqual({
      search: 'john',
      department: 'IT',
      sortField: 'email',
      sortDirection: 'desc',
      page: 2,
      pageSize: 25
    })
  })

  it('falls back to defaults for invalid query values', () => {
    const params = new URLSearchParams('?search=&department=Unknown&sort=unknown&order=side&page=0&limit=999')

    expect(parseUserListParams(params)).toEqual({
      search: '',
      department: 'All',
      sortField: 'firstName',
      sortDirection: 'asc',
      page: 1,
      pageSize: 10
    })
  })

  it('builds query parameters from state', () => {
    const params = buildUserListParams({
      search: 'john',
      department: 'IT',
      sortField: 'email',
      sortDirection: 'desc',
      page: 2,
      pageSize: 25
    })

    expect(params.get('search')).toBe('john')
    expect(params.get('department')).toBe('IT')
    expect(params.get('sort')).toBe('email')
    expect(params.get('order')).toBe('desc')
    expect(params.get('page')).toBe('2')
    expect(params.get('limit')).toBe('25')
  })
})
