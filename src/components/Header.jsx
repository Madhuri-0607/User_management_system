export default function Header({ totalUsers, theme, onThemeToggle, onAddUser, onExportCsv }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>User Management Dashboard</h1>
        <p className="dashboard-header__subtitle">
          {totalUsers} {totalUsers === 1 ? 'user' : 'users'} on record
        </p>
      </div>
      <div className="dashboard-header__actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onExportCsv}
          aria-label="Export the current filtered users to CSV"
        >
          Export CSV
        </button>

        <button
          type="button"
          className="btn btn-ghost theme-toggle"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-pressed={theme === 'dark'}
          title={`Switch theme to ${theme === 'dark' ? 'light' : 'dark'}`}
        >
          {/* Professional SVG icons */}
          {theme === 'dark' ? (
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07l-1.42 1.42M20.49 3.51l-1.42 1.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          ) : (
            <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <button type="button" className="btn btn-primary" onClick={onAddUser}>
          + Add User
        </button>
      </div>
    </header>
  )
}
