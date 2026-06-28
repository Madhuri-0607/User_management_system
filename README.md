# User Management Dashboard

## Project Overview

A React app for managing users that supports viewing, searching, filtering, sorting, adding, editing, and deleting users. The app loads initial user data from the JSONPlaceholder API and keeps local state for edits.

## Features

- View users from JSONPlaceholder API
- Add a user
- Edit a user
- Delete a user
- Search users
- Filter users
- Sort users
- Pagination (10, 25, 50, 100)
- Form validation
- Error handling
- Responsive design

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

## Build for Production

```bash
npm run build
```

## Run Tests

```bash
npm test
```

## Notes

- JSONPlaceholder does not persist data.
- Added, edited, and deleted users are managed in local React state.
- Departments are generated locally because the API does not provide them.

## Future Improvements

- Connect to a real backend
- Add more tests
- Add authentication

## Author

Name: Mothukuri Madhuri
GitHub: [https://github.com/Madhuri-0607](https://github.com/Madhuri-0607)
