import { useCallback, useEffect, useState } from 'react'
import * as userService from '../api/userService'
import { transformUsers, generateLocalId } from '../utils/helpers'

/**
 * Keep the user list in state and update it after each successful action.
 * JSONPlaceholder does not persist changes, so the UI updates locally.
 */
export function useUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const rawUsers = await userService.getUsers()
      setUsers(transformUsers(rawUsers))
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setError('Unable to load users. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const addUser = useCallback(async (formValues) => {
    setActionError(null)
    try {
      await userService.createUser(formValues)
      // The API returns a fixed id, so make one up locally.
      setUsers((prev) => {
        const newUser = { id: generateLocalId(prev), ...formValues }
        return [...prev, newUser]
      })
      return true
    } catch (err) {
      console.error('Failed to add user:', err)
      setActionError('Failed to add user. Please try again.')
      return false
    }
  }, [])

  const editUser = useCallback(async (id, formValues) => {
    setActionError(null)
    try {
      // Only update the remote record when it actually exists.
      if (id <= 10) {
        await userService.updateUser(id, formValues)
      }
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...formValues, id } : user))
      )
      return true
    } catch (err) {
      console.error('Failed to update user:', err)
      setActionError('Failed to update user. Please try again.')
      return false
    }
  }, [])

  const removeUser = useCallback(async (id) => {
    setActionError(null)
    try {
      await userService.deleteUser(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
      return true
    } catch (err) {
      console.error('Failed to delete user:', err)
      setActionError('Failed to delete user. Please try again.')
      return false
    }
  }, [])

  return {
    users,
    isLoading,
    error,
    actionError,
    clearActionError: () => setActionError(null),
    refetch: fetchUsers,
    addUser,
    editUser,
    removeUser
  }
}
