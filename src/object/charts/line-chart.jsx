import React from 'react';
import echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export default class Line extends React.Component {
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

    // create yAxisData series objects and push to array
    for (let metric in yAxisData[this.props.dataType.key || 'data']) {
      seriesChartData.push({
        type: "line",
        boundaryGap: false,
        name: metric,
        data: yAxisData[this.props.dataType.key || 'data'][metric]
      })
    }

    let hasSeriesData = seriesChartData.length > 0;

    return {
      title: {
        text: 'Line',
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
          magicType: { show: hasSeriesData, type: ['stack', 'tiled'], title: "Chart Type" },
          saveAsImage: { show: hasSeriesData, title: "Save PNG" }
        }
      },
      legend: {
        data: this.props.legendData,
      },
      calculable: true,
      xAxis: {
        boundaryGap: false,
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