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
			'vertical-label-count': 10,
			'vertical-bar-width': 5
		},
		'color': [
			{ 'color': '#66B3DD', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#EF7D31', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#ABC93C', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#E05170', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#297FB5', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#F5BE21', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#5ABABB', 'dark-alpha': 1, 'light-alpha': 0.3 },
			{ 'color': '#9D66A4', 'dark-alpha': 1, 'light-alpha': 0.3 }
		]
	};

	$.InfoViz.chart = function(element, type, data) {
		var target_id = $(element).attr('id') ? $(element).attr('id') : 'infoviz_' + guid();
		$(element).attr('id', target_id);

		var paper = Raphael(target_id, $(element).width(), $(element).height());

		// Default area.
		var area = {
			'top-left': [ $.InfoViz.options['layout']['padding-left'], $.InfoViz.options['layout']['padding-top'] ],
			'top-right': [ paper.width - $.InfoViz.options['layout']['padding-right'], $.InfoViz.options['layout']['padding-top'] ],
			'bottom-left': [ $.InfoViz.options['layout']['padding-left'], paper.height - $.InfoViz.options['layout']['padding-bottom'] ],
			'bottom-right': [ paper.width - $.InfoViz.options['layout']['padding-right'], paper.height - $.InfoViz.options['layout']['padding-bottom'] ],
			'width': paper.width,
			'height': paper.height
		};

		// Default background.
		paper.rect(0, 0, paper.width, paper.height).attr({
			'stroke': 'none',
			'fill': $.InfoViz.options['layout']['background-color'],
			'fill-opacity': $.InfoViz.options['layout']['background-alpha']
		});

		switch(type) {
			case 'linechart': {
				area = $.InfoViz.draw_axis(paper, data);
				//$.InfoViz.draw_chart_background(paper, area);
				$.InfoViz.draw_linechart(paper, area, data);

				break;
			}
			case 'bubblechart': {
				area = $.InfoViz.draw_axis(paper, data);
				$.InfoViz.draw_bubblechart(paper, area, data);

				break;
			}
			default: {
				paper.text(area['width'] / 2, area['height'] / 2, 'Type "' + type +'" not supported.').attr({ 'font-size': 12, 'fill': '#000' }).translate(0.5, 0.5);
				break;
			}
		}

		// Draw InfoViz logo.
		if($.InfoViz.options['layout']['logo-enabled']) {
			var logo = paper.image(
				'./images/infoviz_logo_tiny.png', 
				area['top-right'][0] - $.InfoViz.options['layout']['logo-width'],
				area['top-right'][1],
				$.InfoViz.options['layout']['logo-width'],
				$.InfoViz.options['layout']['logo-height']).attr({ 'cursor': 'pointer' }).translate(0.5, 0.5);
			logo.click(function() { window.location.href = 'https://github.com/nocoo/InfoViz'; });
		}
	};

	// TODO: make this more efficient.
	$.InfoViz.draw_chart_background = function(paper, chart_area, overwrite_options) {
		if(!paper || !chart_area) return idb('Paper or chart area is empty.');

		var options = merge_options(overwrite_options), p_background, p_horizontal_guideline, p_vertical_guideline;

		p_background = paper.rect(chart_area['top-left'][0], chart_area['top-left'][1], chart_area['width'], chart_area['height']);
		p_background.attr({ 'stroke': 'none', 'fill': 'red', 'fill-opacity': 0 }).translate(0.5, 0.5);

		p_horizontal_guideline = paper.path('M' + chart_area['top-left'][0] + ',-1000' + 'L' + chart_area['top-right'][0] + ',-1000').translate(0.5, 0.5);
		p_vertical_guideline = paper.path('M-1000,' + chart_area['top-right'][1] + 'L-1000,' + chart_area['bottom-right'][1]).translate(0.5, 0.5);

		p_background.mousemove(function(evt) {
			var h_clone = paper.path('M' + chart_area['top-left'][0] + ',' + evt.offsetY + 'L' + chart_area['top-right'][0] + ',' + evt.offsetY).translate(0.5, 0.5);
			p_horizontal_guideline.attr({ 'path': h_clone.attr('path') });
			h_clone.remove();

			var v_clone = paper.path('M' + evt.offsetX + ',' + chart_area['top-right'][1] + 'L' + evt.offsetX + ',' + chart_area['bottom-right'][1]).translate(0.5, 0.5);
			p_vertical_guideline.attr({ 'path': v_clone.attr('path') });
			v_clone.remove();
		});
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
		var this_h, this_v, this_size, this_label, this_color;
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
			
			paper.circle(x, y, size).attr({
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['bubblechart']['circle-border-width']
			}).translate(0.5, 0.5);

			paper.text(x, y, this_label).attr({
				'fill': this_color['color'],
				'font-size': options['bubblechart']['label-size'],
				'text-anchor': 'middle'
			}).translate(0.5, 0.5);
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
				'stroke-opacity': color['dark-alpha'],
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

		var merge_options = function(overwrite) {
		if(!overwrite) return $.InfoViz.options;

		var result = $.InfoViz.options, p;
		var sections = [ 'layout', 'grid' ];

		for(var i = 0; i < sections.length; ++i) {
			if(overwrite[sections[i]] && typeof(overwrite[sections[i]]) === 'object') {
				for(p in overwrite[sections[i]]) {
					result[sections[i]][p] = overwrite[sections[i]][p];
				}
			}
		}

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

	$.InfoViz.version = function() { return '0.1.0' };

	$.InfoViz.enable_logo = function() {
		$.InfoViz.options['layout']['logo-enabled'] = true;
	};
})(jQuery);