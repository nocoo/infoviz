![InfoViz](http://infoviz.org/images/infoviz_logo_small.png)

InfoViz, an information visualization library based on [Raphaël](http://raphaeljs.com/).

#AxisCharts

## LineChart

	infoviz.chart(
		$('.infoviz'), 
		'linechart', 
		{
			'vertical_axis_name': 'Vertical',
			'horizental_axis_name': 'Horizental',
			'type': 'discrete',
			'horizental_field': 'F2',
			'vertical_field': 'F1',
			'data': {
				'line1': {
					'name': 'China',
					'data': [
						{ 'F1': 1, 'F2': 'A', 'F3': 3 },
						{ 'F1': 42, 'F2': 'B', 'F3': 6 },
						{ 'F1': 7, 'F2': 'C', 'F3': 9 },
						{ 'F1': 110, 'F2': 'D', 'F3': 12 },
						{ 'F1': 123, 'F2': 'E', 'F3': 15 }
					]
				},
				'line2': {
					'name': 'Unite States',
					'data': [
						{ 'F1': 13, 'F2': 'A', 'F3': 15 },
						{ 'F1': 10, 'F2': 'B', 'F3': 12 },
						{ 'F1': 72, 'F2': 'C', 'F3': 9 },
						{ 'F1': 1, 'F2': 'D', 'F3': 3 },
						{ 'F1': 4, 'F2': 'E', 'F3': 6 }
					]
				},
				'line3': {
					'name': 'Unite Kingdom',
					'data': [
						{ 'F1': 19, 'F2': 'A', 'F3': 15 },
						{ 'F1': 20, 'F2': 'B', 'F3': 12 },
						{ 'F1': 22, 'F2': 'C', 'F3': 9 },
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
						{ 'F1': 9, 'F2': 'A', 'F3': 15 },
						{ 'F1': 90, 'F2': 'B', 'F3': 12 },
						{ 'F1': 92, 'F2': 'C', 'F3': 9 },
						{ 'F1': 91, 'F2': 'D', 'F3': 3 },
						{ 'F1': 52, 'F2': 'E', 'F3': 6 }
					]
				}
			}
		}
	);

### License

(The MIT License)

Copyright (c) 2012 Zheng Li

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.