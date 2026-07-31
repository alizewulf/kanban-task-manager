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
  updateTask,
  moveTask,
  openEditTask,
  taskToEdit,
  setTaskToEdit,
  openDeleteTask,
  taskToDelete,
  setTaskToDelete,
}) {
  const isDark = theme === "dark";

  if (!board) {
    return (
      <main className={`${isDark ? "bg-[#20212C]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto transition-colors duration-300`}>
        <EmptyState setActiveModal={setActiveModal} />
      </main>
    )
  }

  return (
    <main className={`${isDark ? "bg-[#20212C]" : "bg-[#E4EBFA]"} flex flex-1 overflow-hidden overflow-x-auto transition-colors duration-300`}>

      {board.columns.length === 0 ? (
        <EmptyState setActiveModal={setActiveModal} />
      ) : (
        <Board
          columns={board.columns}
          setActiveModal={setActiveModal}
          theme={theme}
          boardId={board.id}
          updateTask={updateTask}
          moveTask={moveTask}
          openEditTask={openEditTask}
          openDeleteTask={openDeleteTask}
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
          boardId={board.id}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          onUpdateTask={(columnId, taskId, updatedTask) => updateTask(board.id, columnId, taskId, updatedTask)}
          theme={theme}
          columns={board.columns}
          activeColumnId={activeColumnId}
        />
      )}

    </main>
  )
}

export default MainContent