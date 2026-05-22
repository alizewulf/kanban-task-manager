import { useState } from "react";
import Modal from "../common/Modal";
import BaseInput from "../common/Input";
import removeTask from '../../assets/X-icon.svg'
import LightBtn from "../common/Button";
import { createColumnUtil } from '../utils/createColumnUtil'
const inputStyle = "h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]";
function CreateBoard({ onCreateBoard, theme, setActiveModal, boards }) {

  const isDark = theme === "dark"
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState([
    { id: crypto.randomUUID(), title: "Todo" },
    { id: crypto.randomUUID(), title: "Doing" }
  ]);
    function handleSubmit() {
      const normalizedTitle = title.trim()

      if (!normalizedTitle) return

      const exists = boards.some(
        board =>
          board.title.toLowerCase() === normalizedTitle.toLowerCase()
      )

      if (exists) return

      onCreateBoard({
        id: crypto.randomUUID(),
        title: normalizedTitle,
        columns: columns.map(col =>
          createColumnUtil(col.title)
        )
      })

      setActiveModal(null)
    }

  function addColumn() {
    setColumns([
      ...columns,
      { id: crypto.randomUUID(), title: "" }
    ])
  }
  function removeColumn(id) {
    setColumns(columns.filter(col => col.id !== id))
  }  
  return (
    <Modal onClose={() => setActiveModal(null)} className={`${isDark ? "bg-[#2B2C37] text-white" : "bg-white"} px-8 py-6 flex flex-col gap-6 rounded-xl w-[400px]`}>
        <h2 className="text-lg font-bold">Add New Board</h2>
        <div className="flex flex-col gap-2">
          <BaseInput
            title="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Todo"
            labelClass={`${isDark? "text-white" : ""}`}
            className="gap-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className={`text-[12px] font-bold ${isDark? "text-white" : "text-[#828FA3]"} capitalize`}>
            Columns
          </p>
          <div className="flex flex-col gap-3">
          {columns.map((col, index) => (
            <div key={col.id} className={`flex items-center gap-4 ${isDark? "text-white" : ""}`}>
              <input
                value={col.title}
                onChange={(e) => {
                  const newCols = [...columns];
                  newCols[index] = {
                    ...newCols[index],
                    title: e.target.value
                  };
                  setColumns(newCols);
                }}
                className={inputStyle + " flex-1"}
              />

              <button
                onClick={() => removeColumn(col.id)}
                className="cursor-pointer"
              >
              <img src={removeTask} alt="removeTask icon" />
              </button>
            </div>
          ))}
            <LightBtn
              variant="secondary"
              children="+ Add New Column"
              onClick={addColumn}
              customClass={isDark? "bg-white": ""}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center flex-1 ">
          <button
            className="bg-[#635FC7] text-white capitalize duration-300 cursor-pointer items-center font-bold justify-center px-[61.5px] h-[48px] rounded-[24px] hover:bg-[#A8A4FF] flex-1"
            onClick={handleSubmit}
          >
            Create New Board
          </button>
        </div>
    </Modal>
  );
}

export default CreateBoard;
