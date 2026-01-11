import Divider from '../common/Divider';

export default function RecentTransactions({ transactions = [], formatCurrency, formatDate }) {
  return (
    <div className="rounded-2xl bg-white px-[25px] py-5 border border-[#F5F5F5]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-display font-semibold text-ink">
          Recent Transaction
        </h2>
        <button className="text-sm font-medium text-emerald-600" type="button">
          View All >
        </button>
      </div>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-[1.2fr,1fr,1fr,1fr] text-[11px] uppercase text-secondary tracking-wide font-semibold">
          <span>Name/Business</span>
          <span className='text-center'>Type</span>
          <span className='text-center'>Amount</span>
          <span className='text-center'>Date</span>
        </div>
        <div>
          {transactions.map((item, index) => (
            <div key={item.id}>
              <div className="grid grid-cols-[1.2fr,1fr,1fr,1fr] items-center text-sm text-ink py-3">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.business || item.name}
                      className="h-9 w-9 rounded-xl object-cover"
                    />
                  ) : null}
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-secondary">{item.business}</p>
                  </div>
                </div>
                <span className="text-secondary text-center">{item.type}</span>
                <span className="font-semibold text-center">{formatCurrency(item.amount, item.currency)}</span>
                <span className="text-secondary text-center">{formatDate(item.date)}</span>
              </div>
              {index < transactions.length - 1 ? (
                <Divider color="#F5F5F5" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
