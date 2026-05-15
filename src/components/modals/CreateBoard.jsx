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
        <h2 className="text-lg font-bold">Create Board</h2>

        <BaseInput
          title="Board name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Todo"
        />

        <div className="flex gap-2 justify-end">
          <LightBtn
            variant="secondary"
            onClick={() => setActiveModal(null)}
          >
            Cancel
          </LightBtn>

          <LightBtn
            variant="primary"
            onClick={handleSubmit}
          >
            Create
          </LightBtn>
        </div>
      </div>
    </div>
  )
}

export default CreateBoard
