import {  useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Customized
} from 'recharts';

const TooltipContent = ({ active, payload, formatCurrency, currency }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const net = payload[0]?.payload?.net;
  const value = typeof net === 'number' ? net : payload[0]?.value;
  const formattedValue = formatCurrency
    ? formatCurrency(value, currency)
    : value;

  return (
    <div className="relative rounded-2xl bg-[#F2F6FC] px-4 py-2 text-sm font-semibold text-[#1B212D] shadow-card">
      {formattedValue}
      <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#F2F6FC]" />
    </div>
  );
};

export default function WorkingCapitalChart({ data, formatCurrency, currency }) {
  const formatAxisValue = (value) => {
    if (typeof value !== 'number') {
      return value;
    }
    if (Math.abs(value) >= 1000) {
      return `${Math.round(value / 1000)}K`;
    }
    return value;
  };

  const [activeLabel, setActiveLabel] = useState(null);

  return (
    <div className="rounded-2xl bg-white p-6 border border-[#f5f5f5]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-base font-display font-semibold text-ink">
          Working Capital
        </h2>
        <div className="flex items-center gap-6 text-xs text-secondary">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Income
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-400"></span>
            Expenses
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-panel px-3 py-1 text-xs font-medium text-ink"
          >
            Last 7 days
            <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
              <path d="M5.5 7.5l4.5 4.5 4.5-4.5H5.5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ left: 24, right: 24, top: 10, bottom: 32 }}
            onMouseMove={(state) => {
              if (state?.activeLabel) {
                setActiveLabel(state.activeLabel);
              }
            }}
            onMouseLeave={() => setActiveLabel(null)}
            onClick={(state) => {
              if (state?.activeLabel) {
                setActiveLabel(state.activeLabel);
              }
            }}
          >
            <defs>
              <linearGradient id="activeMonthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(250, 251, 254, 0)" />
                <stop offset="66.56%" stopColor="#F2F6FC" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical
              horizontal={false}
              stroke="#FFF4FE"
              strokeWidth={1}
            />
            <XAxis
              dataKey="label"
              interval={0}
              tickLine={false}
              axisLine={false}
              tickMargin={18}
              tickSize={0}
              tick={({ x, y, payload }) => {
                const isActive = payload.value === activeLabel;
                return (
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fontFamily="Kumbh Sans"
                    fontSize="12"
                    fontWeight={isActive ? 600 : 400}
                    fill={isActive ? '#1B212D' : '#929EAE'}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={24}
              tick={{
                fontFamily: 'Kumbh Sans',
                fontSize: 12,
                fontWeight: 400,
                fill: '#929EAE'
              }}
              tickFormatter={formatAxisValue}
            />
            <Tooltip
              cursor={false}
              content={
                <TooltipContent
                  formatCurrency={formatCurrency}
                  currency={currency}
                />
              }
            />
            <Customized
              component={({ xAxisMap, offset }) => {
                if (!activeLabel || !xAxisMap?.[0]) {
                  return null;
                }
                const x = xAxisMap[0].scale(activeLabel);
                const bandWidth = 49;
                const chartHeight = offset.height;
                const bandHeight = Math.min(164, chartHeight - 16);
                return (
                  <rect
                    x={x - bandWidth / 2}
                    y={offset.top + (chartHeight - bandHeight) / 2}
                    width={bandWidth}
                    height={bandHeight}
                    rx={12}
                    fill="url(#activeMonthGradient)"
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                strokeWidth: 4,
                stroke: '#ffffff',
                fill: '#10b981'
              }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#a3e635"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                strokeWidth: 4,
                stroke: '#ffffff',
                fill: '#4F46E5'
              }}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
