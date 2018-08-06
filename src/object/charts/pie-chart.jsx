import React from 'react';
import echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export default class Pie extends React.Component {
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
		let key = null;

		for (let metric in yAxisData[this.props.dataType.key || "data"]) {
			seriesChartData.push({ 
				name: metric, 
				value: yAxisData[this.props.dataType.key || "data"][metric].reduce((prev, curr) => { return prev + curr })
			});
		}

		let pieChartSeries = [
			{
				type: 'pie',
				radius: '50%',
				center: [ '50%', '50%' ],
				selectedMode: 'single',
				data: seriesChartData
			}
		];

		let hasSeriesData = seriesChartData.length > 0;

		return {
			title: {
				text: 'Pie',
				// left: "center",
			},
			tooltip: {
				trigger: 'item',
				formatter: '{b} : {c} ({d}%)'
			},
			toolbox: {
				feature: {
					mark: { show: hasSeriesData },
					dataView: null,
					magicType: null,
					saveAsImage: { show: hasSeriesData, title: "Save PNG" }
				}
			},
			legend: {
				data: this.props.legendData,
			},
			calculable: true,
			xAxis: null,
			yAxis: null,
			series: pieChartSeries
		}
	}

	render() {
		return (
			<div>
				<ReactECharts
					option={ this.create() }
					style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, height: "100%" }}
					theme={this.props.theme}
					notMerge={ true }
				/>
			</div>
		)
	}
}