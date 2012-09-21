/*
	InfoViz, Core Library
	@copyright 2012  Zheng Li <lizheng@lizheng.me>
	@github https://github.com/nocoo/InfoViz
	@license MIT
	@version 0.3.1
*/

define(function(require, exports, module) {
	var tooltip_border, tooltip_title, tooltip_content, tooltip_id, tooltip_timer;

	exports.draw_empty_background = function(paper, data, overwrite_options) {
		if(!paper) return idb('Paper is empty.');

		var options = exports.merge_options(overwrite_options), chart_area = {},
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

	exports.draw_axis_background = function(paper, data, overwrite_options) {
		if(!paper) return idb('Paper is empty.');

		var options = exports.merge_options(overwrite_options), chart_area = {},
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

	exports.draw_legend = function(paper, chart_area, legend_data, overwrite_options) {
		if(!paper || !legend_data) return idb('Paper or Data is empty.');

		var options = exports.merge_options(overwrite_options), cache = [], x, y, i, j, item;

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

	exports.draw_tooltip = function(paper, x, y, id, title, content, color, overwrite_options) {
		if(id === tooltip_id) return;

		var options = exports.merge_options(overwrite_options);
		var test_text, this_box, title_width = 0, title_height = 0, content_width = 0, content_height = 0;

		// Remove old tooltip
		exports.hide_tooltip(options);

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
		tooltip_border.animate({ 'opacity': 1 }, options['tooltip']['speed']);
		tooltip_title.animate({ 'opacity': 1 }, options['tooltip']['speed']);
		tooltip_content.animate({ 'opacity': 1 }, options['tooltip']['speed']);

		// Hide tooltip timer setup.
		clearTimeout(tooltip_timer);
		if(options['tooltip']['hide-after']) {
			tooltip_timer = setTimeout(function() {
				exports.hide_tooltip();
			}, options['tooltip']['hide-after']);
		}
	};

	exports.filter_node = function(node, except) {
		if(!except || except.length === 0) return node;

		var p, result = {};
		for(p in node) {
			if(except.indexOf(p) === -1) {
				result[p] = node[p];
			} else {
				continue;
			}
		}

		return result;
	};

	exports.in_array = function(target, array) {
		if(typeof(array) === 'object' && (array instanceof Array)) {
			for(var i = 0; i < array.length; ++i) {
				if(target == array[i]) return i;
			}
		}

		return -1;
	};

	exports.merge_options = function(overwrite) {
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

	exports.hide_tooltip = function(overwrite_options) {
		var options = exports.merge_options(overwrite_options);

		// Remove old tooltip
		if(tooltip_border) {
			var old_border = tooltip_border;
			old_border.stop();
			old_border.animate({ 'opacity': 0 }, options['tooltip']['speed'], function() {
				old_border.remove();
				delete old_border;
			});
		}
		if(tooltip_title) {
			var old_title = tooltip_title;
			old_title.stop();
			old_title.animate({ 'opacity': 0 }, options['tooltip']['speed'], function() {
				old_title.remove();
				delete old_title;
			});
		}
		if(tooltip_content) {
			var old_content = tooltip_content;
			old_content.stop();
			old_content.animate({ 'opacity': 0 }, options['tooltip']['speed'], function() {
				old_content.remove();
				delete old_content;
			});
		}
	};

	exports.guid = function(type) {
		var S4 = function() { return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1); };

		if(type === 'long') {
			return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		} else {
			return (S4()+S4());
		}
	};

	exports.idb = function(message) {
		if(console && typeof(console.log) === 'function') {
			console.log(message);
		} else {
			alert(message);
		}
	};
});