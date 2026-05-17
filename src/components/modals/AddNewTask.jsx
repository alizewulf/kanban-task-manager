import { useState } from "react"
import LightBtn from "../common/Button"
import BaseInput, { baseInputClass, baseLabelClass } from "../common/Input"
function AddTask({ setIsOpen, onCreateTask, columnId }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [subtasks, setSubtasks] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" }
  ])

  function addSubtask() {
    setSubtasks(prev => [
      ...prev,
      { id: Date.now(), value: "" }
    ])
  }

  function updateSubtask(id, value) {
    setSubtasks(prev =>
      prev.map(st =>
        st.id === id ? { ...st, value } : st
      )
    )
  }

  function handleCreate() {
    if (!title.trim()) return

    const task = {
      id: Date.now(),
      title,
      description,
      subtasks
    }

    onCreateTask(columnId, task)

    setTitle("")
    setDescription("")
    setSubtasks([
      { id: 1, value: "" },
      { id: 2, value: "" }
    ])

    setIsOpen(false)
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="absolute inset-0 flex items-center justify-center bg-[#000000]/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]"
      >
        <h2 className="font-bold text-lg">Add New Task</h2>

        <BaseInput
          title="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Take coffee break"
        />
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-[#828FA3] capitalize">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Short break"
            className="h-24 px-3 pt-2 outline-0 rounded-sm border-[#828FA3]/25 border-2 text-[13px] resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${baseLabelClass} flex flex-col gap-3`} htmlFor="">Subtasks
            {subtasks.map(st => (
              <input placeholder="e.g. Make Coffee" className={baseInputClass}/>
            ))}
          </label>

          <LightBtn
            variant="secondary"
            onClick={addSubtask}
          >
            + add subtask
          </LightBtn>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#828FA3]">Todo</span>
          <select name="Status" className="flex text-[13px]/[23] flex-1 border-[#828FA3]/25 border-2 py-2 px-4">
            <option value="Todo">Todo</option>
          </select>          
        </div>

        <LightBtn
          variant="primary"
          onClick={handleCreate}
        >
          Create Task
        </LightBtn>
      </div>
    </div>
  )
}

export default AddTask
