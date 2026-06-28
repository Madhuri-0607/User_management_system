import { useEffect, useState } from 'react'

const DEBOUNCE_MS = 250

/**
 * Debounce the search term so typing feels smoother.
 */
export default function SearchBar({ value, onChange }) {
  const [draft, setDraft] = useState(value)

  // Keep the input in sync if the parent clears it.
  useEffect(() => {
    setDraft(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (draft !== value) onChange(draft)
    }, DEBOUNCE_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])

  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search by first name, last name, or email…"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        aria-label="Search users"
      />
    </div>
  )
}
