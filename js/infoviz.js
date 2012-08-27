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
			'logo-height': 23,
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
			'sector-border-width': 1
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
				//console.log(area);
				$.InfoViz.draw_piechart(paper, area, data, options);
				/*paper.rect(area['top-left'][0], area['top-left'][1], area['width'], area['height']).attr({
					'fill': 'red', 'fill-opacity': 0.5
				});*/
				break;
			}
			default: {
				paper.text(area['width'] / 2, area['height'] / 2, 'Type "' + type +'" not supported.').attr({ 'font-size': 12, 'fill': '#000' }).translate(0.5, 0.5);
				break;
			}
		}

		//global['type'] = type;
		//$.InfoViz.add_actions(paper, area);

		// Draw InfoViz logo.
		if(options['layout']['logo-enabled']) {
			var logo = paper.image(
				'./images/infoviz_logo_tiny.png', 
				area['top-right'][0] - options['layout']['logo-width'],
				area['top-right'][1],
				options['layout']['logo-width'],
				options['layout']['logo-height']).attr({ 'cursor': 'pointer' }).translate(0.5, 0.5);
			logo.click(function() { window.location.href = 'https://github.com/nocoo/InfoViz'; });
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

		var sector = function(cx, cy, r, startAngle, endAngle, params) {
			var rad = Math.PI / 180,
				x1 = cx + r * Math.cos(-startAngle * rad),
				x2 = cx + r * Math.cos(-endAngle * rad),
				y1 = cy + r * Math.sin(-startAngle * rad),
				y2 = cy + r * Math.sin(-endAngle * rad);
			
			return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
		}

		var angle_unit = 360 / v_sum;
		var this_angle, current_angle = 0, this_color, p_sectors = [], p;

		for(i = 0; i < data['data'].length; ++i) {
			item = data['data'][i][data['value_field']];
			this_angle = angle_unit * item;
			this_color = options['color'][(i % options['color'].length)];

			p = sector(cx, cy, radius, current_angle, current_angle + this_angle, { 
				'fill': this_color['color'],
				'fill-opacity': this_color['light-alpha'],
				'stroke': this_color['color'],
				'stroke-opacity': this_color['dark-alpha'],
				'stroke-width': options['piechart']['sector-border-width']
			}).translate(0.5, 0.5);

			p_sectors.push(p);
			current_angle += this_angle;
		}

		for(i = 0; i < p_sectors.length; ++i) {
			(function(target) {
				target.mouseover(function () {
					target.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, options['layout']['speed'], "elastic");
				});
				target.mouseout(function () {
					target.stop().animate({transform: ""}, options['layout']['speed'], "elastic");
				});
			})(p_sectors[i]);
		}
	};

	var merge_options = function(overwrite) {
		if(!overwrite) return $.InfoViz.options;

		var result = {}, p;
		var sections = [ 'layout', 'grid', 'linechart', 'bubblechart', 'barchart', 'color' ];

		$.extend(true, result, $.InfoViz.options);

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

	$.InfoViz.global_option = function(overwrite) {
		$.InfoViz.options = merge_options(overwrite);
	};

	$.InfoViz.version = function() { return '0.1.0' };

	$.InfoViz.enable_logo = function() {
		$.InfoViz.options['layout']['logo-enabled'] = true;
	};
})(jQuery);