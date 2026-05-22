import Column from "./Column"
import LightBtn from "../common/Button"

function Board({ columns, setActiveModal }) {
  return (
    <div className="flex gap-4 items-start p-6">
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
        />
      ))}
      <div className="flex flex-col gap-4 shrink-0 bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 h-full justify-center items-center">
        <button className="px-[55.5px] capitalize font-bold text-[24px] text-[#828FA3]" onClick={() => setActiveModal("createColumn")}>
          + new column
        </button>
      </div>
    </div>
  )
}

export default Board