import Divider from '../common/Divider';

export default function ScheduledTransfers({ transfers = [], formatCurrency, formatDate }) {
  return (
    <div className="w-full max-w-[354px] rounded-2xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-display font-semibold text-ink">
          Scheduled Transfers
        </h2>
        <button className="text-sm font-medium text-emerald-600" type="button">
          View All >
        </button>
      </div>
      <div className="mt-6">
        {transfers.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.image || '/assets/avatar.svg'}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-secondary">{formatDate(item.date)}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-ink">
                {formatCurrency(item.amount, item.currency)}
              </p>
            </div>
            {index < transfers.length - 1 ? (
              <Divider color="#FAFAFA" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
