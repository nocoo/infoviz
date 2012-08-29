/*
	InfoViz
	@author  Zheng Li <lizheng@lizheng.me>
	@github https://github.com/nocoo/InfoViz
	@license MIT
	@version 0.1.0
*/

;(function($) {
	if($.InfoViz) return;

	$.InfoViz = {};

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

	var global = {};

	$.InfoViz.chart = function(element, type, data, overwrite_options) {
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
				area = $.InfoViz.draw_axis(paper, data, options);
				$.InfoViz.draw_linechart(paper, area, data, options);

				break;
			}
			case 'bubblechart': {
				area = $.InfoViz.draw_axis(paper, data, options);
				$.InfoViz.draw_bubblechart(paper, area, data, options);

				break;
			}
			case 'barchart': {
				area = $.InfoViz.draw_axis(paper, data, options);
				$.InfoViz.draw_barchart(paper, area, data, options);

				break;
			}
			case 'piechart': {
				area = $.InfoViz.draw_simple_background(paper, data, options);
				$.InfoViz.draw_piechart(paper, area, data, options);
				break;
			}
			case 'heatmap': {
				area = $.InfoViz.draw_simple_background(paper, data, options);
				$.InfoViz.draw_heatmap(paper, area, data, options);
				break;
			}
			default: {
				paper.text(area['width'] / 2, area['height'] / 2, 'Type "' + type +'" not supported.').attr({ 'font-size': 12, 'fill': '#000' }).translate(0.5, 0.5);
				break;
			}
		}

		global['type'] = type;
		//$.InfoViz.add_actions(paper, area);

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

			global['logo'] = logo;
		}

		// Draw box.
		/*global['box'] = {};
		global['box']['bg'] = paper.rect(-1000, -1000, 80, 120, 4).attr({
			'stroke-width': options['layout']['box-border-width'],
			'stroke': options['layout']['box-border-color'],
			'stroke-opacity': options['layout']['box-border-alpha'],
			'fill': options['layout']['box-background-color'],
			'fill-opacity': options['layout']['box-background-alpha']
		}).translate(0.5, 0.5);*/
	};

	// TODO: make this more efficient.
	$.InfoViz.add_actions = function(paper, chart_area, overwrite_options) {
		if(!paper || !chart_area) return idb('Paper or chart area is empty.');

		//console.log(global);

		var item;
		for(var i = 0; i < global['bubblechart']['bubbles'].length; ++i) {
			item = global['bubblechart']['bubbles'][i];
			item.click(function(evt) {
				var x = this.attr('cx') + this.attr('r') + 5;
				var y = this.attr('cy') - this.attr('r');

				global['box'].attr({
					'opacity': 0,
				});

				global['box'].animate({
					'opacity': 1,
					'x': x,
					'y': y
				}, 200);
			});
		}
	};

	$.InfoViz.draw_simple_background = function(paper, data, overwrite_options) {
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

	$.InfoViz.draw_axis = function(paper, data, overwrite_options) {
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

	$.InfoViz.draw_bubblechart = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');

		var options = merge_options(overwrite_options), cache = [], i, x, y, size, item;
		var h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity, size_max = -Infinity, size_min = Infinity;

		global['bubblechart'] = {};
		
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
		global['bubblechart']['bubbles'] = [];
		global['bubblechart']['texts'] = [];

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
				'fill': this_color['color'],
				'font-size': options['bubblechart']['label-size'],
				'text-anchor': 'middle'
			}).translate(0.5, 0.5);

			this_bubble.data('data', item);
			this_text.data('data', item);
			global['bubblechart']['bubbles'].push(this_bubble);
			global['bubblechart']['texts'].push(this_text);
		}

		for(i = 0; i < global['bubblechart']['bubbles'].length; ++i) {
			(function(bubble, text, index) {
				bubble.mouseover(function () {
					bubble.stop().animate({ 'fill-opacity': options['color'][0]['dark-alpha'] }, options['layout']['speed'], ">");
					text.stop().animate({ 'fill': '#FFF' }, options['layout']['speed'], ">");
				});
				bubble.mouseout(function () {
					bubble.stop().animate({ 'fill-opacity': options['color'][0]['light-alpha'] }, options['layout']['speed'], "<");
					text.stop().animate({ 'fill': text.data('color') }, options['layout']['speed'], "<");
				});
			})(global['bubblechart']['bubbles'][i], global['bubblechart']['texts'][i], i);

			global['bubblechart']['texts'][i].data('color', global['bubblechart']['texts'][i].attr('fill'));
		}

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

	$.InfoViz.draw_linechart = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y;
		var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
		var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
		var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;

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

				if($.inArray(this_h, h_fields) === -1) {
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

				if($.inArray(this_v, v_fields) === -1) {
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
		
		for(var line in lines) {
			var p_line, p_node, p_label;

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
				
				p_node = paper.circle(x, y, options['linechart']['circle-radius']);
				p_node.attr({
					'stroke': color['color'],
					'stroke-opacity': color['dark-alpha'],
					'stroke-width': options['linechart']['line-width'],
					'fill': color['color']
				}).translate(0.5, 0.5);
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

			index++;
		}
	};

	$.InfoViz.draw_barchart = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, line_count = 0;
		var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
		var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
		var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;

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

				if($.inArray(this_h, h_fields) === -1) {
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

				if($.inArray(this_v, v_fields) === -1) {
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

		//idb(bar_width);

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
			}

			index++;
		}

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

	$.InfoViz.draw_piechart = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, item, radius;
		var hole_radius = options['piechart']['hole-radius'];
		var cx = chart_area['top-left'][0] + chart_area['width'] / 2;
		var cy = chart_area['top-left'][1] + chart_area['height'] / 2;
		
		if(chart_area['width'] > chart_area['height']) {
			radius = Math.floor(chart_area['height'] / 2) * options['piechart']['sector-size-factor'];
		} else {
			radius = Math.floor(chart_area['width'] / 2) * options['piechart']['sector-size-factor'];
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
				'stroke': options['piechart']['label-line-color'],
				'stroke-opacity': options['piechart']['label-line-color'],
				'stroke-width': options['piechart']['label-line-width']
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
			
			current_angle += this_angle;
		}

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

	$.InfoViz.draw_heatmap = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y, i, j, item;
		
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
		if(options['heatmap']['horizontal_count'] > 0) {
			count_x = options['heatmap']['horizontal_count'];
			count_y = Math.ceil(data['data'].length / count_x);
		} else if(options['heatmap']['vertical_count'] > 0) {
			count_y = options['heatmap']['vertical_count'];
			count_x = Math.ceil(data['data'].length / count_y);
		} else {
			count_x = Math.floor(Math.sqrt(data['data'].length));
			count_y = count_x;
		}

		// Calculate box unit size.
		var unit_x = 1, unit_y = 1;
		unit_x = (chart_area['width'] - ((count_x - 1) * options['heatmap']['horizontal_margin'])) / count_x;
		unit_y = (chart_area['height'] - ((count_y - 1) * options['heatmap']['vertical_margin'])) / count_y;

		// Color.
		var this_color, color_array, this_value, this_box, this_label;
		if(options['heatmap']['color'] && options['heatmap']['color'].length > 0) {
			color_array = options['heatmap']['color'];
		} else {
			color_array = options['color'];
		}

		// Draw boxes.
		global['heatmap'] = { 'boxes': [], 'labels': [] }
		y = chart_area['top-left'][1];
		index = 0;

		var done = false;
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
				global['heatmap']['boxes'].push(this_box);

				// Label
				if(unit_x > options['heatmap']['label-size'] && unit_y > options['heatmap']['label-size']) {
					this_label = paper.text(x + unit_x / 2, y + unit_y / 2, data['data'][index][data['label_field']]).attr({
						'fill': options['heatmap']['label-color'],
						'fill-opacity': options['heatmap']['label-alpha'],
						'font-size': options['heatmap']['label-size']
					}).translate(0.5, 0.5);
					global['heatmap']['boxes'].push(this_label);
				}
				
				x += unit_x + options['heatmap']['horizontal_margin'];
				++index;
			}

			if(done) break;

			y += unit_y + options['heatmap']['vertical_margin'];
		}
	};

	var merge_options = function(overwrite) {
		if(!overwrite) return $.InfoViz.options;

		var result = {};		
		$.extend(true, result, $.InfoViz.options);
		$.extend(true, result, overwrite);

		return result;
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

	$.InfoViz.global_option = function(overwrite) {
		$.InfoViz.options = merge_options(overwrite);
	};

	$.InfoViz.version = function() { return '0.1.0' };

	$.InfoViz.enable_logo = function() {
		$.InfoViz.options['layout']['logo-enabled'] = true;
	};
})(jQuery);