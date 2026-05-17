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
    "Roadmap"
  ])

  const [columns, setColumns] = useState([])

  function handleCreateBoard(boardName) {
    setBoards(prev => [...prev, boardName])
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
          setActiveModal={setActiveModal}
        />

        <MainContent
          columns={columns}
          setColumns={setColumns}
          setActiveModal={setActiveModal}
          activeModal={activeModal}
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