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

## Screenshots

> **(Add your own screenshots here for best results!)**

- **Dashboard (Desktop):**
  ![Dashboard Desktop](screenshots/dashboard-desktop.png)
- **Add/Edit Employee Modal:**
  ![Add/Edit Modal](screenshots/add-edit-modal.png)
- **Mobile View:**
  ![Mobile View](screenshots/mobile-view.png)

---

## Reflection

### Challenges Faced
- Implementing fully custom dropdowns with icons, glassmorphism, and keyboard accessibility in pure JS/CSS.
- Ensuring all features (search, filter, sort, pagination, add/edit/delete) work smoothly and persist with localStorage.
- Making the UI responsive and visually appealing in both dark and light themes.
- Handling edge cases for validation and error feedback in the modal.

### Improvements for the Future
- Add toast/snackbar notifications instead of browser alerts for a better UX.
- More robust error handling and form validation (e.g., duplicate names, stricter email checks).
- Add user avatars or profile pictures.
- Integrate with a real backend or Freemarker templates for server-side rendering.
- More advanced filtering (multi-select, date filters, etc.) and export options.
- Smoother animations and transitions for modals and dropdowns.

---

**Thank you for reviewing this project!** 