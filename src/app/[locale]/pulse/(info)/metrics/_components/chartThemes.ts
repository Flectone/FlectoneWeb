export const darkTheme = {
    color: ['#377ded', '#21d17f', '#ffcc00', '#ff4422', '#9b59b6', '#e67e22', '#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#1abc9c', '#7f8c8d'],
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
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'solid' } }
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

export const lightTheme = {
    color: ['#5094ff', '#09b865', '#f1d166', '#fd694e', '#a78bfa', '#f7b267', '#66d19e', '#60a5fa', '#ff6b6b', '#f7d154', '#34d399', '#94a3b8'],
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
        splitLine: { lineStyle: { color: 'rgba(0,0,0,0.05)', type: 'solid' } }
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

