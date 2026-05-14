import LightBtn from "../base/Button"
function EmptyState({ setIsOpen }) {
  return (
    <div className="flex flex-1 flex-col gap-8 justify-center items-center">
      <span className="font-bold text-[18px] text-[#828FA3]">
        This board is empty. Create a new column to get started.
      </span>

      <LightBtn
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        + add new column
      </LightBtn>
    </div>
  )
}

export default EmptyState