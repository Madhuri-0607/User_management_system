# User Management Dashboard

## Project Description

A React app for managing users that supports viewing, searching, filtering, sorting, adding, editing, and deleting users. The app loads initial user data from the JSONPlaceholder API and keeps local state for edits.

## Features

- View users from JSONPlaceholder API
- Add a user
- Edit a user
- Delete a user
- Search users
- Department filter and advanced field filters
- Sort users by first name, last name, email, or department
- Pagination with adjustable page size
- Responsive layout and mobile-friendly sorting controls
- Form validation with inline feedback
- Error banners and retry behavior
- Export current results as CSV
- Dark mode toggle
- URL state persistence for search, filters, sort, and pagination

## Tech Stack

- React
- Vite
- JavaScript
- Axios
- CSS

## Project Structure

src/
├── api/
├── components/
├── hooks/
├── styles/
├── test/
└── utils/

## Installation

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build for Production

```bash
npm run build
```

## Run Tests

```bash
npm test
```

## Notes

- JSONPlaceholder does not persist data, so add/edit/delete operations are managed in local state.
- Departments are assigned locally because the API does not provide departments.
- Error handling includes dedicated error messages and retry options for API failures.

## Future Improvements

- Connect to a real backend API
- Add integration/end-to-end tests
- Improve accessibility and keyboard navigation for modals

## Author

Name: Mothukuri Madhuri
GitHub: [https://github.com/Madhuri-0607](https://github.com/Madhuri-0607)
