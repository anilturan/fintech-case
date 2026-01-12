import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "../components/common/Skeleton";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import ScheduledTransfers from "../components/dashboard/ScheduledTransfers";
import SummaryCard from "../components/dashboard/SummaryCard";
import WalletCards from "../components/dashboard/WalletCards";
import WorkingCapitalChart from "../components/dashboard/WorkingCapitalChart";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import {
	fetchRecentTransactions,
	fetchScheduledTransfers,
	fetchSummary,
	fetchWallets,
	fetchWorkingCapital,
} from "../services/financialService";
import { fetchProfile } from "../services/userService";
import { useAuthStore } from "../store/authStore";
import { formatCurrency } from "../utils/currency";

const useToastQuery = (key, queryFn) =>
	useQuery({
		queryKey: [key],
		queryFn,
		onError: (error) => {
			toast.error(error?.message || "Veri alınamadı.");
		},
	});

export default function Dashboard() {
	const { token } = useAuthStore();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const summaryQuery = useToastQuery("summary", fetchSummary);
	const workingQuery = useToastQuery("working-capital", fetchWorkingCapital);
	const walletQuery = useToastQuery("wallets", fetchWallets);
	const transactionsQuery = useToastQuery(
		"recent-transactions",
		fetchRecentTransactions,
	);
	const transfersQuery = useToastQuery(
		"scheduled-transfers",
		fetchScheduledTransfers,
	);
	const profileQuery = useQuery({
		queryKey: ["profile"],
		queryFn: () => fetchProfile(),
		enabled: Boolean(token),
		onError: (error) => toast.error(error?.message || "Profil alınamadı."),
	});

	const locale = navigator.language || "en-US";
	const formatCurrencyValue = (value, currency = "USD") =>
		formatCurrency(value, currency, locale);

	const formatDate = (value) => {
		const date = value ? new Date(value) : new Date();
		return new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(date);
	};

	const summaryCards = useMemo(() => {
		const data = summaryQuery.data || {};
		return [
			{
				title: "Total balance",
				value: formatCurrencyValue(
					data.totalBalance?.amount,
					data.totalBalance?.currency,
				),
				highlight: true,
			},
			{
				title: "Total expense",
				value: formatCurrencyValue(
					data.totalExpense?.amount,
					data.totalExpense?.currency,
				),
			},
			{
				title: "Total savings",
				value: formatCurrencyValue(
					data.totalSavings?.amount,
					data.totalSavings?.currency,
				),
			},
		];
	}, [summaryQuery.data]);

	const summaryIconMap = {
		"Total balance": {
			src: "/assets/wallet.svg",
			color: "#C8EE44",
			bg: "#4E5257",
		},
		"Total expense": {
			src: "/assets/wallet.svg",
			color: "#363A3F",
			bg: "#EBE8E8",
		},
		"Total savings": {
			src: "/assets/wallet-add.svg",
			color: "#363A3F",
			bg: "#EBE8E8",
		},
	};

	const workingData = useMemo(() => {
		const raw = workingQuery.data?.data || [];
		const items = Array.isArray(raw) ? raw : [];
		return items.map((item) => ({
			label: item.month,
			income: item.income || 0,
			expenses: item.expense || 0,
			net: item.net ?? (item.income || 0) - (item.expense || 0),
		}));
	}, [workingQuery.data]);

	const wallets = useMemo(() => {
		const raw = walletQuery.data?.cards || [];
		const items = Array.isArray(raw) ? raw : [];
		return items.map((wallet) => ({
			...wallet,
			expiry: `${String(wallet.expiryMonth).padStart(2, "0")}/${String(
				wallet.expiryYear,
			).slice(-2)}`,
		}));
	}, [walletQuery.data]);

	return (
		<div className="min-h-screen bg-white">
			<div className="flex">
				<Sidebar
					isOpen={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
				/>
				<main className="flex-1 space-y-[30px] py-7 px-4 sm:px-6 lg:px-10">
					<Topbar
						profile={profileQuery.data?.data || profileQuery.data}
						onMenuClick={() => setIsSidebarOpen(true)}
					/>

					<section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] items-start">
						<div className="min-w-0 space-y-[30px]">
							<div className="grid gap-[25px] grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(215px,1fr))] items-start">
								{summaryQuery.isLoading
									? Array.from({ length: 3 }).map((_, index) => (
											<Skeleton key={index} className="h-28" />
										))
									: summaryCards.map((card, index) => (
											<SummaryCard
												key={card.title}
												title={card.title}
												value={card.value}
												highlight={index === 0}
												iconSrc={summaryIconMap[card.title]?.src}
												iconBg={summaryIconMap[card.title]?.bg}
												iconColor={summaryIconMap[card.title]?.color}
											/>
										))}
							</div>

							{workingQuery.isLoading ? (
								<Skeleton className="h-72" />
							) : (
								<WorkingCapitalChart
									data={workingData}
									currency={workingQuery.data?.currency}
									formatCurrency={formatCurrencyValue}
								/>
							)}

							{transactionsQuery.isLoading ? (
								<Skeleton className="h-72" />
							) : (
								<RecentTransactions
									transactions={
										transactionsQuery?.data?.transactions?.slice(0, 3) || []
									}
									formatCurrency={formatCurrencyValue}
									formatDate={formatDate}
								/>
							)}
						</div>

						<div className="space-y-[30px] justify-items-center sm:justify-items-start">
							{walletQuery.isLoading ? (
								<Skeleton className="h-72" />
							) : (
								<WalletCards wallets={wallets} />
							)}
							{transfersQuery.isLoading ? (
								<Skeleton className="h-72" />
							) : (
								<ScheduledTransfers
									transfers={transfersQuery.data?.transfers || []}
									formatCurrency={formatCurrencyValue}
									formatDate={formatDate}
								/>
							)}
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
