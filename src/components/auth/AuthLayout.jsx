export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-[100dvh] grid md:grid-cols-[1fr,1fr] font-auth text-ink">
      <div className="flex flex-col bg-white px-6 py-6 md:px-12 md:py-10 xl:px-[135px]">
        <div className="mx-auto flex w-full max-w-md items-center gap-[10px] text-ink text-lg font-semibold md:mx-0">
          <img
            src="/assets/logo.svg"
            alt="Fintech logo"
            className="h-[30px] w-[30px]"
          />
          Fintech
        </div>
        <div className="flex flex-1 items-center">
          <div className="mx-auto mt-6 w-full max-w-md md:mx-0 md:mt-14">
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
