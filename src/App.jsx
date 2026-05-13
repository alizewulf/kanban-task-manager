import { useState } from 'react'
import './index.css'
import SideBar from './Sidebar'
import Header from './Header'
import MainContent from './MainContent'

export default function App() {
  const [currentPage, setCurrentPage] = useState("Platform Launch")

  return (
    <div className="flex h-screen">
      <SideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex flex-col flex-1">
        <Header title={currentPage} />
        <MainContent />
      </div>
    </div>
  )
}