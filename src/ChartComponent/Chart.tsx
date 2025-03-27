import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import mockData from "../../TestingENV/mockdata.json";

const Chart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    // Format data for ECharts
    const data = mockData.map(item => ([
      item.timestamp,
      item.open,
      item.close,
      item.low,
      item.high,
      item.volume
    ]));

    // Chart options
    const options: echarts.EChartsOption = {
      backgroundColor: '#131722',
      animation: true,
      legend: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#fff'
        },
        position: function (pos, params, el, elRect, size) {
          const obj: Record<string, number> = {};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 60;
          obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 20;
          return obj;
        }
      },
      axisPointer: {
        link: [{ xAxisIndex: 'all' }],
        label: {
          backgroundColor: '#777'
        }
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '60%'
        },
        {
          left: '10%',
          right: '8%',
          top: '75%',
          height: '15%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.map(item => item[0]),
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: data.map(item => item[0]),
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 50,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '85%',
          start: 50,
          end: 100
        }
      ],
      series: [
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: data.map(item => [item[1], item[2], item[3], item[4]]),
          itemStyle: {
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a'
          }
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.map((item, index) => ({
            value: item[5],
            itemStyle: {
              color: item[1] > item[2] ? '#ef5350' : '#26a69a',
              opacity: 0.5
            }
          }))
        }
      ]
    };

    // Set options
    chartInstance.current.setOption(options);

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '95vw',
        minWidth: '800px',
        height: '600px',
        backgroundColor: '#131722',
        margin: '0 auto'
      }}
    />
  );
};

export default Chart;