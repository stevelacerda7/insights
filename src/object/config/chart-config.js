const CHALK_COLORS = [
    "#fc97af",
    "#87f7cf",
    "#f7f494",
    "#72ccff",
    "#f7c5a0",
    "#d4a4eb",
    "#d2f5a6",
    "#76f2f2"
];

const CHALK = {
   "color": CHALK_COLORS,
   "backgroundColor": "rgba(41,52,65,1)",
   "textStyle": {},
   "title": {
      "textStyle": {
         "color": "#ffffff"
      },
      "subtextStyle": {
         "color": "#dddddd"
      }
   },
   "line": {
      "itemStyle": {
         "normal": {
            "borderWidth": "4"
         }
      },
      "lineStyle": {
         "normal": {
            "width": "3"
         }
      },
      "symbolSize": "0",
      "symbol": "circle",
      "smooth": true
   },
   "radar": {
      "itemStyle": {
         "normal": {
            "borderWidth": "4"
         }
      },
      "lineStyle": {
         "normal": {
            "width": "3"
         }
      },
      "symbolSize": "0",
      "symbol": "circle",
      "smooth": true
   },
   "bar": {
      "itemStyle": {
         "normal": {
            "barBorderWidth": 0,
            "barBorderColor": "#ccc",
            "color": function (params) {
               return this.color[params.dataIndex];
            }
         },
         "emphasis": {
            "barBorderWidth": 0,
            "barBorderColor": "#ccc"
         }
      },
   },
   "pie": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "scatter": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "boxplot": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "parallel": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "sankey": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "funnel": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "gauge": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         },
         "emphasis": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      }
   },
   "candlestick": {
      "itemStyle": {
         "normal": {
            "color": "#fc97af",
            "color0": "transparent",
            "borderColor": "#fc97af",
            "borderColor0": "#87f7cf",
            "borderWidth": "2"
         }
      }
   },
   "graph": {
      "itemStyle": {
         "normal": {
            "borderWidth": 0,
            "borderColor": "#ccc"
         }
      },
      "lineStyle": {
         "normal": {
            "width": "1",
            "color": "#ffffff"
         }
      },
      "symbolSize": "0",
      "symbol": "circle",
      "smooth": true,
      "color": [
         "#fc97af",
         "#87f7cf",
         "#f7f494",
         "#72ccff",
         "#f7c5a0",
         "#d4a4eb",
         "#d2f5a6",
         "#76f2f2"
      ],
      "label": {
         "normal": {
            "textStyle": {
               "color": "#293441"
            }
         }
      }
   },
   "map": {
      "itemStyle": {
         "normal": {
            "areaColor": "#f3f3f3",
            "borderColor": "#999999",
            "borderWidth": 0.5
         },
         "emphasis": {
            "areaColor": "rgba(255,178,72,1)",
            "borderColor": "#eb8146",
            "borderWidth": 1
         }
      },
      "label": {
         "normal": {
            "textStyle": {
               "color": "#893448"
            }
         },
         "emphasis": {
            "textStyle": {
               "color": "rgb(137,52,72)"
            }
         }
      }
   },
   "geo": {
      "itemStyle": {
         "normal": {
            "areaColor": "#f3f3f3",
            "borderColor": "#999999",
            "borderWidth": 0.5
         },
         "emphasis": {
            "areaColor": "rgba(255,178,72,1)",
            "borderColor": "#eb8146",
            "borderWidth": 1
         }
      },
      "label": {
         "normal": {
            "textStyle": {
               "color": "#893448"
            }
         },
         "emphasis": {
            "textStyle": {
               "color": "rgb(137,52,72)"
            }
         }
      }
   },
   "categoryAxis": {
      "axisLine": {
         "show": true,
         "lineStyle": {
            "color": "#666666"
         }
      },
      "axisTick": {
         "show": false,
         "lineStyle": {
            "color": "#333"
         }
      },
      "axisLabel": {
         "show": true,
         "textStyle": {
            "color": "#aaaaaa"
         }
      },
      "splitLine": {
         "show": false,
         "lineStyle": {
            "color": [
               "#e6e6e6"
            ]
         }
      },
      "splitArea": {
         "show": false,
         "areaStyle": {
            "color": [
               "rgba(250,250,250,0.05)",
               "rgba(200,200,200,0.02)"
            ]
         }
      }
   },
   "valueAxis": {
      "axisLine": {
         "show": true,
         "lineStyle": {
            "color": "#666666"
         }
      },
      "axisTick": {
         "show": false,
         "lineStyle": {
            "color": "#333"
         }
      },
      "axisLabel": {
         "show": true,
         "textStyle": {
            "color": "#aaaaaa"
         }
      },
      "splitLine": {
         "show": false,
         "lineStyle": {
            "color": [
               "#e6e6e6"
            ]
         }
      },
      "splitArea": {
         "show": false,
         "areaStyle": {
            "color": [
               "rgba(250,250,250,0.05)",
               "rgba(200,200,200,0.02)"
            ]
         }
      }
   },
   "logAxis": {
      "axisLine": {
         "show": true,
         "lineStyle": {
            "color": "#666666"
         }
      },
      "axisTick": {
         "show": false,
         "lineStyle": {
            "color": "#333"
         }
      },
      "axisLabel": {
         "show": true,
         "textStyle": {
            "color": "#aaaaaa"
         }
      },
      "splitLine": {
         "show": false,
         "lineStyle": {
            "color": [
               "#e6e6e6"
            ]
         }
      },
      "splitArea": {
         "show": false,
         "areaStyle": {
            "color": [
               "rgba(250,250,250,0.05)",
               "rgba(200,200,200,0.02)"
            ]
         }
      }
   },
   "timeAxis": {
      "axisLine": {
         "show": true,
         "lineStyle": {
            "color": "#666666"
         }
      },
      "axisTick": {
         "show": false,
         "lineStyle": {
            "color": "#333"
         }
      },
      "axisLabel": {
         "show": true,
         "textStyle": {
            "color": "#aaaaaa"
         }
      },
      "splitLine": {
         "show": false,
         "lineStyle": {
            "color": [
               "#e6e6e6"
            ]
         }
      },
      "splitArea": {
         "show": false,
         "areaStyle": {
            "color": [
               "rgba(250,250,250,0.05)",
               "rgba(200,200,200,0.02)"
            ]
         }
      }
   },
   "toolbox": {
      "orient": 'vertical',
      left: 'right',
      top: "middle",
      padding: [5, 20, 5, 5],
      feature: {
         mark: { show: true },
         dataView: {
            show: true,
            title: "Table View",
            readOnly: true,
            buttonColor: '#6abca4',
            lang: ["Table View", "Close", "Refresh"],
            optionToContent: function (opt) {
               var axisData = opt.xAxis[0].data;
               var series = opt.series;

               var table = `
                        <table style="width:100%;text-align:center;color:#000000;">
                            <tbody>
                                <tr>
                                    <td>Time</td>
                                    ${
                                        series.map(obj => {
                                            return (
                                                `<td>${obj.name}</td>`
                                            )
                                        })
                                    }
                                </tr>
                                ${
                                    axisData.map((date, i) => {
                                        return (
                                            `<tr>
                                                <td>${ date}</td>
                                                ${series.map((obj) => {
                                                    return (
                                                        `<td>${obj.data[i]}</td>`
                                                    )
                                                })}
                                            </tr>`
                                        )
                                    })
                                }
                                </tr>
                            </tbody>
                        </table>`;

               return table;
            },
         },
         saveAsImage: { show: true, title: "Save As Image" }
      }
   },
   "legend": {
      orient: "horizontal",
      x: 'center',
      y: 'bottom',
      "textStyle": {
         "color": "#999999"
      },
      padding: 10,
   },
   grid: {
       bottom: 100,
   },
   "tooltip": {
      "axisPointer": {
         "lineStyle": {
            "color": "#cccccc",
            "width": 1
         },
         "crossStyle": {
            "color": "#cccccc",
            "width": 1
         }
      }
   },
   "timeline": {
      "lineStyle": {
         "color": "#87f7cf",
         "width": 1
      },
      "itemStyle": {
         "normal": {
            "color": "#87f7cf",
            "borderWidth": 1
         },
         "emphasis": {
            "color": "#f7f494"
         }
      },
      "controlStyle": {
         "normal": {
            "color": "#87f7cf",
            "borderColor": "#87f7cf",
            "borderWidth": 0.5
         },
         "emphasis": {
            "color": "#87f7cf",
            "borderColor": "#87f7cf",
            "borderWidth": 0.5
         }
      },
      "checkpointStyle": {
         "color": "#fc97af",
         "borderColor": "rgba(252,151,175,0.3)"
      },
      "label": {
         "normal": {
            "textStyle": {
               "color": "#87f7cf"
            }
         },
         "emphasis": {
            "textStyle": {
               "color": "#87f7cf"
            }
         }
      }
   },
   "visualMap": {
      "color": [
         "#fc97af",
         "#87f7cf"
      ]
   },
   "dataZoom": {
      "backgroundColor": "rgba(255,255,255,0)",
      "dataBackgroundColor": "rgba(114,204,255,1)",
      "fillerColor": "rgba(114,204,255,0.2)",
      "handleColor": "#72ccff",
      "handleSize": "100%",
      "textStyle": {
         "color": "#333333"
      }
   },
   "markPoint": {
      "label": {
         "normal": {
            "textStyle": {
               "color": "#293441"
            }
         },
         "emphasis": {
            "textStyle": {
               "color": "#293441"
            }
         }
      }
   }
};

const VINTAGE_COLORS = ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8', '#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];
const VINTAGE = {
    color: VINTAGE_COLORS,
    backgroundColor: '#fef8ef',
    graph: {
        color: VINTAGE_COLORS
    },
    title: {
        textStyle: {
            color: VINTAGE_COLORS[0]
        },
        subtextStyle: {
            color: VINTAGE_COLORS[0]
        }
    },
}


const ROMA_COLORS = ['#E01F54', '#001852', '#f5e8c8', '#b8d2c7', '#c6b38e',
    '#a4d8c2', '#f3d999', '#d3758f', '#dcc392', '#2e4783',
    '#82b6e9', '#ff6347', '#a092f1', '#0a915d', '#eaf889',
    '#6699FF', '#ff6666', '#3cb371', '#d5b158', '#38b6b6'
];

const ROMA = {
    color: ROMA_COLORS,
    backgroundColor: "#ffffff",
    title: {
        textStyle: {
            color: ROMA_COLORS[0]
        },
        subtextStyle: {
            color: ROMA_COLORS[0]
        }
    },
    visualMap: {
        color: ['#e01f54', '#e7dbc3'],
        textStyle: {
            color: '#333'
        }
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#e01f54',
                color0: '#001852',
                lineStyle: {
                    width: 1,
                    color: '#f5e8c8',
                    color0: '#b8d2c7'
                }
            }
        }
    },
    graph: {
        color: ROMA_COLORS
    },
    gauge: {
        axisLine: {
            lineStyle: {
                color: [[0.2, '#E01F54'], [0.8, '#b8d2c7'], [1, '#001852']],
                width: 8
            }
        }
    }
};



const SHINE_COLORS = [
    '#c12e34', '#e6b600', '#0098d9', '#2b821d',
    '#005eaa', '#339ca8', '#cda819', '#32a487'
];

const SHINE = {
    color: SHINE_COLORS,
    backgroundColor: "#ffffff",
    title: {
        textStyle: {
            color: SHINE_COLORS[0],
            fontWeight: 'normal'
        },
        subtextStyle: {
            color: SHINE_COLORS[0]
        }
    },
    visualMap: {
        color: ['#1790cf', '#a2d4e6']
    },
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    dataZoom: {
        dataBackgroundColor: '#dedede',
        fillerColor: 'rgba(154,217,247,0.2)',
        handleColor: '#005eaa'
    },
    timeline: {
        lineStyle: {
            color: '#005eaa'
        },
        controlStyle: {
            normal: {
                color: '#005eaa',
                borderColor: '#005eaa'
            }
        }
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#c12e34',
                color0: '#2b821d',
                lineStyle: {
                    width: 1,
                    color: '#c12e34',
                    color0: '#2b821d'
                }
            }
        }
    },
    graph: {
        color: SHINE_COLORS
    },
    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#c12e34'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#c12e34'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#eee',
                areaColor: '#ddd'
            },
            emphasis: {
                areaColor: '#e6b600'
            }
        }
    },
    gauge: {
        axisLine: {
            show: true,
            lineStyle: {
                color: [[0.2, '#2b821d'], [0.8, '#005eaa'], [1, '#c12e34']],
                width: 5
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 8,
            lineStyle: {
                color: 'auto'
            }
        },
        axisLabel: {
            textStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 12,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            length: '90%',
            width: 3,
            color: 'auto'
        },
        title: {
            textStyle: {
                color: '#333'
            }
        },
        detail: {
            textStyle: {
                color: 'auto'
            }
        }
    }
};



const INFOGRAPHIC_COLORS = [
    '#C1232B', '#27727B', '#FCCE10', '#E87C25', '#B5C334',
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
];

const INFOGRAPHIC = {
    color: INFOGRAPHIC_COLORS,
    backgroundColor: "#ffffff",
    title: {
        textStyle: {
            color: '#27727B',
            fontWeight: 'normal'
        },
        subtextStyle: {
            color: '#27727B',
        }
    },
    visualMap: {
        color: ['#C1232B', '#FCCE10']
    },
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#27727B',
                type: 'dashed'
            },
            crossStyle: {
                color: '#27727B'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.3)'
            }
        }
    },
    dataZoom: {
        dataBackgroundColor: 'rgba(181,195,52,0.3)',
        fillerColor: 'rgba(181,195,52,0.2)',
        handleColor: '#27727B'
    },
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#27727B'
            }
        },
        splitLine: {
            show: false
        }
    },
    valueAxis: {
        axisLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: ['#ccc'],
                type: 'dashed'
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#27727B'
        },
        controlStyle: {
            normal: {
                color: '#27727B',
                borderColor: '#27727B'
            }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },
    line: {
        itemStyle: {
            normal: {
                borderWidth: 2,
                borderColor: '#fff',
                lineStyle: {
                    width: 3
                }
            },
            emphasis: {
                borderWidth: 0
            }
        },
        symbol: 'circle',
        symbolSize: 3.5
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#C1232B',
                color0: '#B5C334',
                lineStyle: {
                    width: 1,
                    color: '#C1232B',
                    color0: '#B5C334'
                }
            }
        }
    },
    graph: {
        color: INFOGRAPHIC_COLORS
    },
    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#C1232B'
                }
            },
            emphasis: {
                textStyle: {
                    color: 'rgb(100,0,0)'
                }
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#ddd',
                borderColor: '#eee'
            },
            emphasis: {
                areaColor: '#fe994e'
            }
        }
    },
    gauge: {
        axisLine: {
            lineStyle: {
                color: [[0.2, '#B5C334'], [0.8, '#27727B'], [1, '#C1232B']]
            }
        },
        axisTick: {
            splitNumber: 2,
            length: 5,
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            length: '5%',
            lineStyle: {
                color: '#fff'
            }
        },
        title: {
            offsetCenter: [0, -20]
        }
    }
};



const MACARONS_COLORS = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];


const MACARONS = {
    color: MACARONS_COLORS,
    backgroundColor: "#ffffff",
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#008acd'
        }
    },
    visualMap: {
        itemWidth: 15,
        color: ['#5ab1ef', '#e0ffff']
    },
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#008acd'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },
    dataZoom: {
        dataBackgroundColor: '#efefff',
        fillerColor: 'rgba(182,162,222,0.2)',
        handleColor: '#008acd'
    },
    grid: {
        borderColor: '#eee',
        bottom: 100 
    },
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#008acd'
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },
    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#008acd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#008acd'
        },
        controlStyle: {
            normal: { color: '#008acd' },
            emphasis: { color: '#008acd' }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },
    line: {
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 3
    },
    candlestick: {
        itemStyle: {
            normal: {
                color: '#d87a80',
                color0: '#2ec7c9',
                lineStyle: {
                    color: '#d87a80',
                    color0: '#2ec7c9'
                }
            }
        }
    },
    scatter: {
        symbol: 'circle',
        symbolSize: 4
    },
    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#d87a80'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#eee',
                areaColor: '#ddd'
            },
            emphasis: {
                areaColor: '#fe994e'
            }
        }
    },
    graph: {
        color: MACARONS_COLORS
    },
    gauge: {
        axisLine: {
            lineStyle: {
                color: [[0.2, '#2ec7c9'], [0.8, '#5ab1ef'], [1, '#d87a80']],
                width: 10
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 15,
            lineStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 22,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            width: 5
        }
    }
};




exports.chalk = CHALK;
exports.vintage = Object.assign({}, CHALK, VINTAGE);
exports.roma = Object.assign({}, CHALK, ROMA);
exports.shine = Object.assign({}, CHALK, SHINE);
exports.infographic = Object.assign({}, CHALK, INFOGRAPHIC);
exports.macarons = Object.assign({}, CHALK, MACARONS);