/*
    InfoViz, HeatMap
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    require.async(['./infoviz.core'], function(core) {

        exports.draw_heatmap = function(paper, chart_area, data, overwrite_options, callback, that) {
            if (!paper || !data) return idb('Paper or Data is empty.');

            var options = core.merge_options(overwrite_options), cache = [], x, y, i, j, item;

            if (options['heatmap']['sort-enabled']) {
                data['data'].sort(function(a, b) { return b[data['value_field']] - a[data['value_field']]; });
            }

            // Find out max and min value.
            var v_max = -Infinity, v_min = Infinity;
            for (i = 0; i < data['data'].length; ++i) {
                item = data['data'][i];

                if (item[data['value_field']] > v_max) {
                    v_max = item[data['value_field']];
                }

                if (item[data['value_field']] < v_min) {
                    v_min = item[data['value_field']];
                }
            }

            // Find out row and column count.
            var count_x = 1, count_y = 1;
            if (options['heatmap']['horizontal-count'] > 0) {
                count_x = options['heatmap']['horizontal-count'];
                count_y = Math.ceil(data['data'].length / count_x);
            } else if (options['heatmap']['vertical-count'] > 0) {
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
            if (options['heatmap']['color'] && options['heatmap']['color'].length > 0) {
                color_array = options['heatmap']['color'];
            } else {
                color_array = options['color'];
            }

            // Draw boxes.
            y = chart_area['top-left'][1];
            index = 0;

            var done = false, p_boxes = [], p_labels = [];
            this_label = undefined;
            for (j = 0; j < count_y; ++j) {
                x = chart_area['top-left'][0];
                for (i = 0; i < count_x; ++i) {
                    if (!data['data'][index]) {
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
                    if (unit_x > options['heatmap']['label-size'] && unit_y > options['heatmap']['label-size']) {
                        this_label = paper.text(x + unit_x / 2, y + unit_y / 2, data['data'][index][data['label_field']]).attr({
                            'fill': options['heatmap']['label-color'],
                            'fill-opacity': options['heatmap']['label-alpha'],
                            'font-size': options['heatmap']['label-size']
                        }).translate(0.5, 0.5);
                        p_labels.push(this_label);
                    }

                    // Action.
                    if (callback && typeof(callback) === 'function') {
                        this_box.data('info', {
                            'x': x,
                            'y': y,
                            'data': data['data'][index],
                            'type': 'box',
                            'callback': callback,
                            'that': that
                        });

                        this_label.data('info', {
                            'x': x,
                            'y': y,
                            'data': data['data'][index],
                            'type': 'label',
                            'callback': callback,
                            'that': that
                        });

                        this_box.click(core.element_action);
                        this_label.click(core.element_action);
                    }

                    // Tooltip.
                    if (data['tooltip_title'] || data['tooltip_content']) {
                        var title = data['tooltip_title'];
                        var content = data['tooltip_content'];

                        for (var p in data['data'][index]) {
                            title = title.replace('{' + p + '}', data['data'][index][p]);
                            content = content.replace('{' + p + '}', data['data'][index][p]);
                        }

                        if (this_label) {
                            this_label.data('tooltip', {
                                'id': index,
                                'title': title,
                                'content': content,
                                'color': this_color,
                                'x': x + unit_x / 2,
                                'y': y,
                                'element': this_label,
                                'options': options,
                                'paper': paper
                            });
                            this_label.hover(core.element_tooltip);
                        } else {
                            this_box.data('tooltip', {
                                'id': index,
                                'title': title,
                                'content': content,
                                'color': this_color,
                                'x': x + unit_x / 2,
                                'y': y,
                                'element': this_box,
                                'options': options,
                                'paper': paper
                            });
                            this_box.hover(core.element_tooltip);
                        }
                    }

                    x += unit_x + options['heatmap']['horizontal-margin'];
                    ++index;
                }

                if (done) break;

                y += unit_y + options['heatmap']['vertical-margin'];
            }
        };
    });
});
