import { useState } from "react"
import LightBtn from "./base/Button"
import BaseInput from "./base/Input"

function CreateColumn({ setIsOpen, onCreateColumn }) {
  const [title, setTitle] = useState("")

  function handleCreate() {
    if (!title.trim()) return

    onCreateColumn({
      id: Date.now(),
      title,
      tasks: []
    })

    setTitle("")
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
        <h2 className="text-lg font-bold">Create column</h2>

        <BaseInput
          title="Column name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Todo"
        />

        <div className="flex gap-2 justify-end">
          <LightBtn
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </LightBtn>

          <LightBtn
            variant="primary"
            onClick={handleCreate}
          >
            Create
          </LightBtn>
        </div>
      </div>
    </div>
  )
}

export default CreateColumn