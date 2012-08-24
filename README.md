![InfoViz](http://infoviz.org/images/infoviz_logo_small.png)

InfoViz, an information visualization library based on [Raphaël](http://raphaeljs.com/).

#1 AxisCharts

## 1.1 LineChart

![LineChart](http://infoviz.org/examples/linechart.png "LineChart")

A LineChart has a enumerable as horizontal field, and a value field as vertical field.

Here is how to create a discrete LineChart.

Demo: [Click Here](http://infoviz.org/linechart.html)

	$.InfoViz.chart(
		$('.infoviz'), 
		'linechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizontal_axis_name': 'Horizental',
			'type': 'discrete',
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

Demo: [Click Here](http://infoviz.org/bubblechart.html)

	$.InfoViz.chart(
		$('.infoviz'), 
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
				{ 'F1': 42,  'F2': 22, 'F3': 6, 'F4': 'USA' },
				{ 'F1': 7,   'F2': 33, 'F3': 9, 'F4': 'RUS' },
				{ 'F1': 110, 'F2': 12, 'F3': 9, 'F4': 'CAN' },
				{ 'F1': 50,  'F2': 19, 'F3': 2, 'F4': 'FRA' },
				{ 'F1': 29,  'F2': 22, 'F3': 4, 'F4': 'VET' },
				{ 'F1': 2,   'F2': 3,  'F3': 1, 'F4': 'JPN' }
			]
		}
	);

# 2 Configuration

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
			'logo-height': 23
		},
		'grid': {
			'padding-top': 10,
			'padding-right': 10,
			'padding-bottom': 0,
			'padding-left': 0,

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
			'vertical-label-spacing': 50,
			'vertical-label-size': 12,
			'vertical-label-color': '#555',
			'vertical-name-size': 12,
			'vertical-name-color': '#000',

			'horizontal-label-margin': 5,
			'horizontal-label-spacing': 20,
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
			'vertical_label_count': 10,
			'vertical_bar_width': 5
		},
		'color': [
			{ 'color': '#66B3DD', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#EF7D31', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#ABC93C', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#E05170', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#297FB5', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#F5BE21', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#5ABABB', 'dark-alpha': 1, 'light-alpha': 0.5 },
			{ 'color': '#9D66A4', 'dark-alpha': 1, 'light-alpha': 0.5 }
		]
	};

### License

(The MIT License)

Copyright (c) 2012 Zheng Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.