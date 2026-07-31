import { useState } from "react"
import Modal from "../../common/Modal"
import LightBtn from "../../common/Button"
import BaseInput from "../../common/Input"
import { createColumnUtil } from "../../utils/createColumnUtil"

function CreateColumn({ setActiveModal, theme, onCreateColumn }) {
  const [title, setTitle] = useState("")
  const isDark = theme === "dark"
  function handleCreate() {
    if (!title.trim()) return

    onCreateColumn(createColumnUtil(title))

    setTitle("")
    setActiveModal(null)
  }

  return (
    <Modal onClose={() => setActiveModal(null)} className={`${isDark? "bg-[#2B2C37]" : "bg-white"} px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]`}>
        <h2 className={`${isDark? "text-white" : "text-black"} text-lg font-bold`}>Create column</h2>

        <BaseInput
          title="Create Column"
          value={title}
          inputClass={`${isDark? "text-white" : ""}`}
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
    </Modal>
  )
}

export default CreateColumn