export function getTotalPages(itemCount, pageSize) {
  return Math.max(1, Math.ceil(itemCount / pageSize))
}

export function paginateUsers(items, currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize
  return items.slice(start, start + pageSize)
}
