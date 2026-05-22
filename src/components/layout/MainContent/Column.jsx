function Column({ theme, column }) {
  const isDark = theme === "dark"
  return (
    <div className={`${isDark ? "bg-[#2B2C37]" : "bg-[#F4F7FD]"} flex flex-col gap-4  rounded-[12px] p-4 min-w-[280px]`}>
      <div className="flex flex-row items-center gap-3">
        <div className="w-3.75 h-3.75 rounded-full" style={{ backgroundColor: column.color }}></div>
        <span className="text-[12px] font-bold tracking-[2.4px] uppercase text-[#828FA3]">{column.title} ({column.tasks?.length || 0})</span>
      </div>

      <div className="flex flex-col gap-3">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map(task => (
            <div key={task.id} className="bg-transparent rounded-[8px] p-4 shadow-sm">
              <h3 className={`text-sm font-bold ${isDark ? "text-white":"text-[#0B0C10]"}`}>{task.title}</h3>
              {task.description && (
                <p className={`text-[13px] mt-2`}>{task.description}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-[#828FA3] text-[13px]">No tasks yet</div>
        )}
      </div>
    </div>
  )
}

export default Column

