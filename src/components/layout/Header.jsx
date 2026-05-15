import { useState } from 'react'
import dots from '../../assets/3dots.svg'
import LightBtn from '../common/Button'
import Modal from '../modals/AddNewTask'

function Header({title, setTasks}) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
        <header className="flex justify-between items-center pr-6 pl-8 pb-7 pt-5 border-b-2 border-b-[#E4EBFA]">
            <h1 className="text-[24px] font-bold">{title}</h1>
            <div className="flex gap-6">
            <LightBtn onClick={() => setIsOpen(true)} children='+ add new task' variant='primary'/>
            <img src={dots} alt="3 dots" />
            </div>
        </header>
            {isOpen && <Modal setIsOpen={setIsOpen} setTasks={setTasks}/>}
        </>
        )
}

export default Header
