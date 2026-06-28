import { classNames } from '../utils/helpers'

// Builds a compact page list like [1, 2, 3, '…', 9, 10] so the bar doesn't
// grow unbounded when there are many pages.
function buildPageList(currentPage, totalPages) {
  const pages = []
  const windowSize = 1

  for (let page = 1; page <= totalPages; page += 1) {
    const isEdge = page === 1 || page === totalPages
    const isWithinWindow = Math.abs(page - currentPage) <= windowSize

    if (isEdge || isWithinWindow) {
      pages.push(page)
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…')
    }
  }

  return pages
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageList(currentPage, totalPages)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <ul className="pagination__pages">
        {pages.map((page, index) =>
          page === '…' ? (
            <li key={`ellipsis-${index}`} className="pagination__ellipsis">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={classNames(
                  'pagination__page',
                  page === currentPage && 'pagination__page--active'
                )}
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}
