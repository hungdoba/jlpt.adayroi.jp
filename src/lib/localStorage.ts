import { format } from 'date-fns';
import { HEATMAP_KEY, HeatmapData } from '@/types/heatmap';
import { SYNC_KEY, USER_ID_KEY } from '@/constants/sync';

export function getLocalStorageData(prefix: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      try {
        data[key] = JSON.parse(localStorage.getItem(key) as string);
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
  }
  return data;
}

export function fetchHeatmapData(): HeatmapData {
  try {
    const storedData = localStorage.getItem(HEATMAP_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (typeof parsedData === 'object' && parsedData !== null) {
        return parsedData as HeatmapData;
      }
    }
  } catch (error) {
    console.error('Error parsing heatmap data:', error);
  }
  return {};
}

export function saveHeatmapData(data: HeatmapData): void {
  try {
    localStorage.setItem(HEATMAP_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving heatmap data:', error);
  }
}

export function addHeatmapDataForToday() {
  const today = new Date();
  const currentData: HeatmapData = fetchHeatmapData();
  const todayString = format(today, 'yyyy-MM-dd');

  if (todayString in currentData) {
    currentData[todayString] += 1;
  } else {
    currentData[todayString] = 1;
  }

  saveHeatmapData(currentData);
}

export function clearSyncData() {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(SYNC_KEY)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function setSyncData(data: { key: string; value: string }[]) {
  data.forEach(({ key, value }) => {
    try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      localStorage.setItem(key, JSON.stringify(parsed));
    } catch {
      localStorage.setItem(key, String(value));
    }
  });
}

export function getUserId(): string | null {
  return localStorage.getItem(USER_ID_KEY);
}

export function setUserId(id: string): void {
  localStorage.setItem(USER_ID_KEY, id);
}
