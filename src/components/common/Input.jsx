export const baseInputClass = 'h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]'
export const baseLabelClass = 'text-[12px] font-bold text-[#828FA3] capitalize'
function BaseInput({
  title = "Enter a title",
  placeholder = "e.g. It's always good to take a break.",
  inputClass,
  labelClass,
  value,
  onChange
}) {
  return (
    <>
      <label
        htmlFor={title}
        className={`${labelClass} ${baseLabelClass}`}
      >
        {title}
      </label>

      <input
        type="text"
        id={title}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} ${baseInputClass}`}
      />
    </>
  );
}

export default BaseInput;
