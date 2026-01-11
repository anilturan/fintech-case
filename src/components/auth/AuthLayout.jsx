export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[1fr,1fr] font-auth text-authInk">
      <div className="flex flex-col bg-white px-12 py-10 xl:px-[135px]">
        <div className="flex items-center gap-[10px] text-authInk text-lg font-semibold">
          <img
            src="/assets/logo.svg"
            alt="Fintech logo"
            className="h-[30px] w-[30px]"
          />
          Fintech
        </div>
        <div className="flex flex-1 items-center">
          <div className="mt-14 w-full max-w-md">
            <h1 className="text-[30px] font-semibold leading-[30px]">
              {title}
            </h1>
            <p className="mt-2 text-[16px] leading-[20px] text-authMuted">
              {subtitle}
            </p>
            <div className="mt-8">
              {children}
              {footer && <div className="mt-6">{footer}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <img
          src="/images/auth-screen.png"
          alt="Fintech visual"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
