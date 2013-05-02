/*
    InfoViz, LineChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    exports.draw_linechart = function(paper, chart_area, data, overwrite_options, callback, that) {
        if (!paper || !data) return idb('Paper or Data is empty.');

        var core = require('./infoviz.core');
        var options = core.merge_options(overwrite_options), cache = [], x, y;
        var lines = data['data'], h_fields = [], i, j, k, item;
        var h_field_name = data['horizontal_field'], v_field_name = data['vertical_field'], v_field_name2;
        var this_h, this_v, h_min = Infinity, h_max = -Infinity, v_min = Infinity, v_max = -Infinity;
        var v_min2 = Infinity, v_max2 = -Infinity;

        // Check if right axis is enabled.
        if (core.is_array(v_field_name)) {
            if (v_field_name.length === 2) {
                v_field_name2 = v_field_name[1];
                v_field_name = v_field_name[0];
            } else {
                v_field_name = v_field_name[0];
            }
        }

        // Scan horizontal and vertical fields.
        var this_axis;
        for (var line in lines) {
            if (!lines[line]['axis'] || lines[line]['axis'] < 0 || lines[line]['axis'] > 1) {
                this_axis = 0;
            } else {
                this_axis = lines[line]['axis'];
            }

            for (i = 0; i < lines[line]['data'].length; ++i) {
                item = lines[line]['data'][i];

                // horizontal field.
                if (item[h_field_name] !== undefined) {
                    this_h = item[h_field_name];
                } else {
                    this_h = 'N/A';
                }

                if (this_h > h_max) {
                    h_max = this_h;
                }
                if (this_h < h_min) {
                    h_min = this_h;
                }

                if (core.in_array(this_h, h_fields) === -1) {
                    h_fields.push(this_h);
                }

                // vertical field.
                if (this_axis === 0) {
                    if (core.is_number(item[v_field_name])) {
                        this_v = item[v_field_name];
                    } else {
                        this_v = 'N/A';
                    }

                    if (this_v > v_max) {
                        v_max = this_v;
                    }
                    if (this_v < v_min) {
                        v_min = this_v;
                    }
                } else {
                    if (core.is_number(item[v_field_name2])) {
                        this_v = item[v_field_name2];
                    } else {
                        this_v = 'N/A';
                    }

                    if (this_v > v_max2) {
                        v_max2 = this_v;
                    }
                    if (this_v < v_min2) {
                        v_min2 = this_v;
                    }
                }
            }
        }

        v_min = Math.floor(v_min / 10) * 10;
        v_max = Math.ceil(v_max / 10) * 10;
        v_min2 = Math.floor(v_min2 / 10) * 10;
        v_max2 = Math.ceil(v_max2 / 10) * 10;

        // Mapping position.
        var h_start = chart_area['top-left'][0] + options['linechart']['padding-left'];
        var h_unit = (chart_area['top-right'][0] - options['linechart']['padding-right'] - h_start) / (h_fields.length - 1);

        var v_start = chart_area['bottom-left'][1] - options['linechart']['padding-bottom'];
        var v_unit = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (v_max - v_min);
        var v_unit2 = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (v_max2 - v_min2);
        var h_map = {};

        // Vertical labels.
        var v_label_unit = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (options['grid']['vertical-label-count'] - 1);
        var v_label_value_unit = (v_max - v_min) / (options['grid']['vertical-label-count'] - 1); // May not be accurate.
        var v_label_unit2 = (v_start - chart_area['top-left'][1] - options['linechart']['padding-top']) / (options['grid']['vertical-label-count-right'] - 1);
        var v_label_value_unit2 = (v_max2 - v_min2) / (options['grid']['vertical-label-count-right'] - 1); // May not be accurate.

        // Draw left vertical labels.
        cache = [];
        x = chart_area['top-left'][0] - options['grid']['vertical-bar-width'];
        y = v_start;
        var v_value = v_min;
        for (i = 0; i < options['grid']['vertical-label-count']; ++i) {
            cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

            // vertical bar.
            paper.path(cache.join('')).attr({
                'stroke': options['grid']['axis-color'],
                'stroke-opacity': options['grid']['axis-alpha'],
                'stroke-width': options['grid']['axis-width']
            }).translate(0.5, 0.5);

            // vertical label.
            paper.text(x - options['grid']['vertical-bar-width'], y, v_value.toFixed(options['grid']['vertical-label-round'])).attr({
                'text-anchor': 'end',
                'fill': options['grid']['vertical-label-color'],
                'font-size': options['grid']['vertical-label-size']
            }).translate(0.5, 0.5);

            y -= v_label_unit;
            v_value += v_label_value_unit;
        }

        if (options['grid']['enable-right-axis']) {
            cache = [];
            x = chart_area['top-right'][0];
            y = v_start;
            v_value = v_min2;
            for (i = 0; i < options['grid']['vertical-label-count-right']; ++i) {
                cache.push('M' + x + ',' + y + 'L' + (chart_area['top-right'][0] + options['grid']['vertical-bar-width-right']) + ',' + y);

                // vertical bar.
                paper.path(cache.join('')).attr({
                    'stroke': options['grid']['axis-color'],
                    'stroke-opacity': options['grid']['axis-alpha'],
                    'stroke-width': options['grid']['axis-width']
                }).translate(0.5, 0.5);

                // vertical label.
                paper.text(x + 2 * options['grid']['vertical-bar-width-right'], y, v_value.toFixed(options['grid']['vertical-label-round'])).attr({
                    'text-anchor': 'start',
                    'fill': options['grid']['vertical-label-color'],
                    'font-size': options['grid']['vertical-label-size']
                }).translate(0.5, 0.5);

                y -= v_label_unit2;
                v_value += v_label_value_unit2;
            }
        }

        // grids.
        var p_vertical_grids, this_h_label, test_text, this_box;
        cache = [];
        x = h_start;
        y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

        for (i = 0; i < h_fields.length; ++i) {
            cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
            cache.push('L' + x + ',' + chart_area['top-left'][1]);

            h_map[h_fields[i]] = x;

            // Draw horizontal labels.
            if (options['grid']['horizontal-label-rotate']) {
                // measure rotated label size before render it.
                test_text = paper.text(-1000, -1000, h_fields[i]).attr({
                    'text-anchor': 'middle',
                    'font-size': options['grid']['horizontal-label-size'],
                    'transform': 'r' + options['grid']['horizontal-label-rotate']
                }).translate(0.5, 0.5);
                this_box = test_text.getBBox();

                this_h_label = paper.text(x, y - options['grid']['horizontal-label-margin'] * 2 + this_box.height / 2, h_fields[i]).attr({
                    'text-anchor': 'middle',
                    'font-size': options['grid']['horizontal-label-size'],
                    'fill': options['grid']['horizontal-label-color'],
                    'transform': 'r' + options['grid']['horizontal-label-rotate']
                }).translate(0.5, 0.5);
            } else {
                this_h_label = paper.text(x, y, h_fields[i]).attr({
                    'text-anchor': 'middle',
                    'font-size': options['grid']['horizontal-label-size'],
                    'fill': options['grid']['horizontal-label-color']
                }).translate(0.5, 0.5);
            }

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
        for (var line in lines) {
            var p_line, p_node, p_label, p_area, todo = [];
            var area_start_x, area_end_x;

            if (!lines[line]['axis'] || lines[line]['axis'] < 0 || lines[line]['axis'] > 1) {
                this_axis = 0;
            } else {
                this_axis = lines[line]['axis'];
            }

            cache = [];
            color = options['color'][(index % options['color'].length)];

            for (i = 0; i < lines[line]['data'].length; ++i) {
                item = lines[line]['data'][i];

                x = h_map[item[h_field_name]];

                if (this_axis === 0) {
                    y = v_start - (item[v_field_name] - v_min) * v_unit;
                } else {
                    y = v_start - (item[v_field_name2] - v_min2) * v_unit2;
                }

                if (i === 0) {
                    cache.push('M' + x + ',' + y);
                    area_start_x = x;
                } else {
                    cache.push('L' + x + ',' + y);
                }

                if (i === lines[line]['data'].length - 1) {
                    area_end_x = x;
                }

                if (this_axis === 0) {
                    todo.push({ 'x': x, 'y': y, 'axis': this_axis, 'v_value': item[v_field_name], 'h_value': item[h_field_name], 'data': item });
                } else {
                    todo.push({ 'x': x, 'y': y, 'axis': this_axis, 'v_value': item[v_field_name2], 'h_value': item[h_field_name], 'data': item });
                }
            }

            // Draw this line.
            if (this_axis === 0) {
                p_line = paper.path(cache.join('')).attr({
                    'stroke': color['color'],
                    'stroke-opacity': color['light-alpha'],
                    'stroke-width': options['linechart']['line-width']
                }).translate(0.5, 0.5);
            } else {
                p_line = paper.path(cache.join('')).attr({
                    'stroke': color['color'],
                    'stroke-dasharray': '-.',
                    'stroke-linecap': 'butt',
                    'stroke-opacity': color['light-alpha'],
                    'stroke-width': options['linechart']['line-width']
                }).translate(0.5, 0.5);
            }

            // Draw line shadow.
            if (options['layout']['shadow-enabled']) {
                p_line.glow({
                    'width': options['layout']['shadow-width'],
                    'fill': false,
                    'opacity': options['layout']['shadow-alpha'],
                    'offsetx': options['layout']['shadow-offset-x'],
                    'offsety': options['layout']['shadow-offset-y'],
                    'color': options['layout']['shadow-color']
                });
            }

            p_label = paper.text(x + options['linechart']['circle-radius'] * 2, y, lines[line]['name']).attr({
                'fill': color['color'],
                'text-anchor': 'start',
                'font-size': options['linechart']['label-size']
            }).translate(0.5, 0.5);

            if (options['linechart']['area-enabled']) {
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
            for (i = 0; i < todo.length; ++i) {
                if (options['linechart']['custom-circle']) {
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

                if (options['layout']['shadow-enabled']) {
                    p_node.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                p_nodes.push(p_node);

                // Action.
                if (callback && typeof(callback) === 'function') {
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
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in todo[i]['data']) {
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
            if (options['linechart']['area-enabled']) {
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

        for (i = 0; i < p_nodes.length; ++i) {
            p_nodes[i].toFront();
        }

        core.draw_legend(paper, chart_area, legend_data, options);
    };
});
