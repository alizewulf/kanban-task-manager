# Kanban Task Manager

This project is a simple kanban board application built with React and Vite.

## Основные компоненты

- `src/App.jsx`
  - Основной компонент приложения.
  - Хранит состояние досок, активной страницы, открытых модальных окон и текущего выбранного столбца.
  - Передаёт данные в `Sidebar`, `Header`, `MainContent` и `CreateBoard`.

- `src/components/layout/Sidebar.jsx`
  - Отвечает за боковую панель со списком досок.
  - Позволяет переключаться между досками и открывать модальное окно создания новой доски.

- `src/components/layout/Header.jsx`
  - Отображает заголовок активной доски.
  - Содержит кнопку `+ add new task`, которая открывает модальное окно добавления задачи.

- `src/components/layout/MainContent.jsx`
  - Отрисовывает содержимое главной области страницы внутри тега `<main>`.
  - Показывает `EmptyState`, если доска не содержит колонок, или `Board`, если колонки есть.
  - Отвечает за рендер модального окна `AddNewTask` при открытии задачи.

- `src/components/board/Board.jsx`
  - Отображает набор колонок текущей доски.
  - Передаёт каждую колонку в компонент `Column`.

- `src/components/board/Column.jsx`
  - Отображает заголовок колонки и количество задач в ней.
  - Больше не содержит кнопку добавления задачи внутри самой колонки — добавление задач теперь происходит через `Header`.

- `src/components/board/EmptyState.jsx`
  - Страница-заглушка для пустой доски.
  - Показывает кнопку создания новой колонки.

- `src/components/modals/AddNewTask.jsx`
  - Модальное окно для добавления новой задачи.
  - Содержит поля для заголовка, описания, подзадач и выбора статуса (колонки).

- `src/components/modals/CreateBoard.jsx`
  - Модальное окно для создания новой доски.

- `src/components/modals/CreateColumn.jsx`
  - Модальное окно для создания новой колонки.

- `src/components/common/Button.jsx`
  - Универсальная кнопка с вариантами `primary`, `secondary` и `destructive`.
