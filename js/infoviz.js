/*
	InfoViz
	@author  Zheng Li <lizheng@lizheng.me>
	@github https://github.com/nocoo/InfoViz
	@license MIT
	@version 0.2.4
*/

;(function() {
	if(InfoViz) return;

	var InfoViz = {};
	var tooltip_border, tooltip_title, tooltip_content, tooltip_id, tooltip_timer;

	InfoViz.version = function() { return '0.2.4' };

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
			'logo-height': 17,					// logo height
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
			'label-color': '#FFF',				// bubble circle label text color

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
			'circle-border-width': 1.5,			// radar circle line thickness
			'circle-background-alpha': 0.2,		// radar circle background opacity
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
			
			'color': [							// color definition for HeatMap, from light to dark
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
			'color': [							// color definition for TagCloud, from light to dark
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

		// 12. SmithGraph
		'smithgraph': {
			'size-factor': 1,					// size factor, 0.9 means using 90% area to draw the chart
			'bar-width': undefined,				// radial bar width, in angle. set to undefined to use auto value
			'bar-border-width': 1,				// border thickness of radial bars
			'bar-min-height': 15,				// min bar height
			'edge-margin': 5,					// distance between edge and node bar
			'edge-border-width': 1,				// border thickness of radial edges
			'edge-background-alpha': 0.2,		// edge background opacity
			'hole-radius': 300,					// hole radius

			'horizontal-offset': 0,				// graph center horizontal offset
			'vertical-offset': 0,				// graph center vertical offset

			'edge-color': [						// color definition for SmithGraph edges, from light to dark
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

		// 13. RadialChart
		'radialchart': {
			'size-factor': 0.9,					// size factor, 0.9 means using 90% area to draw the chart
			'bar-width': 15,					// radial bar width, in angle. set to undefined to use auto value
			'bar-border-width': 1,				// border thickness of radial bars
			'bar-min-height': 15,				// min bar height
			'hole-radius': 50,					// hole radius

			'label-enabled': true,				// if label is visible
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

		// 14. StackChart configuration.
		'stackchart': {
			'padding-top': 30,					// padding-top
			'padding-right': 30,				// padding-right
			'padding-bottom': 0,				// padding-bottom
			'padding-left': 30,					// padding-left

			'group-margin': 40,					// margin value between bar groups
			'bar-margin': 0,					// margin value between bars (in the same group)

			'vertical-label-count': 10,			// label count in the vertical axis
			'vertical-bar-width': 5 			// period bar width of the vertical axis
		},

		// 0. Global color definition.
		'color': [								// color definition, from light to dark
			{ 'color': '#3A89C9', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#EB540A', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#5AAD34', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#FECC09', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#6699FF', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#14B694', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#104386', 'dark-alpha': 1, 'light-alpha': 0.6 },
			{ 'color': '#DA0101', 'dark-alpha': 1, 'light-alpha': 0.6 }
		]
	};

	/* 0. Basic and Accessories */
	InfoViz.chart = function(element, type, data, overwrite_options, callback) {
		var target_id = $(element).attr('id') ? $(element).attr('id') : 'infoviz_' + guid();
		$(element).attr('id', target_id);

		var paper = Raphael(target_id, $(element).width(), $(element).height());
		var options = merge_options(overwrite_options);

		// Default area.
		var area = {
			'top-left': [ options['layout']['padding-left'], options['layout']['padding-top'] ],
			'top-right': [ paper.width - options['layout']['padding-right'], options['layout']['padding-top'] ],
			'bottom-left': [ options['layout']['padding-left'], paper.height - options['layout']['padding-bottom'] ],
			'bottom-right': [ paper.width - options['layout']['padding-right'], paper.height - options['layout']['padding-bottom'] ],
			'width': paper.width,
			'height': paper.height
		};

		// Default background.
		paper.rect(0, 0, paper.width, paper.height).attr({
			'stroke': 'none',
			'fill': options['layout']['background-color'],
			'fill-opacity': options['layout']['background-alpha']
		});

		switch(type) {
			case 'linechart': {
				area = InfoViz.draw_axis_background(paper, data, options);
				InfoViz.draw_linechart(paper, area, data, options, callback);

				break;
			}
			case 'bubblechart': {
				area = InfoViz.draw_axis_background(paper, data, options);
				InfoViz.draw_bubblechart(paper, area, data, options, callback);

				break;
			}
			case 'barchart': {
				area = InfoViz.draw_axis_background(paper, data, options);
				InfoViz.draw_barchart(paper, area, data, options, callback);

				break;
			}
			case 'piechart': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_piechart(paper, area, data, options, callback);
				break;
			}
			case 'radarchart': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_radarchart(paper, area, data, options, callback);
				break;
			}
			case 'heatmap': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_heatmap(paper, area, data, options, callback);
				break;
			}
			case 'tagcloud': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_tagcloud(paper, area, data, options, callback);
				break;
			}
			case 'smithgraph': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_smithgraph(paper, area, data, options, callback);
				break;
			}
			case 'radialchart': {
				area = InfoViz.draw_empty_background(paper, data, options);
				InfoViz.draw_radialchart(paper, area, data, options, callback);
				break;
			}
			case 'stackchart': {
				area = InfoViz.draw_axis_background(paper, data, options);
				InfoViz.draw_stackchart(paper, area, data, options, callback);

				break;
			}
			default: {
				paper.text(area['width'] / 2, area['height'] / 2, 'Type "' + type +'" not supported.').attr({ 'font-size': 12, 'fill': '#000' }).translate(0.5, 0.5);
				break;
			}
		}

		// Draw InfoViz logo.
		if(options['layout']['logo-enabled']) {
			var x, y;

			switch(options['layout']['logo-position']) {
				default:
				case 'top-right': {
					x = area['top-right'][0] - options['layout']['logo-width'];
					y = area['top-right'][1];
					break;
				}
				case 'top-left': {
					x = area['top-left'][0];
					y = area['top-right'][1];
					break;
				}
				case 'bottom-left': {
					x = area['bottom-left'][0];
					y = area['bottom-left'][1] - options['layout']['logo-height'];
					break;
				}
				case 'bottom-right': {
					x = area['bottom-right'][0] - options['layout']['logo-width'];
					y = area['bottom-right'][1] - options['layout']['logo-height'];
					break;
				}
			}

			var logo = paper.image(
				'./images/infoviz_logo_tiny.png', 
				x, y,
				options['layout']['logo-width'],
				options['layout']['logo-height']).attr({ 'cursor': 'pointer' }).translate(0.5, 0.5);
			logo.click(function() { window.location.href = 'https://github.com/nocoo/InfoViz'; });
		}
	};

	InfoViz.draw_empty_background = function(paper, data, overwrite_options) {
		if(!paper) return idb('Paper is empty.');

		var options = merge_options(overwrite_options), chart_area = {},
			paper_width = paper.width, paper_height = paper.height, cache = [], x, y;

		// Draw background.
		var p_background = paper.rect(0, 0, paper_width, paper_height);
		p_background.attr({
			'stroke': 'none',
			'fill': options['layout']['background-color'],
			'fill-opacity': options['layout']['background-alpha']
		});

		// Draw border.
		var p_border = paper.rect(
			options['layout']['padding-left'],
			options['layout']['padding-top'], 
			paper_width - options['layout']['padding-left'] - options['layout']['padding-right'],
			paper_height - options['layout']['padding-top'] - options['layout']['padding-bottom'],
			options['grid']['border-radius']
		);

		p_border.attr({
			'stroke': options['grid']['border-color'],
			'stroke-width': options['grid']['border-width'],
			'stroke-opacity': options['grid']['border-alpha'],
			'fill': options['grid']['background-color'],
			'fill-opacity': options['grid']['background-alpha']
		});
		p_border.translate(0.5, 0.5);

		// bottom, left
		x = options['layout']['padding-left'] + 
			options['grid']['border-width'] + 
			options['grid']['padding-left'];

		y = paper_height - 
			options['layout']['padding-bottom'] - 
			options['grid']['border-width'] - 
			options['grid']['padding-bottom'];

		chart_area['bottom-left'] = [ x, y ];

		// top, left
		y = options['layout']['padding-top'] +
			options['grid']['border-width'] + 
			options['grid']['padding-top'];

		chart_area['top-left'] = [ x, y ];

		// top, right
		x = paper_width - 
			options['layout']['padding-right'] - 
			options['grid']['border-width'] - 
			options['grid']['padding-right'];

		y = chart_area['top-left'][1];

		chart_area['top-right'] = [ x, y ];

		// bottom, right
		y = chart_area['bottom-left'][1];

		chart_area['bottom-right'] = [ x, y ];

		chart_area['width'] = chart_area['top-right'][0] - chart_area['top-left'][0];
		chart_area['height'] = chart_area['bottom-right'][1] - chart_area['top-right'][1];

		return chart_area;
	};

	InfoViz.draw_axis_background = function(paper, data, overwrite_options) {
		if(!paper) return idb('Paper is empty.');

		var options = merge_options(overwrite_options), chart_area = {},
			paper_width = paper.width, paper_height = paper.height, cache = [], x, y;

		// Draw background.
		var p_background = paper.rect(0, 0, paper_width, paper_height);
		p_background.attr({
			'stroke': 'none',
			'fill': options['layout']['background-color'],
			'fill-opacity': options['layout']['background-alpha']
		});

		// Draw border.
		var p_border = paper.rect(
			options['layout']['padding-left'],
			options['layout']['padding-top'], 
			paper_width - options['layout']['padding-left'] - options['layout']['padding-right'],
			paper_height - options['layout']['padding-top'] - options['layout']['padding-bottom'],
			options['grid']['border-radius']
		);

		p_border.attr({
			'stroke': options['grid']['border-color'],
			'stroke-width': options['grid']['border-width'],
			'stroke-opacity': options['grid']['border-alpha'],
			'fill': options['grid']['background-color'],
			'fill-opacity': options['grid']['background-alpha']
		});
		p_border.translate(0.5, 0.5);

		// bottom, left
		x = options['layout']['padding-left'] + 
			options['grid']['border-width'] + 
			options['grid']['padding-left'] + 
			options['grid']['vertical-label-margin'] + 
			options['grid']['vertical-label-spacing'] + 
			options['grid']['vertical-label-margin'];

		y = paper_height - 
			options['layout']['padding-bottom'] - 
			options['grid']['border-width'] - 
			options['grid']['padding-bottom'] -
			options['grid']['horizontal-label-margin'] - 
			options['grid']['horizontal-label-spacing'] - 
			options['grid']['horizontal-label-margin'];

		chart_area['bottom-left'] = [ x, y ];
		
		// top, left
		y = options['layout']['padding-top'] +
			options['grid']['border-width'] + 
			options['grid']['padding-top'];

		chart_area['top-left'] = [ x, y ];

		// top, right
		x = paper_width - 
			options['layout']['padding-right'] - 
			options['grid']['border-width'] - 
			options['grid']['padding-right'];

		y = chart_area['top-left'][1];

		chart_area['top-right'] = [ x, y ];

		// bottom, right
		y = chart_area['bottom-left'][1];

		chart_area['bottom-right'] = [ x, y ];

		chart_area['width'] = chart_area['top-right'][0] - chart_area['top-left'][0];
		chart_area['height'] = chart_area['bottom-right'][1] - chart_area['top-right'][1];

		// Draw vertical axis.
		cache = [];
		cache.push('M' + chart_area['bottom-left'][0] + ',' + chart_area['bottom-left'][1]);
		cache.push('L' + chart_area['top-left'][0] + ',' + chart_area['top-left'][1]);

		var p_vertical_axis = paper.path(cache.join(''));
		p_vertical_axis.attr({
			'stroke': options['grid']['axis-color'],
			'stroke-width': options['grid']['axis-width'],
			'stroke-opacity': options['grid']['axis-alpha']
		});
		p_vertical_axis.translate(0.5, 0.5);

		// Draw horizontal axis.
				cache = [];
		cache.push('M' + chart_area['bottom-left'][0] + ',' + chart_area['bottom-left'][1]);
		cache.push('L' + chart_area['bottom-right'][0] + ',' + chart_area['bottom-right'][1]);

		var p_horizontal_axis = paper.path(cache.join(''));
		p_horizontal_axis.attr({
			'stroke': options['grid']['axis-color'],
			'stroke-width': options['grid']['axis-width'],
			'stroke-opacity': options['grid']['axis-alpha']
		});
		p_horizontal_axis.translate(0.5, 0.5);

		var p_dot_bottom_left = paper.circle(chart_area['bottom-left'][0], chart_area['bottom-left'][1], options['grid']['axis-dot-size']);
		p_dot_bottom_left.attr({
			'stroke': 'none',
			'fill': options['grid']['axis-color'],
			'fill-opacity': options['grid']['axis-alpha']
		});
		p_dot_bottom_left.translate(0.5, 0.5);

		var p_dot_top_left = paper.circle(chart_area['top-left'][0], chart_area['top-left'][1], options['grid']['axis-dot-size']);
		p_dot_top_left.attr({
			'stroke': 'none',
			'fill': options['grid']['axis-color'],
			'fill-opacity': options['grid']['axis-alpha']
		});
		p_dot_top_left.translate(0.5, 0.5);

		var p_dot_bottom_right = paper.circle(chart_area['bottom-right'][0], chart_area['bottom-right'][1], options['grid']['axis-dot-size']);
		p_dot_bottom_right.attr({
			'stroke': 'none',
			'fill': options['grid']['axis-color'],
			'fill-opacity': options['grid']['axis-alpha']
		});
		p_dot_bottom_right.translate(0.5, 0.5);

		// Vertical axis name.
		if(data['vertical_axis_name']) {
			x = chart_area['top-left'][0] - options['grid']['vertical-label-margin'] * 2;
			y = chart_area['top-left'][1] + options['grid']['vertical-name-size'] / 2;

			//idb([x, y]);

			var vertical_axis_name = paper.text(x, y, data['vertical_axis_name']);
			vertical_axis_name.attr({
				'text-anchor': 'end',
				'font-weight': 'bold',
				'font-size': options['grid']['vertical-name-size'],
				'fill': options['grid']['vertical-name-color']
			});
		}

		if(data['horizontal_axis_name']) {
			x = chart_area['bottom-right'][0];
			y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

			//idb([x, y]);

			var horizontal_axis_name = paper.text(x, y, data['horizontal_axis_name']);
			horizontal_axis_name.attr({
				'text-anchor': 'end',
				'font-weight': 'bold',
				'font-size': options['grid']['horizontal-name-size'],
				'fill': options['grid']['horizontal-name-color']
			});
		}

		return chart_area;
	};

	InfoViz.draw_legend = function(paper, chart_area, legend_data, overwrite_options) {
		if(!paper || !legend_data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, j, item;

		if(!options['legend']['legend-enabled']) return;

		var width = options['legend']['width'], height = options['legend']['height'];

		if(!width) {
			// Calculate width.
			var test_text, this_box, max_width = -Infinity;

			for(i = 0; i < legend_data.length; ++i) {
				item = legend_data[i];
				test_text = paper.text(-1000, -1000, item['label']).attr({
					'font-size': options['legend']['label-size']
				}).translate(0.5, 0.5);
				this_box = test_text.getBBox();

				if(this_box.width > max_width) {
					max_width = this_box.width;
				}
			}

			width = 
				max_width + 
				options['legend']['padding-left'] + 
				options['legend']['padding-right'] + 
				options['legend']['indicator-margin-left'] +
				options['legend']['indicator-margin-right'] +
				options['legend']['indicator-size'];
		};

		if(!height) {
			// Calculate height.
			height = options['legend']['padding-top'] + options['legend']['padding-bottom'];
			for(i = 0; i < legend_data.length; ++i) {
				height += options['legend']['indicator-margin-top'] + options['legend']['indicator-margin-bottom'] + options['legend']['indicator-size'];
			}
		}

		switch(options['legend']['legend-position']) {
			default:
			case 'top-right': {
				x = chart_area['top-right'][0] - width - options['legend']['margin-right'];
				y = chart_area['top-right'][1] + options['legend']['margin-top'];
				break;
			}
			case 'top-left': {
				x = chart_area['top-left'][0] + options['legend']['margin-left'];
				y = chart_area['top-right'][1] + options['legend']['margin-top'];
				break;
			}
			case 'bottom-left': {
				x = chart_area['bottom-left'][0] + options['legend']['margin-left'];
				y = chart_area['bottom-left'][1] - height - options['legend']['margin-bottom'];
				break;
			}
			case 'bottom-right': {
				x = chart_area['bottom-right'][0] - width - options['legend']['margin-right'];
				y = chart_area['bottom-left'][1] - height - options['legend']['margin-bottom'];
				break;
			}
		}

		var p_border = paper.rect(x, y, width, height, options['legend']['border-radius']).attr({
			'stroke': options['legend']['border-color'],
			'stroke-opacity': options['legend']['border-alpha'],
			'stroke-width': options['legend']['border-width'],
			'fill': options['legend']['background-color'],
			'fill-opacity': options['legend']['background-alpha']
		}).translate(0.5, 0.5);

		var p_indicators = [], p_labels = [];
		var this_indicator, this_label;

		x += options['legend']['padding-left'];
		y += options['legend']['padding-top'];

		for(i = 0; i < legend_data.length; ++i) {
			item = legend_data[i];

			// Indicator.
			switch(item['type']) {
				default:
				case 'box': {
					this_indicator = paper.rect(
						x + options['legend']['indicator-margin-left'], 
						y + options['legend']['indicator-margin-top'], 
						options['legend']['indicator-size'],
						options['legend']['indicator-size']
					).attr({
						'fill': item['color']['color'],
						'fill-opacity': item['color']['light-alpha'],
						'stroke': item['color']['color'],
						'stroke-opacity': item['color']['dark-alpha'],
						'stroke-width': options['legend']['indicator-border-width']
					}).translate(0.5, 0.5);

					break;
				}
				case 'line': {
					cache = [];
					cache.push('M' + (x + options['legend']['indicator-margin-left']) + ',' + (y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size']));
					cache.push('L' + (x + options['legend']['indicator-margin-left'] + 2 * options['legend']['indicator-size'] / 5) + ',' + (y + options['legend']['indicator-margin-top'] + 2 * options['legend']['indicator-size'] / 5));
					cache.push('L' + (x + options['legend']['indicator-margin-left'] + 3 * options['legend']['indicator-size'] / 4) + ',' + (y + options['legend']['indicator-margin-top'] + 5 * options['legend']['indicator-size'] / 7));
					cache.push('L' + (x + options['legend']['indicator-margin-left'] + options['legend']['indicator-size']) + ',' + (y + options['legend']['indicator-margin-top']));

					this_indicator = paper.path(cache.join('')).attr({
						'stroke': item['color']['color'],
						'stroke-opacity': item['color']['dark-alpha'],
						'stroke-width': options['legend']['indicator-border-width']
					}).translate(0.5, 0.5);

					break;
				}
				case 'node': {
					this_indicator = paper.circle(
						x + options['legend']['indicator-margin-left'] + options['legend']['indicator-size'] / 2,
						y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size'] / 2, 
						options['legend']['indicator-size'] / 2
					).attr({
						'fill': item['color']['color'],
						'fill-opacity': item['color']['dark-alpha'],
						'stroke': item['color']['color'],
						'stroke-opacity': item['color']['dark-alpha'],
						'stroke-width': options['legend']['indicator-border-width']
					}).translate(0.5, 0.5);

					break;
				}
				case 'sector': {
					var angle = options['legend']['indicator-sector-angle'] * Math.PI / 180;
					cache = [];
					cache.push('M' + (x + options['legend']['indicator-margin-left']) + ',' + (y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size']));
					cache.push('L' + (x + options['legend']['indicator-margin-left'] + Math.cos(angle) * options['legend']['indicator-size']) + ',' + (y + options['legend']['indicator-margin-top']));
					cache.push('A' + options['legend']['indicator-size'] + ',' + options['legend']['indicator-size'] + ', 0, 0, 1,' + (x + options['legend']['indicator-margin-left'] + options['legend']['indicator-size']) + ',' + (y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size']));
					cache.push('L' + (x + options['legend']['indicator-margin-left']) + ',' + (y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size']));
					cache.push('Z');

					this_indicator = paper.path(cache.join('')).attr({
						'fill': item['color']['color'],
						'fill-opacity': item['color']['light-alpha'],
						'stroke': item['color']['color'],
						'stroke-opacity': item['color']['dark-alpha'],
						'stroke-width': options['legend']['indicator-border-width']
					}).translate(0.5, 0.5);

					break;
				}
				case 'circle': {
					this_indicator = paper.circle(
						x + options['legend']['indicator-margin-left'] + options['legend']['indicator-size'] / 2,
						y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size'] / 2, 
						options['legend']['indicator-size'] / 2
					).attr({
						'fill': item['color']['color'],
						'fill-opacity': item['color']['light-alpha'],
						'stroke': item['color']['color'],
						'stroke-opacity': item['color']['dark-alpha'],
						'stroke-width': options['legend']['indicator-border-width']
					}).translate(0.5, 0.5);

					break;
				}
			}
			
			p_indicators.push(this_indicator);

			// Label.
			this_label = paper.text(
				x + options['legend']['indicator-margin-left'] + options['legend']['indicator-margin-right'] + options['legend']['indicator-size'], 
				y + options['legend']['indicator-margin-top'] + options['legend']['indicator-size'] / 2,
				item['label']
			).attr({
				'text-anchor': 'start',
				'fill': options['legend']['label-color'] ? options['legend']['label-color'] : item['color']['color'],
				'fill-opacity': options['legend']['label-alpha'],
				'font-size': options['legend']['label-size']
			}).translate(0.5, 0.5);

			y += options['legend']['indicator-size'] + options['legend']['indicator-margin-top'] + options['legend']['indicator-margin-bottom'];
		}
	};

	InfoViz.draw_tooltip = function(paper, x, y, id, title, content, color, overwrite_options) {
		if(id === tooltip_id) return;

		var options = merge_options(overwrite_options);
		var test_text, this_box, title_width = 0, title_height = 0, content_width = 0, content_height = 0;

		// Remove old tooltip
		hide_tooltip(options);

		tooltip_id = id;

		// Test title size.
		test_text = paper.text(-1000, -1000, title).attr({
			'font-weight': options['tooltip']['title-text-weight'],
			'font-size': options['tooltip']['title-text-size']
		}).translate(0.5, 0.5);
		this_box = test_text.getBBox();
		title_width = this_box.width;
		title_height = this_box.height;

		// Test content size.
		test_text = paper.text(-1000, -1000, content).attr({
			'font-weight': options['tooltip']['content-text-weight'],
			'font-size': options['tooltip']['content-text-size']
		}).translate(0.5, 0.5);
		this_box = test_text.getBBox();
		content_width = this_box.width;
		content_height = this_box.height;

		var tooltip_width = (title_width > content_width) ? title_width : content_width;
		var tooltip_height = title_height + content_height;

		tooltip_width += options['tooltip']['padding-left'] + options['tooltip']['padding-right'];
		tooltip_height += options['tooltip']['padding-top'] + options['tooltip']['padding-bottom'] + options['tooltip']['line-spacing'];

		// Add up offset.
		x -= (tooltip_width / 2) + options['tooltip']['horizontal-offset'];

		if(options['tooltip']['vertical-offset'] <= 0) {
			y -= (tooltip_height - options['tooltip']['vertical-offset']);
		} else {
			y += tooltip_height + options['tooltip']['vertical-offset'];
		}

		// Check if tooltip is out of paper.
		if(x < options['layout']['padding-left']) {
			x = options['layout']['padding-left'];
		}
		if(x + tooltip_width > paper.width - options['layout']['padding-right']) {
			x = paper.width - options['layout']['padding-right'] - tooltip_width;
		}

		if(y < options['layout']['padding-top']) {
			y = options['layout']['padding-top'];
		}
		if(y + tooltip_height > paper.height - options['layout']['padding-bottom']) {
			y = paper.height - options['layout']['padding-bottom'] - tooltip_height;
		}

		tooltip_border = paper.rect(x, y, tooltip_width, tooltip_height, options['tooltip']['border-radius']).attr({
			'stroke': options['tooltip']['border-color'],
			'stroke-width': options['tooltip']['border-width'],
			'stroke-opacity': options['tooltip']['border-alpha'],
			'fill': options['tooltip']['background-color'],
			'fill-opacity': options['tooltip']['background-alpha'],
			'opacity': 0
		}).translate(0.5, 0.5);

		tooltip_title = paper.text(x + options['tooltip']['padding-left'], y + options['tooltip']['padding-top'] + title_height / 2, title).attr({
			'fill': options['tooltip']['title-text-color'] ? options['tooltip']['title-text-color'] : color['color'],
			'font-size': options['tooltip']['title-text-size'],
			'text-anchor': 'start',
			'font-weight': options['tooltip']['title-text-weight'],
			'fill-opacity': options['tooltip']['title-text-alpha'],
			'opacity': 0
		}).translate(0.5, 0.5);

		tooltip_content = paper.text(x + options['tooltip']['padding-left'], y + options['tooltip']['padding-top'] + content_height + options['tooltip']['line-spacing'] + content_height / 2, content).attr({
			'fill': options['tooltip']['content-text-color'],
			'font-size': options['tooltip']['content-text-size'],
			'text-anchor': 'start',
			'font-weight': options['tooltip']['content-text-weight'],
			'fill-opacity': options['tooltip']['content-text-alpha'],
			'opacity': 0
		}).translate(0.5, 0.5);

		// Animation.
		tooltip_border.stop();
		tooltip_title.stop();
		tooltip_content.stop();
		tooltip_border.animate({ 'opacity': 1 }, options['layout']['speed']);
		tooltip_title.animate({ 'opacity': 1 }, options['layout']['speed']);
		tooltip_content.animate({ 'opacity': 1 }, options['layout']['speed']);

		// Hide tooltip timer setup.
		clearTimeout(tooltip_timer);
		if(options['tooltip']['hide-after']) {
			tooltip_timer = setTimeout(function() {
				hide_tooltip();
			}, options['tooltip']['hide-after']);
		}
	};

	/* 1. AxisCharts */
	InfoViz.draw_linechart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y;
		var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
		var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
		var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['node_x'];
			y = this.data('tooltip')['node_y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};

		// Scan horizontal and vertical fields.
		for(var line in lines) {
			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				// horizontal field.
				if(item[h_field_name]) {
					this_h = item[h_field_name];
				} else {
					this_h = 'N/A';
				}

				if(this_h > h_max) {
					h_max = this_h;
				}
				if(this_h < h_min) {
					h_min = this_h;
				}

				if(in_array(this_h, h_fields) === -1) {
					h_fields.push(this_h);
				}

				// vertical field.
				if(item[v_field_name]) {
					this_v = item[v_field_name];
				} else {
					this_v = 'N/A';
				}

				if(this_v > v_max) {
					v_max = this_v;
				}
				if(this_v < v_min) {
					v_min = this_v;
				}

				if(in_array(this_v, v_fields) === -1) {
					v_fields.push(this_v);
				}
			}
		}

		v_min = Math.floor(v_min / 10) * 10;
		v_max = Math.ceil(v_max / 10) * 10;

		// Mapping position.
		var h_start = chart_area['top-left'][0] + options['linechart']['padding-left'];
		var h_unit = (chart_area['top-right'][0] - options['linechart']['padding-right'] - h_start) / (h_fields.length - 1);
		
		var v_start = chart_area['bottom-left'][1] - options['linechart']['padding-bottom'];
		var v_unit = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (v_max - v_min);
		
		var h_map = {};

		// Vertical labels.
		var v_label_unit = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (options['linechart']['vertical-label-count'] - 1);
		var v_label_value_unit = Math.floor((v_max - v_min) / (options['linechart']['vertical-label-count'] - 1)); // May not be accurate.
		
		cache = [];
		x = chart_area['top-left'][0] - options['linechart']['vertical-bar-width'];
		y = v_start;
		var v_value = v_min;

		for(i = 0; i < options['linechart']['vertical-label-count']; ++i) {
			cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

			paper.path(cache.join('')).attr({
				'stroke': options['grid']['axis-color'],
				'stroke-opacity': options['grid']['axis-alpha'],
				'stroke-width': options['grid']['axis-width']
			}).translate(0.5, 0.5);

			paper.text(x - options['linechart']['vertical-bar-width'], y, v_value).attr({
				'text-anchor': 'end',
				'fill': options['grid']['vertical-label-color'],
				'font-size': options['grid']['vertical-label-size']
			}).translate(0.5, 0.5);

			y -= v_label_unit;
			v_value += v_label_value_unit;
		}

		// grids.
		var p_vertical_grids;
		cache = [];
		x = h_start;
		y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

		for(i = 0; i < h_fields.length; ++i) {
			cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
			cache.push('L' + x + ',' + chart_area['top-left'][1]);
			
			h_map[h_fields[i]] = x;

			// Draw horizontal labels.
			paper.text(x, y, h_fields[i]).attr({
				'text-anchor': 'middle',
				'font-size': options['grid']['horizontal-label-size'],
				'fill': options['grid']['horizontal-label-color']
			}).translate(0.5, 0.5);

			x += h_unit;
		}

		p_vertical_grids = paper.path(cache.join(''));
		p_vertical_grids.attr({
			'stroke': options['grid']['grid-color'],
			'stroke-dasharray': '--..',
			'stroke-linecap': 'butt',
			'stroke-width': options['grid']['grid-width'],
			'stroke-opacity': options['grid']['grid-alpha']
		});
		p_vertical_grids.translate(0.5, 0.5);

		// Lines.
		var index = 0, color;
		var legend_data = [];
		for(var line in lines) {
			var p_line, p_node, p_label, todo = [];

			cache = [];
			color = options['color'][(index % options['color'].length)];
			
			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				x = h_map[item[h_field_name]];
				y = v_start - item[v_field_name] * v_unit + options['linechart']['circle-radius'];

				if(i === 0) {
					cache.push('M' + x + ',' + y);
				} else {
					cache.push('L' + x + ',' + y);
				}

				todo.push({ 'x': x, 'y': y, 'v_value': item[v_field_name], 'h_value': item[h_field_name], 'data': item });
			}

			p_line = paper.path(cache.join(''));
			p_line.attr({
				'stroke': color['color'],
				'stroke-opacity': color['light-alpha'],
				'stroke-width': options['linechart']['line-width']
			}).translate(0.5, 0.5);

			p_label = paper.text(x + options['linechart']['circle-radius'] * 2, y, lines[line]['name']);
			p_label.attr({
				'fill': color['color'],
				'text-anchor': 'start',
				'font-size': options['linechart']['label-size']
			}).translate(0.5, 0.5);

			// Circle.
			for(i = 0; i < todo.length; ++i) {
				if(options['linechart']['custom-circle']) {
					p_node = paper.image(
						options['linechart']['custom-circle'],
						todo[i]['x'] - options['linechart']['circle-radius'],
						todo[i]['y'] - options['linechart']['circle-radius'],
						options['linechart']['circle-radius'] * 2, 
						options['linechart']['circle-radius'] * 2
					).attr({
						'cursor': 'pointer'
					}).translate(0.5, 0.5);
				} else {
					p_node = paper.circle(todo[i]['x'], todo[i]['y'], options['linechart']['circle-radius']).attr({
						'stroke': color['color'],
						'stroke-opacity': color['dark-alpha'],
						'stroke-width': options['linechart']['line-width'],
						'fill': color['color']
					}).translate(0.5, 0.5);
				}

				// Action.
				if(callback && typeof(callback) === 'function') {
					p_node.data('info', {
						'data': todo[i]['data'],
						'x': todo[i]['x'],
						'y': todo[i]['y'],
						'v_value': todo[i]['v_value'],
						'h_value': todo[i]['h_value']
					});

					p_node.click(element_action);
				}

				// Tooltip.
				if(data['tooltip_title'] || data['tooltip_content']) {
					var title = data['tooltip_title'];
					var content = data['tooltip_content'];
					
					for(var p in todo[i]['data']) {
						title = title.replace('{' + p + '}', todo[i]['data'][p]);
						content = content.replace('{' + p + '}', todo[i]['data'][p]);
					}

					p_node.data('tooltip', {
						'id': line + i,
						'title': title,
						'content': content,
						'color': color,
						'node_x': todo[i]['x'],
						'node_y': todo[i]['y']
					});
					p_node.hover(element_tooltip);
				}
			}

			// Add legend data.
			legend_data.push({
				'label': lines[line]['name'],
				'color': color,
				'type': 'line'
			});

			index++;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);
	};

	InfoViz.draw_barchart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, line_count = 0;
		var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
		var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
		var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;

		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['bar_top_x'];
			y = this.data('tooltip')['bar_top_y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		// Scan horizontal and vertical fields.
		for(var line in lines) {
			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				// horizontal field.
				if(item[h_field_name]) {
					this_h = item[h_field_name];
				} else {
					this_h = 'N/A';
				}

				if(this_h > h_max) {
					h_max = this_h;
				}
				if(this_h < h_min) {
					h_min = this_h;
				}

				if(in_array(this_h, h_fields) === -1) {
					h_fields.push(this_h);
				}

				// vertical field.
				if(item[v_field_name]) {
					this_v = item[v_field_name];
				} else {
					this_v = 'N/A';
				}

				if(this_v > v_max) {
					v_max = this_v;
				}
				if(this_v < v_min) {
					v_min = this_v;
				}

				if(in_array(this_v, v_fields) === -1) {
					v_fields.push(this_v);
				}
			}

			++line_count;
		}

		v_min = Math.floor(v_min / 10) * 10;
		v_max = Math.ceil(v_max / 10) * 10;

		// Mapping position.
		var h_start = chart_area['top-left'][0] + options['barchart']['padding-left'];
		//var h_unit = (chart_area['top-right'][0] - options['barchart']['padding-right'] - h_start) / (h_fields.length - 1);
		
		var v_start = chart_area['bottom-left'][1] - options['barchart']['padding-bottom'];
		var v_unit = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (v_max - v_min);
		
		var h_map = {};


		// Vertical labels.
		var v_label_unit = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (options['barchart']['vertical-label-count'] - 1);
		var v_label_value_unit = Math.floor((v_max - v_min) / (options['barchart']['vertical-label-count'] - 1)); // May not be accurate.
		
		cache = [];
		x = chart_area['top-left'][0] - options['barchart']['vertical-bar-width'];
		y = v_start;
		var v_value = v_min;

		for(i = 0; i < options['barchart']['vertical-label-count']; ++i) {
			cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

			paper.path(cache.join('')).attr({
				'stroke': options['grid']['axis-color'],
				'stroke-opacity': options['grid']['axis-alpha'],
				'stroke-width': options['grid']['axis-width']
			}).translate(0.5, 0.5);


			paper.text(x - options['barchart']['vertical-bar-width'], y, v_value).attr({
				'text-anchor': 'end',
				'fill': options['grid']['vertical-label-color'],
				'font-size': options['grid']['vertical-label-size']
			}).translate(0.5, 0.5);

			y -= v_label_unit;
			v_value += v_label_value_unit;
		}

		// grids.
		var group_width = (chart_area['width'] - options['barchart']['padding-left'] - options['barchart']['padding-right'] - (h_fields.length - 1) * options['barchart']['group-margin']) / h_fields.length;
		var bar_width = (group_width - (line_count - 1) * options['barchart']['bar-margin']) / line_count;

		var p_vertical_grids;
		cache = [];
		x = h_start + group_width / 2;
		y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

		for(i = 0; i < h_fields.length; ++i) {
			cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
			cache.push('L' + x + ',' + chart_area['top-left'][1]);
			
			h_map[h_fields[i]] = x - group_width / 2;

			// Draw horizontal labels.
			paper.text(x, y, h_fields[i]).attr({
				'text-anchor': 'middle',
				'font-size': options['grid']['horizontal-label-size'],
				'fill': options['grid']['horizontal-label-color']
			}).translate(0.5, 0.5);

			x += group_width + options['barchart']['group-margin'];
		}

		p_vertical_grids = paper.path(cache.join(''));
		p_vertical_grids.attr({
			'stroke': options['grid']['grid-color'],
			'stroke-dasharray': '--..',
			'stroke-linecap': 'butt',
			'stroke-width': options['grid']['grid-width'],
			'stroke-opacity': options['grid']['grid-alpha']
		});
		p_vertical_grids.translate(0.5, 0.5);

		// Bars.
		var index = 0, color, p_nodes = [], this_node;
		var legend_data = [];
		for(var line in lines) {
			var p_node;

			color = options['color'][(index % options['color'].length)];
			
			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				x = h_map[item[h_field_name]] + (index) * (bar_width + options['barchart']['bar-margin']);
				y = v_start - item[v_field_name] * v_unit;

				this_node = paper.rect(x, y, bar_width, chart_area['bottom-left'][1] - y - 1);
				this_node.attr({
					'stroke': color['color'],
					'stroke-opacity': color['dark-alpha'],
					'stroke-width': options['barchart']['line-width'],
					'fill': color['color'],
					'fill-opacity': color['light-alpha']
				}).translate(0.5, 0.5);
				p_nodes.push(this_node);

				// Action.
				if(callback && typeof(callback) === 'function') {
					this_node.data('info', {
						'x': x,
						'y': y,
						'h_value': item[h_field_name],
						'v_value': item[v_field_name],
						'data': item
					});
					this_node.click(element_action);
				}

				// Tooltip.
				if(data['tooltip_title'] || data['tooltip_content']) {
					var title = data['tooltip_title'];
					var content = data['tooltip_content'];
					
					for(var p in item) {
						title = title.replace('{' + p + '}', item[p]);
						content = content.replace('{' + p + '}', item[p]);
					}

					this_node.data('tooltip', {
						'id': line + i,
						'title': title,
						'content': content,
						'color': color,
						'bar_top_x': x,
						'bar_top_y': y
					});
					this_node.hover(element_tooltip);
				}
			}

			// Add legend data.
			legend_data.push({
				'label': lines[line]['name'],
				'color': color,
				'type': 'box'
			});

			index++;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		// Animation.
		for(i = 0; i < p_nodes.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					target.stop().animate({ 'fill-opacity': options['color'][0]['dark-alpha'] }, options['layout']['speed'], ">");
				});
				target.mouseout(function () {
					target.stop().animate({ 'fill-opacity': options['color'][0]['light-alpha'] }, options['layout']['speed'], "<");
				});
			})(p_nodes[i]);
		}
	};

	InfoViz.draw_bubblechart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');

		var options = merge_options(overwrite_options), cache = [], i, x, y, size, item;
		var h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity, size_max = -Infinity, size_min = Infinity;

		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		// Scan data.
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['horizontal_field']] > h_max) {
				h_max = item[data['horizontal_field']];
			}
			if(item[data['horizontal_field']] < h_min) {
				h_min = item[data['horizontal_field']];
			}

			if(item[data['vertical_field']] > v_max) {
				v_max = item[data['vertical_field']];
			}
			if(item[data['vertical_field']] < v_min) {
				v_min = item[data['vertical_field']];
			}

			if(item[data['size_field']] > size_max) {
				size_max = item[data['size_field']];
			}
			if(item[data['size_field']] < size_min) {
				size_min = item[data['size_field']];
			}
		}

		// Round.
		h_min = Math.floor(h_min / 10) * 10;
		h_max = Math.ceil(h_max / 10) * 10;
		v_min = Math.floor(v_min / 10) * 10;
		v_max = Math.ceil(v_max / 10) * 10;

		// Setup units.
		var h_start = chart_area['top-left'][0] + options['bubblechart']['padding-left'];
		var h_unit = (chart_area['top-right'][0] - options['bubblechart']['padding-right'] - h_start) / (h_max - h_min);
		var v_start = chart_area['bottom-left'][1] - options['bubblechart']['padding-bottom'];
		var v_unit = (v_start - chart_area['top-left'][1] - options['bubblechart']['padding-top']) / (v_max - v_min);
		var size_start = options['bubblechart']['circle-min-radius'];
		var size_unit = (options['bubblechart']['circle-max-radius'] - size_start) / (size_max - size_min);

		// Draw bubbles.
		var this_h, this_v, this_size, this_label, this_color, this_bubble, this_text;
		var legend_data = [], p_bubbles = [], p_texts = [];
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];
			this_h = item[data['horizontal_field']];
			this_v = item[data['vertical_field']];
			this_size = item[data['size_field']];
			this_label = item[data['label_field']];
			this_color = options['color'][(i % options['color'].length)];
			
			size = size_start + this_size * size_unit;
			x = h_start + this_h * h_unit;
			y = v_start - (this_v - v_min) * v_unit;
			
			this_bubble = paper.circle(x, y, size).attr({
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['bubblechart']['circle-border-width']
			}).translate(0.5, 0.5);

			this_text = paper.text(x, y, this_label).attr({
				'fill': options['bubblechart']['label-color'],
				'font-size': options['bubblechart']['label-size'],
				'text-anchor': 'middle'
			}).translate(0.5, 0.5);

			this_bubble.data('data', item);
			this_text.data('data', item);
			p_bubbles.push(this_bubble);
			p_texts.push(this_text);

			// Add legend data.
			legend_data.push({
				'label': this_label,
				'color': this_color,
				'type': 'circle'
			});

			// Action.
			if(callback && typeof(callback) === 'function') {
				this_bubble.data('info', {
					'x': x,
					'y': y,
					'v_value': this_v,
					'h_value': this_h,
					'data': item
				});
				this_bubble.click(element_action);

				this_text.data('info', {
					'x': x,
					'y': y,
					'v_value': this_v,
					'h_value': this_h,
					'data': item
				});
				this_text.click(element_action);
			}

			// Tooltip.
			if(data['tooltip_title'] || data['tooltip_content']) {
				var title = data['tooltip_title'];
				var content = data['tooltip_content'];
				
				for(var p in item) {
					title = title.replace('{' + p + '}', item[p]);
					content = content.replace('{' + p + '}', item[p]);
				}

				this_bubble.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': x,
					'y': y - size
				});
				this_bubble.hover(element_tooltip);

				this_text.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': x,
					'y': y - size
				});
				this_text.hover(element_tooltip);
			}
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		// Vertical labels.
		var v_label_unit = (v_start - chart_area['top-left'][1] - options['bubblechart']['padding-top']) / (options['bubblechart']['vertical-label-count'] - 1);
		var v_label_value_unit = (v_max - v_min) / (options['bubblechart']['vertical-label-count'] - 1);
		
		cache = [];
		x = chart_area['top-left'][0] - options['bubblechart']['vertical-bar-width'];
		y = v_start;
		var v_value = v_min;

		for(i = 0; i < options['bubblechart']['vertical-label-count']; ++i) {
			cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

			paper.path(cache.join('')).attr({
				'stroke': options['grid']['axis-color'],
				'stroke-opacity': options['grid']['axis-alpha'],
				'stroke-width': options['grid']['axis-width']
			}).translate(0.5, 0.5);

			paper.text(x - options['bubblechart']['vertical-bar-width'], y, v_value.toFixed(2)).attr({
				'text-anchor': 'end',
				'fill': options['grid']['vertical-label-color'],
				'font-size': options['grid']['vertical-label-size']
			}).translate(0.5, 0.5);

			y -= v_label_unit;
			v_value += v_label_value_unit;
		}

		// Horizontal labels.
		var h_label_unit = (chart_area['top-right'][0] - options['bubblechart']['padding-right'] - h_start) / (options['bubblechart']['vertical-label-count'] - 1);
		var h_label_value_unit = (h_max - h_min) / (options['bubblechart']['vertical-label-count'] - 1);

		cache = [];
		x = h_start;
		y = chart_area['bottom-left'][1] + options['bubblechart']['horizontal-bar-width'];
		var h_value = h_min;

		for(i = 0; i < options['bubblechart']['horizontal-label-count']; ++i) {
			cache.push('M' + x + ',' + y + 'L' + x + ',' + chart_area['bottom-left'][1]);

			paper.path(cache.join('')).attr({
				'stroke': options['grid']['axis-color'],
				'stroke-opacity': options['grid']['axis-alpha'],
				'stroke-width': options['grid']['axis-width']
			}).translate(0.5, 0.5);

			paper.text(x, y + options['bubblechart']['horizontal-bar-width'] * 2, h_value.toFixed(2)).attr({
				'fill': options['grid']['horizontal-label-color'],
				'font-size': options['grid']['horizontal-label-size']
			}).translate(0.5, 0.5);

			x += h_label_unit;
			h_value += h_label_value_unit;
		}
	};

	InfoViz.draw_stackchart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, line_count = 0;
		var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
		var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
		var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity, v_sum_max = -Infinity;

		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['bar_top_x'];
			y = this.data('tooltip')['bar_top_y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		// Scan horizontal and vertical fields.
		for(var line in lines) {
			var v_sum = 0;
			
			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				// horizontal field.
				if(item[h_field_name]) {
					this_h = item[h_field_name];
				} else {
					this_h = 'N/A';
				}

				if(this_h > h_max) {
					h_max = this_h;
				}
				if(this_h < h_min) {
					h_min = this_h;
				}

				if(in_array(this_h, h_fields) === -1) {
					h_fields.push(this_h);
				}

				// vertical field.
				if(item[v_field_name]) {
					this_v = item[v_field_name];
				} else {
					this_v = 'N/A';
				}

				if(this_v > v_max) {
					v_max = this_v;
				}
				if(this_v < v_min) {
					v_min = this_v;
				}

				if(in_array(this_v, v_fields) === -1) {
					v_fields.push(this_v);
				}

				v_sum += this_v;
			}

			if(v_sum > v_sum_max) v_sum_max = v_sum;

			++line_count;
		}

		v_min = Math.floor(v_min / 10) * 10;
		v_max = Math.ceil(v_max / 10) * 10;

		// Mapping position.
		var h_start = chart_area['top-left'][0] + options['stackchart']['padding-left'];
		var v_start = chart_area['bottom-left'][1] - options['stackchart']['padding-bottom'];
		var v_unit = (v_start - chart_area['top-left'][1] - options['stackchart']['padding-top'] - options['stackchart']['bar-margin'] * (line_count - 1)) / v_sum_max;
		var h_map = {};

		// Vertical labels.
		var v_label_unit = (v_start - chart_area['top-left'][1] - options['stackchart']['padding-top']) / (options['stackchart']['vertical-label-count'] - 1);
		var v_label_value_unit = Math.floor((v_sum_max - v_min) / (options['stackchart']['vertical-label-count'] - 1)); // May not be accurate.
		
		cache = [];
		x = chart_area['top-left'][0] - options['stackchart']['vertical-bar-width'];
		y = v_start;
		var v_value = v_min;

		for(i = 0; i < options['stackchart']['vertical-label-count']; ++i) {
			cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

			paper.path(cache.join('')).attr({
				'stroke': options['grid']['axis-color'],
				'stroke-opacity': options['grid']['axis-alpha'],
				'stroke-width': options['grid']['axis-width']
			}).translate(0.5, 0.5);

			paper.text(x - options['stackchart']['vertical-bar-width'], y, v_value).attr({
				'text-anchor': 'end',
				'fill': options['grid']['vertical-label-color'],
				'font-size': options['grid']['vertical-label-size']
			}).translate(0.5, 0.5);

			y -= v_label_unit;
			v_value += v_label_value_unit;
		}

		// grids.
		var group_width = (chart_area['width'] - options['stackchart']['padding-left'] - options['stackchart']['padding-right'] - (h_fields.length - 1) * options['barchart']['group-margin']) / h_fields.length;
		var p_vertical_grids;
		cache = [];
		x = h_start + group_width / 2;
		y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

		for(i = 0; i < h_fields.length; ++i) {
			cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
			cache.push('L' + x + ',' + chart_area['top-left'][1]);
			
			h_map[h_fields[i]] = x - group_width / 2;

			// Draw horizontal labels.
			paper.text(x, y, h_fields[i]).attr({
				'text-anchor': 'middle',
				'font-size': options['grid']['horizontal-label-size'],
				'fill': options['grid']['horizontal-label-color']
			}).translate(0.5, 0.5);

			x += group_width + options['stackchart']['group-margin'];
		}

		p_vertical_grids = paper.path(cache.join(''));
		p_vertical_grids.attr({
			'stroke': options['grid']['grid-color'],
			'stroke-dasharray': '--..',
			'stroke-linecap': 'butt',
			'stroke-width': options['grid']['grid-width'],
			'stroke-opacity': options['grid']['grid-alpha']
		});
		p_vertical_grids.translate(0.5, 0.5);

		var group_y = {};
		for(var g in h_map) {
			group_y[g] = v_start;
		}

		// Bars.
		var index = 0, color, p_nodes = [], this_node;
		var legend_data = [];
		for(var line in lines) {
			var p_node, this_height;

			color = options['color'][(index % options['color'].length)];

			for(i = 0; i < lines[line]['data'].length; ++i) {
				item = lines[line]['data'][i];

				this_height = v_unit * item[v_field_name];

				x = h_map[item[h_field_name]];
				y = group_y[item[h_field_name]] - this_height - options['stackchart']['bar-margin'];

				this_node = paper.rect(x, y, group_width, this_height);
				this_node.attr({
					'stroke': color['color'],
					'stroke-opacity': color['dark-alpha'],
					'stroke-width': options['stackchart']['line-width'],
					'fill': color['color'],
					'fill-opacity': color['light-alpha']
				}).translate(0.5, 0.5);
				p_nodes.push(this_node);

				// Action.
				if(callback && typeof(callback) === 'function') {
					this_node.data('info', {
						'x': x,
						'y': y,
						'h_value': item[h_field_name],
						'v_value': item[v_field_name],
						'data': item
					});
					this_node.click(element_action);
				}

				// Tooltip.
				if(data['tooltip_title'] || data['tooltip_content']) {
					var title = data['tooltip_title'];
					var content = data['tooltip_content'];
					
					for(var p in item) {
						title = title.replace('{' + p + '}', item[p]);
						content = content.replace('{' + p + '}', item[p]);
					}

					this_node.data('tooltip', {
						'id': line + i,
						'title': title,
						'content': content,
						'color': color,
						'bar_top_x': x + group_width / 2,
						'bar_top_y': y
					});
					this_node.hover(element_tooltip);
				}

				group_y[item[h_field_name]] = y;
			}

			// Add legend data.
			legend_data.push({
				'label': lines[line]['name'],
				'color': color,
				'type': 'box'
			});

			index++;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		// Animation.
		for(i = 0; i < p_nodes.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					target.stop().animate({ 'fill-opacity': options['color'][0]['dark-alpha'] }, options['layout']['speed'], ">");
				});
				target.mouseout(function () {
					target.stop().animate({ 'fill-opacity': options['color'][0]['light-alpha'] }, options['layout']['speed'], "<");
				});
			})(p_nodes[i]);
		}
	};

	/* 2. Round Stuff */
	InfoViz.draw_piechart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, item, radius;
		var hole_radius = options['piechart']['hole-radius'];
		var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['piechart']['horizontal-offset'];
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['piechart']['vertical-offset'];
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		if(chart_area['width'] > chart_area['height']) {
			radius = Math.floor(chart_area['height'] / 2) * options['piechart']['size-factor'];
		} else {
			radius = Math.floor(chart_area['width'] / 2) * options['piechart']['size-factor'];
		}

		// Scan value fields.
		var v_max = -Infinity, v_min = Infinity, v_sum = 0;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['value_field']] > v_max) {
				v_max = item[data['value_field']];
			}

			if(item[data['value_field']] < v_min) {
				v_min = item[data['value_field']];
			}

			v_sum += item[data['value_field']];
		}

		var sector = function(cx, cy, r, hole_r, startAngle, endAngle, params) {
			var rad = Math.PI / 180,
				x1 = cx + r * Math.cos(-startAngle * rad),
				x2 = cx + r * Math.cos(-endAngle * rad),
				y1 = cy + r * Math.sin(-startAngle * rad),
				y2 = cy + r * Math.sin(-endAngle * rad);
			
				x3 = cx + hole_r * Math.cos(-startAngle * rad),
				x4 = cx + hole_r * Math.cos(-endAngle * rad),
				y3 = cy + hole_r * Math.sin(-startAngle * rad),
				y4 = cy + hole_r * Math.sin(-endAngle * rad);

			if(hole_r > 0) {
				return paper.path(["M", x3, y3, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "L", x4, y4, "A", hole_r, hole_r, 0, -(endAngle - startAngle > 180), 1, x3, y3]).attr(params);	
			} else {
				return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
			}
		}

		var angle_unit = 360 / v_sum;
		var this_angle, current_angle = 0, this_color, p_sectors = [], p_bars = [], p_labels = [], half_angle;
		var x2, y2, x3, y3, x4, y4, align;
		var this_sector, this_bar, this_label;
		var legend_data = [];

		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i][data['value_field']];
			this_angle = angle_unit * item;
			this_color = options['color'][(i % options['color'].length)];

			// Sector
			this_sector = sector(cx, cy, radius, hole_radius, current_angle, current_angle + this_angle, { 
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['piechart']['sector-border-width']
			}).translate(0.5, 0.5);

			this_sector.data('color-alpha', this_color['light-alpha']);
			this_sector.data('index', i);
			p_sectors.push(this_sector);

			// Action.
			if(callback && typeof(callback) === 'function') {
				this_sector.data('info', {
					'start': current_angle,
					'angle': this_angle,
					'value': data['data'][i][data['value_field']],
					'data': data['data'][i]
				});
				this_sector.click(element_action);
			}

			// Add legend.
			legend_data.push({
				'label': data['data'][i][data['label_field']],
				'color': this_color,
				'type': 'sector'
			});

			// Label bar
			half_angle = -(current_angle + this_angle / 2)  * Math.PI / 180;
			x = cx + (radius + options['piechart']['label-distance']) * Math.cos(half_angle);
			y = cy + (radius + options['piechart']['label-distance']) * Math.sin(half_angle);
			
			x2 = cx + (radius + options['piechart']['label-distance'] + options['piechart']['label-bar-length1']) * Math.cos(half_angle);
			y2 = cy + (radius + options['piechart']['label-distance'] + options['piechart']['label-bar-length1']) * Math.sin(half_angle);

			if(x > cx) {
				x3 = x2 + options['piechart']['label-bar-length2'];
			} else {
				x3 = x2 - options['piechart']['label-bar-length2'];
			}

			y3 = y2;

			cache = [];
			cache.push('M' + x + ',' + y);
			cache.push('L' + x2 + ',' + y2);
			cache.push('L' + x3 + ',' + y3);

			this_bar = paper.path(cache.join('')).attr({
				'stroke': options['piechart']['label-bar-color'],
				'stroke-opacity': options['piechart']['label-bar-color'],
				'stroke-width': options['piechart']['label-bar-width']
			}).translate(0.5, 0.5);
			p_bars.push(this_bar);

			// Label text
			if(x > cx) {
				x4 = x3 + options['piechart']['label-distance'];
				align = 'start';
			} else {
				x4 = x3 - options['piechart']['label-distance'];
				align = 'end';
			}

			y4 = y3;

			this_label = paper.text(x4, y4, data['data'][i][data['label_field']]).attr({
				'text-anchor': align,
				'fill': this_color['color'],
				'font-size': options['piechart']['label-size']
			}).translate(0.5, 0.5);
			p_labels.push(this_label);
			
			// Tooltip.
			if(data['tooltip_title'] || data['tooltip_content']) {
				var title = data['tooltip_title'];
				var content = data['tooltip_content'];
				
				for(var p in data['data'][i]) {
					title = title.replace('{' + p + '}', data['data'][i][p]);
					content = content.replace('{' + p + '}', data['data'][i][p]);
				}

				this_sector.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': cx + (radius / 2) * Math.cos(half_angle),
					'y': cy + (radius / 2) * Math.sin(half_angle)
				});
				this_sector.hover(element_tooltip);
			}

			current_angle += this_angle;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		var animate_on = Raphael.animation({
			'transform': 's1.1 1.1 ' + cx + ' ' + cy
		}, options['layout']['speed'], '>');
		var animate_off = Raphael.animation({
			'transform': ''
		}, options['layout']['speed'], '<');

		var this_animation;
		for(i = 0; i < p_sectors.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					this_bar = p_bars[target.data('index')];
					if(this_bar) this_bar.stop().animate(animate_on);

					this_label = p_labels[target.data('index')];
					if(this_label) this_label.stop().animate(animate_on);

					this_animation = animate_on;
					this_animation.anim['100']['fill-opacity'] = 1;
					target.stop().animate(this_animation);
					delete this_animation.anim['100']['fill-opacity'];
				});
				target.mouseout(function () {
					this_bar = p_bars[target.data('index')];
					if(this_bar) this_bar.stop().animate(animate_off);

					this_label = p_labels[target.data('index')];
					if(this_label) this_label.stop().animate(animate_off);

					this_animation = animate_off;
					this_animation.anim['100']['fill-opacity'] = target.data('color-alpha');
					target.stop().animate(this_animation);
					delete this_animation.anim['100']['fill-opacity'];
				});
			})(p_sectors[i]);
		}
	};

	InfoViz.draw_radarchart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], cache2 = [], x, y, i, j, item, radius, rad = Math.PI / 180;
		var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['radarchart']['horizontal-offset'];
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['radarchart']['vertical-offset'];
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		if(chart_area['width'] > chart_area['height']) {
			radius = Math.floor(chart_area['height'] / 2) * options['radarchart']['size-factor'];
		} else {
			radius = Math.floor(chart_area['width'] / 2) * options['radarchart']['size-factor'];
		}

		// Scan value fields.
		var angle_start = 0;
		var angle_unit = 360 / data['value_fields'].length;
		var v_map = {}, a_map = {};
		for(i = 0; i < data['value_fields'].length; ++i) {
			v_map[data['value_fields'][i]] = {
				'v_max': -Infinity, 'v_min': Infinity
			};

			a_map[data['value_fields'][i]] = { 'angle': angle_start };

			angle_start += angle_unit;
		}

		for(i = 0; i < data['data'].length; ++i) {
			for(j = 0; j < data['value_fields'].length; ++j) {
				item = data['data'][i][data['value_fields'][j]];

				if(item > v_map[data['value_fields'][j]]['v_max']) {
					v_map[data['value_fields'][j]]['v_max'] = item;
				}

				if(item < v_map[data['value_fields'][j]]['v_min']) {
					v_map[data['value_fields'][j]]['v_min'] = item;
				}
			}
		}

		// Draw outer border.
		paper.circle(cx, cy, radius).attr({
			'stroke': options['radarchart']['outer-border-color'],
			'stroke-width': options['radarchart']['outer-border-width'],
			'stroke-opacity': options['radarchart']['outer-border-alpha'],
			'fill': options['radarchart']['outer-background-color'],
			'fill-opacity': options['radarchart']['outer-background-alpha']
		}).translate(0.5, 0.5);

		// Draw innter border and axises.
		cache = [];
		cache2 = [];
		var this_rotation = 0;
		for(i = 0; i < data['value_fields'].length; ++i) {
			if(i === 0) {
				cache.push('M');
			} else {
				cache.push('L');
			}

			x = cx + radius * Math.sin(a_map[data['value_fields'][i]]['angle'] * rad);
			y = cy - radius * Math.cos(a_map[data['value_fields'][i]]['angle'] * rad);
			a_map[data['value_fields'][i]]['end-x'] = x;
			a_map[data['value_fields'][i]]['end-y'] = y;

			cache.push(x + ',' + y);
			cache2.push('M' + cx + ',' + cy + 'L' + x + ',' + y);

			// Calculate label position.
			x = cx + (radius + options['radarchart']['label-distance']) * Math.sin(a_map[data['value_fields'][i]]['angle'] * rad);
			y = cy - (radius + options['radarchart']['label-distance']) * Math.cos(a_map[data['value_fields'][i]]['angle'] * rad);
			a_map[data['value_fields'][i]]['label-x'] = x;
			a_map[data['value_fields'][i]]['label-y'] = y;

			// Label rotation.
			if(options['radarchart']['label-rotation']) {
				this_rotation = a_map[data['value_fields'][i]]['angle'];

				if(a_map[data['value_fields'][i]]['angle'] > 90 && a_map[data['value_fields'][i]]['angle'] < 270) {
					this_rotation += 180;
				}
			}

			// Draw labels.
			paper.text(x, y, data['value_fields'][i]).attr({
				'font-size': options['radarchart']['label-size'],
				'fill': options['radarchart']['label-color'],
				'transform': 'r' + this_rotation
			}).translate(0.5, 0.5);

			// Calculate v_unit.
			v_map[data['value_fields'][i]]['v_unit'] = (radius - options['radarchart']['circle-min-radius']) / (v_map[data['value_fields'][i]]['v_max'] - v_map[data['value_fields'][i]]['v_min']);
		}

		cache.push('z');
		paper.path(cache.join('')).attr({
			'stroke': options['radarchart']['inner-border-color'],
			'stroke-width': options['radarchart']['inner-border-width'],
			'stroke-opacity': options['radarchart']['inner-border-alpha'],
			'fill': options['radarchart']['inner-background-color'],
			'fill-opacity': options['radarchart']['inner-background-alpha']
		}).translate(0.5, 0.5);

		// Axis.
		paper.path(cache2.join('')).attr({
			'stroke': options['radarchart']['axis-color'],
			'stroke-width': options['radarchart']['axis-width'],
			'stroke-opacity': options['radarchart']['axis-alpha']
		}).translate(0.5, 0.5);

		// Draw circles.
		var this_r = 0, this_color, this_value, p_circles = [], this_circle, legend_data = [];
		for(i = 0; i < data['data'].length; ++i) {
			this_color = options['color'][(i % options['color'].length)];
			cache = [];

			for(j = 0; j < data['value_fields'].length; ++j) {
				this_value = data['data'][i][data['value_fields'][j]];
				this_r = options['radarchart']['circle-min-radius'] + v_map[data['value_fields'][j]]['v_unit'] * (this_value - v_map[data['value_fields'][j]]['v_min']);

				if(!this_r) continue;

				if(j === 0) {
					cache.push('M');
				} else {
					cache.push('L');
				}

				x = cx + this_r * Math.sin(a_map[data['value_fields'][j]]['angle'] * rad);
				y = cy - this_r * Math.cos(a_map[data['value_fields'][j]]['angle'] * rad);
				cache.push(x + ',' + y);
			}

			cache.push('z');
			this_circle = paper.path(cache.join('')).attr({
				'stroke': this_color['color'],
				'stroke-width': options['radarchart']['circle-border-width'],
				'stroke-opacity': this_color['dark-alpha'],
				'fill': this_color['color'],
				'fill-opacity': options['radarchart']['circle-background-alpha']
			}).translate(0.5, 0.5);

			this_circle.data('color-alpha', options['radarchart']['circle-background-alpha']);
			p_circles.push(this_circle);

			if(data['data'][i][data['name_field']]) {
				// Add legend.
				legend_data.push({
					'label': data['data'][i][data['name_field']],
					'color': this_color,
					'type': 'circle'
				});
			}

			// Action.
			if(callback && typeof(callback) === 'function') {
				p.data('info', {
					'name': data['data'][i][data['name_field']],
					'data': data['data'][i]
				});
				p.click(element_action);
			}

			// Tooltip.
			if(data['tooltip_title'] || data['tooltip_content']) {
				var title = data['tooltip_title'];
				var content = data['tooltip_content'];
				
				for(var p in data['data'][i]) {
					title = title.replace('{' + p + '}', data['data'][i][p]);
					content = content.replace('{' + p + '}', data['data'][i][p]);
				}

				this_circle.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': x,
					'y': y
				});
				this_circle.hover(element_tooltip);
			}
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		// Animations.
		for(i = 0; i < p_circles.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					target.animate({
						'fill-opacity': 0.618
					}, options['layout']['speed'], '<');
				});
				target.mouseout(function () {
					target.animate({
						'fill-opacity': target.data('color-alpha')
					}, options['layout']['speed'], '>');
				});
			})(p_circles[i]);
		}
	};

	InfoViz.draw_radialchart = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, item, radius, rad = Math.PI / 180;
		var hole_radius = options['radialchart']['hole-radius'];
		var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['radialchart']['horizontal-offset'];
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['radialchart']['vertical-offset'];
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		if(chart_area['width'] > chart_area['height']) {
			radius = Math.floor(chart_area['height'] / 2) * options['radialchart']['size-factor'];
		} else {
			radius = Math.floor(chart_area['width'] / 2) * options['radialchart']['size-factor'];
		}

		// Scan value fields.
		var v_max = -Infinity, v_min = Infinity, v_sum = 0;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['value_field']] > v_max) {
				v_max = item[data['value_field']];
			}

			if(item[data['value_field']] < v_min) {
				v_min = item[data['value_field']];
			}

			v_sum += item[data['value_field']];
		}

		var angle_unit = 360 / data['data'].length;
		var bar_width = options['radialchart']['bar-width'] ? options['radialchart']['bar-width'] : angle_unit;
		var radius_unit = (radius - hole_radius - options['radialchart']['bar-min-height']) / (v_max - v_min);
		var current_angle = 0, this_color, p_boxes = [], p_bars = [], p_labels = [];
		var x2, y2, x3, y3, x4, y4, align, this_radius;
		var this_box, this_bar, this_label;
		var legend_data = [];

		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i][data['value_field']];
			this_radius = hole_radius + options['radialchart']['bar-min-height'] + radius_unit * (item - v_min);
			this_color = options['color'][(i % options['color'].length)];

			cache = [];

			// Box start x, y
			x = cx + hole_radius * Math.cos(current_angle * rad);
			y = cy + hole_radius * Math.sin(current_angle * rad);
			cache.push('M' + x + ',' + y);

			// Box end x, y
			x = cx + this_radius * Math.cos(current_angle * rad);
			y = cy + this_radius * Math.sin(current_angle * rad);
			cache.push('L' + x + ',' + y);

			// Box end x2, y2
			x = cx + this_radius * Math.cos((current_angle + bar_width) * rad);
			y = cy + this_radius * Math.sin((current_angle + bar_width) * rad);
			cache.push('L' + x + ',' + y);

			// Box start x2, y2
			x = cx + hole_radius * Math.cos((current_angle + bar_width) * rad);
			y = cy + hole_radius * Math.sin((current_angle + bar_width) * rad);
			cache.push('L' + x + ',' + y);

			cache.push('Z');

			// Box
			this_box = paper.path(cache.join('')).attr({
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['radialchart']['bar-border-width']
			}).translate(0.5, 0.5);
			this_box.data('color-alpha', this_color['light-alpha']);
			this_box.data('index', i);
			p_boxes.push(this_box);

			// Action.
			if(callback && typeof(callback) === 'function') {
				this_box.data('info', {
					'start': current_angle,
					'angle': options['radialchart']['bar-width'],
					'value': data['data'][i][data['value_field']],
					'data': data['data'][i]
				});
				this_box.click(element_action);
			}

			// Add legend.
			legend_data.push({
				'label': data['data'][i][data['label_field']],
				'color': this_color,
				'type': 'box'
			});

			var half_angle = current_angle + options['radialchart']['bar-width'] / 2;
			if(options['radialchart']['label-enabled']) {
				// Label bar
				x = cx + (this_radius + options['radialchart']['label-distance']) * Math.cos(half_angle * rad);
				y = cy + (this_radius + options['radialchart']['label-distance']) * Math.sin(half_angle * rad);
				
				x2 = cx + (this_radius + options['radialchart']['label-distance'] + options['radialchart']['label-bar-length1']) * Math.cos(half_angle * rad);
				y2 = cy + (this_radius + options['radialchart']['label-distance'] + options['radialchart']['label-bar-length1']) * Math.sin(half_angle * rad);

				if(x > cx) {
					x3 = x2 + options['radialchart']['label-bar-length2'];
				} else {
					x3 = x2 - options['radialchart']['label-bar-length2'];
				}

				y3 = y2;

				cache = [];
				cache.push('M' + x + ',' + y);
				cache.push('L' + x2 + ',' + y2);
				cache.push('L' + x3 + ',' + y3);

				this_bar = paper.path(cache.join('')).attr({
					'stroke': options['radialchart']['label-bar-color'],
					'stroke-opacity': options['radialchart']['label-bar-color'],
					'stroke-width': options['radialchart']['label-bar-width']
				}).translate(0.5, 0.5);
				p_bars.push(this_bar);

				// Label text
				if(x > cx) {
					x4 = x3 + options['radialchart']['label-distance'];
					align = 'start';
				} else {
					x4 = x3 - options['radialchart']['label-distance'];
					align = 'end';
				}

				y4 = y3;

				this_label = paper.text(x4, y4, data['data'][i][data['label_field']]).attr({
					'text-anchor': align,
					'fill': this_color['color'],
					'font-size': options['radialchart']['label-size']
				}).translate(0.5, 0.5);
				p_labels.push(this_label);
			}

			// Tooltip.
			if(data['tooltip_title'] || data['tooltip_content']) {
				var title = data['tooltip_title'];
				var content = data['tooltip_content'];
				
				for(var p in data['data'][i]) {
					title = title.replace('{' + p + '}', data['data'][i][p]);
					content = content.replace('{' + p + '}', data['data'][i][p]);
				}

				this_box.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': cx + radius / 2 * Math.cos(half_angle * rad),
					'y': cy + radius / 2 * Math.sin(half_angle * rad)
				});
				this_box.hover(element_tooltip);
			}

			current_angle += angle_unit;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);

		var animate_on = Raphael.animation({
			'transform': 's1.1 1.1 ' + cx + ' ' + cy
		}, options['layout']['speed'], '>');
		var animate_off = Raphael.animation({
			'transform': ''
		}, options['layout']['speed'], '<');

		var this_animation;
		for(i = 0; i < p_boxes.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					this_bar = p_bars[target.data('index')];
					if(this_bar) this_bar.stop().animate(animate_on);

					this_label = p_labels[target.data('index')];
					if(this_label) this_label.stop().animate(animate_on);

					this_animation = animate_on;
					this_animation.anim['100']['fill-opacity'] = 1;
					target.stop().animate(this_animation);
					delete this_animation.anim['100']['fill-opacity'];
				});
				target.mouseout(function () {
					this_bar = p_bars[target.data('index')];
					if(this_bar) this_bar.stop().animate(animate_off);

					this_label = p_labels[target.data('index')];
					if(this_label) this_label.stop().animate(animate_off);

					this_animation = animate_off;
					this_animation.anim['100']['fill-opacity'] = target.data('color-alpha');
					target.stop().animate(this_animation);
					delete this_animation.anim['100']['fill-opacity'];
				});
			})(p_boxes[i]);
		}
	};

	InfoViz.draw_smithgraph = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, item, radius, rad = Math.PI / 180;
		var hole_radius = options['smithgraph']['hole-radius'];
		var cx = chart_area['top-left'][0] + chart_area['width'] / 2 + options['smithgraph']['horizontal-offset'];
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2 + options['smithgraph']['vertical-offset'];
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};
		
		if(chart_area['width'] > chart_area['height']) {
			radius = Math.floor(chart_area['height'] / 2) * options['smithgraph']['size-factor'];
		} else {
			radius = Math.floor(chart_area['width'] / 2) * options['smithgraph']['size-factor'];
		}

		// Pre-scan
		// Scan node value fields.
		var nv_max = -Infinity, nv_min = Infinity, nv_sum = 0;
		var node_map = {};
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['node_value_field']] > nv_max) {
				nv_max = item[data['node_value_field']];
			}

			if(item[data['node_value_field']] < nv_min) {
				nv_min = item[data['node_value_field']];
			}

			nv_sum += item[data['node_value_field']];

			if(!node_map[item[data['node_id_field']]]) {
				node_map[item[data['node_id_field']]] = {
					'node': item,
					'out': item['edges'].length,
					'in': 0
				};
			} else {
				console.log('node id: ' + item[data['node_id_field']] + ' is not unique. skip.');
				continue;
			}
		}

		// Scan node value fields.
		var ev_max, ev_min, ev_sum;
		var gev_max = -Infinity, gev_min = Infinity, gev_sum = 0;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];
			ev_max = -Infinity, ev_min = Infinity, ev_sum = 0;
			
			for(j = 0; j < item['edges'].length; ++j) {
				if(!node_map[item['edges'][j]['to']]) {
					console.log('destination node id: ' + item['edges'][j]['to'] + ' not found. skip.');
					continue;
				}

				node_map[item['edges'][j]['to']]['in']++;
				
				var value = item['edges'][j][data['edge_value_field']];
				if(value > ev_max) { ev_max = value; }
				if(value < ev_min) { ev_min = value; }
				ev_sum += value;
			}

			node_map[item[data['node_id_field']]]['edge_max'] = ev_max;
			node_map[item[data['node_id_field']]]['edge_min'] = ev_min;
			node_map[item[data['node_id_field']]]['edge_sum'] = ev_sum;

			// Global max, min and sum.
			if(ev_max > gev_max) gev_max = ev_max;
			if(ev_min < gev_min) gev_min = ev_min;
			gev_sum += ev_sum;
		}

		// Draw node.
		var angle_unit = 360 / data['data'].length;
		var bar_width = options['smithgraph']['bar-width'] ? options['smithgraph']['bar-width'] : angle_unit;
		var radius_unit = (radius - hole_radius - options['smithgraph']['bar-min-height']) / (nv_max - nv_min);
		var current_angle = 0, this_color, p_boxes = [], p_edges;
		var x2, y2, x3, y3, x4, y4, align, this_radius;
		var this_box, this_bar, this_label;
		var legend_data = [];

		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i][data['node_value_field']];
			this_radius = hole_radius + options['smithgraph']['bar-min-height'] + radius_unit * (item - nv_min);
			this_color = options['color'][(i % options['color'].length)];

			cache = [];

			// Box start x, y
			x = cx + hole_radius * Math.cos(current_angle * rad);
			y = cy + hole_radius * Math.sin(current_angle * rad);
			cache.push('M' + x + ',' + y);

			// Box end x, y
			x = cx + this_radius * Math.cos(current_angle * rad);
			y = cy + this_radius * Math.sin(current_angle * rad);
			cache.push('L' + x + ',' + y);

			// Box end x2, y2
			x = cx + this_radius * Math.cos((current_angle + bar_width) * rad);
			y = cy + this_radius * Math.sin((current_angle + bar_width) * rad);
			cache.push('L' + x + ',' + y);

			// Box start x2, y2
			x = cx + hole_radius * Math.cos((current_angle + bar_width) * rad);
			y = cy + hole_radius * Math.sin((current_angle + bar_width) * rad);
			cache.push('L' + x + ',' + y);

			cache.push('Z');

			// Box
			this_box = paper.path(cache.join('')).attr({
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['smithgraph']['bar-border-width']
			}).translate(0.5, 0.5);
			this_box.data('color-alpha', this_color['light-alpha']);
			this_box.data('index', i);
			p_boxes.push(this_box);

			// Action.
			if(callback && typeof(callback) === 'function') {
				this_box.data('info', {
					'type': 'node',
					'start': current_angle,
					'angle': bar_width,
					'value': data['data'][i][data['node_value_field']],
					'data': data['data'][i]
				});
				this_box.click(element_action);
			}

			//Add legend.
			legend_data.push({
				'label': data['data'][i][data['node_label_field']],
				'color': this_color,
				'type': 'box'
			});

			// Tooltip.
			if(data['node_tooltip_title'] || data['node_tooltip_content']) {
				var title = data['node_tooltip_title'];
				var content = data['node_tooltip_content'];
				
				for(var p in data['data'][i]) {
					title = title.replace('{' + p + '}', data['data'][i][p]);
					content = content.replace('{' + p + '}', data['data'][i][p]);
				}

				this_box.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': cx + radius * Math.cos((current_angle + bar_width / 2) * rad),
					'y': cy + radius * Math.sin((current_angle + bar_width / 2) * rad)
				});
				this_box.hover(element_tooltip);
			}

			// Save position to node_map
			node_map[data['data'][i][data['node_id_field']]]['start'] = current_angle;
			node_map[data['data'][i][data['node_id_field']]]['end'] = current_angle + angle_unit;

			current_angle += angle_unit;
		}

		// Draw edges.
		current_angle = 0;
		for(i = 0; i < data['data'].length; ++i) {
			var node = node_map[data['data'][i][data['node_id_field']]], to_node;
			var edge_unit = angle_unit / node['edge_sum'];
			var this_edge, this_edge_angle, this_position = current_angle, p_edge;
			var edge_area_radius = hole_radius - options['smithgraph']['edge-margin'];

			if(edge_unit == Infinity) { edge_unit = angle_unit; }

			for(j = 0; j < node['node']['edges'].length; ++j) {
				this_edge = node['node']['edges'][j];
				to_node = node_map[this_edge['to']];

				this_edge_angle = edge_unit * this_edge[data['edge_value_field']];
				this_color = options['smithgraph']['edge-color'][
					Math.floor(
						(options['smithgraph']['edge-color'].length - 1) * 
						(this_edge[data['edge_value_field']] - gev_min) / 
						(gev_max - gev_min)
					)
				];

				cache = [];
				x = cx + edge_area_radius * Math.cos(this_position * rad);
				y = cy + edge_area_radius * Math.sin(this_position * rad);
				cache.push('M' + x + ',' + y);

				x2 = cx + edge_area_radius * Math.cos((to_node['start'] + to_node['end'])/2 * rad);
				y2 = cy + edge_area_radius * Math.sin((to_node['start'] + to_node['end'])/2 * rad);
				cache.push('L' + x2 + ',' + y2);
				//cache.push('A' + hole_radius / 4 + ',' + hole_radius / 4 + ', 0, 0, 0,' + x2 + ',' + y2);

				//x3 = cx + edge_area_radius * Math.cos(to_node['start'] * rad);
				//y3 = cy + edge_area_radius * Math.sin(to_node['start'] * rad);
				//cache.push('L' + x3 + ',' + y3);
				//cache.push('A' + hole_radius / 4 + ',' + hole_radius / 4 + ', 0, 0, 0,' + x3 + ',' + y3);

				x4 = cx + edge_area_radius * Math.cos((this_position + this_edge_angle) * rad);
				y4 = cy + edge_area_radius * Math.sin((this_position + this_edge_angle) * rad);
				cache.push('L' + x4 + ',' + y4);
				cache.push('Z');

				// Edge.
				p_edge = paper.path(cache.join('')).attr({
					'fill': this_color['color'],
					'fill-opacity': options['smithgraph']['edge-background-alpha'],
					'stroke': this_color['color'],
					'stroke-opacity': this_color['dark-alpha'],
					'stroke-width': options['smithgraph']['edge-border-width']
				}).translate(0.5, 0.5);

				this_position += this_edge_angle;
			}

			current_angle += angle_unit;
		}

		InfoViz.draw_legend(paper, chart_area, legend_data, options);
	};

	/* 3. Map */
	InfoViz.draw_heatmap = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, j, item;

		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};

		// Find out max and min value.
		var v_max = -Infinity, v_min = Infinity;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['value_field']] > v_max) {
				v_max = item[data['value_field']];
			}

			if(item[data['value_field']] < v_min) {
				v_min = item[data['value_field']];
			}
		}

		// Find out row and column count.
		var count_x = 1, count_y = 1;
		if(options['heatmap']['horizontal-count'] > 0) {
			count_x = options['heatmap']['horizontal-count'];
			count_y = Math.ceil(data['data'].length / count_x);
		} else if(options['heatmap']['vertical-count'] > 0) {
			count_y = options['heatmap']['vertical-count'];
			count_x = Math.ceil(data['data'].length / count_y);
		} else {
			count_x = Math.floor(Math.sqrt(data['data'].length));
			count_y = count_x;
		}

		// Calculate box unit size.
		var unit_x = 1, unit_y = 1;
		unit_x = (chart_area['width'] - ((count_x - 1) * options['heatmap']['horizontal-margin'])) / count_x;
		unit_y = (chart_area['height'] - ((count_y - 1) * options['heatmap']['vertical-margin'])) / count_y;

		// Color.
		var this_color, color_array, this_value, this_box, this_label;
		if(options['heatmap']['color'] && options['heatmap']['color'].length > 0) {
			color_array = options['heatmap']['color'];
		} else {
			color_array = options['color'];
		}

		// Draw boxes.
		y = chart_area['top-left'][1];
		index = 0;

		var done = false, p_boxes = [], p_labels = [];
		this_label = undefined;
		for(j = 0; j < count_y; ++j) {
			x = chart_area['top-left'][0];
			for(i = 0; i < count_x; ++i) {
				if(!data['data'][index]) {
					done = true;
					break;
				}

				this_value = data['data'][index][data['value_field']];
				this_color = color_array[Math.floor((this_value - v_min) * ((color_array.length - 1) / (v_max - v_min)))];

				// Box
				this_box = paper.rect(x, y, unit_x, unit_y).attr({
					'fill': this_color['color'],
					'fill-opacity': this_color['dark-alpha'],
					'stroke': this_color['color'],
					'stroke-opacity': this_color['dark-alpha'],
					'stroke-width': options['heatmap']['box-border-width']
				}).translate(0.5, 0.5);
				p_boxes.push(this_box);

				// Label
				if(unit_x > options['heatmap']['label-size'] && unit_y > options['heatmap']['label-size']) {
					this_label = paper.text(x + unit_x / 2, y + unit_y / 2, data['data'][index][data['label_field']]).attr({
						'fill': options['heatmap']['label-color'],
						'fill-opacity': options['heatmap']['label-alpha'],
						'font-size': options['heatmap']['label-size']
					}).translate(0.5, 0.5);
					p_labels.push(this_label);
				}
		
				// Action.
				if(callback && typeof(callback) === 'function') {
					this_box.data('info', {
						'x': x,
						'y': y,
						'data': data['data'][index]
					});

					this_label.data('info', {
						'x': x,
						'y': y,
						'data': data['data'][index]
					});

					this_box.click(element_action);
					this_label.click(element_action);
				}

				// Tooltip.
				if(data['tooltip_title'] || data['tooltip_content']) {
					var title = data['tooltip_title'];
					var content = data['tooltip_content'];
					
					for(var p in data['data'][index]) {
						title = title.replace('{' + p + '}', data['data'][index][p]);
						content = content.replace('{' + p + '}', data['data'][index][p]);
					}

					this_box.data('tooltip', {
						'id': index,
						'title': title,
						'content': content,
						'color': this_color,
						'x': x + unit_x / 2,
						'y': y
					});
					this_box.hover(element_tooltip);

					if(this_label) {
						this_label.data('tooltip', {
							'id': index,
							'title': title,
							'content': content,
							'color': this_color,
							'x': x + unit_x / 2,
							'y': y
						});
						this_label.hover(element_tooltip);
					}
				}

				x += unit_x + options['heatmap']['horizontal-margin'];
				++index;
			}

			if(done) break;

			y += unit_y + options['heatmap']['vertical-margin'];
		}
	};

	/* 4. Tree */

	/* 5. Cloud */
	InfoViz.draw_tagcloud = function(paper, chart_area, data, overwrite_options, callback, that) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, j, item;
		var levels = options['tagcloud']['levels'] ? options['tagcloud']['levels'] : 8;
		
		var element_action = function(evt) { callback.call(that, this.data('info')); };
		var element_tooltip = function(evt) {
			x = this.data('tooltip')['x'];
			y = this.data('tooltip')['y'];
			InfoViz.draw_tooltip(paper, x, y, this.data('tooltip')['id'], this.data('tooltip')['title'], this.data('tooltip')['content'], this.data('tooltip')['color'], options);
		};

		// Find out max and min value.
		var v_max = -Infinity, v_min = Infinity, total_text_length = 0;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			if(item[data['value_field']] > v_max) {
				v_max = item[data['value_field']];
			}

			if(item[data['value_field']] < v_min) {
				v_min = item[data['value_field']];
			}

			total_text_length += item[data['text_field']].length;
		}

		// Map value to level.
		var text_map = [], this_level, test_text, this_box;
		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i];

			this_level = Math.floor((levels - 1) * (item[data['value_field']] - v_min) / (v_max - v_min));
			this_size = options['tagcloud']['text-min-size'] + Math.floor(this_level * (options['tagcloud']['text-max-size'] - options['tagcloud']['text-min-size']) / levels);

			test_text = paper.text(-1000, -1000, item[data['text_field']]).attr({
				'font-size': this_size
			}).translate(0.5, 0.5);
			this_box = test_text.getBBox();

			text_map.push({
				'value': item[data['value_field']],
				'text': item[data['text_field']],
				'size': this_size,
				'length': item[data['text_field']].length,
				'level': this_level,
				'width': this_box.width,
				'height': this_box.height,
				'index': i
			});
		}

		var cx = chart_area['top-left'][0] + chart_area['width'] / 2;
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2;
		var rows = options['tagcloud']['row-count'], rows_map = [];

		// Initialize rows array.
		for(i = 0; i < rows; ++i) { 
			rows_map.push({ 'node': [] }); 
		}

		// Make sure cy is in the middle.
		if(rows % 2 === 0) { 
			cy -= options['tagcloud']['text-max-size'] / 2; 
		}

		// Sort by size.
		text_map.sort(function(a, b) { return b['size'] - a['size']; });
		
		// Put text node into rows.
		for(i = 0; i < text_map.length; ++i) {
			rows_map[i % rows_map.length]['node'].push(text_map[i]);
		}

		var p_texts = [], this_text, todo = [];
		var last_max_height = 0, last_y1, last_y2, offset_x1, offset_x2, last_width1, last_width2;
		var dx, dy, index = 0;
		for(i = 0; i < rows_map.length; ++i) {
			if(i === 0) {
				x = cx
				y = cy;
				last_y1 = y;
				last_y2 = y;
			} else {
				x = cx;
				if(i % 2 === 0) {
					y = last_y1 - last_max_height;
					last_y1 = y;
				} else {
					y = last_y2 + last_max_height;
					last_y2 = y;
				}
			}

			offset_x1 = 0;
			offset_x2 = 0;
			last_width1 = 0;
			last_width2 = 0;
			last_max_height = -Infinity;
			for(j = 0; j < rows_map[i]['node'].length; ++j) {
				item = rows_map[i]['node'][j];
				this_color = options['tagcloud']['color'][Math.floor((options['tagcloud']['color'].length - 1) * (item['level'] / (levels - 1)))];

				if(j === 0) {
					dx = x;
					dy = y;
					last_width1 = item['width'] + options['tagcloud']['horizontal-margin'];
					last_width2 = item['width'] + options['tagcloud']['horizontal-margin'];
				} else {
					if(j % 2 === 0) {
						offset_x1 -= last_width1 / 2 + item['width'] / 2;
						dx = x + offset_x1;
						last_width1 = item['width'] + options['tagcloud']['horizontal-margin'];
					} else {
						offset_x2 += last_width2 / 2 + item['width'] / 2;
						dx = x + offset_x2;
						last_width2 = item['width'] + options['tagcloud']['horizontal-margin'];
					}
				}

				if(item['height'] > last_max_height) {
					last_max_height = item['height'] + options['tagcloud']['vertical-margin'];;
				}

				todo.push({ 'x': dx, 'y': dy, 'item': item, 'color': this_color, 'data': data['data'][item['index']] });
				index++;
			}
		}

		// Draw text.
		for(i = todo.length - 1; i >= 0; --i) {
			this_text = paper.text(todo[i]['x'], todo[i]['y'], todo[i]['item']['text']).attr({
				'font-size': todo[i]['item']['size'],
				'fill': todo[i]['color']['color'],
				'fill-opacity': todo[i]['color']['dark-alpha'],
				'text-anchor': 'middle'
			}).translate(0.5, 0.5);
			p_texts.push(this_text);

			// Action.
			if(callback && typeof(callback) === 'function') {
				this_text.data('info', {
					'data': todo[i]['data'],
					'item': todo[i]['item'],
					'x': todo[i]['x'],
					'y': todo[i]['y']
				});
				this_text.click(element_action);
			}

			// Tooltip.
			if(data['tooltip_title'] || data['tooltip_content']) {
				var title = data['tooltip_title'];
				var content = data['tooltip_content'];
				
				for(var p in todo[i]['data']) {
					title = title.replace('{' + p + '}', todo[i]['data'][p]);
					content = content.replace('{' + p + '}', todo[i]['data'][p]);
				}

				this_text.data('tooltip', {
					'id': i,
					'title': title,
					'content': content,
					'color': this_color,
					'x': todo[i]['x'],
					'y': todo[i]['y']
				});
				this_text.hover(element_tooltip);
			}
		}

		// Animation.
		for(i = 0; i < p_texts.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					target.animate({
						'transform': 's1.5'
					}, options['layout']['speed'], '>');
				});
				target.mouseout(function () {
					target.animate({
						'transform': ''
					}, options['layout']['speed'], '<');
				});
			})(p_texts[i]);
		}
	};

	var in_array = function(target, array) {
		if(typeof(array) === 'object' && (array instanceof Array)) {
			for(var i = 0; i < array.length; ++i) {
				if(target == array[i]) return i;
			}
		}

		return -1;
	};

	var merge_options = function(overwrite) {
		if(!overwrite) return InfoViz.options;

		var result = {}, p, q;

		for(p in InfoViz.options) {
			if(typeof(InfoViz.options[p]) === 'object' && (InfoViz.options[p] instanceof Array)) {
				result[p] = [];
			} else {
				result[p] = {};
			}

			for(q in InfoViz.options[p]) {
				result[p][q] = InfoViz.options[p][q];
			}
		}

		for(p in overwrite) {
			for(q in overwrite[p]) {
				result[p][q] = overwrite[p][q];
			}
		}

		return result;
	};

	var hide_tooltip = function(overwrite_options) {
		var options = merge_options(overwrite_options);

		// Remove old tooltip
		if(tooltip_border) {
			var old_border = tooltip_border;
			old_border.stop();
			old_border.animate({ 'opacity': 0 }, options['layout']['speed'], function() {
				old_border.remove();
				delete old_border;
			});
		}
		if(tooltip_title) {
			var old_title = tooltip_title;
			old_title.stop();
			old_title.animate({ 'opacity': 0 }, options['layout']['speed'], function() {
				old_title.remove();
				delete old_title;
			});
		}
		if(tooltip_content) {
			var old_content = tooltip_content;
			old_content.stop();
			old_content.animate({ 'opacity': 0 }, options['layout']['speed'], function() {
				old_content.remove();
				delete old_content;
			});
		}
	};

	var guid = function(type) {
		var S4 = function() { return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1); };
				
		if(type === 'long') {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		} else {
			return (S4()+S4());
		}
	};

	var idb = function(message) {
		if(console && typeof(console.log) === 'function') {
			console.log(message);
		} else {
			alert(message);
		}
	};

	InfoViz.global_option = function(overwrite) {
		InfoViz.options = merge_options(overwrite);
	};

	InfoViz.enable_logo = function() {
		InfoViz.options['layout']['logo-enabled'] = true;
	};

	window.InfoViz = InfoViz;
})();