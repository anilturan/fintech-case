import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";
import {
	DashboardIcon,
	HelpIcon,
	InvoicesIcon,
	LogoutIcon,
	MywalletIcon,
	SettingIcon,
	TransactionsIcon,
} from "../icons/icons";

const navItems = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: <DashboardIcon />,
	},
	{
		label: "Transactions",
		to: "/dashboard/transactions",
		icon: <TransactionsIcon />,
	},
	{
		label: "Invoices",
		to: "/dashboard/invoices",
		icon: <InvoicesIcon />,
	},
	{
		label: "My Wallets",
		to: "/dashboard/wallets",
		icon: <MywalletIcon />,
	},
	{
		label: "Settings",
		to: "/dashboard/settings",
		icon: <SettingIcon />,
	},
];

const footerItems = [
	{
		label: "Help",
		to: "/help",
		icon: <HelpIcon />,
	},
	{
		label: "Logout",
		to: "/signin",
		icon: <LogoutIcon />,
	},
];

export default function Sidebar({ isOpen = false, onClose }) {
	const navigate = useNavigate();
	const { clearAuth } = useAuthStore();
	const logoutMutation = useMutation({
		mutationFn: logoutUser,
		onError: (error) => {
			toast.error(error?.message || "Çıkış başarısız.");
		},
		onSettled: () => {
			clearAuth();
			navigate("/signin");
		},
	});
	const content = (
		<div className="flex h-full w-full flex-col">
			<div className="px-[25px] pt-[30px]">
				<div className="flex items-center gap-[10px] text-authInk text-lg font-semibold">
					<img
						src="/assets/logo.svg"
						alt="Fintech logo"
						className="h-[30px] w-[30px]"
					/>
					Fintech
				</div>
			</div>
			<nav className="flex-1 px-[25px] py-[60px] lg:py-[70px] flex flex-col">
				{navItems.map((item) => (
					<NavLink
						key={item.label}
						to={item.to}
						className={({ isActive }) =>
							`flex items-center gap-3 p-[15px] rounded-2xl text-sm font-semibold transition ${
								isActive
									? "bg-primary text-ink"
									: "text-secondary hover:bg-primary hover:text-ink"
							}`
						}
					>
						<span className="text-base">{item.icon}</span>
						{item.label}
					</NavLink>
				))}
				<div className="flex flex-1 flex-col text-xs text-secondary justify-end">
					{footerItems.map((item) => {
						const isLogout = item.label === "Logout";
						const className =
							"flex items-center gap-3 p-[15px] rounded-2xl text-sm font-medium text-secondary hover:bg-primary hover:text-ink";
						if (isLogout) {
							return (
								<Button
									key={item.label}
									className={className}
									disabled={logoutMutation.isPending}
									isLoading={logoutMutation.isPending}
									onClick={() => logoutMutation.mutate()}
								>
									<span className={"text-base flex gap-2"}>{item.icon} {logoutMutation.isPending ? "Logging out..." : item.label}</span>
								
								</Button>
							);
						}
						return (
							<NavLink key={item.label} to={item.to} className={className}>
								<span className="text-base">{item.icon}</span>
								{item.label}
							</NavLink>
						);
					})}
				</div>
			</nav>
		</div>
	);

	return (
		<>
			<aside className="hidden lg:flex min-h-screen w-64 bg-[#FAFAFA]">
				{content}
			</aside>
			<div
				className={`fixed inset-0 z-40 lg:hidden ${
					isOpen ? "block" : "hidden"
				}`}
			>
				<button
					type="button"
					className="absolute inset-0 bg-black/20"
					onClick={onClose}
					aria-label="Close menu"
				/>
				<aside className="relative h-full w-64 bg-[#FAFAFA]">{content}</aside>
			</div>
		</>
	);
}
