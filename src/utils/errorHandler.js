export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.'

export function getErrorMessage(error, fallback = DEFAULT_ERROR_MESSAGE) {
  if (!error) return fallback

  if (error.response) {
    const message = error.response.data?.message
    if (message) return message

    if (error.response.status >= 500) {
      return 'Server error. Please try again later.'
    }

    return error.response.statusText || `Server error (${error.response.status}).`
  }

  if (error.request) {
    return 'No internet connection. Please check your network and try again.'
  }

  if (error.message) {
    return error.message
  }

  return fallback
}

export function buildActionError(action, error) {
  return `Failed to ${action}. ${getErrorMessage(error)}`
}
