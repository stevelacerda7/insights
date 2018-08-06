import React from 'react';
import echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export default class BarMinMax extends React.Component {
  constructor(props) {
    super(props);

    this.create = this.create.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_.isEqual(nextProps, this.props));
  }

  create() {
    let seriesChartData = [];
    let yAxisData = this.props.yAxisData;

    for (let metric in yAxisData.data) {
      seriesChartData.push({
        name: metric + '_max',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: yAxisData.maxs[metric]
      }, {
          name: metric + '_min',
          type: 'bar',
          barGap: '-100%',
          z: -12,
          data: yAxisData.mins[metric]
        }, {
          name: metric + '_max',
          type: 'pictorialBar',
          symbol: 'rect',
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -20,
          data: yAxisData.maxs[metric]
        })
    }

    let hasSeriesData = seriesChartData.length > 0;

    return {
      title: {
        text: 'Bar - Min/Max Values',
        // left: "center",
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          mark: { show: hasSeriesData },
          dataView: {
            show: hasSeriesData,
          },
          saveAsImage: { show: hasSeriesData, title: "Save PNG" }
        }
      },
      legend: {
        data: this.props.legendData,
      },
      calculable: true,
      xAxis: {
        axisTick: { show: hasSeriesData },
        type: 'category',
        data: this.props.dates,
        show: hasSeriesData,
      },
      yAxis: { show: hasSeriesData, type: 'value' },
      series: seriesChartData
    }
  }

  render() {
    return (
      <ReactECharts
        option={this.create()}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, height: "100%" }}
        theme={this.props.theme}
        notMerge={true}
      />
    )
  }
}