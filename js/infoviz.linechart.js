/*
	InfoViz, LineChart
	@copyright 2012  Zheng Li <lizheng@lizheng.me>
	@github https://github.com/nocoo/InfoViz
	@license MIT
*/

define(function(require, exports, module) {
	seajs.use([ 'infoviz.core' ], function(core) {

		exports.draw_linechart = function(paper, chart_area, data, overwrite_options, callback, that) {
			if(!paper || !data) return idb('Paper or Data is empty.');

			var options = core.merge_options(overwrite_options), cache = [], x, y;
			var lines = data['data'], h_fields = [], v_fields = [], i, j, k, item;
			var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'];
			var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;

			// Scan horizontal and vertical fields.
			for(var line in lines) {
				for(i = 0; i < lines[line]['data'].length; ++i) {
					item = lines[line]['data'][i];

					// horizontal field.
					if(item[h_field_name] !== undefined) {
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

					if(core.in_array(this_h, h_fields) === -1) {
						h_fields.push(this_h);
					}

					// vertical field.
					if(core.isNumber(item[v_field_name])) {
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

					if(core.in_array(this_v, v_fields) === -1) {
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
			var legend_data = [], p_nodes = [];
			for(var line in lines) {
				var p_line, p_node, p_label, p_area, todo = [];
				var area_start_x, area_end_x;

				cache = [];
				color = options['color'][(index % options['color'].length)];

				for(i = 0; i < lines[line]['data'].length; ++i) {
					item = lines[line]['data'][i];

					x = h_map[item[h_field_name]];
					y = v_start - (item[v_field_name] - v_min) * v_unit + options['linechart']['circle-radius'];

					if(i === 0) {
						cache.push('M' + x + ',' + y);
						area_start_x = x;
					} else {
						cache.push('L' + x + ',' + y);
					}

					if(i === lines[line]['data'].length - 1) {
						area_end_x = x;
					}

					todo.push({ 'x': x, 'y': y, 'v_value': item[v_field_name], 'h_value': item[h_field_name], 'data': item });
				}

				p_line = paper.path(cache.join('')).attr({
					'stroke': color['color'],
					'stroke-opacity': color['light-alpha'],
					'stroke-width': options['linechart']['line-width']
				}).translate(0.5, 0.5);

				p_label = paper.text(x + options['linechart']['circle-radius'] * 2, y, lines[line]['name']).attr({
					'fill': color['color'],
					'text-anchor': 'start',
					'font-size': options['linechart']['label-size']
				}).translate(0.5, 0.5);

				if(options['linechart']['area-enabled']) {
					cache.push('L' + area_end_x + ',' + chart_area['bottom-left'][1]);
					cache.push('L' + area_start_x + ',' + chart_area['bottom-left'][1]);
					cache.push('Z');
					p_area = paper.path(cache.join('')).attr({
						'stroke': 'none',
						'fill': color['color'],
						'fill-opacity': options['linechart']['area-alpha']
					}).translate(0.5, 0.5);
				}

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

					p_nodes.push(p_node);

					// Action.
					if(callback && typeof(callback) === 'function') {
						p_node.data('info', {
							'data': todo[i]['data'],
							'x': todo[i]['x'],
							'y': todo[i]['y'],
							'v_value': todo[i]['v_value'],
							'h_value': todo[i]['h_value'],
							'that': that,
							'callback': callback
						});

						p_node.click(core.element_action);
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
							'x': todo[i]['x'],
							'y': todo[i]['y'],
							'element': p_node,
							'options': options,
							'paper': paper
						});
						p_node.hover(core.element_tooltip);
					}
				}

				// Add legend data.
				if(options['linechart']['area-enabled']) {
					legend_data.push({
						'label': lines[line]['name'],
						'color': color,
						'type': 'area'
					});
				} else {
					legend_data.push({
						'label': lines[line]['name'],
						'color': color,
						'type': 'line'
					});
				}

				index++;
			}

			for(i = 0; i < p_nodes.length; ++i) {
				p_nodes[i].toFront();
			}

			core.draw_legend(paper, chart_area, legend_data, options);
		};
	});
});