import LightBtn from "../common/Button"
import { createColumnUtil } from '../utils/createColumnUtil'
// const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#FF7A59"]

// function getColorById(id) {
//   let sum = 0
//   for (let i = 0; i < id.length; i++) {
//     sum += id.charCodeAt(i)
//   }
//   return colors[sum % colors.length]
// }
function Column({ column, onOpenAddTask }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-3">
        <div className="w-3.75 h-3.75 rounded-full" style={{ backgroundColor: column.color }}></div>
        <span className="text-[12px] font-bold tracking-[2.4px] uppercase text-[#828FA3]">{column.title} ({column.tasks?.length || 0})</span>
      </div>
      <LightBtn
        variant="secondary"
        onClick={() => onOpenAddTask(column.id)}
      >
        + Add Task
      </LightBtn>
    </div>
  )
}

export default Column

