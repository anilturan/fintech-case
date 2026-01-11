import { useAuthStore } from '../../store/authStore';
import Button from '../common/Button';
import { BellIcon, SearchIcon } from '../icons/icons';

export default function Topbar({ profile, onMenuClick }) {
  const { user } = useAuthStore();
  const displayName =
    profile?.fullName || profile?.name || user?.name;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA] text-secondary lg:hidden"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </Button>
        <h1 className="text-2xl font-display font-semibold text-ink">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 text-secondary">
          <Button
            type="button"
            className="inline-flex w-10 items-center justify-center"
            aria-label="Search"
          >
         <SearchIcon/>
          </Button>
          <Button
            type="button"
            className="inline-flex w-10 items-center justify-center "
            aria-label="Notifications"
          >
        <BellIcon/>
          </Button>
        </div>
        <div className="flex items-center gap-3 rounded-full  py-[6px] pr-[15px] pl-[7px] bg-[#FAFAFA]">
          <img
            src="/assets/avatar.svg"
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-ink">{displayName}</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-secondary" fill="currentColor">
            <path d="M5.5 7.5l4.5 4.5 4.5-4.5H5.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
