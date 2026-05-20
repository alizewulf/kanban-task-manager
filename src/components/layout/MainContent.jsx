import CreateColumn from "../modals/CreateColumn"
import EmptyState from "../board/EmptyState"
import Board from "../board/Board"
import AddTask from "../modals/AddNewTask"

function MainContent({
  board,
  setActiveModal,
  activeModal,
  isTaskModalOpen,
  setIsTaskModalOpen,
  activeColumnId,
  openAddTask,
  addTask
}) {
  if (!board) {
    return (
      <main className="bg-[#E4EBFA] flex flex-1">
        <EmptyState setActiveModal={setActiveModal} />
      </main>
    )
  }

  return (
    <main className="bg-[#E4EBFA] flex flex-1">

      {board.columns.length === 0 ? (
        <EmptyState setActiveModal={setActiveModal} />
      ) : (
        <Board
          columns={board.columns}
          onOpenAddTask={openAddTask}
        />
      )}

      {activeModal === "createColumn" && (
        <CreateColumn
          setActiveModal={setActiveModal}
          onCreateColumn={(column) => {
            // временно без setBoards
          }}
        />
      )}

      {isTaskModalOpen && (
        <AddTask
          setIsOpen={setIsTaskModalOpen}
          onCreateTask={addTask}
          columns={board.columns}
          activeColumnId={activeColumnId}
        />
      )}

    </main>
  )
}

export default MainContent