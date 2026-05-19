import { useState } from "react"
import "./index.css"

import SideBar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import MainContent from "./components/layout/MainContent"
import CreateBoard from "./components/modals/CreateBoard"

export default function App() {
  const [currentPage, setCurrentPage] = useState("Platform Launch")

  const [activeModal, setActiveModal] = useState(null)

  const [boards, setBoards] = useState([
    "Platform Launch",
    "Marketing Plan",
    "Roadmap",
  ])

  const [columns, setColumns] = useState([])

  // TASK MODAL STATE
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [activeColumnId, setActiveColumnId] = useState(null)

  function handleCreateBoard(boardName) {
    setBoards(prev => [...prev, boardName])
  }

  function openAddTask(columnId) {
    setActiveColumnId(columnId)
    setIsTaskModalOpen(true)
  }

  function addTask(columnId, task) {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: [...col.tasks, task]
            }
          : col
      )
    )
  }

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
          title={currentPage}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />

        <MainContent
          columns={columns}
          setColumns={setColumns}
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