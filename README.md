# Kanban Task Manager

A simple, client-side Kanban board application built with React, Vite, and Tailwind CSS. Manage tasks across multiple boards with columns, subtasks, and a clean dark/light theme.

> **Live demo**: [https://alizewulf.github.io/kanban-task-manager/](https://alizewulf.github.io/kanban-task-manager/)

## Features

- **Multiple Boards** — Create, rename, and delete boards. Each board has its own set of columns and tasks.
- **Columns** — Add and remove columns within a board. Each column is colour-coded automatically.
- **Tasks & Subtasks** — Create tasks with a title, description, and subtasks. Track completion progress per task.
- **Move Tasks Between Columns** — Change a task's status by selecting a different column from the dropdown inside the task view.
- **Edit & Delete Tasks** — Update task details or remove tasks entirely.
- **Dark / Light Theme** — Toggle between dark and light mode. The preference is persisted in `localStorage` and respects the system preference on first visit.
- **Persistent State** — Boards, columns, tasks, theme, and the active board are saved to `localStorage` automatically.
- **Responsive Layout** — Works on desktop, tablet, and mobile. On smaller screens a mobile menu replaces the sidebar.
- **Collapsible Sidebar** — Hide the sidebar for more workspace area.

## Tech Stack

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| **React 19**      | UI library               |
| **Vite 8**        | Build tool & dev server  |
| **Tailwind CSS 4**| Utility-first CSS        |
| **ESLint**        | Code linting             |

### Dependencies

- `react` / `react-dom` — Core React libraries.
- `@tailwindcss/vite` — Tailwind CSS Vite plugin.
- `tailwindcss` — Tailwind CSS framework.

### Dev Dependencies

- `@vitejs/plugin-react` — Vite React plugin.
- `vite` — Build tool.
- `eslint` / `@eslint/js` — Linter and its config.
- `eslint-plugin-react-hooks` / `eslint-plugin-react-refresh` — ESLint rules for React.
- `@types/react` / `@types/react-dom` — TypeScript type definitions (for editor support).

## Requirements

- **Node.js** >= 18
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alizewulf/kanban-task-manager.git
cd kanban-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

This starts the Vite dev server. Open the URL shown in the terminal (usually `http://localhost:5173/kanban-task-manager/`).

## Available Scripts

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start the development server with HMR.         |
| `npm run build`      | Build the project for production into `dist/`. |
| `npm run preview`    | Preview the production build locally.          |
| `npm run lint`       | Run ESLint across the project source.          |

## Project Structure

```
kanban-task-manager/
├── public/
│   └── favicon.svg              # App favicon
├── src/
│   ├── assets/                  # SVG icons used throughout the UI
│   │   ├── 3dots.svg
│   │   ├── dropdown.svg
│   │   ├── fluent-active.svg
│   │   ├── fluent-dashboard.svg
│   │   ├── fluent-disabled.svg
│   │   ├── hideSideBarEye.svg
│   │   ├── kanbanLogo_onDark.svg
│   │   ├── kanbanLogo_onLight.svg
│   │   ├── mobile_logo.svg
│   │   ├── moon.svg
│   │   ├── removeTaskIcon.svg
│   │   ├── showSideBarEye.svg
│   │   ├── sun.svg
│   │   └── X-icon.svg
│   ├── components/
│   │   ├── common/              # Reusable generic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/              # Application shell components
│   │   │   ├── Header/
│   │   │   │   └── index.jsx
│   │   │   ├── MainContent/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── AddNewTask.jsx
│   │   │   │   ├── Board.jsx
│   │   │   │   ├── Column.jsx
│   │   │   │   ├── CreateColumn.jsx
│   │   │   │   └── EmptyState.jsx
│   │   │   └── Sidebar/
│   │   │       └── index.jsx
│   │   ├── modals/              # Modal dialogs
│   │   │   ├── CreateBoard.jsx
│   │   │   ├── DeleteBoard.jsx
│   │   │   ├── DeleteTask.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── ViewTask.jsx
│   │   └── utils/
│   │       └── createColumnUtil.jsx
│   ├── App.jsx                  # Root component with all state management
│   ├── index.css                # Global styles (Tailwind import)
│   └── main.jsx                 # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html                   # HTML entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Key directories explained

| Directory / File                | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| `src/App.jsx`                   | Root component. Holds all application state (boards, theme, modals) and provides data-manipulation functions as props. |
| `src/components/common/`        | Generic, reusable components (`Button`, `Input`, `Modal`).       |
| `src/components/layout/`        | Structural layout components: `Sidebar` (board navigation), `Header` (board name + actions), `MainContent` (board rendering). |
| `src/components/modals/`        | All modal windows: creating/editing boards, deleting boards, viewing/editing tasks, deleting tasks, and the mobile navigation menu. |
| `src/assets/`                   | SVG assets for logos, theme icons, and UI controls.             |

## Architecture

The application uses a **single-page, state-lifted** architecture:

1. **State lives in `App.jsx`** — All data (boards, tasks, theme, active page, modal state) is managed inside the root `<App>` component using React's `useState` and `useEffect` hooks.
2. **Props drilling** — State and handler functions are passed down to child components as props. There are no external state management libraries (no Redux, no Context API).
3. **Persistence via `localStorage`** — Boards, theme preference, and the currently active board are automatically saved to `localStorage` whenever they change. On initial load, the app hydrates from stored data.
4. **Default board** — On first visit (no saved data), the app creates a single board ("Platform Launch") with two default columns: "Todo" and "Doing".
5. **CSS** — Tailwind CSS v4 with a `class`-based dark mode strategy. The `dark` class is toggled on `<html>` based on the theme state.
6. **No router** — The app does not use React Router. Board navigation is handled by tracking `currentPage` (the active board ID) and filtering the boards array.

### Data flow

```
App (state owner)
 ├─ Sidebar          ← boards, currentPage, theme
 ├─ Header           ← activeBoard, modal triggers
 └─ MainContent      ← board data + CRUD callbacks
     ├─ Board        ← columns array
     │   └─ Column   ← tasks array + task action callbacks
     └─ Modals (CreateBoard, AddNewTask, ViewTask, etc.)
```

## Data Persistence

All data is stored in the browser's `localStorage` under these keys:

| Key            | Content                               |
| -------------- | ------------------------------------- |
| `boards`       | Full array of boards with columns and tasks |
| `theme`        | `"dark"` or `"light"`                 |
| `currentPage`  | The ID of the currently active board  |

No backend or external API is used. Refreshing the page will restore the last saved state.

## Theme

The app supports **dark mode** and **light mode**. On the first visit, it respects the user's system preference (`prefers-color-scheme`). The theme can be toggled from the sidebar or the mobile menu. The choice is persisted in `localStorage`.

## Deployment

The project is deployed to **GitHub Pages** at:

[https://alizewulf.github.io/kanban-task-manager/](https://alizewulf.github.io/kanban-task-manager/)

The `base` path in `vite.config.js` is set to `/kanban-task-manager/` to match the GitHub Pages subpath.

To deploy manually:

```bash
npm run build
# Then deploy the contents of the `dist/` folder to your hosting service
```

## Environment Variables

The project does **not** use any environment variables.

## API / Backend

The application is fully client-side with **no backend**. There is no API, no mock API, no database, and no authentication. All data is managed in-memory and persisted to `localStorage`.

