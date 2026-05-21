import dots from '../../assets/3dots.svg'
import LightBtn from '../common/Button'

function Header({ activeBoard, setIsTaskModalOpen }) {
  return (
    <header className="flex justify-between items-center pr-6 pl-8 pb-7 pt-5 border-b-2 border-b-[#E4EBFA]">
      <h1 className="text-[24px] font-bold capitalize">
        {activeBoard.title}
      </h1>

      <div className="flex gap-6">
        <LightBtn
          onClick={() => setIsTaskModalOpen(true)}
          variant="primary"
        >
          + add new task
        </LightBtn>

        <img src={dots} alt="3 dots" className="cursor-pointer"/>
      </div>
    </header>
  )
}
export default Header
