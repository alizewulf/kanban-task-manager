import CreateColumn from "../modals/CreateColumn"
import EmptyState from "../board/EmptyState"
import Board from "../board/Board"
import { nanoid } from "nanoid"
import AddTask from "../modals/AddNewTask"

function MainContent({
  columns,
  setColumns,
  setActiveModal,
  activeModal,
  isTaskModalOpen,
  setIsTaskModalOpen,
  activeColumnId,
  openAddTask,
  addTask
}) {

  function addColumn(column) {
    setColumns(prev => [
      ...prev,
      {
        id: nanoid(),
        title: column.title,
        tasks: []
      }
    ])
  }

  return (
    <main className="bg-[#E4EBFA] flex flex-1">

      {columns.length === 0 ? (
        <EmptyState setActiveModal={setActiveModal} />
      ) : (
        <Board
          columns={columns}
          onOpenAddTask={openAddTask}
        />
      )}

      {activeModal === "createColumn" && (
        <CreateColumn
          setActiveModal={setActiveModal}
          onCreateColumn={addColumn}
        />
      )}

      {isTaskModalOpen && (
        <AddTask
          setIsOpen={setIsTaskModalOpen}
          onCreateTask={addTask}
          columns={columns}
          activeColumnId={activeColumnId}
        />
      )}

    </main>
  )
}

export default MainContent