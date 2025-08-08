import { format } from 'date-fns';
import { HEATMAP_KEY, HeatmapData } from '@/types/heatmap';

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
