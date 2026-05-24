import Modal from "../common/Modal"
import dots from '../../assets/3dots.svg'
import { useState, useRef, useEffect } from 'react'

function ViewTask({ onClose, task, boardId, currentColumn, columns = [], updateTask, moveTask, onEditTask, onRemoveTask, theme }) {
  const isDark = theme === 'dark'
  const [localTask, setLocalTask] = useState(task)
  const [dotsOpen, setDotsOpen] = useState(false)
  const dotsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dotsRef.current && !dotsRef.current.contains(e.target)) {
        setDotsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleSubtask(id) {
    const subtasks = (localTask.subtasks || []).map(st => st.id === id ? { ...st, isCompleted: !st.isCompleted } : st)
    const updated = { ...localTask, subtasks }
    setLocalTask(updated)
    if (updateTask) updateTask(boardId, currentColumn.id, localTask.id, updated)
  }

  function handleStatusChange(e) {
    const toColumnId = e.target.value
    if (toColumnId === currentColumn.id) return
    if (moveTask) moveTask(boardId, currentColumn.id, toColumnId, localTask.id)
    onClose()
  }

  function handleEdit() {
    setDotsOpen(false)
    if (onEditTask) onEditTask(localTask)
    else console.log('Edit task', localTask.id)
  }

  function handleEditAndClose() {
    if (onEditTask) onEditTask(localTask)
    if (onClose) onClose()
  }

  function handleRemove() {
    setDotsOpen(false)
    if (onRemoveTask) onRemoveTask(localTask)
    else console.log('Remove task', localTask.id)
  }

  return (
    <Modal onClose={onClose} className={`${isDark ? "bg-[#2B2C37]" : "bg-white"} px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]`}>
      <div className="flex justify-between items-center">
        <h2 className={`${isDark? "text-white" : "text-black"} font-bold text-lg`}>{localTask.title}</h2>

        <div className="relative" ref={dotsRef}>
          <img src={dots} alt="options" className={`cursor-pointer w-7.5 p-3`} onClick={() => setDotsOpen(prev => !prev)} />

          {dotsOpen && (
            <div className={`absolute right-0 top-full mt-2 min-w-45 overflow-hidden rounded-xl border ${isDark ? "bg-[#2B2C37] border-[#3E3F4E] text-white" : "bg-white border-[#E4EBFA] text-[#363636]"} shadow-xl`}>
              <button type="button" className="w-full px-4 py-3 text-left text-[13px] font-bold hover:bg-[#635FC72d] cursor-pointer" onClick={handleEditAndClose}>
                Edit Task
              </button>
              <button type="button" className="w-full px-4 py-3 text-left text-[13px] font-bold cursor-pointer text-[#EA5555] hover:bg-[#FF9898]/20" onClick={handleRemove}>
                Remove Task
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-[13px] text-[#828FA3]">{task.description}</p>
        <span className={`${isDark? "text-white" : "text-[#828FA3]"} text-xs font-bold`}>Subtasks {`${localTask.subtasks.filter(item => item.isCompleted === true).length} of ${localTask.subtasks.length}`}</span>
        <div className="flex flex-col gap-2">  
        {(localTask.subtasks || []).map(st => (
          <label key={st.id} className={`flex items-center gap-3 p-4 ${isDark? "text-white bg-[#20212C]": "text-black bg-[#F4F7FD]"}`}>
            <input type="checkbox" checked={st.isCompleted} className="w-4 h-4" onChange={() => toggleSubtask(st.id)} />
            <span className={`${st.isCompleted ? (isDark ? 'text-[#A8A9B3] line-through' : 'text-[#828FA3] line-through') : ''} text-[12px] font-bold`}>{st.value || ""}</span>
          </label>
        ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className={`text-xs font-bold ${isDark? "text-white" : "text-[#828FA3]"}`}>Current Status</span>
        <select value={currentColumn.id} onChange={handleStatusChange} className={`flex text-[13px]/[23] flex-1 ${isDark? "text-white" : "text-[#828FA3]"} border-[#828FA3]/25 border-2 py-2 px-4 rounded-sm outline-0`}>
          {columns.map(col => (
            <option key={col.id} value={col.id}>{col.title}</option>
          ))}
        </select>
      </div>

    </Modal>
  )
}

export default ViewTask
