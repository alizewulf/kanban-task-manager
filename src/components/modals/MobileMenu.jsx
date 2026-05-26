import Modal from "../common/Modal";
import fluentActive from "../../assets/fluent-active.svg";
import fluentDashboard from "../../assets/fluent-dashboard.svg";
import fluentDisabled from "../../assets/fluent-disabled.svg";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

function MobileMenu({ onClose, boards, currentPage, setCurrentPage, setActiveModal, theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <Modal
      onClose={onClose}
      className={`max-w-[95vw] w-[380px] ${isDark ? "bg-[#2B2C37] text-white" : "bg-white text-[#363636]"} rounded-[24px] p-6`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[2.4px] text-[#828FA3]">Dashboards</p>
            <p className="text-lg font-bold">Select board</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {boards.map((board) => {
            const isActive = board.id === currentPage;
            return (
              <button
                key={board.id}
                type="button"
                onClick={() => {
                  setCurrentPage(board.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-4 text-left font-bold transition duration-200 ${
                  isActive
                    ? "bg-[#635FC7] text-white"
                    : isDark
                    ? "bg-[#20212C] text-[#A8A9B3] hover:bg-[#3E3F4E]"
                    : "bg-[#F4F7FD] text-[#363636] hover:bg-[#E4EBFA]"
                }`}
              >
                <img src={isActive ? fluentActive : fluentDisabled} alt="board icon" />
                {board.title}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setActiveModal("createBoard")}
          className="flex items-center justify-center gap-2 rounded-full bg-[#635FC7] px-4 py-3 text-white font-bold hover:bg-[#A8A4FF]"
        >
          <img src={fluentDashboard} alt="dashboard icon" />
          Create Board
        </button>

        <div className={`${isDark ? "bg-[#20212C]" : "bg-[#F4F7FD]"} rounded-xl px-4 py-4`}
        >
          <p className="text-xs font-bold uppercase tracking-[2px] text-[#828FA3]">Theme</p>
          <div className="mt-3 flex items-center justify-between">
            <img
              src={sun}
              alt="Light mode"
              className={`w-5 h-5 cursor-pointer transition-opacity duration-200 ${isDark ? "opacity-40" : "opacity-100"}`}
              onClick={() => isDark && toggleTheme()}
            />

            <button
              role="switch"
              aria-checked={isDark}
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isDark ? "bg-[#635FC7]" : "bg-[#828FA3]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  isDark ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>

            <img
              src={moon}
              alt="Dark mode"
              className={`w-5 h-5 cursor-pointer transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-40"}`}
              onClick={() => !isDark && toggleTheme()}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MobileMenu;
