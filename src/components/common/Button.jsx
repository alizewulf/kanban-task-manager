function LightBtn({children = "Error: Children can't be empty", variant = "primary", onClick}) {
    const base = 'font-bold cursor-pointer justify-center flex items-center h-[40px] capitalize duration-300'
    const variants = {
        primary: 'bg-[#635FC7] text-white py-[15px] px-[61.5px] h-[48px] rounded-[24px] hover:bg-[#A8A4FF]',
        secondary: 'bg-[#635FC7]/10 text-[#635FC7] py-[9px] px-[70px] rounded-[20px] hover:bg-[#635FC7]/25',
        destructive: 'bg-[#EA5555] text-white py-[9px] px-[70px] rounded-[20px] hover:bg-[#FF9898]',
    }
    return (
        <button onClick={onClick} className={`${base} ${variants[variant]}`}>{children}</button>
    )
}

export default LightBtn
