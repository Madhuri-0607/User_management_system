import { DEFAULT_PAGE_SIZE, DEPARTMENTS, PAGE_SIZE_OPTIONS, SORT_FIELDS } from './constants'

const DEFAULT_URL_STATE = {
  search: '',
  department: 'All',
  sortField: 'firstName',
  sortDirection: 'asc',
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE
}

export function parseUserListParams(searchParams) {
  const search = searchParams.get('search') ?? DEFAULT_URL_STATE.search
  const department = searchParams.get('department') ?? DEFAULT_URL_STATE.department
  const sortField = searchParams.get('sort') ?? DEFAULT_URL_STATE.sortField
  const sortDirection = searchParams.get('order') ?? DEFAULT_URL_STATE.sortDirection
  const page = Number(searchParams.get('page') ?? DEFAULT_URL_STATE.page)
  const pageSize = Number(searchParams.get('limit') ?? DEFAULT_URL_STATE.pageSize)

  const validDepartment = DEPARTMENTS.includes(department) ? department : DEFAULT_URL_STATE.department
  const validSortField = SORT_FIELDS.some((field) => field.value === sortField)
    ? sortField
    : DEFAULT_URL_STATE.sortField
  const validSortDirection = sortDirection === 'desc' ? 'desc' : DEFAULT_URL_STATE.sortDirection
  const validPage = Number.isInteger(page) && page > 0 ? page : DEFAULT_URL_STATE.page
  const validPageSize = PAGE_SIZE_OPTIONS.includes(pageSize) ? pageSize : DEFAULT_URL_STATE.pageSize

  return {
    search,
    department: validDepartment,
    sortField: validSortField,
    sortDirection: validSortDirection,
    page: validPage,
    pageSize: validPageSize
  }
}

export function buildUserListParams(state) {
  const params = new URLSearchParams()
  params.set('search', state.search)
  params.set('department', state.department)
  params.set('sort', state.sortField)
  params.set('order', state.sortDirection)
  params.set('page', String(state.page))
  params.set('limit', String(state.pageSize))
  return params
}
