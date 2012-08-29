![InfoViz](http://infoviz.org/images/infoviz_logo_small.png)

InfoViz, an information visualization library based on [Raphaël](http://raphaeljs.com/).

# 1 AxisCharts

## 1.1 LineChart

![LineChart](http://infoviz.org/examples/linechart.png "LineChart")

A LineChart has a enumerable as horizontal field, and a value field as vertical field.

Here is how to create a LineChart.

Demo: [Click Here](http://infoviz.org/index.html#linechart)

	$.InfoViz.chart(
		$('.i-linechart'), 
		'linechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizontal',
			'horizontal_field': 'F2',
			'vertical_field': 'F1',
			'data': {
				'line1': {
					'name': 'China',
					'data': [
						{ 'F1': 1,   'F2': 'A', 'F3': 3 },
						{ 'F1': 42,  'F2': 'B', 'F3': 6 },
						{ 'F1': 7,   'F2': 'C', 'F3': 9 },
						{ 'F1': 110, 'F2': 'D', 'F3': 12 }
					]
				},
				'line2': {
					'name': 'Unite States',
					'data': [
						{ 'F1': 13, 'F2': 'A', 'F3': 15 },
						{ 'F1': 10, 'F2': 'B', 'F3': 12 },
						{ 'F1': 72, 'F2': 'C', 'F3': 9 },
						{ 'F1': 1,  'F2': 'D', 'F3': 3 },
						{ 'F1': 4,  'F2': 'E', 'F3': 6 }
					]
				},
				'line3': {
					'name': 'Unite Kingdom',
					'data': [
						{ 'F1': 19, 'F2': 'A', 'F3': 15 },
						{ 'F1': 20, 'F2': 'B', 'F3': 12 },
						{ 'F1': 11, 'F2': 'D', 'F3': 3 },
						{ 'F1': 42, 'F2': 'E', 'F3': 6 }
					]
				},
				'line4': {
					'name': 'Italy',
					'data': [
						{ 'F1': 29, 'F2': 'A', 'F3': 15 },
						{ 'F1': 70, 'F2': 'B', 'F3': 12 },
						{ 'F1': 42, 'F2': 'C', 'F3': 9 },
						{ 'F1': 51, 'F2': 'D', 'F3': 3 },
						{ 'F1': 22, 'F2': 'E', 'F3': 6 }
					]
				},
				'line5': {
					'name': 'Russia',
					'data': [
						{ 'F1': 9,  'F2': 'A', 'F3': 15 },
						{ 'F1': 90, 'F2': 'B', 'F3': 12 },
						{ 'F1': 92, 'F2': 'C', 'F3': 9 },
						{ 'F1': 52, 'F2': 'E', 'F3': 6 }
					]
				}
			}
		}
	);

## 1.2 BubbleChart

A LineChart has a value as horizontal field, and a value field as vertical field, also with a value field indicates its size.

![BubbleChart](http://infoviz.org/examples/bubblechart.png "BubbleChart")

Here is how to create a BubbleChart.

Demo: [Click Here](http://infoviz.org/index.html#bubblechart)

	$.InfoViz.chart(
		$('.i-bubblechart'), 
		'bubblechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizontal',
			'horizontal_field': 'F1',
			'vertical_field': 'F2',
			'size_field': 'F3',
			'label_field': 'F4',
			'data': [
				{ 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
				{ 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
				{ 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
			]
		}
	);

## 1.3 BarChart

![BarChart](http://infoviz.org/examples/barchart.png "BarChart")

A BarChart has a enumerable as horizontal field, and a value field as vertical field.

Here is how to create a BarChart.

Demo: [Click Here](http://infoviz.org/index.html#barchart)

	$.InfoViz.chart(
		$('.i-linechart'), 
		'linechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizontal',
			'horizontal_field': 'F2',
			'vertical_field': 'F1',
			'data': {
				'line1': {
					'name': 'China',
					'data': [
						{ 'F1': 1,   'F2': 'A', 'F3': 3  },
						{ 'F1': 42,  'F2': 'B', 'F3': 6  },
						{ 'F1': 7,   'F2': 'C', 'F3': 9  },
						{ 'F1': 110, 'F2': 'D', 'F3': 12 }
					]
				},
				'line2': {
					'name': 'Unite States',
					'data': [
						{ 'F1': 13, 'F2': 'A', 'F3': 15 },
						{ 'F1': 10, 'F2': 'B', 'F3': 12 },
						{ 'F1': 72, 'F2': 'C', 'F3': 9  },
						{ 'F1': 1,  'F2': 'D', 'F3': 3  },
						{ 'F1': 4,  'F2': 'E', 'F3': 6  }
					]
				},
				'line3': {
					'name': 'Unite Kingdom',
					'data': [
						{ 'F1': 19, 'F2': 'A', 'F3': 15 },
						{ 'F1': 20, 'F2': 'B', 'F3': 12 },
						{ 'F1': 11, 'F2': 'D', 'F3': 3  },
						{ 'F1': 42, 'F2': 'E', 'F3': 6  }
					]
				},
				'line4': {
					'name': 'Italy',
					'data': [
						{ 'F1': 29, 'F2': 'A', 'F3': 15 },
						{ 'F1': 70, 'F2': 'B', 'F3': 12 },
						{ 'F1': 42, 'F2': 'C', 'F3': 9  },
						{ 'F1': 51, 'F2': 'D', 'F3': 3  },
						{ 'F1': 22, 'F2': 'E', 'F3': 6  }
					]
				},
				'line5': {
					'name': 'Russia',
					'data': [
						{ 'F1': 9,  'F2': 'A', 'F3': 15 },
						{ 'F1': 90, 'F2': 'B', 'F3': 12 },
						{ 'F1': 92, 'F2': 'C', 'F3': 9  },
						{ 'F1': 52, 'F2': 'E', 'F3': 6  }
					]
				}
			}
		}
	);

# 2 Round Stuff

## 2.1 PieChart

![PieChart](http://infoviz.org/examples/piechart.png "PieChart")

A PieChart has a value as horizontal field.

Here is how to create a PieChart.

Demo: [Click Here](http://infoviz.org/index.html#piechart)

	$.InfoViz.chart(
		$('.i-piechart1'), 
		'piechart', 
		{
			'value_field': 'F2',
			'label_field': 'F4',
			'data': [
				{ 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
				{ 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
				{ 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
			]
		}
	);

# 3 Map

## 3.1 HeatMap

![HeatMap](http://infoviz.org/examples/heatmap.png "HeatMap")

A HeatMap has a value field.

Here is how to create a HeatMap.

Demo: [Click Here](http://infoviz.org/index.html#heatmap)

	$.InfoViz.chart(
		$('.i-heatmap2'), 
		'heatmap', 
		{
			'value_field': 'F1',
			'label_field': 'F4',
			'data': [
				{ 'F1': 14, 'F2': 1,  'F3': 9, 'F4': 'M1'  },
				{ 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
				{ 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,  'F2': 3,  'F3': 1, 'F4': 'JPN' },
				{ 'F1': 1,  'F2': 1,  'F3': 9, 'F4': 'M1'  },
				{ 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
				{ 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,  'F2': 3,  'F3': 1, 'F4': 'JPN' },
				{ 'F1': 1,  'F2': 1,  'F3': 9, 'F4': 'M1'  },
				{ 'F1': 42, 'F2': 1,  'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,  'F2': 1,  'F3': 9, 'F4': 'RUS' },
				{ 'F1': 11, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50, 'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29, 'F2': 22, 'F3': 4, 'F4': 'VET' }
			]
		},
		{
			'layout': { 'logo-position': 'bottom-right' },
			'heatmap': { 'label-size': 20 }
		}
	);

# 4 Configuration

## 4.1 How to overwrite a style

### Global

Call $.InfoViz.global_option, and pass in your option object to change options globally.

	$.InfoViz.global_option({
		'layout': { 'background-color': '#CDCDCD' }
	});

### Single

When you using $.InfoViz.chart to create a chart, you may pass in your option object as the last parametor. This option will effect this chart only.

	$.InfoViz.chart(
		$('.i-piechart1'), 
		'piechart', 
		{
			'value_field': 'F2',
			'label_field': 'F4',
			'data': [
				{ 'F1': 1,   'F2': 18, 'F3': 9, 'F4': 'CHN' },
				{ 'F1': 42,  'F2': 30, 'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,   'F2': 35, 'F3': 9, 'F4': 'RUS' },
				{ 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
			]
		},
		{
			'layout': { 'background-color': '#CDCDCD' }
		}
	);

## 4.2 Options

	$.InfoViz.options = {
		'layout': {
			'padding-top': 10,
			'padding-right': 10,
			'padding-bottom': 10,
			'padding-left': 10,
			'background-color': '#000',
			'background-alpha': 0.1,
			'logo-enabled': false,
			'logo-width': 50,
			'logo-height': 23,
			'logo-position': 'top-right',
			'speed': 300,

			'box-border-width': 1,
			'box-border-color': '#AAA',
			'box-border-alpha': 1,
			'box-background-color': '#F9F9F9',
			'box-background-alpha': 0.9
		},
		'grid': {
			'padding-top': 10,
			'padding-right': 10,
			'padding-bottom': 10,
			'padding-left': 10,

			'grid-width': 1,
			'grid-color': '#CCC',
			'grid-alpha': 0.5,

			'axis-width': 1,
			'axis-color': '#999',
			'axis-alpha': 1,
			'axis-dot-size': 2.4,
			
			'border-width': 1,
			'border-color': '#AAA',
			'border-alpha': 1,
			'border-radius': 4,
			
			'background-color': '#FFF',
			'background-alpha': 1.0,
			
			'vertical-label-margin': 5,
			'vertical-label-spacing': 40,
			'vertical-label-size': 12,
			'vertical-label-color': '#555',
			'vertical-name-size': 12,
			'vertical-name-color': '#000',

			'horizontal-label-margin': 5,
			'horizontal-label-spacing': 10,
			'horizontal-label-size': 12,
			'horizontal-label-color': '#555',
			'horizontal-name-size': 12,
			'horizontal-name-color': '#000'
		},
		'linechart': {
			'padding-top': 30,
			'padding-right': 90,
			'padding-bottom': 20,
			'padding-left': 30,
			'line-width': 2,
			'circle-radius': 5,
			'label-size': 12,
			'vertical-label-count': 10,
			'vertical-bar-width': 5
		},
		'bubblechart': {
			'padding-top': 40,
			'padding-right': 100,
			'padding-bottom': 40,
			'padding-left': 60,
			'circle-border-width': 2,
			'circle-min-radius': 15,
			'circle-max-radius': 40,
			'label-size': 12,
			'horizontal-label-count': 10,
			'horizontal-bar-width': 5,
			'vertical-label-count': 5,
			'vertical-bar-width': 5
		},
		'barchart': {
			'padding-top': 30,
			'padding-right': 30,
			'padding-bottom': 20,
			'padding-left': 30,
			'group-margin': 40,
			'bar-margin': 4,
			'vertical-label-count': 10,
			'vertical-bar-width': 5
		},
		'piechart': {
			'sector-size-factor': 0.9,
			'sector-border-width': 1,
			'label-distance': 5,
			'label-line-width': 1,
			'label-line-color': '#555',
			'label-line-alpha': 1,
			'label-size': 11,
			'label-bar-length1': 5,
			'label-bar-length2': 10,
			'hole-radius': 0
		},
		'heatmap': {
			'horizontal_margin': 4,
			'vertical_margin': 4,
			'box-border-width': 1,
			'label-size': 12,
			'label-color': '#FFF',
			'label-alpha': 1,
			'horizontal_count': undefined,
			'vertical_count': undefined,
			'color': [
				{ 'color': '#339999', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#99CC99', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#99CC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#CCCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#FFCC33', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#FF6633', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#FF3333', 'dark-alpha': 1, 'light-alpha': 0.45 },
				{ 'color': '#CC0066', 'dark-alpha': 1, 'light-alpha': 0.45 }
			]
		},
		'color': [
			{ 'color': '#66B3DD', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#EF7D31', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#ABC93C', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#E05170', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#297FB5', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#F5BE21', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#5ABABB', 'dark-alpha': 1, 'light-alpha': 0.45 },
			{ 'color': '#9D66A4', 'dark-alpha': 1, 'light-alpha': 0.45 }
		]
	};

### License

(The MIT License)

Copyright (c) 2012 Zheng Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.