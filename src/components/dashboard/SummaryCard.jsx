import styles from './SummaryCard.module.css';

export default function SummaryCard({
  title,
  value,
  iconSrc,
  iconBg,
  iconColor,
  highlight
}) {
  return (
    <div
      className={`${styles.card} ${
        highlight ? styles.cardHighlight : styles.cardDefault
      }`}
    >
      <div className={styles.content}>
        <div
          className={`${styles.icon} ${
            highlight ? styles.iconHighlight : styles.iconDefault
          }`}
          style={iconBg ? { backgroundColor: iconBg } : undefined}
        >
          {iconSrc ? (
            <span
              className={styles.iconImage}
              aria-hidden="true"
              style={{
                backgroundColor: iconColor || 'currentColor',
                WebkitMaskImage: `url(${iconSrc})`,
                maskImage: `url(${iconSrc})`
              }}
            />
          ) : null}
        </div>
        <div>
          <p
            className={`${styles.title} ${
              highlight ? styles.titleHighlight : styles.titleDefault
            }`}
          >
            {title}
          </p>
          <p
            className={`${styles.value} ${
              highlight ? styles.valueHighlight : styles.valueDefault
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
