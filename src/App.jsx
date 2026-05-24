import { useEffect, useState } from "react";
import "./index.css";

import SideBar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";
import CreateBoard from "./components/modals/CreateBoard";
import DeleteBoard from "./components/modals/DeleteBoard";
import DeleteTask from "./components/modals/DeleteTask";
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
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  function updateTask(boardId, columnId, taskId, updatedTask) {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board
      return {
        ...board,
        columns: board.columns.map(col => {
          if (col.id !== columnId) return col
          return {
            ...col,
            tasks: (col.tasks || []).map(t => t.id === taskId ? updatedTask : t)
          }
        })
      }
    }))
  }

  function moveTask(boardId, fromColumnId, toColumnId, taskId) {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board

      let movingTask = null

      const newColumns = board.columns.map(col => {
        if (col.id === fromColumnId) {
          const remaining = (col.tasks || []).filter(t => {
            if (t.id === taskId) {
              movingTask = t
              return false
            }
            return true
          })
          return { ...col, tasks: remaining }
        }
        return col
      }).map(col => {
        if (col.id === toColumnId && movingTask) {
          return { ...col, tasks: [...(col.tasks || []), movingTask] }
        }
        return col
      })

      return { ...board, columns: newColumns }
    }))
  }

  function openEditTask(task, columnId) {
    setTaskToEdit({ ...task, columnId })
    setActiveColumnId(columnId)
    setIsTaskModalOpen(true)
  }

  function deleteTask(boardId, columnId, taskId) {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board
      return {
        ...board,
        columns: board.columns.map(col => {
          if (col.id !== columnId) return col
          return { ...col, tasks: (col.tasks || []).filter(t => t.id !== taskId) }
        })
      }
    }))
  }

  function openDeleteTask(task, columnId) {
    setTaskToDelete({ ...task, columnId })
    setActiveModal('deleteTask')
  }

  function handleDeleteBoard(boardId) {
    setBoards((prev) => {
      const nextBoards = prev.filter((board) => board.id !== boardId)
      if (currentPage === boardId) {
        setCurrentPage(nextBoards[0]?.id ?? "")
      }
      return nextBoards
    })
  }

  function handleUpdateBoard(updatedBoard) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board,
      ),
    )
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const activeBoard = boards.find((b) => b.id === currentPage) ?? null

useEffect(() => {
  if (!activeBoard && boards.length) {
    setCurrentPage(boards[0].id)
  }
}, [activeBoard, boards])
// Do not early-return when there's no active board — let layout render
// MainContent and Header handle empty states (showing EmptyState, disabling actions)
  return (
    <div className="flex h-screen transition-colors duration-300">
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
          setActiveModal={setActiveModal}
          onDeleteBoard={handleDeleteBoard}
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
          updateTask={updateTask}
          moveTask={moveTask}
          openEditTask={openEditTask}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          openDeleteTask={openDeleteTask}
          taskToDelete={taskToDelete}
          setTaskToDelete={setTaskToDelete}
        />
      </div>

      {(activeModal === "createBoard" || activeModal === "editBoard") && (
        <CreateBoard
          setActiveModal={setActiveModal}
          onCreateBoard={handleCreateBoard}
          onUpdateBoard={handleUpdateBoard}
          boards={boards}
          theme={theme}
          boardToEdit={activeModal === "editBoard" ? activeBoard : null}
        />
      )}

      {activeModal === "deleteBoard" && (
        <DeleteBoard
          setActiveModal={setActiveModal}
          onDeleteBoard={handleDeleteBoard}
          board={activeBoard}
          theme={theme}
        />
      )}

      {activeModal === 'deleteTask' && (
        <DeleteTask
          setActiveModal={setActiveModal}
          onDeleteTask={(task) => {
            deleteTask(activeBoard.id, task.columnId || task.column || '', task.id)
            setTaskToDelete(null)
          }}
          task={taskToDelete}
          theme={theme}
        />
      )}
    </div>
  );
}
