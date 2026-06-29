import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'
import UserFormModal from './components/UserFormModal'
import DeleteModal from './components/DeleteModal'
import Loader from './components/Loader'
import { useUsers } from './hooks/useUsers'
import { DEFAULT_PAGE_SIZE } from './utils/constants'
import { downloadCsv } from './utils/exportCsv'
import { filterUsers } from './utils/filterUsers'
import { sortUsers } from './utils/sortUsers'
import { getTotalPages, paginateUsers } from './utils/paginateUsers'
import { resolveTheme, setThemePreference } from './utils/theme'
import { buildUserListParams, parseUserListParams } from './utils/urlState'

const EMPTY_ADVANCED_FILTERS = { firstName: '', lastName: '', email: '' }

export default function App() {
  const {
    users,
    isLoading,
    error,
    actionError,
    actionSuccess,
    clearActionMessages,
    refetch,
    addUser,
    editUser,
    removeUser
  } = useUsers()
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(() => parseUserListParams(searchParams).search)
  const [departmentFilter, setDepartmentFilter] = useState(() => parseUserListParams(searchParams).department)
  const [advancedFilters, setAdvancedFilters] = useState(EMPTY_ADVANCED_FILTERS)
  const [sortConfig, setSortConfig] = useState(() => ({
    field: parseUserListParams(searchParams).sortField,
    direction: parseUserListParams(searchParams).sortDirection
  }))
  const [page, setPage] = useState(() => parseUserListParams(searchParams).page)
  const [pageSize, setPageSize] = useState(() => parseUserListParams(searchParams).pageSize)
  const [theme, setTheme] = useState(() => resolveTheme())

  const [formModal, setFormModal] = useState(null) // { mode: 'add' | 'edit', user? }
  const [userPendingDelete, setUserPendingDelete] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const parsedState = parseUserListParams(searchParams)
    setSearchTerm(parsedState.search)
    setDepartmentFilter(parsedState.department)
    setSortConfig({ field: parsedState.sortField, direction: parsedState.sortDirection })
    setPage(parsedState.page)
    setPageSize(parsedState.pageSize)
  }, [searchParams])

  useEffect(() => {
    const nextParams = buildUserListParams({
      search: searchTerm,
      department: departmentFilter,
      sortField: sortConfig.field,
      sortDirection: sortConfig.direction,
      page,
      pageSize
    })

    if (searchParams.toString() !== nextParams.toString()) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [departmentFilter, page, pageSize, searchParams, searchTerm, setSearchParams, sortConfig.direction, sortConfig.field])

  useEffect(() => {
    setThemePreference(theme)
  }, [theme])

  // Keep the handlers stable so the UI stays predictable.
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value)
    setPage(1)
  }, [])

  const handleDepartmentChange = useCallback((value) => {
    setDepartmentFilter(value)
    setPage(1)
  }, [])

  const handlePageSizeChange = useCallback((value) => {
    setPageSize(value)
    setPage(1)
  }, [])

  const handleAdvancedFilterChange = useCallback((field, value) => {
    setAdvancedFilters((prev) => ({ ...prev, [field]: value }))
    setPage(1)
  }, [])

  const handleClearAdvancedFilters = useCallback(() => {
    setAdvancedFilters(EMPTY_ADVANCED_FILTERS)
    setPage(1)
  }, [])

  const handleSort = useCallback((field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { field, direction: 'asc' }
    })
  }, [])

  const handleThemeToggle = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }, [])

  const filteredUsers = useMemo(
    () => filterUsers(users, searchTerm, departmentFilter, advancedFilters),
    [users, searchTerm, departmentFilter, advancedFilters]
  )

  const sortedUsers = useMemo(() => sortUsers(filteredUsers, sortConfig), [filteredUsers, sortConfig])

  const totalPages = useMemo(() => getTotalPages(sortedUsers.length, pageSize), [sortedUsers.length, pageSize])
  const currentPage = Math.min(page, totalPages)

  const handleExportCsv = useCallback(() => {
    const date = new Date().toISOString().slice(0, 10)
    downloadCsv(sortedUsers, `users-${date}.csv`)
  }, [sortedUsers])

  // Keep the page number in range if the list gets shorter.
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const paginatedUsers = useMemo(
    () => paginateUsers(sortedUsers, currentPage, pageSize),
    [sortedUsers, currentPage, pageSize]
  )

  async function handleFormSubmit(values) {
    setIsSubmitting(true)
    try {
      const success =
        formModal.mode === 'edit'
          ? await editUser(formModal.user.id, values)
          : await addUser(values)
      if (success) setFormModal(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleConfirmDelete() {
    setIsSubmitting(true)
    try {
      const success = await removeUser(userPendingDelete.id)
      if (success) setUserPendingDelete(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <Header
        totalUsers={users.length}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onAddUser={() => setFormModal({ mode: 'add' })}
        onExportCsv={handleExportCsv}
      />

      {actionError && (
        <div className="alert-banner alert-banner--error" role="alert">
          <span>{actionError}</span>
          <button type="button" className="alert-banner__dismiss" onClick={clearActionMessages}>
            ×
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="alert-banner alert-banner--success" role="status">
          <span>{actionSuccess}</span>
          <button type="button" className="alert-banner__dismiss" onClick={clearActionMessages}>
            ×
          </button>
        </div>
      )}

      <div className="toolbar">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <FilterBar
          departmentFilter={departmentFilter}
          onDepartmentChange={handleDepartmentChange}
          advancedFilters={advancedFilters}
          onAdvancedFilterChange={handleAdvancedFilterChange}
          onClearAdvancedFilters={handleClearAdvancedFilters}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="alert-banner alert-banner--error" role="alert">
          <span>{error}</span>
          <button type="button" className="btn btn-ghost" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="summary-strip" aria-label="User summary">
            <div className="summary-card">
              <span className="summary-card__label">Visible</span>
              <strong>{sortedUsers.length}</strong>
            </div>
            <div className="summary-card">
              <span className="summary-card__label">Departments</span>
              <strong>{new Set(sortedUsers.map((user) => user.department)).size}</strong>
            </div>
            <div className="summary-card">
              <span className="summary-card__label">Page</span>
              <strong>
                {currentPage} / {totalPages}
              </strong>
            </div>
          </div>
          <UserTable
            users={paginatedUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={(user) => setFormModal({ mode: 'edit', user })}
            onDelete={(user) => setUserPendingDelete(user)}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {formModal && (
        <UserFormModal
          mode={formModal.mode}
          initialValues={formModal.user}
          onSubmit={handleFormSubmit}
          onClose={() => setFormModal(null)}
          isSubmitting={isSubmitting}
        />
      )}

      {userPendingDelete && (
        <DeleteModal
          user={userPendingDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setUserPendingDelete(null)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
