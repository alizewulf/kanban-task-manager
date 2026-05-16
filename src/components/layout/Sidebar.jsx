import logo from "../../assets/Group 16.svg";
import fluentActive from "../../assets/fluent-active.svg";
import fluentDashboard from "../../assets/fluent-dashboard.svg";
import fluentDisabled from "../../assets/fluent-disabled.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import showSideBarEye from "../../assets/hideSideBarEye.svg";
import hideSideBarEye from '../../assets/showSideBarEye.svg'
import { useState } from "react";

function SideBar({ currentPage, setCurrentPage, boards, setActiveModal }) {
  const [isDark, setIsDark] = useState(false);
  const [sidebarStatus, changeSidebarStatus] = useState(false)
  const changePage = (button) => {
    setCurrentPage(button);
  };

  function sidebarChange() {
    if (sidebarStatus === false) {
      changeSidebarStatus(true)
    } else {
      changeSidebarStatus(false)
    }
  }

  if (sidebarStatus) {
    return (
      <button className="absolute bottom-8 left-0 flex justify-center items-center py-4.75 pl-4.5 pr-5.5 rounded-r-full bg-[#635FC7]" onClick={sidebarChange}><img className="w-4 h-2.5" src={hideSideBarEye}/></button>
    )
  } else {
  return (
    <aside className="md:flex flex-col h-screen hidden justify-between border-r-[#E4EBFA] border-r-2">
      
      <div className="flex-1">
        <div className="py-8 px-8.5">
          <img src={logo} alt="LOGO" />
        </div>

        <div className="flex flex-col gap-5">
          <span className="px-8 text-xs tracking-[2.4px] text-[#828FA3] uppercase font-bold">
            All Boards ({boards.length})
          </span>

          <ul>
            {boards.map((button) => (
              <li
                key={button}
                className={`text-[15px] cursor-pointer py-4 pl-8 font-bold capitalize flex gap-4 items-center ${
                  currentPage === button
                    ? "bg-[#635FC7] text-white rounded-r-full"
                    : "text-[#828FA3]"
                }`}
                onClick={() => changePage(button)}
              >
                <img
                  src={currentPage === button ? fluentActive : fluentDisabled}
                  alt="icon"
                />
                {button}
              </li>
            ))}

            <li
              onClick={() => setActiveModal("createBoard")}
              className="text-[#635FC7] text-[15px] py-4 pl-8 capitalize cursor-pointer flex gap-4 font-bold items-center"
            >
              <img src={fluentDashboard} alt="dashboard icon" />
              + Create New Board
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 mb-8">
        <div className="bg-[#F4F7FD] px-6 rounded-xl">
          <div className="py-3.5 flex gap-6 items-center">
            
            <img
              src={sun}
              alt="Light mode"
              className={`cursor-pointer transition-opacity ${
                isDark ? "opacity-40" : "opacity-100"
              }`}
              onClick={() => setIsDark(false)}
            />

            <button
              role="switch"
              aria-checked={isDark}
              onClick={() => setIsDark(!isDark)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isDark ? "bg-[#635FC7]" : "bg-[#828FA3]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  isDark ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <img
              src={moon}
              alt="Dark mode"
              className={`cursor-pointer transition-opacity ${
                isDark ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => setIsDark(true)}
            />
          </div>
        </div>

        <button onClick={sidebarChange} className="flex gap-3.5 font-bold text-[15px] text-[#828FA3] items-center">
          <img src={showSideBarEye} alt="eye" />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
  }
}

export default SideBar;
