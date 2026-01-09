'use client';

import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';
import { CallbackDataParams } from 'echarts/types/dist/shared';

interface AxisFormatterItem extends CallbackDataParams {
  axisValue: string;
}

interface MetricItem {
  value: string;
  count: number;
}

interface ApiResponse {
  values: MetricItem[];
}

interface MetricProps {
  data: {
    first: {
      name: string;
      apiPath: string;
    }
    second: {
      name: string;
      apiPath: string;
    }
  }
}

function TwoLineChart({data}: MetricProps) {
  const [firstData, setFirstData] = useState<MetricItem[]>([]);
  const [secondData, setSecondData] = useState<MetricItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const params = useParams()
  const lang = params.lang;
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = '/api/pulse/metrics/json/';
        const [firstRes, secondRes] = await Promise.all([
          fetch(baseUrl + data.first.apiPath),
          fetch(baseUrl + data.second.apiPath)
        ]);

        const firstJson: ApiResponse = await firstRes.json();
        const secondJson: ApiResponse = await secondRes.json();

        setFirstData((firstJson.values || []).slice(1, -1));
        setSecondData((secondJson.values || []).slice(1, -1));

      } catch (error) {
        console.error('Ошибка при загрузке API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const darkTheme = {
    color: ['#377ded', '#21d17f', '#ffcc00', '#ff4422'],
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Inter, sans-serif', color: '#999' },
    line: {
      smooth: true,
      width: 2,
      symbol: 'none',
      areaStyle: { opacity: 0.3, shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
    },
    categoryAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { color: '#666' }
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } }
    },
    tooltip: {
      backgroundColor: 'rgba(23, 23, 23, 0.9)',
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: { color: '#eee' },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); border: none;'
    },
    legend: { textStyle: { color: '#ccc' }, pageTextStyle: { color: '#ccc' } },
    dataZoom: {
      handleColor: '#b5b5b5',
      moveHandleColor: '#333',
      fillerColor: 'rgba(191,191,191,0.1)',
      dataBackground: { lineStyle: { color: '#333' }, areaStyle: { color: '#222' } },
      selectedDataBackground: { lineStyle: { color: '#787878' }, areaStyle: { color: '#787878', opacity: 0.3 } }
    }
  };

  const lightTheme = {
    color: ['#5094ff', '#09b865', '#f1d166', '#fd694e'],
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Inter, sans-serif', color: '#999' },
    line: {
      smooth: true,
      width: 2,
      symbol: 'none',
      areaStyle: { opacity: 0.3, shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
    },
    categoryAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { color: '#666' }
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'dashed' } }
    },
    tooltip: {
      backgroundColor: 'rgba(239,239,239,0.9)',
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: { color: '#000000' },
      extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); border: none;'
    },
    legend: { textStyle: { color: '#000000' }, pageTextStyle: { color: '#000000' } },
    dataZoom: {
      handleColor: '#b5b5b5',
      moveHandleColor: '#333',
      fillerColor: 'rgba(191,191,191,0.1)',
      dataBackground: { lineStyle: { color: '#333' }, areaStyle: { color: '#222' } },
      selectedDataBackground: { lineStyle: { color: '#787878' }, areaStyle: { color: '#787878', opacity: 0.3 } }
    }
  };

  if (typeof window !== 'undefined') {
    echarts.registerTheme('dark', darkTheme);
    echarts.registerTheme('light', lightTheme);
  }

  const lineChartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: unknown) => {
        const items = params as AxisFormatterItem[];

        if (!items || items.length === 0) return '';

        const date = new Date(items[0].axisValue);
        const formattedDate = date.toLocaleString(locale, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });

        let res = `<div style="font-weight: bold; margin-bottom: 4px;">${formattedDate}</div>`;

        items.forEach((item) => {
          res += `
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="margin-right: 10px;">${item.marker} ${item.seriesName}:</span>
          <span style="font-weight: bold;">${item.value}</span>
        </div>`;
        });

        return res;
      }
    },
    legend: { data: [data.first.name, data.second.name], bottom: '93%' },
    grid: { left: '3%', right: '3%', bottom: '15%', top: '10%', containLabel: true },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      axisLabel: { inside: true, verticalAlign: 'bottom', padding: [0, 0, 8, 0 ], fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    xAxis: {
      type: 'category',
      data: firstData.map(item => item.value),
      axisLabel: {
        formatter: (value: string) => {
          const date = new Date(value);
          return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });
        },
        hideOverlap: true
      }
    },
    series: [
      { name: data.first.name, data: firstData.map(item => item.count), type: 'line', smooth: true },
      { name: data.second.name, data: secondData.map(item => item.count), type: 'line', smooth: true }
    ],
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      { type: 'slider', start: 0, end: 100, showDetail: false }
    ]
  };

  if (loading || !mounted) return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка метрик...</div>;

  return (
    <div className="bg-fd-card/50 rounded-xl border">
      <ReactECharts
        option={lineChartOption}
        style={{ height: '400px', width: '100%' }}
        notMerge={true}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
}

export default TwoLineChart;