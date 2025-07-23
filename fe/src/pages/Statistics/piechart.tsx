import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { PersonalInfo } from "../../types";

type EChartsOption = echarts.EChartsOption;

interface BarChartProps {
  infos: PersonalInfo[];
}

export function BarChart({ infos }: BarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (infos.length === 0 || !chartRef.current) return;

    // 统计性别分布
    const genderMap: Record<string, number> = {};
    infos.forEach(info => {
      genderMap[info.gender] = (genderMap[info.gender] || 0) + 1;
    });

    // 构造饼图数据
    const pieData = Object.entries(genderMap).map(([gender, count]) => ({
      name: gender,
      value: count,
    }));

    // 初始化echarts
    const chart = echarts.init(chartRef.current);
    const option: EChartsOption = {
      title: {
        text: '性别分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '性别',
          type: 'pie',
          radius: '50%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chart.setOption(option);

    // 销毁
    return () => {
      chart.dispose();
    };
  }, [infos]);

  return <div ref={chartRef} style={{ width: 400, height: 400 }} />;
}