import { create } from 'zustand';

export const storageKey = 'fintech-auth';

const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return { token: null, user: null };
  }
};

const persistAuth = (data) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(data));
};

export const useAuthStore = create((set) => ({
  ...getStoredAuth(),
  setAuth: (payload) =>
    set(() => {
      persistAuth(payload);
      return payload;
    }),
  clearAuth: () =>
    set(() => {
      persistAuth({ token: null, user: null });
      return { token: null, user: null };
    })
}));
