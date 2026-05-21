// const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#FF7A59"]

// function getColorById(id) {
//   let sum = 0
//   for (let i = 0; i < id.length; i++) {
//     sum += id.charCodeAt(i)
//   }
//   return colors[sum % colors.length]
// }
function Column({ column }) {
  return (
    <div className="flex flex-col gap-4 bg-[#F4F7FD] rounded-[12px] p-4 min-w-[280px]">
      <div className="flex flex-row items-center gap-3">
        <div className="w-3.75 h-3.75 rounded-full" style={{ backgroundColor: column.color }}></div>
        <span className="text-[12px] font-bold tracking-[2.4px] uppercase text-[#828FA3]">{column.title} ({column.tasks?.length || 0})</span>
      </div>

      <div className="flex flex-col gap-3">
        {column.tasks && column.tasks.length > 0 ? (
          column.tasks.map(task => (
            <div key={task.id} className="bg-white rounded-[8px] p-4 shadow-sm">
              <h3 className="text-sm font-bold text-[#0B0C10]">{task.title}</h3>
              {task.description && (
                <p className="text-[13px] text-[#828FA3] mt-2">{task.description}</p>
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

