import { useState } from "react"
import ViewTask from '../../modals/ViewTask'

function Column({ theme, column, columns = [], boardId, updateTask, moveTask, openEditTask, openDeleteTask }) {
  const isDark = theme === "dark"
  const [openTask, setOpenTask] = useState(null)

  function handleOpenTask(task) {
    setOpenTask(task)
  }

  function handleClose() {
    setOpenTask(null)
  }

  return (
    <div className={`${isDark ? "bg-[#2B2C37]" : "bg-[#F4F7FD]"} flex flex-col gap-4  rounded-[12px] p-4 min-w-[280px]`}>
      <div className="flex flex-row items-center gap-3">
        <div className="w-3.75 h-3.75 rounded-full" style={{ backgroundColor: column.color }}></div>
        <span className="text-[12px] font-bold tracking-[2.4px] uppercase text-[#828FA3]">{column.title} ({column.tasks?.length || 0})</span>
      </div>

      <div className="flex flex-col gap-3">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map(task => {
            const total = task.subtasks?.length || 0
            const done = task.subtasks?.filter(st => st.isCompleted).length || 0

            return (
              <div key={task.id} className="bg-transparent rounded-[8px] p-4 group shadow-sm cursor-pointer" onClick={() => handleOpenTask(task)}>
                <h3 className={`text-sm font-bold ${isDark ? "text-white":"text-[#0B0C10]"} group-hover:text-[#A8A4FF] duration-300`}>{task.title}</h3>
                <p className={`text-[13px] mt-2 ${isDark ? "text-[#A8A9B3]" : "text-[#828FA3]"}`}>{`${done} of ${total} subtasks`}</p>
              </div>
            )
          })
        ) : (
          <div className="text-[#828FA3] text-[13px]">No tasks yet</div>
        )}
      </div>

      {openTask && (
          <ViewTask
            onClose={handleClose}
            task={openTask}
            boardId={boardId}
            currentColumn={column}
            columns={columns}
            updateTask={updateTask}
            moveTask={moveTask}
            onEditTask={() => {
              if (openEditTask) openEditTask(openTask, column.id)
              handleClose()
            }}
            onRemoveTask={() => {
              if (openDeleteTask) openDeleteTask(openTask, column.id)
              handleClose()
            }}
            theme={theme}
          />
        )}
    </div>
  )
}

export default Column

