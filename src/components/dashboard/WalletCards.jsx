import styles from './WalletCards.module.css';

export default function WalletCards({ wallets = [] }) {
  const truncateText = (value, maxLength = 16) => {
    const text = String(value || '');
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 1)}.`;
  };

  return (
    <div className="w-full max-w-[354px] rounded-2xl bg-transparent p-0 shadow-none">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-display font-semibold text-ink">Wallet</h2>
        <button type="button" className="text-secondary text-sm">
          ...
        </button>
      </div>
      <div className={`mt-4 ${styles.cardStack}`}>
        {wallets.map((wallet, index) => (
          <div
            key={wallet.id}
            className={`${styles.card} ${
              index === 0 ? styles.cardPrimary : styles.cardSecondary
            } ${index % 2 === 1 ? styles.cardLight : ''}`}
          >
            <div className={styles.cardRow}>
              <span className={styles.cardName}>
                {truncateText(wallet.name)}
              </span>
              <span className={styles.cardDivider} aria-hidden="true" />
              <span className={`${styles.label} ${styles.bankLabel}`}>
                {wallet.bank}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <img
                src="/assets/chip.svg"
                alt=""
                aria-hidden="true"
                className={styles.chip}
              />
              <img
                src="/assets/wifi.svg"
                alt=""
                aria-hidden="true"
                className={styles.wifi}
              />
            </div>
            <div
              className={`${styles.number} ${
                index === 0 ? styles.numberPrimary : styles.numberSecondary
              }`}
            >
              {wallet.cardNumber}
            </div>
            <div className="mt-4 flex items-center justify-between">
              {index === 1 ? (
                <span className={styles.expiry}>{wallet.expiry}</span>
              ) : (
                <span />
              )}
              {index === 1 &&   <span className={styles.brand}>{wallet.network}</span> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
