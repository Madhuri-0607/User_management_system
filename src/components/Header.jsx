export default function Header({ totalUsers, onAddUser }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>User Management Dashboard</h1>
        <p className="dashboard-header__subtitle">
          {totalUsers} {totalUsers === 1 ? 'user' : 'users'} on record
        </p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onAddUser}>
        + Add User
      </button>
    </header>
  )
}
