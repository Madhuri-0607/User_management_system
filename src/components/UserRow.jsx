export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="data-table__row">
      <td data-label="ID">{user.id}</td>
      <td data-label="First Name">{user.firstName}</td>
      <td data-label="Last Name">{user.lastName}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Department">
        <span className="badge">{user.department}</span>
      </td>
      <td data-label="Actions" className="data-table__actions">
        <button type="button" className="btn btn-ghost" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger-ghost" onClick={() => onDelete(user)}>
          Delete
        </button>
      </td>
    </tr>
  )
}
