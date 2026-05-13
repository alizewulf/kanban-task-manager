import dots from './assets/3dots.svg'
function Header({title}) {
    return (
        <header className="flex justify-between items-center pr-6 pl-8 pb-7 pt-5 border-b-2 border-b-[#E4EBFA]">
            <h1 className="text-[24px] font-bold">{title}</h1>
            <div className="flex gap-6">
                <button className="bg-[#635FC7] py-4 px-6 text-white rounded-full cursor-pointer">+ Add New Task</button>
                <img src={dots} alt="3 dots" />
            </div>
        </header>
    )
}

export default Header