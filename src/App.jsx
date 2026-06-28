import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { compareStrings } from './utils/helpers'

const EMPTY_ADVANCED_FILTERS = { firstName: '', lastName: '', email: '' }

export default function App() {
  const { users, isLoading, error, actionError, clearActionError, refetch, addUser, editUser, removeUser } =
    useUsers()

  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [advancedFilters, setAdvancedFilters] = useState(EMPTY_ADVANCED_FILTERS)
  const [sortConfig, setSortConfig] = useState({ field: 'firstName', direction: 'asc' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const [formModal, setFormModal] = useState(null) // { mode: 'add' | 'edit', user? }
  const [userPendingDelete, setUserPendingDelete] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        term === '' ||
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)

      const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter

      const matchesFirstName =
        advancedFilters.firstName === '' ||
        user.firstName.toLowerCase().includes(advancedFilters.firstName.toLowerCase())

      const matchesLastName =
        advancedFilters.lastName === '' ||
        user.lastName.toLowerCase().includes(advancedFilters.lastName.toLowerCase())

      const matchesEmail =
        advancedFilters.email === '' ||
        user.email.toLowerCase().includes(advancedFilters.email.toLowerCase())

      return (
        matchesSearch && matchesDepartment && matchesFirstName && matchesLastName && matchesEmail
      )
    })
  }, [users, searchTerm, departmentFilter, advancedFilters])

  // Compare values in a simple way that also handles accents.
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const result = compareStrings(a[sortConfig.field], b[sortConfig.field])
      return sortConfig.direction === 'asc' ? result : -result
    })
  }, [filteredUsers, sortConfig])

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  // Keep the page number in range if the list gets shorter.
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedUsers.slice(start, start + pageSize)
  }, [sortedUsers, currentPage, pageSize])

  async function handleFormSubmit(values) {
    setIsSubmitting(true)
    const success =
      formModal.mode === 'edit' ? await editUser(formModal.user.id, values) : await addUser(values)
    setIsSubmitting(false)
    if (success) setFormModal(null)
  }

  async function handleConfirmDelete() {
    setIsSubmitting(true)
    const success = await removeUser(userPendingDelete.id)
    setIsSubmitting(false)
    if (success) setUserPendingDelete(null)
  }

  return (
    <div className="page-shell">
      <Header totalUsers={users.length} onAddUser={() => setFormModal({ mode: 'add' })} />

      {actionError && (
        <div className="alert-banner alert-banner--error" role="alert">
          <span>{actionError}</span>
          <button type="button" className="alert-banner__dismiss" onClick={clearActionError}>
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
