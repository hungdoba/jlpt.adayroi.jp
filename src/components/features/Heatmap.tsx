'use client';

import { format } from 'date-fns';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { fetchHeatmapData, saveHeatmapData } from '@/lib/localStorage';
import { HeatmapData, HeatmapValue } from '@/types/heatmap';

export default function GitHubHeatmap() {
  const [values, setValues] = useState<HeatmapValue[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const convertToHeatmapValues = useCallback((data: HeatmapData): HeatmapValue[] => {
    return Object.entries(data).map(([date, count]) => ({ date, count }));
  }, []);

  const initializeHeatmapData = useCallback(() => {
    const storedData = fetchHeatmapData();
    const todayString = format(today, 'yyyy-MM-dd');

    const needsUpdate = !storedData[todayString] || Object.keys(storedData).length < 300;

    if (needsUpdate) {
      const completeData: HeatmapData = {};

      const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      for (let i = 0; i < 365; i++) {
        const date = format(
          new Date(lastDayOfThisMonth.getTime() - i * 24 * 60 * 60 * 1000),
          'yyyy-MM-dd',
        );
        completeData[date] = storedData[date] || 0;
      }
      setValues(convertToHeatmapValues(completeData));
      saveHeatmapData(completeData);
    } else {
      setValues(convertToHeatmapValues(storedData));
    }
  }, [today, convertToHeatmapValues]);

  useEffect(() => {
    initializeHeatmapData();
  }, [initializeHeatmapData]);

  const daysToShow = isMobile ? 182 : 364; // ~6 months vs ~12 months
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(endDate.getTime() - daysToShow * 24 * 60 * 60 * 1000);

  return (
    <div className="mt-2 p-4 pb-0 rounded border">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          const isToday =
            value && format(new Date(value.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');

          if (!value || !value.count) {
            if (isToday) {
              return 'color-today color-empty';
            } else {
              return 'color-empty';
            }
          }

          if (isToday) {
            return `color-today color-github-${Math.min(Math.ceil(value.count / 25), 4)}`;
          }

          return `color-github-${Math.min(Math.ceil(value.count / 25), 4)}`;
        }}
        showWeekdayLabels
        showOutOfRangeDays
        weekdayLabels={['cn', 't2', 't3', 't4', 't5', 't6', 't7']}
        monthLabels={[
          'thg 1',
          'thg 2',
          'thg 3',
          'thg 4',
          'thg 5',
          'thg 6',
          'thg 7',
          'thg 8',
          'thg 9',
          'thg 10',
          'thg 11',
          'thg 12',
        ]}
      />
    </div>
  );
}
