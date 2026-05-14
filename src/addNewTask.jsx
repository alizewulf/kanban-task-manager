import { useState } from "react"
import LightBtn from "./base/Button"
import BaseInput from "./base/Input"

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
        <h2 className="font-bold text-lg">Add Task</h2>

        <BaseInput
          title="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Take coffee break"
        />

        <BaseInput
          title="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Short break"
        />

        <div className="flex flex-col gap-2">
          {subtasks.map(st => (
            <BaseInput
              key={st.id}
              title="Subtask"
              value={st.value}
              onChange={(e) =>
                updateSubtask(st.id, e.target.value)
              }
              placeholder="e.g. Make coffee"
            />
          ))}

          <LightBtn
            variant="secondary"
            onClick={addSubtask}
          >
            + add subtask
          </LightBtn>
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