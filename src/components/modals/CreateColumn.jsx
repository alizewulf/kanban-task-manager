import { useState } from "react"
import LightBtn from "../common/Button"
import BaseInput from "../common/Input"
import { createColumnUtil } from "../utils/createColumnUtil"

function CreateColumn({ setActiveModal, onCreateColumn }) {
  const [title, setTitle] = useState("")

  function handleCreate() {
    if (!title.trim()) return

    onCreateColumn(createColumnUtil(title))

    setTitle("")
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
        <h2 className="text-lg font-bold">Create column</h2>

        <BaseInput
          title="Create Column"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate()
            }
          }}
        />

        <LightBtn
          variant="primary"
          onClick={handleCreate}
          className="flex flex-1"
        >
          Create
        </LightBtn>
      </div>
    </div>
  )
}

export default CreateColumn