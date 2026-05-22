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
  addTask,
  addColumn,
  theme,
}) {
  const isDark = theme === "dark";

  if (!board) {
    return (
      <main className={`${isDark ? "bg-[#0B0C10]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto`}>
        <EmptyState setActiveModal={setActiveModal} />
      </main>
    )
  }

  return (
    <main className={`${isDark ? "bg-[#0B0C10]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto`}>

      {board.columns.length === 0 ? (
        <EmptyState setActiveModal={setActiveModal} />
      ) : (
        <Board
          columns={board.columns}
          setActiveModal={setActiveModal}
          theme={theme}
        />
      )}

      {activeModal === "createColumn" && (
        <CreateColumn
          setActiveModal={setActiveModal}
          onCreateColumn={(column) => {
            addColumn(board.id, column)
          }}
        />
      )}

      {isTaskModalOpen && (
        <AddTask
          setIsOpen={setIsTaskModalOpen}
          onCreateTask={(columnId, task) =>
            addTask(board.id, columnId, task)
          }
          columns={board.columns}
          activeColumnId={activeColumnId}
        />
      )}

    </main>
  )
}

export default MainContent