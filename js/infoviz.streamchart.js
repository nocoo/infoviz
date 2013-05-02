/*
    InfoViz, StreamChart
    @copyright 2012 - 2013  Zheng Li <lizheng@lizheng.me>
    @github https://github.com/nocoo/InfoViz
    @license MIT
*/

define(function(require, exports, module) {
    exports.draw_streamchart = function(paper, chart_area, data, overwrite_options, callback, that) {
        if (!paper || !data) return idb('Paper or Data is empty.');

        var core = require('./infoviz.core');
        var options = core.merge_options(overwrite_options), cache = [], x, y;
        var i, j, k, item, h_count = 0;

        // Mapping position.
        var h_start = chart_area['top-left'][0] + options['streamchart']['padding-left'];
        var v_start = chart_area['bottom-left'][1] - options['streamchart']['padding-bottom'];

        // Scan data, calculate ratio.
        var h_fields = {};
        for (i = 0; i < data['data'].length; ++i) {
            item = data['data'][i];

            for (j = 0; j < item['data'].length; ++j) {
                if (!h_fields[item['data'][j][data['horizontal_field']]]) {
                    h_fields[item['data'][j][data['horizontal_field']]] = {
                        'sum': 0, 'max': -Infinity, 'min': Infinity, 'y': v_start
                    };

                    h_count++;
                }
            }
        }

        for (i = 0; i < data['data'].length; ++i) {
            item = data['data'][i];

            var this_h_data;
            for (j = 0; j < item['data'].length; ++j) {
                this_h_data = h_fields[item['data'][j][data['horizontal_field']]];
                this_h_data['sum'] += item['data'][j][data['value_field']];
                this_h_data['max'] = (item['data'][j][data['value_field']] > this_h_data['max']) ? item['data'][j][data['value_field']] : this_h_data['max'];
                this_h_data['min'] = (item['data'][j][data['value_field']] < this_h_data['min']) ? item['data'][j][data['value_field']] : this_h_data['min'];
            }
        }

        var s_fields = [];
        for (i = 0; i < data['data'].length; ++i) {
            item = data['data'][i];

            var record, this_stream = core.filter_node(item, ['data']);
            this_stream['data'] = [];
            this_stream['areas'] = [];

            var index = 0;
            for (record in h_fields) {
                this_stream['data'][index++] = 0;
            }

            for (j = 0; j < item['data'].length; ++j) {
                this_stream['data'][j] = {
                    'stream': i,
                    'field': item['data'][j][data['horizontal_field']],
                    'ratio': item['data'][j][data['value_field']] / h_fields[item['data'][j][data['horizontal_field']]]['sum']
                };
            }

            s_fields.push(this_stream);
        }

        // Vertical labels.
        var v_height = v_start - chart_area['top-left'][1] - options['streamchart']['padding-top'];
        var v_label_unit = v_height / (options['grid']['vertical-label-count'] - 1);
        var v_label_value_unit = 1 / (options['grid']['vertical-label-count'] - 1);
        v_label_value_unit = Math.round(v_label_value_unit * Math.pow(10, 2)) / Math.pow(10, 2);

        cache = [];
        x = chart_area['top-left'][0] - options['grid']['vertical-bar-width'];
        y = v_start;
        var v_value = 0;

        for (i = 0; i < options['grid']['vertical-label-count']; ++i) {
            cache.push('M' + x + ',' + y + 'L' + chart_area['top-left'][0] + ',' + y);

            paper.path(cache.join('')).attr({
                'stroke': options['grid']['axis-color'],
                'stroke-opacity': options['grid']['axis-alpha'],
                'stroke-width': options['grid']['axis-width']
            }).translate(0.5, 0.5);

            paper.text(x - options['grid']['vertical-bar-width'], y, v_value.toFixed(options['grid']['vertical-label-round'])).attr({
                'text-anchor': 'end',
                'fill': options['grid']['vertical-label-color'],
                'font-size': options['grid']['vertical-label-size']
            }).translate(0.5, 0.5);

            y -= v_label_unit;
            v_value += v_label_value_unit;
        }

        var h_start = chart_area['top-left'][0] + options['streamchart']['padding-left'];
        var h_unit = Math.floor((chart_area['width'] - options['streamchart']['padding-left'] - options['streamchart']['padding-right']) / (h_count - 1));

        // Horizontal labels.
        x = h_start;
        var this_h_label;
        for (item in h_fields) {
            y = Math.floor(chart_area['bottom-right'][1] + options['grid']['horizontal-name-size'] / 2 + options['grid']['horizontal-label-margin'] * 2);
            this_h_label = paper.text(x, y, item).attr({
                'text-anchor': 'middle',
                'text-weight': 'normal',
                'font-size': options['grid']['horizontal-label-size'],
                'fill': options['grid']['horizontal-label-color']
            }).translate(0.5, 0.5);

            if (options['grid']['horizontal-label-rotate']) {
                this_h_label.transform('r' + options['grid']['horizontal-label-rotate']);
            }

            x += h_unit;
        }

        // Draw Streams.
        var legend_data = [];
        for (i = 0; i < s_fields.length; ++i) {
            var this_stream = s_fields[i];
            var this_color = options['color'][(i % options['color'].length)];

            for (j = 0; j < this_stream['data'].length - 1; ++j) {
                cache = [];
                cache.push('M' + (h_start + j * h_unit) + ',' + h_fields[this_stream['data'][j]['field']]['y']);
                cache.push('L' + (h_start + (j + 1) * h_unit) + ',' + h_fields[this_stream['data'][j + 1]['field']]['y']);
                cache.push('L' + (h_start + (j + 1) * h_unit) + ',' + (h_fields[this_stream['data'][j + 1]['field']]['y'] - v_height * this_stream['data'][j + 1]['ratio']));
                cache.push('L' + (h_start + j * h_unit) + ',' + (h_fields[this_stream['data'][j]['field']]['y'] - v_height * this_stream['data'][j]['ratio']));
                cache.push('Z');

                // Update h_field y.
                h_fields[this_stream['data'][j]['field']]['y'] -= v_height * this_stream['data'][j]['ratio'];

                if (j === this_stream['data'].length - 2) {
                    h_fields[this_stream['data'][j + 1]['field']]['y'] -= v_height * this_stream['data'][j + 1]['ratio'];
                }

                // Stream area
                var this_area = paper.path(cache.join('')).attr({
                    'stroke': this_color['color'],
                    'stroke-opacity': this_color['dark-alpha'],
                    'stroke-width': options['streamchart']['border-width'],
                    'fill': this_color['color'],
                    'fill-opacity': this_color['light-alpha']
                }).translate(0.5, 0.5);

                // Action.
                if (callback && typeof(callback) === 'function') {
                    this_area.data('info', {
                        'x': (h_start + j * h_unit),
                        'y': h_fields[this_stream['data'][j]['field']]['y'],
                        'stream': this_stream,
                        'area': data['data'][i]['data'][j],
                        'that': that,
                        'callback': callback
                    });
                    this_area.click(core.element_action);
                }

                // Tooltip.
                if (data['tooltip_title'] || data['tooltip_content']) {
                    var title = data['tooltip_title'];
                    var content = data['tooltip_content'];

                    for (var p in this_stream) {
                        title = title.replace('{' + p + '}', this_stream[p]);
                        content = content.replace('{' + p + '}', this_stream[p]);
                    }

                    for (var p in data['data'][i]['data'][j]) {
                        title = title.replace('{' + p + '}', data['data'][i]['data'][j][p]);
                        content = content.replace('{' + p + '}', data['data'][i]['data'][j][p]);
                    }

                    this_area.data('tooltip', {
                        'id': 's' + i + 'a' + j,
                        'title': title,
                        'content': content,
                        'color': this_color,
                        'x': (h_start + j * h_unit) + h_unit / 2,
                        'y': h_fields[this_stream['data'][j]['field']]['y'],
                        'element': this_area,
                        'options': options,
                        'paper': paper
                    });
                    this_area.hover(core.element_tooltip);
                }

                this_area.data('animation', {
                    'stream': i,
                    'dark': this_color['dark-alpha'],
                    'light': this_color['light-alpha']
                });
                this_stream['areas'].push(this_area);
            }

            // Add legend data.
            legend_data.unshift({
                'label': this_stream[data['stream_field']],
                'color': this_color,
                'type': 'area'
            });
        }

        core.draw_legend(paper, chart_area, legend_data, options);

        // Animations.
        // Disabled for performance reasons.
        // for (i = 0; i < s_fields.length; ++i) {
        //     for (j = 0; j < s_fields[i]['areas'].length; ++j) {
        //         (function(target) {
        //             target.mouseover(function() {
        //                 for (k = 0; k < s_fields[target.data('animation')['stream']]['areas'].length; ++k) {
        //                     item = s_fields[target.data('animation')['stream']]['areas'][k];
        //                     item.stop().animate({
        //                         'fill-opacity': item.data('animation')['dark']
        //                     }, options['layout']['speed'], '>');
        //                 }
        //             });
        //             target.mouseout(function() {
        //                 for (k = 0; k < s_fields[target.data('animation')['stream']]['areas'].length; ++k) {
        //                     item = s_fields[target.data('animation')['stream']]['areas'][k];
        //                     item.stop().animate({
        //                         'fill-opacity': item.data('animation')['light']
        //                     }, options['layout']['speed'], '<');
        //                 }
        //             });
        //         })(s_fields[i]['areas'][j]);
        //     }
        // }
    };
});
