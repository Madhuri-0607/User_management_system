import UserRow from './UserRow'
import { SORT_FIELDS } from '../utils/constants'

function SortIndicator({ active, direction }) {
  if (!active) return <span className="sort-indicator sort-indicator--idle">↕</span>
  return <span className="sort-indicator">{direction === 'asc' ? '↑' : '↓'}</span>
}

export default function UserTable({ users, sortConfig, onSort, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users match your search and filters.</p>
        <p className="empty-state__hint">Try clearing the search box or the filters above.</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      {/*
        The <thead> below is hidden on narrow screens (see the mobile card
        layout in global.css), which means its sort buttons disappear too.
        This bar is the mobile-only replacement: same onSort handler, same
        sortConfig, just rendered as a row of controls instead of table
        headers so sorting still works once the table becomes cards.
      */}
      <div className="mobile-sort-bar">
        <label htmlFor="mobile-sort-field">Sort by</label>
        <select
          id="mobile-sort-field"
          value={sortConfig.field}
          onChange={(event) => onSort(event.target.value)}
        >
          {SORT_FIELDS.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-ghost mobile-sort-bar__direction"
          onClick={() => onSort(sortConfig.field)}
          aria-label={`Sort direction: ${sortConfig.direction === 'asc' ? 'ascending' : 'descending'}`}
        >
          {sortConfig.direction === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            {SORT_FIELDS.map((field) => (
              <th key={field.value}>
                <button
                  type="button"
                  className="data-table__sort-button"
                  onClick={() => onSort(field.value)}
                >
                  {field.label}
                  <SortIndicator
                    active={sortConfig.field === field.value}
                    direction={sortConfig.direction}
                  />
                </button>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
