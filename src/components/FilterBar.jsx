import { useState, useRef, useEffect } from 'react'
import { DEPARTMENTS, PAGE_SIZE_OPTIONS } from '../utils/constants'
import { classNames } from '../utils/helpers'

export default function FilterBar({
  departmentFilter,
  onDepartmentChange,
  advancedFilters,
  onAdvancedFilterChange,
  onClearAdvancedFilters,
  pageSize,
  onPageSizeChange
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const popoverRef = useRef(null)

  const activeAdvancedCount = Object.values(advancedFilters).filter(Boolean).length

  // Close the popover when clicking outside or pressing Escape.
  useEffect(() => {
    if (!isPopoverOpen) return

    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setIsPopoverOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isPopoverOpen])

  return (
    <div className="filter-bar">
      <label className="filter-bar__field">
        <span className="filter-bar__label">Department</span>
        <select
          value={departmentFilter}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <option value="All">All</option>
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>

      <div className="filter-bar__popover-wrapper" ref={popoverRef}>
        <button
          type="button"
          className={classNames('btn btn-ghost', activeAdvancedCount > 0 && 'btn-ghost--active')}
          onClick={() => setIsPopoverOpen((open) => !open)}
          aria-expanded={isPopoverOpen}
        >
          Filters {activeAdvancedCount > 0 ? `(${activeAdvancedCount})` : ''}
        </button>

        {isPopoverOpen && (
          <div className="filter-popover" role="dialog" aria-label="Advanced filters">
            <div className="filter-popover__field">
              <label htmlFor="filter-firstName">First Name</label>
              <input
                id="filter-firstName"
                type="text"
                value={advancedFilters.firstName}
                onChange={(event) => onAdvancedFilterChange('firstName', event.target.value)}
                placeholder="e.g. Leanne"
              />
            </div>
            <div className="filter-popover__field">
              <label htmlFor="filter-lastName">Last Name</label>
              <input
                id="filter-lastName"
                type="text"
                value={advancedFilters.lastName}
                onChange={(event) => onAdvancedFilterChange('lastName', event.target.value)}
                placeholder="e.g. Graham"
              />
            </div>
            <div className="filter-popover__field">
              <label htmlFor="filter-email">Email</label>
              <input
                id="filter-email"
                type="text"
                value={advancedFilters.email}
                onChange={(event) => onAdvancedFilterChange('email', event.target.value)}
                placeholder="e.g. @hotmail.com"
              />
            </div>
            <button
              type="button"
              className="btn btn-ghost filter-popover__clear"
              onClick={onClearAdvancedFilters}
              disabled={activeAdvancedCount === 0}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <label className="filter-bar__field filter-bar__field--page-size">
        <span className="filter-bar__label">Rows per page</span>
        <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
