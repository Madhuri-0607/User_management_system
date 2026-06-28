import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../components/Pagination'

describe('Pagination Component', () => {
  it('should not render when totalPages is 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render pagination controls for multiple pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />)
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('should disable Previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />)
    const prevButton = screen.getByText('Previous')
    expect(prevButton).toBeDisabled()
  })

  it('should disable Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />)
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange when Previous button clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    const prevButton = screen.getByText('Previous')
    await user.click(prevButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange when Next button clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const nextButton = screen.getByText('Next')
    await user.click(nextButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange when page number clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const pageButton = screen.getByRole('button', { name: '2' })
    await user.click(pageButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should highlight current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />)
    const activePageButton = screen.getByRole('button', { name: '3' })
    expect(activePageButton).toHaveClass('pagination__page--active')
  })
})
