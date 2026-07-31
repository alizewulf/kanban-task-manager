import { useEffect, useRef, useState } from "react"
import dots from '../../../assets/3dots.svg'
import LightBtn from '../../common/Button'
import mobileLogo from '../../../assets/mobile_logo.svg'
import dropdownSVG from '../../../assets/dropdown.svg'
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
    <header className={`flex justify-between items-center md:pr-6 md:pl-8 md:pb-7 md:pt-5 py-5 px-6 transition-colors duration-300 ${isDark? "text-white bg-[#2B2C37]" : "border-b-2 border-b-[#E4EBFA]"}`}>
      <div className="flex gap-4 items-center">
        <img src={mobileLogo} className="md:hidden w-6 h-6" alt="mobile logo"/>
        <div className="flex gap-2 items-center">
          <h1 className="text-[18px] md:text-[20px] text-nowrap lg:text-[24px] font-bold capitalize">
            {activeBoard ? activeBoard.title : ""}
          </h1>
          <img src={dropdownSVG} className="md:hidden" onClick={() => setActiveModal("mobileMenu")}/>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 relative items-center">
        <LightBtn
          onClick={() => activeBoard && setIsTaskModalOpen(true)}
          variant="primary"
          customClass="hidden md:flex"
        >
          + add new task
        </LightBtn>
        <button
        onClick={() => activeBoard && setIsTaskModalOpen(true)}
        className="items-center sm:hidden font-bold cursor-pointer leading-none justify-center flex capitalize duration-300 bg-[#635FC7] text-white py-2.5 px-4.5 rounded-3xl hover:bg-[#A8A4FF]"
        >
        +
        </button>
        {activeBoard && (
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
        )}
      </div>
    </header>
  )
}
export default Header
