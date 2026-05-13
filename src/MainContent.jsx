function MainContent() {
    return(
        <main className="bg-[#E4EBFA] flex flex-1">
            <div className="flex flex-1 flex-col gap-8 justify-center items-center">
                <span className="font-bold text-[18px] text-[#828FA3]">This board is empty. Create a new column to get started.</span>
                <button className="bg-[#635FC7] text-white py-3.5 px-4.5 rounded-3xl cursor-pointer font-bold text-[15px]">+ Add New Column</button>
            </div>
        </main>
    )
}

export default MainContent