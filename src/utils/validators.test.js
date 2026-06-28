import { describe, it, expect } from 'vitest'
import { isRequired, isValidEmail, validateUserForm } from '../utils/validators'

describe('Validators', () => {
  describe('isRequired', () => {
    it('should return false for empty strings', () => {
      expect(isRequired('')).toBe(false)
      expect(isRequired('   ')).toBe(false)
    })

    it('should return true for non-empty strings', () => {
      expect(isRequired('test')).toBe(true)
      expect(isRequired(' hello ')).toBe(true)
    })

    it('should return false for non-string values', () => {
      expect(isRequired(null)).toBe(false)
      expect(isRequired(undefined)).toBe(false)
      expect(isRequired(123)).toBe(false)
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true)
      expect(isValidEmail('a@b.c')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('user@.com')).toBe(false)
      expect(isValidEmail('user @example.com')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('   ')).toBe(false)
    })
  })

  describe('validateUserForm', () => {
    it('should validate a complete valid form', () => {
      const values = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering'
      }
      const result = validateUserForm(values)
      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it('should require all fields', () => {
      const result = validateUserForm({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      })
      expect(result.isValid).toBe(false)
      expect(Object.keys(result.errors).length).toBe(4)
      expect(result.errors.firstName).toBeTruthy()
      expect(result.errors.lastName).toBeTruthy()
      expect(result.errors.email).toBeTruthy()
      expect(result.errors.department).toBeTruthy()
    })

    it('should validate email format', () => {
      const values = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'invalid-email',
        department: 'IT'
      }
      const result = validateUserForm(values)
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('valid email')
    })

    it('should allow partial form with errors', () => {
      const values = {
        firstName: 'John',
        lastName: '',
        email: 'john@example.com',
        department: 'HR'
      }
      const result = validateUserForm(values)
      expect(result.isValid).toBe(false)
      expect(result.errors.lastName).toBeTruthy()
      expect(result.errors.firstName).toBeUndefined()
    })
  })
})
