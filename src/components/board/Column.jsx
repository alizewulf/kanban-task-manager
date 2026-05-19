import LightBtn from "../common/Button"

function Column({ column, onOpenAddTask }) {
  return (
    <div className="flex flex-col gap-3">
      <span>{column.title}</span>

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