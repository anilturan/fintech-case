export default function AuthProviderButton({ label }) {
  return (
    <button
      type="button"
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-[10px] border border-slate-200 px-5 py-[14px] text-[14px] font-medium text-authMuted"
    >
      <span className="inline-flex h-4 w-4 items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 8.16c0-.54-.05-1.05-.14-1.55H8v2.93h4.25a3.64 3.64 0 0 1-1.58 2.39v1.98h2.56c1.5-1.38 2.37-3.4 2.37-5.75Z"
            fill="#4285F4"
          />
          <path
            d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.56-1.98c-.7.47-1.6.75-2.73.75-2.09 0-3.86-1.41-4.5-3.3H.87v2.07A7.98 7.98 0 0 0 8 16Z"
            fill="#34A853"
          />
          <path
            d="M3.5 9.54A4.8 4.8 0 0 1 3.2 8c0-.54.1-1.06.29-1.54V4.39H.87A7.98 7.98 0 0 0 0 8c0 1.28.31 2.49.87 3.61l2.63-2.07Z"
            fill="#FBBC04"
          />
          <path
            d="M8 3.18c1.17 0 2.22.4 3.05 1.18l2.29-2.3C11.96.64 10.16 0 8 0A7.98 7.98 0 0 0 .87 4.39l2.63 2.07c.64-1.89 2.41-3.28 4.5-3.28Z"
            fill="#EA4335"
          />
        </svg>
      </span>
      {label}
    </button>
  );
}
