import { useState } from "react"

import CreateColumn from "./createColumn"
import EmptyState from "./state/emptyState"
import Board from "./state/Board"

function MainContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [columns, setColumns] = useState([])

  function addColumn(column) {
    setColumns(prev => [
      ...prev,
      { ...column, tasks: [] }
    ])
  }

  function addTask(columnId, task) {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, task] }
          : col
      )
    )
  }

  return (
    <main className="bg-[#E4EBFA] flex flex-1">

      {columns.length === 0 ? (
        <EmptyState setIsOpen={setIsOpen} />
      ) : (
        <Board
          columns={columns}
          onAddTask={addTask}
        />
      )}

      {isOpen && (
        <CreateColumn
          setIsOpen={setIsOpen}
          onCreateColumn={addColumn}
        />
      )}

    </main>
  )
}
export default MainContent