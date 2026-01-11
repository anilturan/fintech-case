import { http } from './api';
import {
  FINANCIAL_RECENT_TRANSACTIONS_URL,
  FINANCIAL_SCHEDULED_TRANSFERS_URL,
  FINANCIAL_SUMMARY_URL,
  FINANCIAL_WALLETS_URL,
  FINANCIAL_WORKING_CAPITAL_URL
} from './urls';

export async function fetchSummary() {
  const url = FINANCIAL_SUMMARY_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function fetchWorkingCapital() {
  const url = FINANCIAL_WORKING_CAPITAL_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function fetchWallets() {
  const url = FINANCIAL_WALLETS_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function fetchRecentTransactions() {
  const url = FINANCIAL_RECENT_TRANSACTIONS_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}

export async function fetchScheduledTransfers() {
  const url = FINANCIAL_SCHEDULED_TRANSFERS_URL;
  return new Promise((resolve, reject) => {
    http
      .get(url)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => reject(err));
  });
}
