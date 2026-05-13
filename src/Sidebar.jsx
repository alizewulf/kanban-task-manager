import logo from './assets/Group 16.svg'
import fluentActive from './assets/fluent-active.svg'
import fluentDashboard from './assets/fluent-dashboard.svg'
import fluentDisabled from './assets/fluent-disabled.svg'
import sun from './assets/sun.svg'
import moon from './assets/moon.svg'
import eye from './assets/eye.svg'
import { useState } from 'react'

function SideBar({ currentPage, setCurrentPage }) {
    const buttons = ["Platform Launch", "Marketing Plan", "Roadmap"]
    const [isDark, setIsDark] = useState(false)
    const createdButtons = []
    function changePage(button) {
        setCurrentPage(button)
    }

    return (
        <aside className='md:flex flex-col h-screen hidden justify-between border-r-[#E4EBFA] border-r-2'>
            <div className="flex-1">
                <div className='py-8 px-8.5'>
                    <img src={logo} alt="LOGO" />
                </div>

                <div className='flex flex-col gap-5'>
                    <span className='px-8 text-xs tracking-[2.4px] text-[#828FA3] uppercase font-bold'>
                        All Boards ({createdButtons.length})
                    </span>

                    <ul>
                        {buttons.map(button => (
                            <li
                                key={button}
                                className={`text-[15px] cursor-pointer py-4 pl-8 font-bold flex gap-4 items-cener ${
                                    currentPage === button
                                        ? "bg-[#635FC7] text-white rounded-r-full"
                                        : "text-[#828FA3]"
                                }`}
                                onClick={() => changePage(button)}
                            >
                                <img
                                    src={currentPage === button ? fluentActive : fluentDisabled}
                                    alt="fluent icon"
                                />
                                {button}
                            </li>
                        ))}

                        <li className='text-[#635FC7] text-[15px] py-4 pl-8 cursor-pointer flex gap-4 font-bold items-cener'>
                            <img src={fluentDashboard} alt="fluent Dashboard"/>
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
                    className={`cursor-pointer transition-opacity ${isDark ? 'opacity-40' : 'opacity-100'}`}
                    onClick={() => setIsDark(false)}
                />

                {/* Toggle */}
                <button
                    role="switch"
                    aria-checked={isDark}
                    onClick={() => setIsDark(!isDark)}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635FC7] ${
                    isDark ? 'bg-[#635FC7]' : 'bg-[#828FA3]'
                    }`}
                >
                    <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                        isDark ? 'translate-x-7' : 'translate-x-0'
                    }`}
                    />
                </button>

                <img
                    src={moon}
                    alt="Dark mode"
                    className={`cursor-pointer transition-opacity ${isDark ? 'opacity-100' : 'opacity-40'}`}
                    onClick={() => setIsDark(true)}
                />
                </div>
            </div>

            <button className="flex gap-3.5 font-bold text-[15px] text-[#828FA3] items-center">
                <img src={eye} alt="eye" />
                Hide Sidebar
            </button>
            </div>
        </aside>
    )
}

export default SideBar