export function Input({ handleChange, value, children, id, type }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2  max-[459px]:text-sm">
      {children}
      <input
        id={id}
        name={id}
        type={type}
        className="border border-black p-4  max-[459px]:p-2"
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}
