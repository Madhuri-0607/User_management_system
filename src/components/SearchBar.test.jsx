import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar'

describe('SearchBar Component', () => {
  it('should render search input with placeholder', () => {
    render(<SearchBar value="" onChange={vi.fn()} />)
    const input = screen.getByPlaceholderText(/Search by first name/i)
    expect(input).toBeInTheDocument()
  })

  it('should display initial value', () => {
    render(<SearchBar value="John" onChange={vi.fn()} />)
    const input = screen.getByDisplayValue('John')
    expect(input).toBeInTheDocument()
  })

  it('should update local input immediately', async () => {
    const user = userEvent.setup()
    render(<SearchBar value="" onChange={vi.fn()} />)
    const input = screen.getByPlaceholderText(/Search by first name/i)

    await user.type(input, 'Jane')
    expect(input.value).toBe('Jane')
  })

  it('should debounce onChange callback', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    const input = screen.getByPlaceholderText(/Search by first name/i)

    await user.type(input, 'test')
    
    // Callback should not be called immediately
    expect(onChange).not.toHaveBeenCalled()

    // Wait for debounce timeout (250ms)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('test')
    }, { timeout: 500 })
  })

  it('should sync input when external value changes', async () => {
    const { rerender } = render(<SearchBar value="John" onChange={vi.fn()} />)
    const input = screen.getByDisplayValue('John')
    expect(input.value).toBe('John')

    rerender(<SearchBar value="Jane" onChange={vi.fn()} />)
    await waitFor(() => {
      expect(input.value).toBe('Jane')
    })
  })

  it('should have correct accessibility attributes', () => {
    render(<SearchBar value="" onChange={vi.fn()} />)
    const input = screen.getByLabelText('Search users')
    expect(input).toHaveAttribute('type', 'search')
  })
})
