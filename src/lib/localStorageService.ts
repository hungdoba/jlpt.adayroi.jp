import { SYNC_KEY, USER_ID_KEY } from '@/constants/sync';

export class LocalStorageService {
  static clearSyncData() {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(SYNC_KEY)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }

  static setSyncData(data: { key: string; value: string }[]) {
    data.forEach(({ key, value }) => {
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        localStorage.setItem(key, JSON.stringify(parsed));
      } catch {
        localStorage.setItem(key, String(value));
      }
    });
  }

  static getUserId(): string | null {
    return localStorage.getItem(USER_ID_KEY);
  }

  static setUserId(id: string): void {
    localStorage.setItem(USER_ID_KEY, id);
  }
}
