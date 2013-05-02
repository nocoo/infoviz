/*
    InfoViz, BarChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    exports.draw_barchart = function(paper, chart_area, data, overwrite_options, callback, that) {
        if (!paper || !data) return idb('Paper or Data is empty.');

        var core = require('./infoviz.core');
        var options = core.merge_options(overwrite_options), cache = [], x, y, line_count = 0;
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

            ++line_count;
        }

        v_min = Math.floor(v_min / 10) * 10;
        v_max = Math.ceil(v_max / 10) * 10;
        v_min2 = Math.floor(v_min2 / 10) * 10;
        v_max2 = Math.ceil(v_max2 / 10) * 10;

        // Mapping position.
        var h_start = chart_area['top-left'][0] + options['barchart']['padding-left'];

        var v_start = chart_area['bottom-left'][1] - options['barchart']['padding-bottom'];
        var v_unit = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (v_max - v_min);
        var v_unit2 = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (v_max2 - v_min2);

        var h_map = {};

        // Vertical labels.
        var v_label_unit = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (options['grid']['vertical-label-count'] - 1);
        var v_label_value_unit = (v_max - v_min) / (options['grid']['vertical-label-count'] - 1); // May not be accurate.
        var v_label_unit2 = (v_start - chart_area['top-left'][1] - options['barchart']['padding-top']) / (options['grid']['vertical-label-count-right'] - 1);
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
        var group_width = (chart_area['width'] - options['barchart']['padding-left'] - options['barchart']['padding-right'] - (h_fields.length - 1) * options['barchart']['group-margin']) / h_fields.length;
        var bar_width = (group_width - (line_count - 1) * options['barchart']['bar-margin']) / line_count;

        var p_vertical_grids, this_h_label;
        cache = [];
        x = h_start + group_width / 2;
        y = chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2;

        for (i = 0; i < h_fields.length; ++i) {
            cache.push('M' + x + ',' + chart_area['bottom-left'][1]);
            cache.push('L' + x + ',' + chart_area['top-left'][1]);

            h_map[h_fields[i]] = x - group_width / 2;

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
        for (var line in lines) {
            var p_node;

            if (!lines[line]['axis'] || lines[line]['axis'] < 0 || lines[line]['axis'] > 1) {
                this_axis = 0;
            } else {
                this_axis = lines[line]['axis'];
            }

            color = options['color'][(index % options['color'].length)];

            for (i = 0; i < lines[line]['data'].length; ++i) {
                item = lines[line]['data'][i];

                x = h_map[item[h_field_name]] + (index) * (bar_width + options['barchart']['bar-margin']);

                if (this_axis === 0) {
                    y = v_start - (item[v_field_name] - v_min) * v_unit;

                    this_node = paper.rect(x, y, bar_width, chart_area['bottom-left'][1] - y - 1);
                    this_node.attr({
                        'stroke': color['color'],
                        'stroke-opacity': color['dark-alpha'],
                        'stroke-width': options['barchart']['border-width'],
                        'fill': color['color'],
                        'fill-opacity': color['light-alpha']
                    }).translate(0.5, 0.5);
                } else {
                    y = v_start - (item[v_field_name2] - v_min2) * v_unit2;

                    this_node = paper.rect(x, y, bar_width, chart_area['bottom-left'][1] - y - 1);
                    this_node.attr({
                        'stroke': color['color'],
                        'stroke-opacity': color['dark-alpha'],
                        'stroke-dasharray': '--',
                        'stroke-linecap': 'butt',
                        'stroke-width': options['barchart']['border-width'],
                        'fill': color['color'],
                        'fill-opacity': color['light-alpha']
                    }).translate(0.5, 0.5);
                }

                // Draw bar shadow.
                if (options['layout']['shadow-enabled']) {
                    this_node.glow({
                        'width': options['layout']['shadow-width'],
                        'fill': false,
                        'opacity': options['layout']['shadow-alpha'],
                        'offsetx': options['layout']['shadow-offset-x'],
                        'offsety': options['layout']['shadow-offset-y'],
                        'color': options['layout']['shadow-color']
                    });
                }

                p_nodes.push(this_node);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_node.data('info', {
                        'x': x,
                        'y': y,
                        'h_value': item[h_field_name],
                        'v_value': (this_axis === 0) ? item[v_field_name] : item[v_field_name2],
                        'axis': this_axis,
                        'data': item,
                        'that': that,
                        'callback': callback
                    });
                    this_node.click(core.element_action);
                }

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in item) {
                        title = title.replace('{' + p + '}', item[p]);
                        content = content.replace('{' + p + '}', item[p]);
                    }

                    this_node.data('tooltip', {
                        'id': line + i,
                        'title': title,
                        'content': content,
                        'color': color,
                        'x': x + bar_width / 2,
                        'y': y,
                        'element': this_node,
                        'options': options,
                        'paper': paper
                    });
                    this_node.hover(core.element_tooltip);
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

        core.draw_legend(paper, chart_area, legend_data, options);

        // Animation.
        for (i = 0; i < p_nodes.length; ++i) {
            (function(target) {
                target.mouseover(function() {
                    target.stop().animate({
                        'fill-opacity': options['color'][0]['dark-alpha']
                    }, options['layout']['speed'], '>');
                });
                target.mouseout(function() {
                    target.stop().animate({
                        'fill-opacity': options['color'][0]['light-alpha']
                    }, options['layout']['speed'], '<');
                });
            })(p_nodes[i]);
        }
    };
});
