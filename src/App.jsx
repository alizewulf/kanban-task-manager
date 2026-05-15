import { useState } from 'react'
import './index.css'
import SideBar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import MainContent from './components/layout/MainContent'
import CreateColumn from './components/modals/CreateColumn'
import CreateBoard from './components/modals/CreateBoard'

export default function App() {
  const [currentPage, setCurrentPage] = useState("Platform Launch")
  const [tasks, setTasks] = useState([])
  const [activeModal, setActiveModal] = useState(null)
  const [boards, setBoards] = useState([
  "Platform Launch",
  "Marketing Plan",
  "Roadmap"
])
  function handleCreateColumn(column) {
    console.log(column)
  }
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
          setTasks={setTasks}
          setActiveModal={setActiveModal}
        />

        <MainContent setActiveModal={setActiveModal} />
      </div>

      {activeModal === "createColumn" && (
        <CreateColumn
          setActiveModal={setActiveModal}
          onCreateColumn={handleCreateColumn}
        />
      )}
      
      {activeModal === "createBoard" && (
        <CreateBoard
          setActiveModal={setActiveModal}
          onCreateBoard={handleCreateBoard}
        />
      )}

    </div>
  )
}
