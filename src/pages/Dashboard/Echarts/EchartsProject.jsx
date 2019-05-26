/*
 * @Description: Echarts - 項目完成情況展示 
 * @Author: james.zhang 
 * @Date: 2019-05-26 16:22:56 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-05-26 18:01:43
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './style.less';

let xAxisData = [];
let data = [];
for (let i = 0; i < 50; i++) {
  xAxisData.push(i);
  data.push(Math.ceil((Math.cos(i / 5) * (i / 5) + i / 6) * 5) + 10);
}

const option = {
  title: {
    text: '最近50天每天项目完成情况',
    left: 'center',
    textStyle: {
      color: '#ccc',
      fontSize: 14,
    },
  },
  backgroundColor: '#08263a',
  xAxis: [
    {
      show: true,
      data: xAxisData,
      axisLabel: {
        textStyle: {
          color: '#ccc',
        },
      },
    },
    {
      show: false,
      data: xAxisData,
    },
  ],
  tooltip: {},
  visualMap: {
    show: false,
    min: 0,
    max: 50,
    dimension: 0,
    inRange: {
      color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
    },
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        color: '#ccc',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#08263f',
      },
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: 'Simulate Shadow',
      type: 'line',
      data: data,
      z: 2,
      showSymbol: false,
      animationDelay: 0,
      animationEasing: 'linear',
      animationDuration: 1200,
      lineStyle: {
        normal: {
          color: 'transparent',
        },
      },
      areaStyle: {
        normal: {
          color: '#08263a',
          shadowBlur: 50,
          shadowColor: '#000',
        },
      },
    },
    {
      name: '完成项目数',
      type: 'bar',
      data: data,
      xAxisIndex: 1,
      z: 3,
      itemStyle: {
        normal: {
          barBorderRadius: 5,
        },
      },
    },
  ],
  animationEasing: 'elasticOut',
  animationEasingUpdate: 'elasticOut',
  animationDelay: function(idx) {
    return idx * 20;
  },
  animationDelayUpdate: function(idx) {
    return idx * 20;
  },
};

const EchartsProjects = () => (
  // <ReactEcharts option={option} style={{ width: '100%', height: '212px' }} className="echarts-project"/>
  <ReactEcharts option={option} className="echarts-project" />
);

export default EchartsProjects;
