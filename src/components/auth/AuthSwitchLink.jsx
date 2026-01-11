import { Link } from 'react-router-dom';

export default function AuthSwitchLink({ prefix, linkText, to }) {
  return (
    <p className="text-[14px] leading-[17px] text-authMuted justify-self-center">
      {prefix}{' '}
      <Link
        to={to}
        className="relative inline-flex flex-col items-center text-authInk font-medium"
      >
        <span>{linkText}</span>
        <svg
          className="mt-1"
          width="43"
          height="5"
          viewBox="0 0 43 5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 4 C 11 1, 32 1, 42 4"
            stroke="#C8EE44"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </p>
  );
}
