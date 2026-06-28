import { describe, it, expect } from 'vitest'
import {
  splitName,
  assignDepartment,
  transformUser,
  transformUsers,
  buildFullName,
  generateLocalId,
  classNames,
  compareStrings
} from '../utils/helpers'
import { DEPARTMENTS } from '../utils/constants'

describe('Helpers', () => {
  describe('splitName', () => {
    it('should split a full name correctly', () => {
      const result = splitName('John Doe')
      expect(result).toEqual({ firstName: 'John', lastName: 'Doe' })
    })

    it('should handle multi-word first names', () => {
      const result = splitName('Mrs. Dennis Schulist')
      expect(result).toEqual({ firstName: 'Mrs. Dennis', lastName: 'Schulist' })
    })

    it('should handle single name', () => {
      const result = splitName('John')
      expect(result).toEqual({ firstName: 'John', lastName: '' })
    })

    it('should trim whitespace', () => {
      const result = splitName('  John   Doe  ')
      expect(result).toEqual({ firstName: 'John', lastName: 'Doe' })
    })

    it('should handle empty or undefined input', () => {
      expect(splitName('')).toEqual({ firstName: '', lastName: '' })
      expect(splitName(undefined)).toEqual({ firstName: '', lastName: '' })
    })
  })

  describe('assignDepartment', () => {
    it('should assign departments cyclically', () => {
      expect(assignDepartment(0)).toBe(DEPARTMENTS[0]) // Engineering
      expect(assignDepartment(1)).toBe(DEPARTMENTS[1]) // IT
      expect(assignDepartment(DEPARTMENTS.length)).toBe(DEPARTMENTS[0]) // Cycles back to Engineering
    })

    it('should be deterministic for same index', () => {
      expect(assignDepartment(2)).toBe(assignDepartment(2))
    })
  })

  describe('transformUser', () => {
    it('should transform a raw user correctly', () => {
      const rawUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      }
      const result = transformUser(rawUser, 0)
      expect(result).toEqual({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering'
      })
    })

    it('should preserve department if already set', () => {
      const rawUser = {
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        department: 'Marketing'
      }
      const result = transformUser(rawUser, 0)
      expect(result.department).toBe('Marketing')
    })
  })

  describe('transformUsers', () => {
    it('should transform an array of users', () => {
      const rawUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
      const result = transformUsers(rawUsers)
      expect(result).toHaveLength(2)
      expect(result[0].firstName).toBe('John')
      expect(result[1].firstName).toBe('Jane')
    })
  })

  describe('buildFullName', () => {
    it('should build full name from first and last', () => {
      const user = { firstName: 'John', lastName: 'Doe' }
      expect(buildFullName(user)).toBe('John Doe')
    })

    it('should handle missing last name', () => {
      const user = { firstName: 'John', lastName: '' }
      expect(buildFullName(user)).toBe('John')
    })

    it('should handle missing first name', () => {
      const user = { firstName: '', lastName: 'Doe' }
      expect(buildFullName(user)).toBe('Doe')
    })

    it('should handle multi-word names', () => {
      const user = { firstName: 'Mary Jane', lastName: 'Watson-Parker' }
      expect(buildFullName(user)).toBe('Mary Jane Watson-Parker')
    })
  })

  describe('generateLocalId', () => {
    it('should return 1 for empty array', () => {
      expect(generateLocalId([])).toBe(1)
    })

    it('should return max id + 1', () => {
      const users = [
        { id: 1 },
        { id: 5 },
        { id: 3 }
      ]
      expect(generateLocalId(users)).toBe(6)
    })

    it('should handle non-contiguous ids', () => {
      const users = [
        { id: 10 },
        { id: 100 },
        { id: 5 }
      ]
      expect(generateLocalId(users)).toBe(101)
    })
  })

  describe('classNames', () => {
    it('should join non-falsy values', () => {
      expect(classNames('btn', 'btn-primary')).toBe('btn btn-primary')
    })

    it('should filter out falsy values', () => {
      expect(classNames('btn', false, 'btn-primary', null, undefined)).toBe('btn btn-primary')
    })

    it('should handle empty input', () => {
      expect(classNames()).toBe('')
    })

    it('should handle all falsy input', () => {
      expect(classNames(false, null, undefined)).toBe('')
    })
  })

  describe('compareStrings', () => {
    it('should compare strings correctly', () => {
      expect(compareStrings('a', 'b')).toBeLessThan(0)
      expect(compareStrings('b', 'a')).toBeGreaterThan(0)
      expect(compareStrings('a', 'a')).toBe(0)
    })

    it('should handle case-insensitive comparison', () => {
      expect(compareStrings('A', 'a')).toBe(0)
    })

    it('should handle empty and undefined values', () => {
      expect(compareStrings('', '')).toBe(0)
      expect(compareStrings(undefined, undefined)).toBe(0)
    })
  })
})
