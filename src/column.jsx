import LightBtn from "./base/Button"

function Column({ column }) {
  return (
    <div className="w-[280px] bg-white rounded-lg p-4 flex flex-col gap-3">
      
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#828FA3]">
          {column.title}
        </h3>

        <span className="text-xs text-[#828FA3]">
          {column.tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {column.tasks.map(task => (
          <div
            key={task.id}
            className="bg-[#F4F7FD] p-2 rounded"
          >
            <p className="text-sm font-medium">
              {task.title}
            </p>
          </div>
        ))}
      </div>

      <LightBtn
        variant="secondary"
        onClick={() => {}}
      >
        + add task
      </LightBtn>

    </div>
  )
}

export default Column