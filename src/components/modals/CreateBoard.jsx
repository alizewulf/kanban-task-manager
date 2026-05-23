import { useState } from "react";
import Modal from "../common/Modal";
import BaseInput from "../common/Input";
import removeTask from '../../assets/X-icon.svg'
import LightBtn from "../common/Button";
import { createColumnUtil } from '../utils/createColumnUtil'
const inputStyle = "h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]";

function CreateBoard({ onCreateBoard, onUpdateBoard, theme, setActiveModal, boards, boardToEdit }) {
  const isDark = theme === "dark"
  const [title, setTitle] = useState(boardToEdit?.title ?? "");
  const [columns, setColumns] = useState(() =>
    boardToEdit?.columns?.map((col) => ({ id: col.id, title: col.title })) ?? [
      { id: crypto.randomUUID(), title: "Todo" },
      { id: crypto.randomUUID(), title: "Doing" },
    ],
  )

  function handleSubmit() {
    const normalizedTitle = title.trim()
    const normalizedColumns = columns
      .map((col) => ({ ...col, title: col.title.trim() }))
      .filter((col) => col.title)

    if (!normalizedTitle || normalizedColumns.length === 0) return

    const exists = boards.some(
      (board) =>
        board.title.toLowerCase() === normalizedTitle.toLowerCase() &&
        board.id !== boardToEdit?.id,
    )

    if (exists) return

    const boardData = {
      id: boardToEdit?.id ?? crypto.randomUUID(),
      title: normalizedTitle,
      columns: normalizedColumns.map((col) => createColumnUtil(col.title)),
    }

    if (boardToEdit) {
      onUpdateBoard(boardData)
    } else {
      onCreateBoard(boardData)
    }

    setActiveModal(null)
  }

  function addColumn() {
    setColumns([
      ...columns,
      { id: crypto.randomUUID(), title: "" },
    ])
  }

  function removeColumn(id) {
    setColumns(columns.filter((col) => col.id !== id))
  }

  return (
    <Modal onClose={() => setActiveModal(null)} className={`${isDark ? "bg-[#2B2C37] text-white" : "bg-white"} px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]`}>
      <h2 className="text-lg font-bold">{boardToEdit ? "Edit Board" : "Add New Board"}</h2>
      <div className="flex flex-col gap-2">
        <BaseInput
          title="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Platform Launch"
          labelClass={`${isDark ? "text-white" : ""}`}
          className="gap-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className={`text-[12px] font-bold ${isDark ? "text-white" : "text-[#828FA3]"} capitalize`}>
          Columns
        </p>
        <div className="flex flex-col gap-3">
          {columns.map((col, index) => (
            <div key={col.id} className={`flex items-center gap-4 ${isDark ? "text-white" : ""}`}>
              <input
                value={col.title}
                onChange={(e) => {
                  const newCols = [...columns]
                  newCols[index] = {
                    ...newCols[index],
                    title: e.target.value,
                  }
                  setColumns(newCols)
                }}
                className={inputStyle + " w-[300px]"}
              />
              <button
                type="button"
                onClick={() => removeColumn(col.id)}
                className="flex h-10 w-10 items-center justify-center rounded-xl cursor-pointer duration-300 hover:bg-[#EA5555]/20"
              >
                <img src={removeTask} alt="remove column" />
              </button>
            </div>
          ))}
          <LightBtn
            variant="primary"
            onClick={addColumn}
          >
            + Add New Column
          </LightBtn>
        </div>
      </div>
      <div className="flex gap-2 justify-center flex-1 ">
        <button
          className="bg-[#635FC7] text-white capitalize duration-300 cursor-pointer items-center font-bold justify-center px-[61.5px] h-[48px] rounded-[24px] hover:bg-[#A8A4FF] flex-1"
          onClick={handleSubmit}
        >
          {boardToEdit ? "Save Changes" : "Create New Board"}
        </button>
      </div>
    </Modal>
  );
}

export default CreateBoard;
