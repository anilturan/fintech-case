import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, name, type, disabled, placeholder, error, ...rest },
  ref
) {
  return (
    <div>
      <label className="text-[14px] font-medium leading-[14px] text-authInk">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        name={name}
        disabled={disabled}
        className={`mt-2 w-full rounded-[10px] border px-4 py-[14px] text-[14px] text-authInk outline-none transition placeholder:text-authMuted/70 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
        placeholder={placeholder}
        {...rest}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default Input;
