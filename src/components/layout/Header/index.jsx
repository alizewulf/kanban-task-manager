import { useEffect, useRef, useState } from "react"
import dots from '../../../assets/3dots.svg'
import LightBtn from '../../common/Button'

function Header({ activeBoard, setActiveModal, onDeleteBoard, setIsTaskModalOpen,toggleTheme, theme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const isDark = theme === "dark"

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className={`flex justify-between items-center pr-6 pl-8 pb-7 pt-5 ${isDark? "text-white bg-[#2B2C37]" : "border-b-2 border-b-[#E4EBFA]"}`}>
      <h1 className="text-[24px] font-bold capitalize">
        {activeBoard.title}
      </h1>

      <div className="flex gap-6 relative items-center">
        <LightBtn
          onClick={() => setIsTaskModalOpen(true)}
          variant="primary"
        >
          + add new task
        </LightBtn>

        <div className="relative" ref={dropdownRef}>
          <img
            src={dots}
            alt="3 dots"
            className="cursor-pointer w-7.5 p-3"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />

          {dropdownOpen && (
            <div className={`absolute right-0 top-full mt-2 min-w-45 overflow-hidden rounded-xl border ${isDark ? "bg-[#2B2C37] border-[#3E3F4E] text-white" : "bg-white border-[#E4EBFA] text-[#363636]"} shadow-xl`}>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-[13px] font-bold hover:bg-[#635FC72d] cursor-pointer"
                onClick={() => {
                  setActiveModal("editBoard")
                  setDropdownOpen(false)
                }}
              >
                Edit Board
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-[13px] font-bold cursor-pointer text-[#EA5555] hover:bg-[#FF9898]/20"
                onClick={() => {
                  setActiveModal("deleteBoard")
                  setDropdownOpen(false)
                }}
              >
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
