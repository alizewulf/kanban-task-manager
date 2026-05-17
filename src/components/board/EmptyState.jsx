import LightBtn from "../common/Button"

function EmptyState({ setActiveModal }) {
  return (
    <div className="flex flex-1 flex-col gap-8 justify-center items-center">
      <span className="font-bold text-[18px] text-[#828FA3]">
        This board is empty. Create a new column to get started.
      </span>

      <LightBtn
        variant="primary"
        onClick={() => setActiveModal("createColumn")}
      >
        + add new column
      </LightBtn>
    </div>
  )
}

export default EmptyState