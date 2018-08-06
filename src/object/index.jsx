import React from 'react';
import ReactDOM from 'react-dom';
import DateSelector from './components/date-selector';
import Configurator from './components/configurator';

import moment from 'moment';
import twix from 'twix';

const OBJECT_TYPES = "Object Types";
const FILTERS = "Filters";
const OBJECTS = "Objects";
const DATE = "Date";
const DASHBOARD_TITLE = "Dashboard";
const ADD_DASHBOARD = "Add Dashboard";
const SETTINGS = "Settings";
const THEME_SETTINGS = "Theme Settings";

import echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

import LeftSideBar from './components/left-sidebar';

import Pie from './charts/pie-chart';

import Bar from './charts/bar-chart';
import BarMinMax from './charts/bar-min-max-chart';

import Line from './charts/line-chart';
import LineArea from './charts/line-area-chart';
import LineMinMax from './charts/line-min-max-chart';

const INTERVALS = require('./config/variables').intervals;
const CHART_CONFIG = require('./config/chart-config');
const THEMES = Object.keys(require('./config/chart-config'));

// possible data types at this time, plan on adding mean and standard deviation
const DATA_TYPES = { 
	average: {
		type: 'average', 
		key: 'data' 
	}, 
	min: {
		type: 'min',
		key: 'mins' 
	}, 
	max: { 
		type: 'max', 
		key: 'maxs' 
	},
	sum: {
		type: 'sum',
		key: 'sums',
	},
	cnt: {
		type: 'cnt',
		key: 'cnts'
	}
};

// if you add a chart type, make sure you add it to this.elTypes and checkElType()

export default class Index extends React.Component {
	constructor(props) {
		super(props);

		this.elTypes = ["pie", "line", "bar", "line-area", "bar-min-max", "line-min-max"];

		this.state = {
			cells: [],
			dashboards: [],
			data: {},
			dates: [],
			error: {}, // { success: false, msg: "" };
			isDeleteDashboardFormOpen: false,
			isSaveDashboardFormOpen: false, 
			isSettingsOpen: false,
			isTabOpen: 'tab1',
			legendData: {},
			metricNames: {},
			metrics: {},
			ranges: {},
			savedDashboards: [],
			selectedDashboard: {},
			selectedDateRange: "",
			selectedMetrics: {},
			selectedObjects: [],
			selectedObjectType: "",
			selectedTheme: THEMES[0],
			yAxisData: {
				data: {},
				mins: {},
				maxs: {},
				sums: {},
				cnts: {},
			},
		}

		this.average = this.average.bind(this);
		this.checkElType = this.checkElType.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.configureSettings = this.configureSettings.bind(this);
		this.createYAxisData = this.createYAxisData.bind(this);
		this.confirmDeleteDashboard = this.confirmDeleteDashboard.bind(this);
		this.deleteDashboard = this.deleteDashboard.bind(this);
		this.dragCellEnd = this.dragCellEnd.bind(this);
		this.dragCellStart = this.dragCellStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.dragStart = this.dragStart.bind(this);
		this.getObjectMetrics = this.getObjectMetrics.bind(this);
		this.getDateRangeList = this.getDateRangeList.bind(this);
		this.handleDateRange = this.handleDateRange.bind(this);
		this.handleDateRangeSelector = this.handleDateRangeSelector.bind(this);
		this.handleSelectMetric = this.handleSelectMetric.bind(this);
		this.handleSelectObject = this.handleSelectObject.bind(this);
		this.handleSelectObjectType = this.handleSelectObjectType.bind(this);
		this.loadDashboard = this.loadDashboard.bind(this);
		this.openSaveDashboard = this.openSaveDashboard.bind(this);
		this.preventDefault = this.preventDefault.bind(this);
		this.removeCell = this.removeCell.bind(this);
		this.saveDashboard = this.saveDashboard.bind(this);
		this.selectDataType = this.selectDataType.bind(this);
		this.setTheme = this.setTheme.bind(this);
		this.showTab = this.showTab.bind(this);
	}

	componentDidMount() {
		n.call('object.list.by.type.with.property', { property: 'insights' }, (err, res) => {
			if (res.statusCode === 200) {
				this.setState({
					data: res.body
				});
			} else {
				console.log("Error in componentDidMount in Insights index.jsx", err);
			}
		})

		let { user: { name = "" } } = n.session_info;

		n.call('insights.list', { username: name }, (err, res) => {
			if (res.statusCode === 200) {
				this.setState({
					dashboards: res.body
				})
			} else {
				console.log("Error in componentDidMount in Insights index.jsx", err);
			}
		});

		// get the default date ranges
		this.handleDateRange();
	}

	componentWillMount() {
		// register all the themes in chart-config.js file
		THEMES.map((theme) => {
			echarts.registerTheme(theme, CHART_CONFIG[theme]);
		});
	}

	average(list) {
		let val = 0;
		let len = list.length;

		for (let i = 0; i < list.length; i++) {
			val += list[i];
		}

		return val / len;
	}

	checkElType(el) {
		// if you modify this, be sure to modify this.elTypes above and left-sidebar
		// you'll need to add it to the left sidebar in order to drag and drop it,
		// add an image also to /images folder
		if (el.type === "pie") {
			return (
				<Pie 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={ this.state.selectedTheme }
				/>
			);
		} else if (el.type === "line") {
			return (
				<Line 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={this.state.selectedTheme}
				/>
			);
		} else if (el.type === "bar") {
			return (
				<Bar 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={this.state.selectedTheme}
				/>
			);
		} else if (el.type === "line-area") {
			return (
				<LineArea 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={this.state.selectedTheme}
				/>
			);
		} else if (el.type === "bar-min-max") {
			return (
				<BarMinMax 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={this.state.selectedTheme}
				/>
			);
		} else if (el.type === "line-min-max") {
			return (
				<LineMinMax 
					key={ el.id } 
					id={ el.id } 
					dataType={ DATA_TYPES[el.dataType] || DATA_TYPES['average'] } 
					yAxisData={this.state.yAxisData} 
					legendData={this.state.legendData} 
					dates={ this.state.dates }
					theme={this.state.selectedTheme}
				/>
			);
		}
	}

	closeModal(e) {
		this.preventDefault(e);

		this.setState({
			isSettingsOpen: false,
			isSaveDashboardFormOpen: false,
			isDeleteDashboardFormOpen: false,
		})

		return false;
	}

	configureSettings() {
		this.setState({
			isSettingsOpen: !this.state.isSettingsOpen,
			isTabOpen: 'tab1'
		});
	}

	// should look like
	// prop1: [ 820, 932, 901 ],
	// prop2: [ 110, 560, 230 ],
	createYAxisData(selectedMetrics = this.state.selectedMetrics) {
		let results = {
			data: {},
			mins: {},
			maxs: {},
			cnts: {},
			sums: {},
		};

		let minMax = [];

		for (let selectedObject of this.state.selectedObjects) {

			if (selectedMetrics[selectedObject]) {
				for (let key in selectedMetrics[selectedObject]) {
					let i = 0;
					let j = 0;
	
					let selectedObjectsMetrics = this.state.metrics[selectedObject];
	
					if (!this.state.metrics[selectedObject]) {
						delete selectedMetrics[selectedObject];
						continue;
					}

					if (!this.state.metrics[selectedObject][key]) {
						delete selectedMetrics[selectedObject][key];
						continue;
					}
					
					minMax.push(selectedObject + "_" + key);
					minMax.push(selectedObject + "_" + key + "_min");
					minMax.push(selectedObject + "_" + key + "_max");
					minMax.push(selectedObject + "_" + key + "_cnt");
					minMax.push(selectedObject + "_" + key + "_sum");
		
					while (i < this.state.dates.length) {
						if (!results.data[selectedObject + "_" + key]) {
							results.data[selectedObject + "_" + key] = [];
							results.mins[selectedObject + "_" + key] = [];
							results.maxs[selectedObject + "_" + key] = [];
							results.sums[selectedObject + "_" + key] = [];
							results.cnts[selectedObject + "_" + key] = [];
						}
		
						if (selectedObjectsMetrics[key] && selectedObjectsMetrics[key][j] && (this.state.dates[i] === selectedObjectsMetrics[key][j].date)) {
							results.data[selectedObject + "_" + key].push(selectedObjectsMetrics[key][j].val);
							results.mins[selectedObject + "_" + key].push(selectedObjectsMetrics[key][j].min || 0);
							results.maxs[selectedObject + "_" + key].push(selectedObjectsMetrics[key][j].max);
							results.sums[selectedObject + "_" + key].push(selectedObjectsMetrics[key][j].sum);
							results.cnts[selectedObject + "_" + key].push(selectedObjectsMetrics[key][j].cnt);
		
							i++;
							j++;
						} else {
							results.data[selectedObject + "_" + key].push(0);
							results.mins[selectedObject + "_" + key].push(0);
							results.maxs[selectedObject + "_" + key].push(0);
							results.sums[selectedObject + "_" + key].push(0);
							results.cnts[selectedObject + "_" + key].push(0);
		
							i++;
						}
					}
				}
			}
		}

		this.setState({
			yAxisData: results,
			legendData: minMax,
		});
	}

	confirmDeleteDashboard(e) {
		this.preventDefault(e);

		this.dashboardId = e.target.dataset.id;

		this.setState({
			isDeleteDashboardFormOpen: true,
			error: {},
		});
	}

	deleteDashboard(e) {
		n.call("insights.delete", { _id: this.dashboardId }, (err, res) => {
			let errorMsg = {};
			
			if (err) {
				console.log("Error deleting dashboard in insights", err);
				
				errorMsg = {
					msg: "Error deleting dashboard.",
					success: false
				}
			}
			
			if (res.body) {
				errorMsg = {
					msg: "Dashboard deleted.",
					success: true
				}
			} else {
				errorMsg = {
					msg: "Failure deleting dashboard",
					success: false
				}
			}
			
			this.setState({
				error: errorMsg,
				isDeleteDashboardFormOpen: false,
				dashboards: errorMsg.success == true ? this.state.dashboards.filter(dashboard => this.dashboardId != dashboard._id) : this.state.dashboards
			}, () => {
				this.setState({
					error: {},
				});

				this.dashboardId = -1;
			});
		});
	}
		
	dragCellEnd(e) {
		var targetsPosition = +e.currentTarget.dataset.position;
		var draggedCell = this.state.cells[this.position];

		var cells = this.state.cells.filter((cell, i) => {
			return i != this.position;
		});

		cells.splice(targetsPosition, 0, draggedCell);

		this.setState({
			cells: cells,
			selectedDashboard: {},
		});

		if (this.dragging) {
			this.dragging = false;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}

	dragCellStart(e) {
		this.type = e.target.dataset.id;
		this.position = +e.currentTarget.dataset.position;

		this.dragging = true;
	}

	dragEnd(e) {
		e.preventDefault();

		// used to catch within cell-data area drag, so if 
		// moving charts around
		if (this.dragging) {
			this.dragging = false;
			e.stopPropagation();
			return false;
		}

		// captures the drag and drop of the dashboard into cell-data
		if (this.draggingDashboard) {
			const id = e.dataTransfer.getData('text');

			const dashboard = this.state.dashboards.find(dashboard => {
				return dashboard._id == id;
			});

			this.draggingDashboard = false;

			const config = JSON.parse(dashboard.config || "");
			
			this.setState({
				cells: config.cells,
				metricNames: config.metricNames,
				selectedDashboard: dashboard,
				selectedDateRange: config.selectedDateRange,
				selectedMetrics: config.selectedMetrics,
				selectedObjects: config.selectedObjects,
				selectedObjectType: config.selectedObjectType,
				selectedTheme: config.selectedTheme,
			}, () => {
				this.handleDateRange();
			});

			e.stopPropagation();
			return false;
		}

		this.setState({
			cells: this.state.cells.concat({ type: this.type, id: Date.now() }),
			selectedDashboard: {},
		});
	}

	dragStart(e) {
		this.type = e.target.dataset.id;
	}

	// saves a list of dates between start and end
	getDateRangeList(start, end) {
		var itr = moment.twix(start, end).iterate("days");

		var range = {
			dateList: [],
			start: Date.parse(new Date(start)), // ms
			end: Date.parse(new Date(end)), // ms
		};

		while (itr.hasNext()) {
			range.dateList.push(itr.next().format("M/DD/YYYY"))
		}

		return range;
	}

	// retrieve object metrics from wuf service
	getObjectMetrics(cb = () => { }) {
		if (this.state.selectedObjects.length > 0) {
			n.call("metric.average.by.day", {
				ObjectName: this.state.selectedObjects,
				Fields: [],
				Begin: this.state.ranges.start,
				End: this.state.ranges.end,
				XAxisField: "time",
			}, (err, res) => {
				if (res.statusCode === 200) {
					this.metrics = res.body;

					const { metrics = {}, metricNames = {} } = res.body || {};

					this.setState({
						metricNames,
						metrics
					}, () => {
						cb();
					});
				} else {
					console.log("Error retrieving metric data in insights.index.jsx getObjectMetrics", err);
				}
			});
		} else {
			return;
		}
	}

	// figures out the date range that you've specified in selectedDateRange
	// and then calls getDangeRangeList so that we can get a list of dates
	// between the start and end dates

	// this is required in order to create the proper dataset that
	// echarts requires
	handleDateRange(e = null) {
		var id = this.state.selectedDateRange || 0;

		if (e) {
			e.stopPropagation();
			var { target: { dataset: { id = 0 } = {} } = {} } = e;
		}

		let start = "";
		let end = "";
		let ranges = {};

		// check id against the INTERVALS variable.
		switch (+id) {
			case 0: // this week
				start = moment().startOf('isoweek')._d
				end = moment()._d;
				break;
			case 1: // this month
				start = moment().startOf('month')._d;
				end = moment()._d;
				break;
			case 2: // last week
				start = moment().startOf('isoweek').subtract(1, 'week').startOf('isoWeek')._d
				end = moment().startOf('isoweek').subtract(1, 'week').endOf('isoWeek')._d;
				break;
			case 3: // last month
				start = moment().subtract(1, 'month').startOf('month')._d;
				end = moment().subtract(1, 'month').endOf('month')._d;
				break;
			default:
				start = moment().startOf('isoweek')._d
				end = moment().endOf('isoweek')._d;
				break;
		}

		ranges = this.getDateRangeList(start, end);

		this.setState({
			ranges,
			dates: ranges.dateList,
			selectedDateRange: +id
		}, () => {
			this.getObjectMetrics(() => {
				this.createYAxisData();
			});
		});
	}

	// used to create a custom date range
	handleDateRangeSelector(e, from, to) {
		e.stopPropagation();


	}

	// select metric need to create new yAxisData for chart
	handleSelectMetric(e) {
		e.stopPropagation();
		const object = e.target.dataset.object;
		const metric = e.target.dataset.id;

		let selectedMetrics = Object.assign({}, this.state.selectedMetrics);

		// if the selected metric already is checked, uncheck it,
		// else check it and add to selectedMetrics
		if (selectedMetrics[object] && selectedMetrics[object][metric]) {
			delete selectedMetrics[object][metric];

			if (Object.keys(selectedMetrics[object]).length === 0) {
				delete selectedMetrics[object];
			}
		} else {
			if (!selectedMetrics[object]) {
				selectedMetrics[object] = {};
			}

			selectedMetrics[object][metric] = true;
		}

		this.createYAxisData(selectedMetrics);

		this.setState({
			selectedMetrics,
			selectedDashboard: {},
		});
	}

	handleSelectObject(e) {
		e.stopPropagation();
		let selectedMetrics = Object.assign({}, this.state.selectedMetrics);
		let selectedObject = e.target.dataset.id;
		let index = Array.isArray(this.state.selectedObjects) ? this.state.selectedObjects.indexOf(selectedObject) : -1;

		if (index > -1) {
			var array = [];
			array = array.concat(this.state.selectedObjects);
			array.splice(index, 1);

			delete selectedMetrics[selectedObject];
		}

		this.setState({
			selectedObjects: index === -1 ? this.state.selectedObjects.concat(selectedObject) : array,
			selectedMetrics: selectedMetrics,
			yAxisData: {},
			selectedDashboard: {},
		}, () => {
			// if the object was deselected then there's no need to refetch the metrics
			if (index !== -1) {
				return;
			}

			this.getObjectMetrics(() => {
				this.createYAxisData();
			});
		});
	}

	handleSelectObjectType(e) {
		e.stopPropagation();
		const selectedObjectType = e.target.dataset.id;

		this.setState({
			selectedDashboard: {},
			selectedMetrics: {},
			selectedObjects: [],
			selectedObjectType,
			yAxisData: {},
		});
	}

	loadDashboard(e) {
		const id = e.target.dataset.id;

		// need to set in order for drop to know which drop it's 
		// referring to
		this.draggingDashboard = true;

		e.dataTransfer.setData('text/plain', id);
	}

	// sets state so that dashboard modal opens
	openSaveDashboard(e) {
		this.preventDefault(e);
		
		this.setState({
			isSaveDashboardFormOpen: !this.state.isSaveDashboardFormOpen,
		});

		return false;
	}

	preventDefault(e) {
		e.preventDefault();
		e.stopPropagation();

		return false;
	}

	// deletes cell by clicking on x in chart cell
	removeCell(e) {
		let cellId = e.target.dataset.id;

		this.setState({
			cells: this.state.cells.filter((cell, i) => cellId != cell.id),
			selectedDashboard: {},
		});

		return;
	}

	// calls wuf to save dashboard with config
	saveDashboard(e) {
		let { user: { name = "" } } = n.session_info;

		if (name) {
			let params = {
				name: this.refs.dashboardName.value,
				username: name,
				config: {
					cells: this.state.cells,
					metricNames: this.state.metricNames,
					selectedDateRange: this.state.selectedDateRange,
					selectedMetrics: this.state.selectedMetrics,
					selectedObjects: this.state.selectedObjects,
					selectedObjectType: this.state.selectedObjectType,
					selectedTheme: this.state.selectedTheme,
				}
			}

			n.call('insights.save', params, (err, res) => {
				let errorMsg = {
					success: false,
					msg: ""
				};

				// figure out which notification to show
				if (err) {
					errorMsg.msg = "Error while saving dashboard.";
					errorMsg.success = false;
				}

				if (res.body) {
					errorMsg.msg = "Save complete.";
					errorMsg.success = true;

					this.setState({
						dashboards: this.state.dashboards.concat(res.body)
					});
				} else {
					errorMsg.msg = "Save failed! Duplicate names may exist.";
					errorMsg.success = false;
				}

				this.setState({
					isSaveDashboardFormOpen: false,
					error: errorMsg,
				}, () => {
					this.setState({
						error: {}
					})
				});
			});
		}

		// reset the forms value to empty
		this.refs.dashboardName.value = "";
	}

	// need to figure out which type of chart it is
	selectDataType(e) {
		e.stopPropagation();

		let cellId = e.currentTarget.dataset.id;
		let cellValue = e.currentTarget.childNodes[0].value;

		let newCells = [];

		newCells = this.state.cells.map(function (cell, i) {
			let newObj = Object.assign({}, cell);

			if (cellId == cell.id) {
				newObj['dataType'] = cellValue;
			}

			return newObj;
		});

		this.setState({
			cells: newCells,
			selectedDashboard: {},
		});

		return;
	}

	setTheme(e) {
		this.preventDefault(e);

		const value = e.currentTarget.value;

		this.setState({
			selectedTheme: value,
			selectedDashboard: {},
		});
	}

	// handles tabs on forms, if there is another tab. This is on the settings modal
	// form
	showTab(e) {
		this.preventDefault(e);

		const value = e.currentTarget.dataset.id;

		this.setState({
			isTabOpen: value || 'tab1',
		})
	}

	render() {
		let cells = this.state.cells.map((el, i) => {
			return (
				<div 
					key={ el.id } 
					className="insights-cell" 
					data-id={ el.id } 
					data-position={ i } 
					draggable={ true }
					onDragStart={ this.dragCellStart }
					onDrop={ this.dragCellEnd }
					onDragOver={this.preventDefault}
				>
					{
						((el.type == 'pie') || (el.type == 'line') || (el.type == 'line-area') || (el.type == 'bar')) ?
							<Configurator 
								selectDataType={ this.selectDataType } 
								dataTypes={ DATA_TYPES } 
								id={ el.id } 
								selectedDataType={ el.dataType || "average" }
							/> :
							''
					}
					<div className="insights-close-btn" data-id={ el.id } onClick={ this.removeCell }></div>
					{ this.checkElType(el) }
				</div>
			)
		});

		let objectTypes, objects, metrics;

		objectTypes = Object.keys(this.state.data).map(objectType => {
			return (
				<div
					className="insights-object-type-group"
					data-id={objectType}
					key={objectType + Date.now()}
					style={objectType === this.state.selectedObjectType ? { background: "#6abca4" } : {}}
				>
					{objectType}
				</div>
			)
		});

		if (this.state.selectedObjectType) {
			objects = Object.keys(this.state.data[this.state.selectedObjectType]).map(objectName => {
				const metricNames = Object.keys(this.state.metrics[objectName] || {}) || [];

				return (
					<div
						className="insights-object-types-object"
						data-id={objectName}
						key={objectName + Date.now()}
					>
						<div className="insights-object-name" data-id={objectName}>
							<label className="insights-container" data-id={objectName}>
								<input type="checkbox" data-id={objectName} defaultChecked={this.state.selectedObjects.indexOf(objectName) > -1 ? 'checked' : '' } />
								<span className="checkmark" data-id={objectName}></span>
								<span data-id={objectName}>{objectName}</span>
							</label>

							<div className="insights-metrics insights-div-defaults" onClick={this.handleSelectMetric}>
								{ 
									this.state.selectedObjects.indexOf(objectName) > -1 ?
										metricNames.map(metricName => {
											return (
												<div
													className="insights-metric"
													data-id={ metricName }
													data-object={objectName }
													key={ metricName + Date.now() }
												>
													<label className="insights-container" data-id={metricName }>
														<input 
															type="checkbox" 
															data-id={ metricName } 
															data-object={objectName }
															defaultChecked={Object.keys(this.state.selectedMetrics[objectName] || {}).indexOf(metricName ) > -1 ? 'checked' : '' }
														/>
														<span className="checkmark" data-id={metricName} data-object={objectName }></span>
														<span data-id={metricName} data-object={objectName }>{metricName}</span>
													</label>
												</div>
											)
										})	
										
										:

										""
								}
							</div>
						</div>
					</div>
				)
			});
		}

		return (
			<div id="insights-module">
				<div className="insights-main">
					<div className="insights-left-sidebar" style={{ borderRight: "1px solid #52988340" }}>
						<LeftSideBar elTypes={ this.elTypes } dragStart={ this.dragStart } />
						<div className="insights-settings" onClick={this.configureSettings}>
							<div className="insights-click insights-gear">&#9881;</div>
						</div>
					</div>

					<div className="insights-object-container">
						<div className="insights-title">
							<h5 className="insights-object-title insights-object-types">{ OBJECT_TYPES }</h5>
						</div>
						<div className="insights-object-types insights-div-defaults" onClick={this.handleSelectObjectType}>
							{objectTypes ? objectTypes : ""}
						</div>
					</div>


					<div className="insights-panels">
						<div className="insights-sub-panel">
							<div className="insights-title">
								<h5>{ FILTERS }</h5>
							</div>
							<div className="insights-title insights-title-sub">
								<h3>{ OBJECTS }</h3>
							</div>
							<div className="insights-panel-2-objects insights-panel-2">

								{
									objects ?
									<div className="insights-objects insights-div-defaults" onClick={this.handleSelectObject}>
										{objects}
									</div> :
									""
								}

							</div>
						</div>

						<div className="insights-sub-panel">
							<div className="insights-title insights-title-sub">
								<h3>{ DATE }</h3>
							</div>
							<div className="insights-panel-2-dates insights-panel-2">
								<DateSelector
									className="insights-div-defaults"
									handleDateRange={this.handleDateRange}
									handleDateRangeSelector={this.handleDateRangeSelector}
									selectedDateRange={this.state.selectedDateRange}
								/>
							</div>
						</div>

						<div className="insights-sub-panel">
							<div className="insights-title insights-title-sub insights-dashboard-title">
								<h3>
									{ DASHBOARD_TITLE }
									<span className="insights-click insights-dashboard-button" onClick={ this.openSaveDashboard }></span>
								</h3>
							</div>
							<div className="insights-panel-2-dashboard insights-panel-2 insights-div-defaults">
								{ 
									this.state.dashboards.map((dashboard, i) => {
										return (
											<div 
												draggable="true"
												className={ "insights-dashboard-list " + (this.state.selectedDashboard._id == dashboard._id ? "selected" : "") }
												key={ dashboard._id } 
												data-name={ dashboard.name }
												data-id={ dashboard._id }
												data-index={ i }
												onDragStart={ this.loadDashboard }
											>
												{ dashboard.name }
												<span 
													className="insights-click" 
													onClick={ this.confirmDeleteDashboard } 
													data-id={ dashboard._id }
												>
													&#9249;
												</span>
											</div>
										)
									}) 
								}
							</div>
						</div>
					</div>

					<div 
						className={ "insights-data " + (cells.length > 0 ? "" : "no-data") } 
						onDrop={ this.dragEnd } 
						onDragOver={ this.preventDefault }
					>
						{	
							cells.length > 0 ? 
								cells : 
								<div>
									Drag and drop a chart from the left panel here. Be sure to select an Object Type, 
									an Object, and Metrics. Compare objects by selecting multiple objects and metrics, 
									and choosing a date range.
								</div> 
						}
					</div>
				</div>

				<div className={"insights-settings-modal insights-modal " + (this.state.isSettingsOpen ? "is-open" : "")}>
					<div className="insights-settings-forms" onClick={this.preventDefault}>
						<h5 className="form-title">{SETTINGS}</h5>
						<div className="form-content">
							<div className="insights-form-tabs">
								<h5 className={"form-title form-subtitle " + (this.state.isTabOpen == "tab1" || !this.state.isTabOpen ? 'selected' : "")} data-id="tab1" onClick={this.showTab}>{ THEME_SETTINGS }</h5>
								{/* <h3 className={ "form-title " + (this.state.isTabOpen == "tab2" ? 'selected' : "") } data-id="tab2" onClick={this.showTab}>Blah Configuration</h3> */}
							</div>
							<div className={"insights-settings-tab insights-settings-tab1 " + ((this.state.isTabOpen == 'tab1' || !this.state.isTabOpen) ? 'is-open' : '')}>
								<form action="#">
									<div className="insights-form-group">
										<label>Theme</label>
										<select onClick={this.preventDefault} onChange={this.setTheme}>
											{
												THEMES.map(theme => {
													return <option key={theme} value={theme}>{theme}</option>
												})
											}
										</select>
									</div>
								</form>
							</div>
						</div>
						<div className="insights-form-buttons">
							<button onClick={this.closeModal}>Close</button>
						</div>
						{/* <div className={"insights-settings-tab insights-settings-tab2 " + (this.state.isTabOpen == 'tab2' ? 'is-open' : '')}> 
										<form>
											<div className="insights-form-group">
											</div>
										</form>
									</div> */}
					</div>
				</div>

				<div className={ "insights-dashboard-modal insights-modal " + (this.state.isSaveDashboardFormOpen ? 'is-open' : "") } >
					<div className="insights-dashboard">
						<h5 className="form-title">{ ADD_DASHBOARD }</h5>
						<form action="#">
							<div className="insights-form-group">
								<label>Name</label>
								<input 
									type="text" 
									placeholder="Dashboard Name" 
									name="dashboard-name" 
									ref="dashboardName" 
								/>
							</div>
						</form>
						<div className="insights-form-buttons">
							<button onClick={ this.saveDashboard }>Ok</button>
							<button onClick={ this.closeModal }>Cancel</button>
						</div>
					</div>
				</div>

				<div className={"insights-dashboard-modal insights-modal " + (this.state.isDeleteDashboardFormOpen ? 'is-open' : "")} >
					<div className="insights-dashboard">
						<h5 className="form-title">Delete Dashboard</h5>
						<form action="#">
							<div className="insights-form-group">
								<label>Are you sure you would like to delete this dashboard?</label>
							</div>
						</form>
						<div className="insights-form-buttons">
							<button onClick={this.deleteDashboard}>Yes</button>
							<button onClick={this.closeModal}>No</button>
						</div>
					</div>
				</div>

				{
					this.state.error.msg ?
						(this.state.error.success ? 
							n.notification.success(this.state.error.msg) : 
							n.notification.error(this.state.error.msg)
						) :
						""
				}

			</div>
		)
	}
}




