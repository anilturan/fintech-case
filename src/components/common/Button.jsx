export default function Button({
  type = "button",
  className = "w-full rounded-[10px] bg-primary px-5 py-[14px] text-[14px] font-semibold text-authInk shadow-card transition hover:translate-y-0.5",
  disabled = false,
  onClick,
  children
}) {
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
