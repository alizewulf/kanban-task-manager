import { useState } from "react"
import "./index.css"

import SideBar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import MainContent from "./components/layout/MainContent"
import CreateBoard from "./components/modals/CreateBoard"
import { createColumnUtil } from "./components/utils/createColumnUtil"
export default function App() {
  const [activeModal, setActiveModal] = useState(null)
  
  const [boards, setBoards] = useState([
  {
    id: "1",
    title: "Platform Launch",
    columns: [
      createColumnUtil("Todo", "c1"),
      createColumnUtil("Doing", "c2")
    ]
  },
  {
    id: "2",
    title: "Marketing Plan",
    columns: [
      createColumnUtil("Todo", "c1"),
      createColumnUtil("Doing", "c2")
    ]
  },
  {
    id: "3",
    title: "Roadmap",
    columns: [
      createColumnUtil("Todo", "c1"),
      createColumnUtil("Doing", "c2")
    ]
  }
])
  const [currentPage, setCurrentPage] = useState(() => boards[0]?.id)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [activeColumnId, setActiveColumnId] = useState(null)

  function handleCreateBoard(newBoard) {
    setBoards(prev => [...prev, newBoard])
  }

  function openAddTask(columnId) {
    setActiveColumnId(columnId)
    setIsTaskModalOpen(true)
  }

  function addTask(boardId, columnId, task) {
    setBoards(prev =>
      prev.map(board =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map(col =>
                col.id === columnId
                  ? {
                      ...col,
                      tasks: [...col.tasks, task]
                    }
                  : col
              )
            }
          : board
      )
    )
  }

  const activeBoard = boards.find(
    board => board.id === currentPage
  )

  return (
    <div className="flex h-screen">

      <SideBar
        boards={boards}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setActiveModal={setActiveModal}
      />

      <div className="flex flex-col flex-1">

        <Header
          activeBoard={activeBoard}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />

        <MainContent
          board={activeBoard}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          activeColumnId={activeColumnId}
          openAddTask={openAddTask}
          addTask={addTask}
        />

      </div>

      {activeModal === "createBoard" && (
        <CreateBoard
          setActiveModal={setActiveModal}
          onCreateBoard={handleCreateBoard}
          boards={boards}
        />
      )}

    </div>
  )
}