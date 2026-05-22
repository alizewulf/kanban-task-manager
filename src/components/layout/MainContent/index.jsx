import CreateColumn from "./CreateColumn"
import EmptyState from "./EmptyState"
import Board from "./Board"
import AddTask from "./AddNewTask"

function MainContent({
  board,
  setActiveModal,
  activeModal,
  isTaskModalOpen,
  setIsTaskModalOpen,
  activeColumnId,
  addTask,
  addColumn,
  theme,
}) {
  const isDark = theme === "dark";

  if (!board) {
    return (
      <main className={`${isDark ? "bg-[#20212C]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto`}>
        <EmptyState setActiveModal={setActiveModal} />
      </main>
    )
  }

  return (
    <main className={`${isDark ? "bg-[#20212C]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto`}>

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
          theme={theme}
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
          theme={theme}
          columns={board.columns}
          activeColumnId={activeColumnId}
        />
      )}

    </main>
  )
}

export default MainContent