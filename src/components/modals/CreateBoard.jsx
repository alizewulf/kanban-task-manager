import { useState } from "react"
import BaseInput from "../common/Input"
import LightBtn from "../common/Button"

function CreateBoard({ onCreateBoard, setActiveModal }) {
  const [title, setTitle] = useState("")

  function handleSubmit() {
    if (!title.trim()) return

    onCreateBoard(title)
    setActiveModal(null)
  }

  return (
    <div
      onClick={() => setActiveModal(null)}
      className="absolute inset-0 flex items-center justify-center bg-[#000000]/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]"
      >
        <h2 className="text-lg font-bold">Add New Board</h2>

        <BaseInput
          title="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Todo"
        />

        <div className="flex gap-2 justify-center flex-1 ">
          <button className="bg-[#635FC7] text-white capitalize duration-300 cursor-pointer items-center font-bold justify-center px-[61.5px] h-[48px] rounded-[24px] hover:bg-[#A8A4FF] flex-1" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBoard
