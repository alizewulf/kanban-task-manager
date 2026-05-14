function BaseInput({
  title = "Enter a title",
  placeholder = "e.g. It’s always good to take a break.",
  value,
  onChange
}) {
  return (
    <>
      <label
        htmlFor={title}
        className="text-[12px] font-bold text-[#828FA3] capitalize"
      >
        {title}
      </label>

      <input
        type="text"
        id={title}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 outline-0 px-3 rounded-sm border-[#828FA3]/25 placeholder:py-2.25 placeholder:pl-4 border-2 text-[13px]"
      />
    </>
  );
}

export default BaseInput;