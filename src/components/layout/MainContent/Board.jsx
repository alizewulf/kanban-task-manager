import Column from "./Column";

function Board({ columns, setActiveModal, theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex gap-4 items-start p-6 ${isDark ? "bg-[#20212C]" : "bg-transparent"} min-h-full`}
    >
      {columns.map((col) => (
        <Column key={col.id} column={col} theme={theme}/>
      ))}

      <div
        className={`flex gap-4 items-center shrink-0 ${isDark ? "bg-gradient-to-b from-[#2B2C37] to-[#2B2C37]/25" : "bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50"} min-h-full`}>
        <button
          className={`px-[55.5px] capitalize cursor-pointer font-bold text-[24px] ${isDark ? "text-[#A8A9B3]" : "text-[#828FA3]"}`}
          onClick={() => setActiveModal("createColumn")}
        >
          + new column
        </button>
      </div>
    </div>
  );
}

export default Board;
