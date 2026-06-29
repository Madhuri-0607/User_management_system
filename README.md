# User Management Dashboard

## Project Description

A React app for managing users that supports viewing, searching, filtering, sorting, adding, editing, and deleting users. The app loads initial user data from the JSONPlaceholder API and keeps local state for edits.

## Live Demo

https://user-management-system-mocha-chi.vercel.app/

## GitHub Repository
https://github.com/Madhuri-0607/User_management_system

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

## Assumptions 

- JSONPlaceholder does not persist data, so add/edit/delete operations are managed in local state.  
- Departments are assigned locally because the API does not provide departments.  
- Error handling includes dedicated error messages and retry options for API failures.  


## Challenges Faced   
- Managing URL state with filters and pagination.  
- Handling API errors gracefully.    
- Keeping table state synchronized across search, sorting, and pagination.    

## Future Improvements  
- Authentication and Role-Based Access Control  
- Analytics Dashboard    
- Bulk Actions  
- Audit Logs  
- Backend integration with persistent storage  

## Screenshots

<img width="1910" height="1445" alt="image" src="https://github.com/user-attachments/assets/0d6a24f5-c80f-4ed1-b09d-3c24a6f47ae2" />

## Author

Name: Mothukuri Madhuri
GitHub: [https://github.com/Madhuri-0607](https://github.com/Madhuri-0607)
