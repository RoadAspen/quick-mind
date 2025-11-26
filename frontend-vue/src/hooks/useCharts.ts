// 管理 echarts 图例状态管理
import { BarChart, CustomChart, LineChart, PieChart } from 'echarts/charts';
import {
  // 数据集组件
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  TooltipComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  MarkLineComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  BarChart,
  LineChart,
  CustomChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

import { nextTick, unref, watchEffect } from 'vue';

export function useCharts(el: HTMLElement | null, str: string) {
  let chartInstance: echarts.ECharts | null = null;

  const creatChartOption = (chartsData: any) => {
    if (str == 'line') {
    }
    if (str == 'bar') {
    }
    if (str == 'radar') {
    }
    return chartsData;
  };

  const initChart = () => {
    const elRef = unref(el);
    if (!elRef || !unref(elRef)) {
      return;
    }
    chartInstance = echarts.init(elRef);
  };

  const setOptionChart = (chartsData: any) => {
    nextTick(() => {
      if (!chartInstance) {
        initChart();
      }
      chartInstance?.setOption(creatChartOption(chartsData));
    });
  };

  const resizeChart = () => {
    if (!chartInstance) {
      initChart();
    }
    chartInstance?.resize();
  };

  watchEffect((onInvalidate) => {
    window.addEventListener('resize', resizeChart);
    onInvalidate(() => {
      window.removeEventListener('resize', resizeChart);
    });
  });

  return {
    creatChartOption,
    initChart,
    setOptionChart,
    resizeChart
  };
}
