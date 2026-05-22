import { useEffect, useState } from "react";
import "./index.css";

import SideBar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";
import CreateBoard from "./components/modals/CreateBoard";
import { createColumnUtil } from "./components/utils/createColumnUtil";

const DEFAULT_BOARDS = [
  {
    id: "1",
    title: "Platform Launch",
    columns: [createColumnUtil("Todo"), createColumnUtil("Doing")],
  },
];

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : DEFAULT_BOARDS;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "1";
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  function handleCreateBoard(newBoard) {
    setBoards((prev) => [...prev, newBoard]);
  }

  function addTask(boardId, columnId, task) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      tasks: [...(col.tasks || []), task],
                    }
                  : col,
              ),
            }
          : board,
      ),
    );
  }

  function addColumn(boardId, column) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [...board.columns, column],
            }
          : board,
      ),
    );
  }
  function toggleTheme() {
  setTheme(prev => (prev === "dark" ? "light" : "dark"));
}
const activeBoard =
  boards.find(b => b.id === currentPage) ?? null

useEffect(() => {
  if (!activeBoard && boards.length) {
    setCurrentPage(boards[0].id)
  }
}, [activeBoard, boards])
if (!activeBoard) {
  return <div>No boards</div>
}
  return (
    <div className="flex h-screen">
      <SideBar
        boards={boards}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setActiveModal={setActiveModal}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          activeBoard={activeBoard}
          setIsTaskModalOpen={setIsTaskModalOpen}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <MainContent
          board={activeBoard}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          activeColumnId={activeColumnId}
          addTask={addTask}
          addColumn={addColumn}
          theme={theme}
        />
      </div>

      {activeModal === "createBoard" && (
        <CreateBoard
          setActiveModal={setActiveModal}
          onCreateBoard={handleCreateBoard}
          boards={boards}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
