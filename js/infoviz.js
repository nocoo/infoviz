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
			'background-alpha': 0.1
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
			'vertical-label-size': 1,
			'vertical-label-color': '#000',
			'vertical-name-size': 12,
			'vertical-name-color': '#000',

			'horizontal-label-margin': 5,
			'horizontal-label-spacing': 50,
			'horizontal-label-size': 1,
			'horizontal-label-color': '#000',
			'horizontal-name-size': 12,
			'horizontal-name-color': '#000'
		},
		'chart': {
			'padding-top': 10,
			'padding-right': 90,
			'padding-bottom': 10,
			'padding-left': 30,
			'line-width': 1,
			'circle-radius': 3,
			'label-size': 12
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

	var idb = function(message) {
		if(typeof message === 'string') {
			console.log('[idb] ' + message);
		} else {
			console.log(message);
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

	var array_contains = function(obj) {
		var count = 0;
		for(var p in obj) ++count;
		return count;
	};

	$.InfoViz.version = function() { return '0.1.0' };

	$.InfoViz.guid = function(type) {
		var S4 = function() { return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1); };
				
		if(type === 'long') {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		} else {
			return (S4()+S4());
		}
	};

	$.InfoViz.chart = function(element, type, data) {
		var target_id = $(element).attr('id') ? $(element).attr('id') : 'infoviz_' + $.InfoViz.guid();
		$(element).attr('id', target_id);

		var paper = Raphael(target_id, $(element).width(), $(element).height());
		var area = $.InfoViz.draw_grid(paper, data);

		$.InfoViz.draw_chart_background(paper, area);
		$.InfoViz.draw_linechart(paper, area, data);
	};

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

	$.InfoViz.draw_grid = function(paper, data, overwrite_options) {
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
			options['grid']['horizontal-label-margin'] + 
			options['grid']['horizontal-label-spacing'] + 
			options['grid']['horizontal-label-margin'];

		y = paper_height - 
			options['layout']['padding-bottom'] - 
			options['grid']['border-width'] - 
			options['grid']['padding-bottom'] -
			options['grid']['vertical-label-margin'] - 
			options['grid']['vertical-label-spacing'] - 
			options['grid']['vertical-label-margin'];

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

	$.InfoViz.draw_linechart = function(paper, chart_area, data, overwrite_options) {
		if(!paper || !data) return idb('Paper or Data is empty.');
		
		var options = merge_options(overwrite_options), cache = [], x, y;

		if(data['type'] === 'discrete') {
			// Discrete LineChart.

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

			// Mapping position.
			// horizontal field.
			var h_start = Math.round(chart_area['top-left'][0] + options['chart']['padding-left']);
			var h_unit = Math.round((chart_area['top-right'][0] - options['chart']['padding-right'] - h_start) / (h_fields.length - 1));
			
			var v_start = Math.round(chart_area['bottom-left'][1] - options['chart']['padding-bottom']);
			var v_unit = Math.round((v_start - chart_area['top-left'][1] - options['chart']['padding-top']) / (v_max - v_min + 1));

			var h_map = {};

			//console.log(v_unit);

			// grids.
			var p_vertical_grids, p_label;
			cache = [];
			x = h_start;
			y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

			for(i = 0; i < h_fields.length; ++i) {
				cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
				cache.push('L' + x + ',' + chart_area['top-left'][1]);
				
				h_map[h_fields[i]] = x;

				// Draw horizontal labels.
				p_label = paper.text(x, y, h_fields[i]);
				p_label.attr({
					'text-anchor': 'middle',
					'font-size': options['grid']['horizontal-name-size'],
					'fill': options['grid']['horizontal-name-color']
				});

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
					y = Math.round(v_start - item[v_field_name] * v_unit);

					if(i === 0) {
						cache.push('M' + x + ',' + y);
					} else {
						cache.push('L' + x + ',' + y);
					}
					
					p_node = paper.circle(x, y, options['chart']['circle-radius']);
					p_node.attr({
						'stroke': color['color'],
						'stroke-opacity': color['dark-alpha'],
						'stroke-width': options['chart']['line-width'],
						'fill': color['color']
					}).translate(0.5, 0.5);
				}

				p_line = paper.path(cache.join(''));
				p_line.attr({
					'stroke': color['color'],
					'stroke-opacity': color['dark-alpha'],
					'stroke-width': options['chart']['line-width']
				}).translate(0.5, 0.5);

				p_label = paper.text(x + options['chart']['circle-radius'] * 2, y, lines[line]['name']);
				p_label.attr({
					'fill': color['color'],
					'text-anchor': 'start',
					'font-size': options['chart']['label-size']
				}).translate(0.5, 0.5);

				index++;
			}

		} else if(data['type'] === 'continuous') {
			// Continuous LineChart.

			return idb('Under construction.');
		} else {
			return idb('Not support this type: ' + data['type']);
		}
	};
})(jQuery);