![InfoViz](http://infoviz.org/images/infoviz_logo_small.png)

InfoViz, an information visualization library based on [Raphaël](http://raphaeljs.com/).

Raphaël currently supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+.

# 1 AxisCharts

## 1.1 LineChart

![LineChart](http://infoviz.org/examples/linechart.png "LineChart")

A LineChart has a enumerable as horizontal field, and a value field as vertical field.

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
		},
		{ 'legend': { 'margin-top': 0 } }
	);

## 1.2 BarChart

![BarChart](http://infoviz.org/examples/barchart.png "BarChart")

A BarChart has a enumerable as horizontal field, and a value field as vertical field.

Demo: [Click Here](http://infoviz.org/index.html#barchart)

	$.InfoViz.chart(
		$('.i-barchart'), 
		'barchart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizontal',
			'horizontal_field': 'F2',
			'vertical_field': 'F1',
			'data': {
				'bar1': {
					'name': 'China',
					'data': [
						{ 'F1': 1,   'F2': 'A', 'F3': 3  },
						{ 'F1': 42,  'F2': 'B', 'F3': 6  },
						{ 'F1': 7,   'F2': 'C', 'F3': 9  },
						{ 'F1': 110, 'F2': 'D', 'F3': 12 }
					]
				},
				'bar2': {
					'name': 'Unite States',
					'data': [
						{ 'F1': 13, 'F2': 'A', 'F3': 15 },
						{ 'F1': 10, 'F2': 'B', 'F3': 12 },
						{ 'F1': 72, 'F2': 'C', 'F3': 9  },
						{ 'F1': 1,  'F2': 'D', 'F3': 3  },
						{ 'F1': 4,  'F2': 'E', 'F3': 6  }
					]
				},
				'bar3': {
					'name': 'Unite Kingdom',
					'data': [
						{ 'F1': 19, 'F2': 'A', 'F3': 15 },
						{ 'F1': 20, 'F2': 'B', 'F3': 12 },
						{ 'F1': 11, 'F2': 'D', 'F3': 3  },
						{ 'F1': 42, 'F2': 'E', 'F3': 6  }
					]
				},
				'bar4': {
					'name': 'Italy',
					'data': [
						{ 'F1': 29, 'F2': 'A', 'F3': 15 },
						{ 'F1': 70, 'F2': 'B', 'F3': 12 },
						{ 'F1': 42, 'F2': 'C', 'F3': 9  },
						{ 'F1': 51, 'F2': 'D', 'F3': 3  },
						{ 'F1': 22, 'F2': 'E', 'F3': 6  }
					]
				},
				'bar5': {
					'name': 'Russia',
					'data': [
						{ 'F1': 9,  'F2': 'A', 'F3': 15 },
						{ 'F1': 90, 'F2': 'B', 'F3': 12 },
						{ 'F1': 92, 'F2': 'C', 'F3': 9  },
						{ 'F1': 52, 'F2': 'E', 'F3': 6  }
					]
				}
			}
		},
		{ 'legend': { 'margin-top': 0 } }
	);

## 1.3 BubbleChart

A BubbleChart has a value as horizontal field, and a value field as vertical field, also with a value field indicates its size.

![BubbleChart](http://infoviz.org/examples/bubblechart.png "BubbleChart")

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
		},
		{ 
			'bubblechart': { 'padding-right': 200 },
			'legend': { 'legend-position': 'top-right', 'margin-top': 40, 'margin-right': 0 }
		}
	);

# 2 Round Stuff

## 2.1 PieChart

![PieChart](http://infoviz.org/examples/piechart.png "PieChart")

A PieChart has a value as horizontal field.

Demo: [Click Here](http://infoviz.org/index.html#piechart)

	$.InfoViz.chart(
		$('.i-piechart1'), 
		'piechart', 
		{
			'value_field': 'F2',
			'label_field': 'F4',
			'data': [
				{ 'F1': 1,   'F2': 9, 'F3': 9, 'F4': 'CHN' },
				{ 'F1': 42,  'F2': 9, 'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,   'F2': 9, 'F3': 9, 'F4': 'RUS' },
				{ 'F1': 110, 'F2': 8, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50,  'F2': 3, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29,  'F2': 1, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,   'F2': 1, 'F3': 1, 'F4': 'JPN' }
			]
		},
		{ 'legend': { 'legend-enabled': false } }
	);

## 2.2 RadarChart

![RadarChart](http://infoviz.org/examples/radarchart.png "RadarChart")

A RadarChart has a group of value fields.

Demo: [Click Here](http://infoviz.org/index.html#radarchart)

	$.InfoViz.chart(
		$('.i-radarchart1'), 
		'radarchart', 
		{
			'value_fields': [ 'F1', 'F2', 'F3', 'F4', 'F5', 'F6' ],
			'name_field': 'F7',
			'data': [
				{ 'F1': 7, 'F2': 7, 'F3': 7, 'F4': 7, 'F5': 7, 'F6': 7, 'F7': 'China' },
				{ 'F1': 6, 'F2': 6, 'F3': 6, 'F4': 6, 'F5': 6, 'F6': 6, 'F7': 'Unite States' },
				{ 'F1': 5, 'F2': 5, 'F3': 5, 'F4': 5, 'F5': 5, 'F6': 5, 'F7': 'Unite Kingdom' },
				{ 'F1': 4, 'F2': 4, 'F3': 4, 'F4': 4, 'F5': 4, 'F6': 4, 'F7': 'France' },
				{ 'F1': 3, 'F2': 3, 'F3': 3, 'F4': 3, 'F5': 3, 'F6': 3, 'F7': 'Japan' },
				{ 'F1': 2, 'F2': 2, 'F3': 2, 'F4': 2, 'F5': 2, 'F6': 2, 'F7': 'South Korea' },
				{ 'F1': 1, 'F2': 1, 'F3': 1, 'F4': 1, 'F5': 1, 'F6': 1, 'F7': 'Russia' }
			]
		},
		{
			'radarchart': { 'horizontal-offset': 60 },
			'legend': { 'legend-position': 'bottom-left', 'margin-left': 0, 'margin-bottom': 0 }
		}
	);

# 3 Map

## 3.1 HeatMap

![HeatMap](http://infoviz.org/examples/heatmap.png "HeatMap")

A HeatMap has a value field which indicator its load etc.

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

# 4 Tree

# 5 Cloud

## 5.1 TagCloud

![TagCloud](http://infoviz.org/examples/tagcloud.png "TagCloud")

A TagCloud has a text string, and a value field to indicator its frequency.

Demo: [Click Here](http://infoviz.org/index.html#tagcloud)

	$.InfoViz.chart(
		$('.i-tagcloud1'), 
		'tagcloud',
		{
			'value_field': 'F1',
			'text_field': 'F2',
			'data': [
				{ 'F1': 24, 'F2': 'China' },
				{ 'F1': 23, 'F2': 'Unite States' },
				{ 'F1': 22, 'F2': 'Russia' },
				{ 'F1': 21, 'F2': 'Japan' },
				{ 'F1': 20, 'F2': 'Botswana' },
				{ 'F1': 19, 'F2': 'Finland' },
				{ 'F1': 18, 'F2': 'France' },
				{ 'F1': 17, 'F2': 'Cape Verde' },
				{ 'F1': 16, 'F2': 'Belize' },
				{ 'F1': 15, 'F2': 'Georgia' },
				{ 'F1': 14, 'F2': 'Haiti' },
				{ 'F1': 13, 'F2': 'Hungary' },
				{ 'F1': 12, 'F2': 'India' },
				{ 'F1': 11, 'F2': 'Laos' },
				{ 'F1': 10, 'F2': 'Kuwait' },
				{ 'F1': 9,  'F2': 'Namibia' },
				{ 'F1': 8,  'F2': 'Peru' },
				{ 'F1': 7,  'F2': 'Qatar' },
				{ 'F1': 6,  'F2': 'Spain' },
				{ 'F1': 5,  'F2': 'Thailand' },
				{ 'F1': 4,  'F2': 'Ukraine' },
				{ 'F1': 3,  'F2': 'Vanuatu' },
				{ 'F1': 2,  'F2': 'Zambia' },
				{ 'F1': 1,  'F2': 'Palestine' }
			]
		}
	);

# 6 Flow

# 7 Configuration

## 7.1 How to overwrite a style

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

## 7.2 Options

	$.InfoViz.options = {
		'layout': {
			'padding-top': 1,
			'padding-right': 1,
			'padding-bottom': 1,
			'padding-left': 1,
			'background-color': '#FFF',
			'background-alpha': 1,
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
		'legend': {
			'width': undefined,
			'height': undefined,
			'legend-enabled': true,
			'legend-position': 'top-left',
			
			'margin-top': 10,
			'margin-right': 10,
			'margin-bottom': 10,
			'margin-left': 10,

			'padding-top': 5,
			'padding-right': 8,
			'padding-bottom': 5,
			'padding-left': 8,

			'indicator-size': 14,
			'indicator-border-width': 1,
			'indicator-margin-left': 0,
			'indicator-margin-right': 10,
			'indicator-margin-top': 2,
			'indicator-margin-bottom': 2,
			'indicator-sector-angle': 60,

			'label-color': undefined,
			'label-alpha': 1,
			'label-size': 12,
			
			'border-width': 1,
			'border-color': '#CCC',
			'border-alpha': 1,
			'border-radius': 4,

			'background-color': '#FDFDFD',
			'background-alpha': 1,
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
			'hole-radius': 0,
			'horizontal-offset': 0,
			'vertical-offset': 0
		},
		'radarchart': {
			'sector-size-factor': 0.9,
			'outer-border-width': 1,
			'outer-border-color': '#999',
			'outer-border-alpha': 1,
			'outer-background-color': '#FFF',
			'outer-background-alpha': 1,
			'inner-border-width': 1,
			'inner-border-color': '#CCC',
			'inner-border-alpha': 1,
			'inner-background-color': '#F9F9F9',
			'inner-background-alpha': 1,
			'axis-width': 2,
			'axis-color': '#999',
			'axis-alpha': 1,
			'circle-border-width': 2,
			'circle-background-alpha': 0.1,
			'circle-min-radius': 30,
			'label-distance': 15,
			'label-color': '#555',
			'label-size': 12,
			'label-rotation': false,
			'horizontal-offset': 0,
			'vertical-offset': 0
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
		'tagcloud': {
			'levels': 10,
			'text-min-size': 10,
			'text-max-size': 55,
			'row-count': 5,
			'horizontal_margin': 5,
			'vertical_margin': -10,
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