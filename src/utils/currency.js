import currency from 'currency.js';

export const formatCurrency = (value, currencyCode = 'USD', locale = 'en-US') => {
  const amount = Number(value ?? 0);
  if (Number.isNaN(amount)) {
    return '';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).format(amount);
  } catch (error) {
    const formatted = currency(amount, { symbol: '', precision: 2 }).format();
    return `${formatted} ${currencyCode}`.trim();
  }
};
