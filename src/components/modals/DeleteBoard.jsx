import Modal from "../common/Modal"
import LightBtn from "../common/Button"

function DeleteBoard({ setActiveModal, onDeleteBoard, board, theme }) {
  const isDark = theme === "dark"

  return (
    <Modal onClose={() => setActiveModal(null)} className={`${isDark ? "bg-[#2B2C37]" : "bg-white"} text-[#EA5555] px-8 py-6 flex flex-col gap-6 rounded-xl w-112.5`}>
      <h1 className="text-lg font-bold ">Delete this board?</h1>
      <p className={`text-[13px] ${isDark ? "text-[#828FA3]" : "text-[#828FA3]"}`}>
        Are you sure you want to delete the "{board?.title ?? "board"}" board? This action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex flex-row items-center gap-3">
        <LightBtn
          variant="destructive"
          onClick={() => {
            onDeleteBoard(board.id)
            setActiveModal(null)
          }}
        >
          Delete
        </LightBtn>
        <LightBtn
          variant="secondary"
          onClick={() => setActiveModal(null)}
        >
          Cancel
        </LightBtn>
      </div>
    </Modal>
  )
}

export default DeleteBoard
