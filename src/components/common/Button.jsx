export default function Button({
  type = "button",
  className = "w-full rounded-[10px] bg-primary px-5 py-[14px] text-[14px] font-semibold text-authInk shadow-card transition hover:translate-y-0.5",
  disabled = false,
  isLoading = false,
  onClick,
  children
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
    >
      <span className={isLoading ? "opacity-70" : "opacity-100"}>{children}</span>
      {isLoading && (
        <span
          className="ml-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent align-middle"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
