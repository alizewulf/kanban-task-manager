import { useEffect, useState } from "react"
import Modal from "../../common/Modal"
import LightBtn from "../../common/Button"
import BaseInput, { baseInputClass, baseLabelClass } from "../../common/Input"

function AddTask({ setIsOpen, onCreateTask, theme, columns, activeColumnId }) {
  const safeColumns = columns || []
  const isDark = theme === "dark"
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [selectedColumn, setSelectedColumn] = useState(
    activeColumnId || safeColumns[0]?.id || ""
  )

  const [subtasks, setSubtasks] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" }
  ])

    useEffect(() => {
    if (!selectedColumn && safeColumns.length > 0) {
      setSelectedColumn(safeColumns[0].id)
    }
  }, [safeColumns])
  
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
      id: crypto.randomUUID(),
      title,
      description,
      subtasks
    }

    onCreateTask(selectedColumn, task)

    setTitle("")
    setDescription("")
    setSubtasks([
      { id: 1, value: "" },
      { id: 2, value: "" }
    ])

    setIsOpen(false)
  }

  return (
    <Modal onClose={() => setIsOpen(false)} className={`${isDark ? "bg-[#2B2C37]" : "bg-white"} px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]`}>
        <h2 className={`${isDark? "text-white" : "text-black"} font-bold text-lg`}>
          Add New Task
        </h2>

        <BaseInput
          title="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          labelClass={`${isDark? "text-white" : ""}`}
          inputClass={`${isDark? "placeholder:text-[#828FA3]" : ""}`}
          placeholder="e.g. Take coffee break"
        />

        <div className="flex flex-col gap-2">
          <label className={`text-[12px] font-bold ${isDark? "text-white" : "text-[#828FA3]"} capitalize`}>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Short break"
            className={`${isDark ? "placeholder:text-[#828FA3]" : ""} h-24 px-3 pt-2 outline-0 rounded-sm border-[#828FA3]/25 border-2 text-[13px] resize-none`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={`${baseLabelClass} flex flex-col gap-3 ${isDark? "text-white": ""}`}>
            Subtasks

            {subtasks.map(st => (
              <input
                key={st.id}
                value={st.value}
                onChange={(e) =>
                  updateSubtask(st.id, e.target.value)
                }
                placeholder="e.g. Make Coffee"
                className={`${baseInputClass} ${isDark? "text-[#828FA3]": ""}`}
              />
            ))}
          </label>

          <LightBtn
            variant="secondary"
            onClick={addSubtask}
            customClass={`${isDark ? "bg-white" : ""}`}
          >
            + add subtask
          </LightBtn>
        </div>

        <div className="flex flex-col gap-2">
          <span className={`text-xs font-bold ${isDark? "text-white" : "text-[#828FA3]"}`}>
            Status
          </span>

          <select
            value={selectedColumn}
            onChange={(e) =>
              setSelectedColumn(e.target.value)
            }
            className={`flex text-[13px]/[23] flex-1 ${isDark? "text-white" : "text-[#828FA3]"} border-[#828FA3]/25 border-2 py-2 px-4 rounded-sm outline-0`}
          >
            {safeColumns.map(column => (
              <option
                key={column.id}
                value={column.id}
              >
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <LightBtn
          variant="primary"
          onClick={handleCreate}
        >
          Create Task
        </LightBtn>
    </Modal>
  )
}

export default AddTask