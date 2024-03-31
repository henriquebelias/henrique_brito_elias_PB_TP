export function Button({ children, handleClick, modal }) {
  return (
    <button
      className="border border-black py-2 px-4 cursor-pointer"
      onClick={() => handleClick(modal, true)}>
      {children}
    </button>
  );
}
