function Modal({ onClose, children, className = "" }) {
  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#000000]/50"
    >
      <div onClick={(e) => e.stopPropagation()} className={className}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
