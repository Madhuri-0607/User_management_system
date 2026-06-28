import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
import { buildFullName } from '../utils/helpers'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Fetch the full user list.
export async function getUsers() {
  const { data } = await client.get('/users')
  return data
}

// Create a new user.
// JSONPlaceholder does not save changes, so this is only for the demo flow.
export async function createUser(user) {
  const payload = {
    name: buildFullName(user),
    email: user.email
    // Omit 'department' as it's not part of JSONPlaceholder schema
  }
  const { data } = await client.post('/users', payload)
  return data
}

// Update an existing user.
// New users are local-only, so they do not need a remote update.
export async function updateUser(id, user) {
  // Only send fields that JSONPlaceholder recognizes
  const payload = {
    id,
    name: buildFullName(user),
    email: user.email
    // Omit 'department' as it's not part of JSONPlaceholder schema
  }
  const { data } = await client.put(`/users/${id}`, payload)
  return data
}

// Delete a user.
export async function deleteUser(id) {
  await client.delete(`/users/${id}`)
  return id
}
