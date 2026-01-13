'use client';

import * as echarts from 'echarts';
import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { useTheme } from 'next-themes';
import { darkTheme, lightTheme } from './themes';
import { useParams } from 'next/navigation';

if (typeof window !== 'undefined') {
    echarts.registerTheme('dark', darkTheme);
    echarts.registerTheme('light', lightTheme);
}

interface MetricItem {
    value: string;
    count: number;
}

type MetricType = 'bar' | 'pie' | 'treemap' | 'geo' | 'two-line' | 'two-pie';

interface TwoSeriesConfig {
    name: string;
    apiPath: string;
}

interface MetricProps {
    type: MetricType;
    name?: string;
    apiPath?: string;
    sort?: 'alphabet' | 'bit' | 'quick' | 'version' | 'numeric' | 'quickRevers';
    convert?: 'gb';
    suffix?: string;
    title?: string;
    data?: { first: TwoSeriesConfig; second: TwoSeriesConfig };
    className?: string;
    slice?: boolean;
}

const BITES_IN_GB = 1024 * 1024 * 1024 * 8;

export default function Metric(props: MetricProps) {
    const { type, name = '', apiPath = '', sort, convert, suffix = '', title, data, className, slice } = props;
    const { resolvedTheme } = useTheme();

    const params = useParams();
    const lang = params.lang;

    const [chartData, setChartData] = useState<MetricItem[]>([]);
    const [firstData, setFirstData] = useState<MetricItem[]>([]);
    const [secondData, setSecondData] = useState<MetricItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const processData = (rawValues: MetricItem[]) => {
        let processed = [...rawValues];

        if (convert === 'gb') {
            const groupedMap = new Map<string, number>();

            processed.forEach(item => {
                const bits = parseInt(item.value);
                if (isNaN(bits)) return;

                const rawGb = bits / BITES_IN_GB;
                let roundedGb = Math.ceil(rawGb);


                const key = `${roundedGb}`;
                groupedMap.set(key, (groupedMap.get(key) || 0) + item.count);
            });

            processed = Array.from(groupedMap.entries()).map(([value, count]) => ({ value, count }));
        }

        processed.sort((a, b) => {
            if (sort === 'alphabet') return a.value.localeCompare(b.value, undefined, { numeric: true });
            if (sort === 'version') {
                const partsA = a.value.split('.').map(Number);
                const partsB = b.value.split('.').map(Number);
                for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
                    const numA = partsA[i] || 0;
                    const numB = partsB[i] || 0;
                    if (numA !== numB) return numA - numB;
                }
                return 0;
            }
            if (sort === 'numeric') return parseFloat(a.value) - parseFloat(b.value);
            if (sort === 'bit' || convert === 'gb') {
                const getWeight = (v: string) => {
                    const num = parseFloat(v);
                    return v.includes('ГБ') ? num * 1024 : num;
                };
                return getWeight(a.value) - getWeight(b.value);
            }
            if (sort === 'quick') return a.count - b.count;
            if (sort === 'quickRevers') return b.count - a.count;
            return 0;
        });

        return processed;
    };

    useEffect(() => {
        if (!mounted) return;

        const baseUrl = '/api/pulse/metrics/json/';

        const fetchSingle = async () => {
            try {
                setLoading(true);
                const res = await fetch(baseUrl + apiPath);
                const json = await res.json();
                setChartData(processData(json.values || []));
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchGeoAndData = async () => {
            try {
                setLoading(true);
                const mapRes = await fetch('https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json');
                const worldJson = await mapRes.json();
                echarts.registerMap('world', worldJson);
                setMapLoaded(true);

                const res = await fetch(baseUrl + apiPath);
                const json = await res.json();
                const filteredValues = (json.values || []).filter((item: MetricItem) => item.value !== 'null' && item.value !== 'Unknown');
                setChartData(processData(filteredValues));
            } catch (error) {
                console.error('Error loading geo map:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTwo = async () => {
            try {
                setLoading(true);
                if (!data) return;
                const [firstRes, secondRes] = await Promise.all([
                    fetch(baseUrl + data.first.apiPath),
                    fetch(baseUrl + data.second.apiPath)
                ]);
                const firstJson = await firstRes.json();
                const secondJson = await secondRes.json();

                setFirstData(slice === true ? processData(firstJson.values || []).slice(1, -1) : processData(firstJson.values || []));
                setSecondData(slice === true ? processData(secondJson.values || []).slice(1, -1) : processData(secondJson.values || []));
            } catch (error) {
                console.error('Ошибка при загрузке двойных данных:', error);
            } finally {
                setLoading(false);
            }
        };

        if (type === 'geo') fetchGeoAndData();
        else if (type === 'two-line' || type === 'two-pie') fetchTwo();
        else if (apiPath) fetchSingle();

    }, [mounted, apiPath, sort, convert, type, data]);

    const barOption = useMemo((): EChartsOption => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                const item = params[0];
                return `<span style="font-weight: bold;">${item.name}</span><br/>${name}: <span style="font-weight: bold;">${item.value}</span>`;
            }
        },
        grid: { left: '3%', right: '3%', bottom: '5%', top: '10%', containLabel: true },
        xAxis: { type: 'category', data: chartData.map(item => item.value), axisLabel: { interval: 0, hideOverlap: true } },
        yAxis: { type: 'value', axisLabel: { inside: true, verticalAlign: 'bottom', padding: [0, 0, 4, 0], fontSize: 12 }, axisLine: { show: false }, axisTick: { show: false } },
        series: [{ name: name, data: chartData.map(item => ({ name: item.value + " " + suffix, value: item.count })), type: 'bar', itemStyle: { borderRadius: [4, 4, 0, 0] }, barMaxWidth: '50px' }],
        dataZoom: [{ type: 'inside' }]
    }), [chartData, name]);

    const pieOption = useMemo((): EChartsOption => ({
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#333',
            textStyle: { color: '#fff' },
            formatter: (params: any) => `
          <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params.color};"></span>
            <span>${params.seriesName}: <strong style="font-weight: bold">${params.value}</strong></span>
          </div>
        `
        },
        legend: {
            orient: 'horizontal',
            bottom: '0',
            left: 'center',
            type: 'scroll',
            textStyle: { color: resolvedTheme === 'dark' ? '#ccc' : '#333' },
            pageButtonGap: 10, 
            pageButtonItemGap: 5,
            pageButtonPosition: 'end', 
            pageIconColor: resolvedTheme === 'dark' ? '#377ded' : '#5094ff', 
            pageIconInactiveColor: '#444', 
            pageIconSize: 15,
            pageTextStyle: {
                color: resolvedTheme === 'dark' ? '#999' : '#666'
            },
        },
        series: [{ name: name, type: 'pie', radius: ['40%', '70%'], center: ['50%', '45%'], avoidLabelOverlap: true, itemStyle: { borderRadius: 0, borderColor: resolvedTheme === 'dark' ? '#111' : '#fff', borderWidth: 0 }, label: { show: false }, emphasis: { label: { show: false }, itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }, data: chartData.map(item => ({ name: item.value + " " + suffix, value: item.count })) }]
    }), [chartData, name, resolvedTheme]);

    const treemapOption = useMemo((): EChartsOption => {
        const rawValues = chartData || [];
        const maxCount = Math.max(...rawValues.map(v => v.count), 0);
        const threshold = maxCount * 0.5;
        const formattedData = rawValues.map(item => ({ name: item.value, value: item.count, itemStyle: { color: item.count >= threshold ? '#21d17f' : '#ffcc00', borderRadius: 4 } })).sort((a, b) => b.value - a.value);

        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item', formatter: (info: any) => {
                    if (!info.name || (info.treePathInfo && info.treePathInfo.length <= 1)) return '';
                    return `
          <div style="font-weight: bold; margin-bottom: 4px;">${info.name}</div>
          <div style="display: flex; justify-content: space-between; gap: 20px;">
            <span>Количество:</span>
            <span style="font-weight: bold;">${info.value}</span>
          </div>
        `;
                }
            },
            series: [{ name: title, type: 'treemap', data: formattedData, roam: true, breadcrumb: { show: false }, label: { show: true, formatter: '{b}', fontSize: 12, color: '#000', fontWeight: 500 }, itemStyle: { borderColor: 'transparent', gapWidth: 4 }, levels: [{ itemStyle: { gapWidth: 4, borderRadius: 4 } }] }]
        } as EChartsOption;
    }, [chartData, title]);

    const geoOption = useMemo((): EChartsOption => {
        const maxVal = Math.max(...chartData.map(d => d.count), 1);
        return {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderColor: '#333',
                textStyle: { color: '#fff' },
                formatter: (params: any) => {
                    const val = params.value || 0;
                    return `
            <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params.color};"></span>
              <span>${name}: <strong style="font-weight: bold;" >${val}</strong></span>
            </div>
          `;
                }
            },
            visualMap: { min: 0, max: maxVal, left: '5%', bottom: '5%', orient: 'vertical', text: ['Max', '0'], calculable: true, inRange: { color: resolvedTheme === 'dark' ? ['#377ded50', '#377ded',] : ['#5094ff50', '#5094ff'] }, textStyle: { color: resolvedTheme === 'dark' ? '#999' : '#666' } },
            series: [{ name: name, type: 'map', map: 'world', roam: true, label: { show: false }, itemStyle: { areaColor: resolvedTheme === 'dark' ? '#1a1a1a' : '#f3f4f6', borderColor: resolvedTheme === 'dark' ? '#333' : '#ccc' }, emphasis: { label: { show: false }, itemStyle: { areaColor: '#facc15' } }, nameProperty: 'name', data: chartData.map(item => ({ name: item.value === 'The Netherlands' ? 'Netherlands' : item.value, value: item.count })) }]
        } as EChartsOption;
    }, [chartData, name, resolvedTheme]);

    const twoLineOption = useMemo((): EChartsOption => {
        const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
        return {
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    const items = params as any[];
                    if (!items || items.length === 0) return '';
                    const date = new Date(items[0].axisValue);
                    const formattedDate = !isNaN(date.getTime())
                        ? date.toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
                        : items[0].axisValue;
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
            legend: { data: [data?.first.name, data?.second.name], bottom: '93%' },
            grid: { left: '3%', right: '3%', bottom: '15%', top: '10%', containLabel: true },
            yAxis: { type: 'value', axisLabel: { inside: true, verticalAlign: 'bottom', padding: [0, 0, 8, 0], fontSize: 12 }, axisLine: { show: false }, axisTick: { show: false } },
            xAxis: { type: 'category', data: firstData.map(item => item.value), axisLabel: { formatter: (value: string) => { const date = new Date(value); return !isNaN(date.getTime()) ? date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false }) : value; }, hideOverlap: true } },
            series: [{ name: data?.first.name, data: firstData.map(item => item.count + " " + suffix), type: 'line', smooth: true }, { name: data?.second.name, data: secondData.map(item => item.count + " " + suffix), type: 'line', smooth: true }],
            dataZoom: [{ type: 'inside', start: 0, end: 100 }, { type: 'slider', start: 0, end: 100, showDetail: false }]
        } as EChartsOption;
    }, [firstData, secondData, data]);

    const twoPieOption = useMemo((): EChartsOption => ({
        title: [{ text: data?.first.name, left: '25%', top: '83%', textAlign: 'center', textStyle: { fontSize: 16, color: '#999' } }, { text: data?.second.name, left: '75%', top: '83%', textAlign: 'center', textStyle: { fontSize: 16, color: '#999' } }],
        tooltip: {
            trigger: 'item', backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#333', textStyle: { color: '#fff' }, formatter: (params: any) => `
          <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params.color};"></span>
            <span>${params.seriesName}: <strong style="font-weight: bold">${params.value}</strong></span>
          </div>
        ` },
        legend: { 
            orient: 'horizontal',
            bottom: '0', 
            left: 'center', 
            type: 'scroll', 
            textStyle: { color: resolvedTheme === 'dark' ? '#ccc' : '#333' },
            pageButtonGap: 10, 
            pageButtonItemGap: 5,
            pageButtonPosition: 'end', 
            pageIconColor: resolvedTheme === 'dark' ? '#377ded' : '#5094ff', 
            pageIconInactiveColor: '#444', 
            pageIconSize: 15,
            pageTextStyle: {
                color: resolvedTheme === 'dark' ? '#999' : '#666'
            },
        },
        series: [
            { name: data?.first.name, type: 'pie', radius: ['40%', '70%'], center: ['25%', '45%'], avoidLabelOverlap: true, itemStyle: { borderRadius: 0, borderColor: resolvedTheme === 'dark' ? '#111' : '#fff', borderWidth: 0 }, label: { show: false }, data: firstData.map(item => ({ name: item.value + " " + suffix, value: item.count })) },
            { name: data?.second.name, type: 'pie', radius: ['40%', '70%'], center: ['75%', '45%'], avoidLabelOverlap: true, itemStyle: { borderRadius: 0, borderColor: resolvedTheme === 'dark' ? '#111' : '#fff', borderWidth: 0 }, label: { show: false }, data: secondData.map(item => ({ name: item.value + " " + suffix, value: item.count })) }
        ]
    }), [firstData, secondData, data, resolvedTheme]);

    if (!mounted || loading || (type === 'geo' && !mapLoaded)) {
        const heightClass = type === 'geo' || type === 'treemap' ? 'h-125' : 'h-100';
        return (
            <div className={`bg-fd-card/50 rounded-xl border p-4 flex items-center justify-center w-full ${className}`}>
                <div className={`h-24 w-full bg-fd-primary/10 rounded-md animate-pulse ${heightClass}`}></div>
            </div>
        );
    }

    const option = (() => {
        switch (type) {
            case 'bar': return barOption;
            case 'pie': return pieOption;
            case 'treemap': return treemapOption;
            case 'geo': return geoOption;
            case 'two-line': return twoLineOption;
            case 'two-pie': return twoPieOption;
            default: return barOption;
        }
    })();

    const height = type === 'geo' ? '550px' : type === 'treemap' ? '500px' : '400px';

    return (
        <div className={`bg-fd-card/50 rounded-xl border overflow-hidden w-full ${className}`}>
            <ReactECharts
                option={option}
                style={{ height, width: '100%' }}
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                notMerge={true}
            />
        </div>
    );
}