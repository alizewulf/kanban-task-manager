import { useState } from "react"
import CreateColumn from "../modals/CreateColumn"
import EmptyState from "../board/EmptyState"
import Board from "../board/Board"

function MainContent({ setActiveModal, activeModal }) {
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
        <EmptyState setActiveModal={setActiveModal} />
      ) : (
        <Board
          columns={columns}
          onAddTask={addTask}
        />
      )}

      {activeModal === "createColumn" && (
        <CreateColumn
          setActiveModal={setActiveModal}
          onCreateColumn={addColumn}
        />
      )}

    </main>
  )
}

export default MainContent
