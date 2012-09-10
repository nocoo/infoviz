# InfoViz

![InfoViz](http://infoviz.org/images/infoviz_logo_small.png)

InfoViz is an information visualization library based on [Raphaël](http://raphaeljs.com/).

Raphaël currently supports Firefox 3.0+, Safari 3.0+, Chrome 5.0+, Opera 9.5+ and Internet Explorer 6.0+.

By the way, InfoViz supports iOS devices, include Retina iPad.

## Everything can be customized

You may overwrite almost every visual style in InfoViz charts. There's few magic numbers in InfoViz code, when we need a number, we add an option for you to overwrite.
Transparent background? Sure! Reverse color? Sure! Black and white? Sure!

See [Configurations](#8-configuration) to find out how.

# 1 AxisCharts

## 1.1 LineChart

![LineChart](http://infoviz.org/examples/linechart.png "LineChart")

A LineChart has a enumerable as horizontal field, and a value field as vertical field.

Demo: [Click Here](http://infoviz.org/index.html#linechart)

	InfoViz.chart(
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

	InfoViz.chart(
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

	InfoViz.chart(
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

	InfoViz.chart(
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

	InfoViz.chart(
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

	InfoViz.chart(
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

	InfoViz.chart(
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

# 7 Chart Accessories

## 7.1 Legend

Legend is enabled by default. Check out legend section in [Configurations](#8-configuration) to find out how to customize a legend.

## 7.2 Interaction Callback

You may define a event handler as the 5 parametor of InfoViz.chart. This handler will be called when user click on a chart element.

	InfoViz.chart(
		element,
		type,
		data,
		overwrite_option,
		function(info) {
			console.log(info);
		}
	);

## 7.3 Tooltip

You may pass 'tooltip_title' and/or 'tooltip_content' into data to enable tooltip.

	InfoViz.chart(
		$('.i-bubblechart'), 
		'bubblechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizontal',
			'horizontal_field': 'F1',
			'vertical_field': 'F2',
			'size_field': 'F3',
			'label_field': 'F4',

			'tooltip_title': 'InfoViz {F2}, {F3}',
			'tooltip_content': 'Tooltip: {F1}, {F2} | {F3}',

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

# 8 Configuration

## 8.1 How to overwrite a style

### Global

Call $.InfoViz.global_option, and pass in your option object to change options globally.

	InfoViz.global_option({
		'layout': { 'background-color': '#CDCDCD' }
	});

### Single

When you using $.InfoViz.chart to create a chart, you may pass in your option object as the last parametor. This option will effect this chart only.

	InfoViz.chart(
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

## 8.2 Options

	InfoViz.options = {
		// 1. Chart layout configuration.
		'layout': {
			'padding-top': 1, 					// padding-top
			'padding-right': 1,					// padding-right
			'padding-bottom': 1,				// padding-bottom
			'padding-left': 1,					// padding-left

			'background-color': '#FFF',			// global background color
			'background-alpha': 1,				// background opacity, you may set this value to 0, and add your
												// customize background as DOM container's background in CSS.
			
			'logo-enabled': false,				// is InfoViz logo enabled
			'logo-width': 50,					// logo width
			'logo-height': 23,					// logo height
			'logo-position': 'top-right',		// logo position, top-right | top-left | bottom-right | bottom-left
			
			'speed': 300,						// animation speed
		},

		// 2. Grid and axis configuration.
		'grid': {
			'padding-top': 10, 					// padding-top
			'padding-right': 10,				// padding-right
			'padding-bottom': 10,				// padding-bottom
			'padding-left': 10,					// padding-left

			'grid-width': 1,					// grid line thickness
			'grid-color': '#CCC',				// grid line color
			'grid-alpha': 0.5,					// grid line opacity

			'axis-width': 1,					// axis line thickness
			'axis-color': '#999',				// axis line color
			'axis-alpha': 1,					// axis line opacity
			'axis-dot-size': 2.4,				// axis dot radius.
												// There're 3 axis dot, at the end of each axis, and one at (0, 0)
			
			'border-width': 1,					// chart border thichness
			'border-color': '#AAA',				// chart border color
			'border-alpha': 1,					// chart border opacity
			'border-radius': 4,					// chart border corner radius
			
			'background-color': '#FFF',			// chart area background-color
			'background-alpha': 1.0,			// chart area background opacity
			
			'vertical-label-margin': 5,			// distance from axis to vertical label
			'vertical-label-spacing': 40,		// vertical label max width
			'vertical-label-size': 12,			// vertical label font size
			'vertical-label-color': '#555',		// vertical label font color
			'vertical-name-size': 12,			// vertical axis name font size
			'vertical-name-color': '#000',		// vertical axis name font color

			'horizontal-label-margin': 5,		// distance from axis to horizontal label
			'horizontal-label-spacing': 10,		// horizontal label max height
			'horizontal-label-size': 12,		// horizontal label font size
			'horizontal-label-color': '#555',	// horizontal label font color
			'horizontal-name-size': 12,			// horizontal axis name font size
			'horizontal-name-color': '#000'		// horizontal axis name font color
		},

		// 3. Legend configuration.
		'legend': {
			'legend-enabled': true,				// is legend enabled
			'legend-position': 'top-left',		// legend position, top-right | top-left | bottom-right | bottom-left

			'width': undefined,					// legend width, set this option to undefined to use auto width
			'height': undefined,				// legend height, set this option to undefined to use auto height

			'margin-top': 10,					// margin-top
			'margin-right': 10,					// margin-right
			'margin-bottom': 10,				// margin-bottom
			'margin-left': 10,					// margin-left

			'padding-top': 5,					// padding-top
			'padding-right': 8,					// padding-right
			'padding-bottom': 5,				// padding-bottom
			'padding-left': 8,					// padding-left

			'indicator-size': 14,				// legend indicator size
			'indicator-border-width': 1,		// legend indicator brush thickness
			'indicator-margin-left': 0,			// legend indicator margin-left
			'indicator-margin-right': 10,		// legend indicator margin-right
			'indicator-margin-top': 2,			// legend indicator margin-top
			'indicator-margin-bottom': 2,		// legend indicator margin-bottom
			'indicator-sector-angle': 60,		// sector type legend indicator angle

			'label-color': undefined,			// legend label font color
			'label-alpha': 1,					// legend label font opacity
			'label-size': 12,					// legend label font size
			
			'border-width': 1,					// legend border thickness
			'border-color': '#CCC',				// legend border color
			'border-alpha': 1,					// legend border opacity
			'border-radius': 4,					// legend border radius

			'background-color': '#FDFDFD',		// legend background color
			'background-alpha': 1 				// legend background opacity
		},

		// 4. Tooltip configuration.
		'tooltip': {
			'padding-top': 6,					// padding-top
			'padding-right': 8,					// padding-right
			'padding-bottom': 6,				// padding-bottom
			'padding-left': 8,					// padding-left
			
			'border-width': 1,					// tooltip border thickness
			'border-color': '#CCC',				// tooltip border color
			'border-alpha': 1,					// tooltip border opacity
			'border-radius': 4,					// tooltip border radius

			'title-text-color': undefined,		// tooltip title text font color
			'title-text-alpha': 1,				// tooltip title text font opacity
			'title-text-weight': 'bold',		// tooltip title text weight
			'title-text-size': 12,				// tooltip title text font size
			
			'line-spacing': 2,					// distance between title and content
			'hide-after': 5000,					// tooltip will automatic hide in seconds
												// undefined or 0, tooltip will always be visible

			'content-text-color': '#999',		// tooltip content text font color
			'content-text-alpha': 1,			// tooltip content text font opacity
			'content-text-weight': 'normal',	// tooltip content text weight
			'content-text-size': 12,			// tooltip content text font size

			'background-color': '#FDFDFD',		// tooltip background color
			'background-alpha': 1,				// tooltip background alpha

			'horizontal-offset': 0,				// tooltip horizontal offset
			'vertical-offset': -10 				// tooltip vertical offset
		},

		// 5. LineChart configuration.
		'linechart': {
			'padding-top': 30,					// padding-top
			'padding-right': 90,				// padding-right
			'padding-bottom': 20,				// padding-bottom
			'padding-left': 30,					// padding-left

			'line-width': 2,					// LineChart line thickness
			'circle-radius': 5,					// LineChart node circle radius
			'custom-circle': undefined,			// if you want to use a customized circle image, set this to image url
			'label-size': 12,					// label font size

			'vertical-label-count': 10,			// label count in the vertical axis
			'vertical-bar-width': 5 			// period bar width of the vertical axis
		},

		// 6. BubbleChart configuration.
		'bubblechart': {
			'padding-top': 40,					// padding-top
			'padding-right': 100,				// padding-right
			'padding-bottom': 40,				// padding-bottom
			'padding-left': 60,					// padding-left

			'circle-border-width': 2,			// bubble circle border thickness
			'circle-min-radius': 15,			// bubble circle max radius
			'circle-max-radius': 40,			// bubble circle min radius
			'label-size': 12,					// bubble circle label font size

			'horizontal-label-count': 10,		// label count in the horizontal axis
			'horizontal-bar-width': 5,			// period bar width of the horizontal axis
			'vertical-label-count': 5,			// label count in the vertical axis
			'vertical-bar-width': 5 			// period bar width of the vertical axis
		},

		// 7. BarChart configuration.
		'barchart': {
			'padding-top': 30,					// padding-top
			'padding-right': 30,				// padding-right
			'padding-bottom': 20,				// padding-bottom
			'padding-left': 30,					// padding-left

			'group-margin': 40,					// margin value between bar groups
			'bar-margin': 4,					// margin value between bars (in the same group)

			'vertical-label-count': 10,			// label count in the vertical axis
			'vertical-bar-width': 5 			// period bar width of the vertical axis
		},

		// 8. PieChart configuration.
		'piechart': {
			'size-factor': 0.9,					// size factor, 0.9 means using 90% area to draw the chart
			'sector-border-width': 1,			// border thickness of pie sectors
			'hole-radius': 0,					// hold radius, set this value to a positive number to make a RingChart

			'label-size': 11,					// label font size
			'label-distance': 5,				// distance from the outer size of pir and label
			'label-bar-width': 1,				// label pointer line thickness
			'label-bar-color': '#555',			// label pointer line color
			'label-bar-alpha': 1,				// label pointer line opacity
			'label-bar-length1': 5,				// label pointer first part length
			'label-bar-length2': 10,			// label pointer second part length
			
			'horizontal-offset': 0,				// chart center horizontal offset
			'vertical-offset': 0 				// chart center vertical offset
		},

		// 9. RadarChart configuration.
		'radarchart': {
			'size-factor': 0.9,					// size factor, 0.9 means using 90% area to draw the chart
			
			'outer-border-width': 1,			// outer border thickness
			'outer-border-color': '#999',		// outer border color
			'outer-border-alpha': 1,			// outer border opacity
			'outer-background-color': '#FFF',	// outer background color
			'outer-background-alpha': 1,		// outer background opacity
			
			'inner-border-width': 1,			// inner border thickness
			'inner-border-color': '#CCC',		// inner border color
			'inner-border-alpha': 1,			// inner border opacity
			'inner-background-color': '#F9F9F9',// inner background color
			'inner-background-alpha': 1,		// inner background opacity
			
			'axis-width': 2,					// radius axis thickness
			'axis-color': '#999',				// radius axis color
			'axis-alpha': 1,					// radius axis opacity
			
			'circle-min-radius': 30,			// radar circle min radius
			'circle-border-width': 2,			// radar circle line thickness
			'circle-background-alpha': 0.1,		// radar circle background opacity
												// (use this value instead of light-alpha of the color)
			
			'label-distance': 15,				// distance between outer border to label
			'label-color': '#555',				// label font color
			'label-size': 12,					// label font size
			'label-rotation': false,			// is label rotated

			'horizontal-offset': 0,				// chart center horizontal offset
			'vertical-offset': 0 				// chart center vertical offset
		},

		// 10. HeatMap
		'heatmap': {
			'horizontal-margin': 4,				// horizontal margin between boxes
			'vertical-margin': 4,				// vertical margin between boxes
			'box-border-width': 1,				// box border thickness
			'label-size': 12,					// box label font size
			'label-color': '#FFF',				// box label font color
			'label-alpha': 1,					// box label font opacity
			
			'horizontal-count': undefined,		// horizontal box count, set this value to undefined to use auto layout
			'vertical-count': undefined,		// vertical box count, set this value to undefined to use auto layout
			
			'color': [							// color definition for HeatMap, from light to dark.
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

		// 11. TagCloud
		'tagcloud': {
			'levels': 10,						// size levels
			'text-min-size': 10,				// min font size
			'text-max-size': 55,				// max font size
			'row-count': 5,						// row count
			'horizontal-margin': 5,				// horizontal margin value between texts
			'vertical-margin': -10,				// vertical margin value between text lines
			'color': [							// color definition for TagCloud, from light to dark.
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

		// 10. SmithGraph, TBD
		'smithgraph': {
			'size-factor': 0.9,
			'horizontal-offset': 0,
			'vertical-offset': 0
		},

		// 0. Global color definition.
		'color': [								// color definition, from light to dark.
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