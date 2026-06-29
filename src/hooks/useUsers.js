import { useCallback, useEffect, useState } from 'react'
import * as userService from '../api/userService'
import { transformUsers, generateLocalId } from '../utils/helpers'
import { buildActionError, getErrorMessage } from '../utils/errorHandler'

/**
 * Keep the user list in state and update it after each successful action.
 * JSONPlaceholder does not persist changes, so the UI updates locally.
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [actionSuccess, setActionSuccess] = useState(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setActionError(null)
    setActionSuccess(null)

    try {
      const rawUsers = await userService.getUsers()
      setUsers(transformUsers(rawUsers))
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setError(getErrorMessage(err, 'Unable to load users. Please check your connection and try again.'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  async function runUserAction(actionLabel, successMessage, actionCallback) {
    setActionError(null)
    setActionSuccess(null)

    try {
      await actionCallback()
      setActionSuccess(successMessage)
      return true
    } catch (err) {
      console.error(`Failed to ${actionLabel}:`, err)
      setActionError(buildActionError(actionLabel, err))
      return false
    }
  }

  const addUser = useCallback(
    async (formValues) =>
      runUserAction('add user', 'User added successfully.', async () => {
        await userService.createUser(formValues)
        setUsers((prev) => {
          const newUser = { id: generateLocalId(prev), ...formValues }
          return [...prev, newUser]
        })
      }),
    []
  )

  const editUser = useCallback(
    async (id, formValues) =>
      runUserAction('update user', 'User updated successfully.', async () => {
        if (id <= 10) {
          await userService.updateUser(id, formValues)
        }
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? { ...user, ...formValues, id } : user))
        )
      }),
    []
  )

  const removeUser = useCallback(
    async (id) =>
      runUserAction('delete user', 'User deleted successfully.', async () => {
        await userService.deleteUser(id)
        setUsers((prev) => prev.filter((user) => user.id !== id))
      }),
    []
  )

  return {
    users,
    isLoading,
    error,
    actionError,
    actionSuccess,
    clearActionMessages: () => {
      setActionError(null)
      setActionSuccess(null)
    },
    refetch: fetchUsers,
    addUser,
    editUser,
    removeUser
  }
}
