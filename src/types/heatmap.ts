export const HEATMAP_KEY = "adayroi_heatmap_data";

export interface HeatmapData {
  [date: string]: number;
}

export interface HeatmapValue {
  date: string;
  count: number;
}
