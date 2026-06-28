# User Management Dashboard

## Project Description

This is a small React dashboard for viewing and managing a list of users. It includes search, filters, sorting, pagination, and basic add/edit/delete actions.

## Features

- View users in a table
- Search by name or email
- Filter by department and other fields
- Sort columns
- Add, edit, and delete users
- Show loading and error states

## Project Structure

- index.html
- package.json
- README.md
- vite.config.js
- src/
  - App.jsx
  - main.jsx
  - api/
    - userService.js
  - components/
    - DeleteModal.jsx
    - FilterBar.jsx
    - Header.jsx
    - Loader.jsx
    - Pagination.jsx
    - Pagination.test.jsx
    - SearchBar.jsx
    - SearchBar.test.jsx
    - UserFormModal.jsx
    - UserFormModal.test.jsx
    - UserRow.jsx
    - UserTable.jsx
  - hooks/
    - useUsers.js
  - styles/
    - global.css
  - test/
    - setup.js
  - utils/
    - constants.js
    - helpers.js
    - helpers.test.js
    - validators.js
    - validators.test.js

## Tech Stack

- React
- Vite
- Axios
- Vitest
- Testing Library

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- JSONPlaceholder does not persist data.
- Changes are stored in local state while the app is running.

## Author

Your Name
https://github.com/yourname
