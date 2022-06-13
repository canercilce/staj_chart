import MarkLine from './Chart.js';
var request = new XMLHttpRequest();
request.open("GET", "./data/data.json", false);
request.send(null)
var data = JSON.parse(request.responseText);
var element = document.getElementById("container");
var myChart = echarts.init(element);
let dataMap = new Map(Object.entries(data));
var xAxisData = Array.from(dataMap.keys());
var seriesData = Array.from(dataMap.values());
var markLine = new MarkLine(seriesData, xAxisData, "new Markline", "red", "bold", "false", "dashed");
const option = markLine.getMarklineOption();
option && myChart.setOption(option);
