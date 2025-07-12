# Employee Directory

## Setup and Run Instructions

This project is a modern Employee Directory built with HTML, CSS, and JavaScript (no backend required).

- **To run the project:**
  1. Download or clone this repository.
  2. Open `index.html` in your web browser.

> **Note:**
> - No build tools or server setup required.
> - If you want to use Freemarker for server-side rendering, you would need a Java environment and a servlet container (not required for this demo).

---

## Project Structure

```
employee/
├── index.html         # Main HTML file (UI, modal, and structure)
├── styles.css         # All styles (dark/light themes, glassmorphism, responsive)
├── script.js          # All interactivity, filtering, custom dropdowns, localStorage
├── README.md          # This file
```

- **index.html:** Contains the main UI, modal for add/edit, and links to CSS/JS.
- **styles.css:** Handles all theming, card styles, modal, dropdowns, and responsive design.
- **script.js:** Handles employee data, filtering, searching, sorting, add/edit/delete, custom dropdowns, and localStorage persistence.

---


- **working demo:**
  ![demo](screenshots/add-edit-modal.png)

---

## Reflection

### Challenges Faced
- Implementing fully custom dropdowns with icons, glassmorphism, and keyboard accessibility in pure JS/CSS.
- Ensuring all features (search, filter, sort, pagination, add/edit/delete) work smoothly and persist with localStorage.
- Making the UI responsive and visually appealing in both dark and light themes.
- Handling edge cases for validation and error feedback in the modal.



---

## Features & Functionality

### How This Website Works

- **Employee Data:**
  - On first load, the site displays a demo list of employees.
  - Any changes (add, edit, delete) are saved in your browser (localStorage) and persist across page reloads.
  - The data resets to the demo list only if you clear your browser storage or open in a new browser session.

- **Dashboard & Stats:**
  - See total employees, number of departments, and number of available roles (from the dropdown).
  - Stats update live as you add, edit, or delete employees.

- **Search, Filter, and Sort:**
  - **Search:** Instantly filter employees by name or email.
  - **Filter:** Narrow results by department or role using dropdowns.
  - **Sort:** Sort employees by first/last name, A-Z or Z-A.
  - **Reset Filters:** Quickly clear all filters and search.

- **Pagination:**
  - Choose how many employees to show per page (10, 25, 50).
  - Navigate between pages with Previous/Next buttons.

- **Add/Edit Employee:**
  - Click "+ Add Employee" to open a modern, glassy modal form.
  - All fields are required and validated (including email format and duplicate email check).
  - Department and Role use custom dropdowns with icons and glassmorphism.
  - When editing, a confirmation dialog appears before saving changes.
  - After editing, a notification confirms the update.

- **Delete Employee:**
  - Click Delete on any card to remove an employee (with confirmation prompt).

- **Custom Dropdowns:**
  - Department and Role dropdowns are fully custom, glassy, and support icons, keyboard navigation, and animated hover effects.
  - Role dropdown supports scrolling if there are many options.

- **Theme Switching:**
  - Toggle between dark and light themes with a single click.
  - Theme preference is saved in your browser.

- **Responsiveness:**
  - The site is fully responsive and works on desktop, tablet, and mobile.
  - Modals and dropdowns adapt to small screens.

- **Persistence:**
  - All employee data and theme settings are saved in localStorage, so your changes remain after refreshing the page.

---

**Thank you for reviewing this project!** 
