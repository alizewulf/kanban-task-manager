import LightBtn from './Button'

function Modal({ setIsOpen }) {
  return (
    <div onClick={() => setIsOpen(false)} className="absolute inset-0 flex items-center justify-center bg-[#000000]/50">
      
      <div onClick={(e) => e.stopPropagation ()} className="bg-white px-8 py-6 flex flex-col gap-6 rounded-xl">

        <p className="font-bold text-[18px]">
          Add New Task
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="task"
            className="text-[#828FA3] text-xs font-bold"
          >
            Task
          </label>

          <input
            type="text"
            name="task"
            id="task"
            placeholder="e.g. Take coffee break"
            className="h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-[12px] font-bold text-[#828FA3]">
            Description
          </label>

          <input
            type="text"
            id="description"
            placeholder="e.g. It’s always good to take a break."
            className="h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subtasks" className="text-[12px] font-bold text-[#828FA3]">Subtasks</label>
          <input type="text" placeholder="e.g. Make coffee" className="h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]"/>
          <input type="text" placeholder="e.g. Drink coffee & smile" className="h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]"/>
          <LightBtn children="+add new subtask" variant="secondary"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-[12px] font-bold text-[#828FA3]">Status</label>
        </div>
        <LightBtn children='Create Task' variant='primary'/>

      </div>
    </div>
  )
}

export default Modal