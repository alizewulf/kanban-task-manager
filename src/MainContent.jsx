import LightBtn from "./base/Button"

function MainContent() {
    return(
        <main className="bg-[#E4EBFA] flex flex-1">
            <div className="flex flex-1 flex-col gap-8 justify-center items-center">
                <span className="font-bold text-[18px] text-[#828FA3]">This board is empty. Create a new column to get started.</span>
                <LightBtn children="+add new column" variant="primary"/>
            </div>
        </main>
    )
}

export default MainContent