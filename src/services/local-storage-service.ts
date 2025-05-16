const EXPIRATION_MINUTES = 15;

export const setToLocalStorage = (
  key: string,
  value: unknown,
  minutes = EXPIRATION_MINUTES
) => {
  if (typeof window === "undefined") return;
  const expiresAt = Date.now() + minutes * 60 * 1000;
  const payload = JSON.stringify({ value, expiresAt });
  localStorage.setItem(key, payload);
};

export const getFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const { value, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return { value } as T;
  } catch {
    return null;
  }
};
