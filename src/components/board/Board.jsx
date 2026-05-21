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
      <div className="flex flex-col gap-4 bg-[#F4F7FD] rounded-[12px] p-4 min-w-[280px] h-fit justify-center items-center">
        <LightBtn
          variant="secondary"
          onClick={() => setActiveModal("createColumn")}
        >
          + Add New Column
        </LightBtn>
      </div>
    </div>
  )
}

export default Board