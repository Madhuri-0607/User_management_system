import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserFormModal from '../components/UserFormModal'

describe('UserFormModal Component', () => {
  const mockOnSubmit = vi.fn()
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockOnClose.mockClear()
  })

  it('should render Add User modal title in add mode', () => {
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )
    expect(screen.getByText('Add User')).toBeInTheDocument()
  })

  it('should render Edit User modal title in edit mode', () => {
    const user = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', department: 'Engineering' }
    render(
      <UserFormModal
        mode="edit"
        initialValues={user}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )
    expect(screen.getByText('Edit User')).toBeInTheDocument()
  })

  it('should populate form fields with initial values', () => {
    const user = {
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      department: 'IT'
    }
    render(
      <UserFormModal
        mode="edit"
        initialValues={user}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )

    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Smith')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('IT')).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Save' })
    await user.click(submitButton)

    // Validation errors should appear
    const errors = await screen.findAllByText(/required/i)
    expect(errors.length).toBeGreaterThan(0)
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )

    const firstNameInput = screen.getByLabelText('First Name')
    const lastNameInput = screen.getByLabelText('Last Name')
    const emailInput = screen.getByLabelText('Email')

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: 'Save' })
    await user.click(submitButton)

    // Email validation error should appear
    await screen.findByText(/valid email/i)
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should call onSubmit with form values when valid', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )

    const firstNameInput = screen.getByLabelText('First Name')
    const lastNameInput = screen.getByLabelText('Last Name')
    const emailInput = screen.getByLabelText('Email')
    const departmentSelect = screen.getByLabelText('Department')

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(departmentSelect, 'IT')

    const submitButton = screen.getByRole('button', { name: 'Save' })
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      department: 'IT'
    })
  })

  it('should close modal when cancel button clicked', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={false}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should disable submit button while submitting', () => {
    render(
      <UserFormModal
        mode="add"
        initialValues={null}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isSubmitting={true}
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Saving…' })
    expect(submitButton).toBeDisabled()
  })
})
