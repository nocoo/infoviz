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

			'horizental-label-margin': 5,
			'horizental-label-spacing': 50,
			'horizental-label-size': 1,
			'horizental-label-color': '#000',
			'horizental-name-size': 12,
			'horizental-name-color': '#000'
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
		//var paper = Raphael(10, 50, 320, 200);

		var area = $.InfoViz.draw_grid(paper, data);

		$.InfoViz.draw_linechart(paper, area, data);

		//var test = paper.rect(area['top-left'][0], area['top-left'][1], area['width'], area['height']);
		//test.attr({ 'fill': '#F0F' });

		// Creates circle at x = 50, y = 40, with radius 10
		/*var circle = paper.circle(50, 40, 10);
		// Sets the fill attribute of the circle to red (#f00)
		circle.attr("fill", "#f00");

		// Sets the stroke attribute of the circle to white
		circle.attr("stroke", "#fff");

		circle.animate(
			{ 
				'stroke': '#000',
				'fill': '#000',
				'cx': '400', 'cy': '400'
			},
			10000, 'bounce',
			function() {
				console.log('done');
			}
		);*/
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
			options['grid']['horizental-label-margin'] + 
			options['grid']['horizental-label-spacing'] + 
			options['grid']['horizental-label-margin'];

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

		// Draw horizental axis.
				cache = [];
		cache.push('M' + chart_area['bottom-left'][0] + ',' + chart_area['bottom-left'][1]);
		cache.push('L' + chart_area['bottom-right'][0] + ',' + chart_area['bottom-right'][1]);

		var p_horizental_axis = paper.path(cache.join(''));
		p_horizental_axis.attr({
			'stroke': options['grid']['axis-color'],
			'stroke-width': options['grid']['axis-width'],
			'stroke-opacity': options['grid']['axis-alpha']
		});
		p_horizental_axis.translate(0.5, 0.5);

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

		if(data['horizental_axis_name']) {
			x = chart_area['bottom-right'][0];
			y = chart_area['bottom-right'][1] + options['grid']['horizental-name-size'] / 2 + options['grid']['horizental-label-margin'] * 2;

			//idb([x, y]);

			var horizental_axis_name = paper.text(x, y, data['horizental_axis_name']);
			horizental_axis_name.attr({
				'text-anchor': 'end',
				'font-weight': 'bold',
				'font-size': options['grid']['horizental-name-size'],
				'fill': options['grid']['horizental-name-color']
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
			var h_field_name = data['horizental_field'], v_field_name = data['vertical_field'];
			var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;

			// Scan horizental and vertical fields.
			for(var line in lines) {
				for(i = 0; i < lines[line]['data'].length; ++i) {
					item = lines[line]['data'][i];

					// horizental field.
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
			// horizental field.
			var h_start = Math.round(chart_area['top-left'][0] + options['chart']['padding-left']);
			var h_unit = Math.round((chart_area['top-right'][0] - options['chart']['padding-right'] - h_start) / (h_fields.length - 1));
			
			var v_start = Math.round(chart_area['bottom-left'][1] - options['chart']['padding-bottom']);
			var v_unit = Math.round((v_start - chart_area['top-left'][1] - options['chart']['padding-top']) / (v_max - v_min + 1));

			//console.log(v_unit);

			// grids.
			var grid_line;
			cache = [];
			x = h_start;

			for(i = 0; i < h_fields.length; ++i) {
				cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
				cache.push('L' + x + ',' + chart_area['top-left'][1]);
				
				x += h_unit;
			}

			//console.log(cache.join(''));

			grid_line = paper.path(cache.join(''));
			grid_line.attr({
				'stroke': options['grid']['grid-color'],
				'stroke-width': options['grid']['grid-width'],
				'stroke-opacity': options['grid']['grid-alpha']
			});
			grid_line.translate(0.5, 0.5);

			// Lines.
			var index = 0, color;
			
			for(var line in lines) {
				var p_line, p_node, p_label;

				cache = [];
				x = h_start;
				color = options['color'][(index % options['color'].length)];
				
				for(i = 0; i < lines[line]['data'].length; ++i) {
					item = lines[line]['data'][i];
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

					x += h_unit;
				}

				p_line = paper.path(cache.join(''));
				p_line.attr({
					'stroke': color['color'],
					'stroke-opacity': color['dark-alpha'],
					'stroke-width': options['chart']['line-width']
				}).translate(0.5, 0.5);

				p_label = paper.text(x - h_unit + options['chart']['circle-radius'] * 2, y, lines[line]['name']);
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